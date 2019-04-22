import Logox from './../../logox/mod.ts';
import { SketchSchema } from './../../sketch/mod.ts';

const container = document.getElementById('J_Logox_Sketchpad');
const lx = new Logox({
  width: 500,
  height: 500,
  layerCount: 2,
  container,
});

const $sketch = document.getElementById('J_Logox_SketchContent');
const $schema = document.getElementById('J_Logox_SchemaContent');
const $textarea = <HTMLTextAreaElement> document.getElementById('J_Logox_SchemaTextarea');

const eventHub = {

  triggerShowSketch(display: boolean) {
    const schemaData = lx.getSchema();
    this.triggerSchemaRenderData(schemaData);
    this.triggerSketchRenderData(schemaData);
    if (display === true) {
      $sketch.classList.remove('block-hide');
      $sketch.classList.add('block-show');
    } else if (display === false) {
      $sketch.classList.remove('block-show');
      $sketch.classList.add('block-hide');
    } 
  },

  triggerShowSchema(display: boolean) {
    const schemaStr = $textarea.value;
    const schemaData = JSON.parse(schemaStr || '{}');
    this.triggerSchemaRenderData(schemaData);
    this.triggerSketchRenderData(schemaData);
    if (display === true) {
      $schema.classList.remove('block-hide');
      $schema.classList.add('block-show');
    } else if (display === false) {
      $schema.classList.remove('block-show');
      $schema.classList.add('block-hide');
    }
  },

  triggerSketchRenderData(data: SketchSchema) {
    lx.render(data);
  },

  triggerSchemaRenderData(data: SketchSchema) {
    let dataStr = '';
    try {
      dataStr = JSON.stringify(data, null, 4);
    } catch (err) {
      console.log(err);
    }
    $textarea.innerHTML = dataStr;
  }
}

export default eventHub;