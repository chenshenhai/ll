import Logox from './../logox/mod.ts';
import './less/index.less';

const container = document.getElementById('logox-sketchpad');
const lx = new Logox({
  width: 500,
  height: 500,
  layerCount: 2,
  container,
});

var sketchSchema = {
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
lx.render(sketchSchema);

console.log('hello logox-portal');