var Models;
(function (Models) {
    var Stage = (function () {
        function Stage(data) {
            this._arenaId = data.arenaId;
            this._tileId = data.tileId;
            this._cabinId = data.cabinId;
        }
        Object.defineProperty(Stage.prototype, "arenaId", {
            get: function () {
                return this._arenaId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "tileId", {
            get: function () {
                return this._tileId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "cabinId", {
            get: function () {
                return this._cabinId;
            },
            enumerable: true,
            configurable: true
        });
        Stage.prototype.toJSON = function () {
            return {
                arenaId: this.arenaId,
                tileId: this.tileId,
                cabinId: this.cabinId
            };
        };
        Stage.parse = function (json) {
            return new Stage({
                arenaId: json.arenaId,
                tileId: json.tileId,
                cabinId: json.cabinId
            });
        };
        return Stage;
    }());
    Models.Stage = Stage;
})(Models || (Models = {}));
