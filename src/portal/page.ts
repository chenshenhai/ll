import headerEventHub from './lib/header_event_hub.ts';
import sketchEventHub from './lib/sketch_event_hub.ts';
import './assets/index.less';



headerEventHub.initClickEvent();

const sketchSchema = {
  name: '',
  layerList: [
    { 
      name: '',
      drawActionList: [{
        method: 'fillStyle',
        args: 'red',
      }, {
        method: 'fillRect',
        args: [50, 100, 200, 100],
      }],
    },
    {
      name: '',
      drawActionList: [{
        method: 'fillStyle',
        args: 'blue',
      }, {
        method: 'fillRect',
        args: [100, 150, 200, 100],
      }],
    }
  ]
}
sketchEventHub.triggerRender(sketchSchema);

console.log('hello logox-portal');