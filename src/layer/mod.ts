class Layer {
  private _context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  getLayerContext() {
    return this._context;
  }
}

export default Layer;
