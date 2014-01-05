!function(seine, exports) {
  'use strict';

  var Entity = seine.Entity,
      CollisionGrid = exports.CollisionGrid,
      GridGraphic = exports.GridGraphic,
      Position = exports.Position,
      Point = exports.Point,
      constants = exports.constants;

  exports.Level = Entity.extend({
    init: function(matrix) {
      this.matrix = matrix;
      this.loc = new Position;
    },
    start: function() {
      var r, c,
          tileSize = new Point(48, 48),
          grid = new CollisionGrid(
            this.loc, this.matrix, tileSize, constants.COLLIDABLE_TILES
          );

      this.push(grid);

      this.push(new GridGraphic(
        this.loc, '/assets/tile.png', this.matrix, tileSize
      ));
    }
  });

}(seine, demo);