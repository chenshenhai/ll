import Layer from './../layer/mod.ts';

export interface SketchOptions {
  width: number,
  height: number,
  layerCount: number,
  container: HTMLDivElement,
}

function mergeCSS2Style(css: object) {
  let result = '';
  let resultList = [];
  const keys = Object.keys(css);
  keys.forEach((name: string) => {
    if (typeof name === 'string') {
      const value: string = css[name] || '';
      if (typeof value === 'string') {
        resultList.push(`${name}:${value}`);
      }
    }
  });
  result = resultList.join(';');
  return result;
}

class Sketch {

  private _width: number = 200;
  private _height: number = 200;
  private _layerCount: number = 1;
  private _container: HTMLDivElement;
  private _canvasStock: HTMLCanvasElement[] = [];
  private _layerStock: Layer[] = [];
  private _tempCanvas: HTMLCanvasElement = null;

  constructor(opts: SketchOptions) {
    this._width = opts.width;
    this._height = opts.height;
    this._layerCount = opts.layerCount;
    this._container = opts.container
    this._initSketch();
  }

  private _initSketch() {
    const container: HTMLDivElement = this._container;
    const width = this._width;
    const height = this._height;
    const style = mergeCSS2Style({
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
    });
    this._tempCanvas = document.createElement('canvas');
    this._tempCanvas.width = width;
    this._tempCanvas.height = height;

    container.setAttribute('style', style);
    const count = this._layerCount;
    for (let i = 0; i < count; i ++) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute('style', mergeCSS2Style({
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
      }));
      const ctx = canvas.getContext('2d');
      const layer = new Layer(ctx);
      this._layerStock.push(layer);
      this._canvasStock.push(canvas);
      container.appendChild(canvas);
    }
  }

  getLayerContext(index: number) {
    let ctx = null;
    if (index < this._layerCount) {
      const layer: Layer = this._layerStock[index];
      if (layer instanceof Layer) {
        ctx = layer.getLayerContext();
      }
    }
    return ctx;
  }

  mergeLayer() {
    const { _tempCanvas, _width, _height } = this;
    let tempContext = _tempCanvas.getContext('2d');
    tempContext.clearRect(0, 0, _width, _height);
    const canvasStock: HTMLCanvasElement[] = this._canvasStock;
    canvasStock.forEach((canvas: HTMLCanvasElement) => {
      tempContext.drawImage(canvas, 0, 0);
    })
    const mergeImageData = tempContext.getImageData(0, 0, _width, _height);
    tempContext.clearRect(0, 0, _width, _height);
    return mergeImageData;
  }

  downloadImage(filename = 'download-image') {
    const { _tempCanvas, _width, _height } = this;
    const tempContext = _tempCanvas.getContext('2d');
    tempContext.clearRect(0, 0, _width, _height);
    const mergeImageData = this.mergeLayer();
    tempContext.putImageData(mergeImageData, 0, 0);
    const stream = _tempCanvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = stream;
    downloadLink.download = filename;
    const downloadClickEvent = document.createEvent('MouseEvents');
    downloadClickEvent.initEvent('click', true, false);
    downloadLink.dispatchEvent(downloadClickEvent);

    // clear
    tempContext.clearRect(0, 0, _width, _height);
  }

}

export default Sketch;