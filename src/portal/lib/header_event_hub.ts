import contentEventHub from './content_event_hub.ts';

// const $header = document.getElementById('J_Logox_Header');
const $btnSketch = document.getElementById('J_Btn_SketchMode');
const $btnSchema = document.getElementById('J_Btn_SchemaMode');
let hasInitialized = false;

const headerEventHub = {
  initClickEvent() {
    if (hasInitialized === true) {
      return;
    }
    $btnSketch.addEventListener('click', () => {
      contentEventHub.triggerShowSchema(false);
      contentEventHub.triggerShowSketch(true);
      this.triggerBtnSchemaActive(false);
      this.triggerBtnSketchActive(true);
    });

    $btnSchema.addEventListener('click', () => {
      contentEventHub.triggerShowSchema(true);
      contentEventHub.triggerShowSketch(false);
      this.triggerBtnSchemaActive(true);
      this.triggerBtnSketchActive(false);
    });

    hasInitialized = true;
  },

  triggerBtnSketchActive(active: boolean) {
    if (active === true) {
      $btnSketch.classList.add('btn-active');
    } else if (active === false) {
      $btnSketch.classList.remove('btn-active');
    }
  },

  triggerBtnSchemaActive(active: boolean) {
    if (active === true) {
      $btnSchema.classList.add('btn-active');
    } else if (active === false) {
      $btnSchema.classList.remove('btn-active');
    }
  }
}

export default headerEventHub;