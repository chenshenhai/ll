import Layer from './../layer/mod.ts';
import Sketch from './../sketch/mod.ts';

export interface SketchpadOptions {
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

class Sketchpad extends Sketch {

  private _options: SketchpadOptions;
  private _container: HTMLDivElement;

  constructor(opts: SketchpadOptions) {
    super({
      width: opts.width,
      height: opts.height,
      layerCount: opts.layerCount
    });
    this._options = opts;
    this._container = opts.container
  }

  render() {
    const container: HTMLDivElement = this._container;
    while (container.firstChild) {
      let tempNode = container.removeChild(container.firstChild);
      tempNode = null;
    }
    const { width, height, layerCount } = this._options;
    const style = mergeCSS2Style({
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
    });
    const canvasStack = this.getCanvasStack();
    container.setAttribute('style', style);
    const count = layerCount;
    for (let i = 0; i < count; i ++) {
      const canvas = canvasStack[i];
      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute('style', mergeCSS2Style({
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
      }));
      container.appendChild(canvas);
    }
  }


  downloadImage(filename = 'download-image') {
    const { width, height } = this._options;
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext('2d');
    const mergeImageData = this.mergeLayer();
    tempContext.putImageData(mergeImageData, 0, 0);
    const stream = tempCanvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = stream;
    downloadLink.download = filename;
    const downloadClickEvent = document.createEvent('MouseEvents');
    downloadClickEvent.initEvent('click', true, false);
    downloadLink.dispatchEvent(downloadClickEvent);

    // clear
    tempContext.clearRect(0, 0, width, height);
    tempCanvas = null;
  }

}

export default Sketchpad;