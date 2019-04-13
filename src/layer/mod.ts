import drawAction from './draw_action.ts';


export interface LayerDrawAction {
  method: string,
  args: any,
}

export class Layer {
  private _context: CanvasRenderingContext2D;
  private _LayerDrawActionList: LayerDrawAction[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  getLayerContext() {
    return this._context;
  }

  clearDrawAction() {
    this._LayerDrawActionList = [];
  }

  pushDrawAction(action: LayerDrawAction) {
    const { method, args } = action;  
    this._LayerDrawActionList.push({
      method,
      args,
    })
  }

  executeDrawAction() {
    const list: LayerDrawAction[] = this._LayerDrawActionList;
    const context = this._context;
    for (let i = 0; i < list.length; i++) {
      const action = list[i];
      drawAction(context, action.method, action.args);
    }
  }
}

