import Layer from './../layer/mod.ts';

export interface SketchOptions {
  width: number,
  height: number,
  layerCount: number,
}

class Sketch {

  private _width: number;
  private _height: number;
  private _layerCount: number;
  private _canvasStack: HTMLCanvasElement[] = [];
  private _layerStack: Layer[] = [];
  private _tempCanvas: HTMLCanvasElement = null;

  constructor(opts: SketchOptions) {
    this._width = opts.width;
    this._height = opts.height;
    this._layerCount = opts.layerCount;
    this._initSketch();
  }

  private _initSketch() {
    const width = this._width;
    const height = this._height;
    this._tempCanvas = document.createElement('canvas');
    this._tempCanvas.width = width;
    this._tempCanvas.height = height;

    const count = this._layerCount;
    for (let i = 0; i < count; i ++) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const layer = new Layer(ctx);
      this._layerStack.push(layer);
      this._canvasStack.push(canvas);
    }
  }

  getCanvasStack() {
    return this._canvasStack;
  }

  getLayerStack() {
    return this._layerStack;
  }

  getLayerContext(index: number) {
    let ctx = null;
    if (index < this._layerCount) {
      const layer: Layer = this._layerStack[index];
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
    const canvasStack: HTMLCanvasElement[] = this._canvasStack;
    canvasStack.forEach((canvas: HTMLCanvasElement) => {
      tempContext.drawImage(canvas, 0, 0);
    })
    const mergeImageData = tempContext.getImageData(0, 0, _width, _height);
    tempContext.clearRect(0, 0, _width, _height);
    return mergeImageData;
  }

}

export default Sketch;