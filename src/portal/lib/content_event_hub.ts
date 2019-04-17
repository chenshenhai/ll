const $sketch = document.getElementById('J_Logox_SketchContent');
const $schema = document.getElementById('J_Logox_SchemaContent');

const eventHub = {

  triggerShowSketch(display: boolean) {
    if (display === true) {
      $sketch.classList.remove('block-hide');
      $sketch.classList.add('block-show');
    } else if (display === false) {
      $sketch.classList.remove('block-show');
      $sketch.classList.add('block-hide');
    } 
  },

  triggerShowSchema(display: boolean) {
    if (display === true) {
      $schema.classList.remove('block-hide');
      $schema.classList.add('block-show');
    } else if (display === false) {
      $schema.classList.remove('block-show');
      $schema.classList.add('block-hide');
    }
  }
}

export default eventHub;