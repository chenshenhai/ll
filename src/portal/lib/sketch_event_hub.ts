
import { SketchSchema } from './../../sketch/mod.ts';
import contentEventHub from './content_event_hub.ts';

const eventHub = {
  triggerRender(sketchSchema: SketchSchema) {
    contentEventHub.triggerSchemaRenderData(sketchSchema);
    contentEventHub.triggerSketchRenderData(sketchSchema);
  }
}

export default eventHub;


