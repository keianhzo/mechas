var Models;
(function (Models) {
    var Player = (function () {
        function Player(playerId, name) {
            this._name = "Player";
            this._score = 0;
            this._playerId = playerId;
            this._name = name;
            this._score = 0;
            this._setup = false;
        }
        Object.defineProperty(Player.prototype, "playerId", {
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "score", {
            get: function () {
                return this._score;
            },
            set: function (score) {
                this._score = score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "setup", {
            get: function () {
                return this._setup;
            },
            set: function (setup) {
                this._setup = setup;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.clone = function () {
            var player = new Player(this._playerId, this._name);
            player._score = this._score;
            player._setup = this._setup;
            return player;
        };
        Player.prototype.toJSON = function () {
            return {
                playerId: this.playerId,
                name: this._name,
                score: this._score,
                setup: this._setup
            };
        };
        Player.toJSON = function (players) {
            var playersJSON = [];
            players.forEach(function (player) {
                playersJSON.push(player.toJSON());
            });
            return playersJSON;
        };
        return Player;
    }());
    Models.Player = Player;
})(Models || (Models = {}));
