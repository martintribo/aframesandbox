import AFRAME from 'aframe';

AFRAME.registerComponent('expose', {
  schema: {
    name: { default: 'aa' }
  },
  update: function(oldData) {
    console.log(this.data);
  }
})
