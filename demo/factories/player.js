'use strict';

var compo = require('compo'),
    GameData = require('./data/game-data'),
    behavior = require('../behavior/system'),
    Controller = require('../behavior/keyboard-controller'),
    physics = require('../physics/system'),
    Tile = require('../physics/tile'),
    TileGraphic = require('../graphics/tile-graphic'),
    Animation = require('../graphics/animation'),
    renderer = require('../graphics/renderer'),
    Point = require('../data/point'),
    Character = require('./data/character');

var url = '/assets/astrosheet.png',
    pointUrl = '/assets/point.png',
    MAX_X_VEL = 8000,
    MAX_Y_VEL = 12000,
    GRAVITY = 1600,
    DRAG = 3000;

module.exports = function(entity) {
  var data = new GameData(0, 0, 4, 9, 20 - 4, 24 - 9);

  var physics = buildPhysics(entity, data);
  var graphics = buildGraphics(entity, data);

  behavior.table.attach(entity, new Controller(data.dir, physics));

  return new Character(data, physics, graphics);
};

function buildPhysics(entity, data) {
  var tilePhysics = new Tile(data.loc, data.hitbox);
  physics.tiles.attach(entity, tilePhysics);
  tilePhysics.gravity.y = GRAVITY;
  tilePhysics.maxVelocity.y = MAX_Y_VEL;
  tilePhysics.drag.x = DRAG;
  tilePhysics.maxVelocity.x = MAX_X_VEL;

  return tilePhysics;
}

function buildGraphics(entity, data) {
  var graphics = new Animation({
    position: data.loc,
    direction: data.dir,
    url: url,
    crop: { x: 0, y: 0, width: 24 * 4, height: 24 },
    numFrames: 4,
    frameTime: 100,
    frameMidpoint: new Point(12, 12)
  });
  renderer.table.attach(entity, graphics);

  var pointGraphic = new TileGraphic(data.loc, data.dir, pointUrl, {
    x: 0, y: 0, width: 1, height: 1
  });
  renderer.table.attach(entity, pointGraphic);

  return graphics
};