var Models;
(function (Models) {
    var Mecha = (function () {
        function Mecha(playerIndex, data) {
            this._playerIndex = playerIndex;
            this._ownerIndex = playerIndex;
            this._name = name;
            this._modelId = data.modelId;
            this._level = data.level;
            this._position = data.position;
            this._up = data.up;
            this._down = data.down;
            this._left = data.left;
            this._right = data.right;
            this._active = false;
        }
        Object.defineProperty(Mecha.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "playerIndex", {
            get: function () {
                return this._playerIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "ownerIndex", {
            get: function () {
                return this._ownerIndex;
            },
            set: function (ownerIndex) {
                this._ownerIndex = ownerIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "modelId", {
            get: function () {
                return this._modelId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "up", {
            get: function () {
                return this._up;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "down", {
            get: function () {
                return this._down;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "left", {
            get: function () {
                return this._left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "right", {
            get: function () {
                return this._right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mecha.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (active) {
                this._active = active;
            },
            enumerable: true,
            configurable: true
        });
        Mecha.prototype.toJSON = function () {
            return {
                name: this._name,
                playerIndex: this._playerIndex,
                ownerIndex: this._ownerIndex,
                modelId: this._modelId,
                level: this._level,
                position: this._position,
                up: this._up,
                down: this._down,
                left: this._left,
                right: this._right,
            };
        };
        Mecha.parse = function (json) {
            return new Mecha(json.playerIndex, {
                name: json.name,
                modelId: json.modelId,
                level: json.level,
                position: json.position,
                up: json.up,
                down: json.down,
                left: json.left,
                right: json.right
            });
        };
        Mecha.toJSON = function (mechas) {
            var mechasJSON = [];
            mechas.forEach(function (mecha) {
                mechasJSON.push(mecha.toJSON());
            });
            return mechasJSON;
        };
        Mecha.prototype.clone = function () {
            var mecha = new Mecha(this._playerIndex, {
                name: this._name,
                modelId: this._modelId,
                level: this._level,
                position: this._position,
                up: this._up,
                down: this._down,
                left: this._left,
                right: this._right
            });
            mecha._ownerIndex = this._ownerIndex;
            mecha._active = this._active;
            return mecha;
        };
        return Mecha;
    }());
    Models.Mecha = Mecha;
})(Models || (Models = {}));
