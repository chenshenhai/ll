import Logox from './../../logox/mod.ts';
import { SketchSchema } from './../../sketch/mod.ts';

const container = document.getElementById('logox-sketchpad');
const lx = new Logox({
  width: 500,
  height: 500,
  layerCount: 2,
  container,
});

const eventHub = {
  triggerRender(sketchSchema: SketchSchema) {
    lx.render(sketchSchema);
  }
}

export default eventHub;


