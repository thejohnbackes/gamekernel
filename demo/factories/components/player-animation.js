'use strict';

var Point = require('../../data/point'),
    TileGraphic = require('../../graphics/tile-graphic'),
    Animation = require('../../graphics/animation');

var url = '/assets/astrosheet.png',
    pointUrl = '/assets/point.png';

module.exports = function(engine, entity, data) {
  var graphics = new Animation({
    position: data.loc,
    direction: data.dir,
    url: url,
    width: 24,
    height: 24,
    frameTime: 100,
    frameMidpoint: new Point(12, 12)
  });
  graphics.defineLoop(exports.STAND, [5]);
  graphics.defineLoop(exports.WALK, [0, 1, 2, 3]);
  graphics.defineLoop(exports.JUMP, [7]);
  graphics.playLoop(exports.STAND);
  engine.renderer.table.attach(entity, graphics);

  var pointGraphic = new TileGraphic(data.loc, data.dir, pointUrl, {
    x: 0, y: 0, width: 1, height: 1
  });
  engine.renderer.table.attach(entity, pointGraphic);

  return graphics
};

exports.WALK = 'walk';
exports.STAND = 'stand';
exports.JUMP = 'jump';
