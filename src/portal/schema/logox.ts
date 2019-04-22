const schema = {
  layerList: [
    { 
      drawActionList: [{
        method: 'fillStyle',
        args: 'red',
      }, {
        method: 'fillRect',
        args: [50, 100, 200, 100],
      }],
    },
    {
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

export default schema;
