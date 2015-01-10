'use strict';

var compo = require('compo');

var CameraTarget = compo.extend(compo.Behavior, function(engine, target) {
  compo.Behavior.call(this);
  this.engine = engine;
  this.target = target;
});

CameraTarget.prototype.update = function(delta) {
  var renderer = this.engine.renderer;

  renderer.camera.x = -this.target.x + renderer.viewportWidth() / 2;
  renderer.camera.y = -this.target.y + renderer.viewportHeight() / 2;
};

module.exports = CameraTarget;