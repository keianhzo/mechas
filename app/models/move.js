var Models;
(function (Models) {
    var Move = (function () {
        function Move(playerIndex, position, x, y) {
            this._playerIndex = playerIndex;
            this._position = position;
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Move.prototype, "playerIndex", {
            get: function () {
                return this._playerIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Move.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Move.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Move.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        return Move;
    }());
    Models.Move = Move;
})(Models || (Models = {}));
