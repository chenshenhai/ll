
export interface SketchOptions {
  width: number,
  height: number,
  layerCount: number,
  container: HTMLCanvasElement,
}

class Sketch {

  private _width: number;
  private _height: number;
  private _layerCount: number;

  constructor(opts: SketchOptions) {
    this._width = opts.width;
    this._height = opts.height;
    this._layerCount = opts.layerCount;
    this._initSketch();
  }

  private _initSketch() {
    console.log('hello sketch!')
  }

  getLayer() {

  }

}