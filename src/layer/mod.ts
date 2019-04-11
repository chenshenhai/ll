interface ContextDrawAction {
  method: string,
  args: any[],
}


class Layer {
  private _context: CanvasRenderingContext2D;
  private _contextDrawActionList: ContextDrawAction[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  getLayerContext() {
    return this._context;
  }

  pushContextDrawAction(method, args) {  
    this._contextDrawActionList.push({
      method,
      args,
    })
  }

  executeDrawAction() {
    const list: ContextDrawAction[] = this._contextDrawActionList;
    const context = this._context;
    for (let i = 0; i < list.length; i++) {
      const action = list[i];
      if (typeof action.method !== 'string') {
        continue;
      }
      if (Array.isArray(action.args) !== true) {
        continue;
      }
      if (typeof context[action.method] !== 'function') {
        return;
      }
      context[action.method](...action.args);
    }
  }
}

export default Layer;
