var Models;
(function (Models) {
    (function (GameType) {
        GameType[GameType["ALL_OPEN"] = 0] = "ALL_OPEN";
        GameType[GameType["THREE_OPEN"] = 1] = "THREE_OPEN";
    })(Models.GameType || (Models.GameType = {}));
    var GameType = Models.GameType;
    var GameContext = (function () {
        function GameContext(config) {
            this._config = config;
            this.reset();
        }
        Object.defineProperty(GameContext.prototype, "mechas", {
            get: function () {
                return this._mechas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameContext.prototype, "board", {
            get: function () {
                return this._board;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameContext.prototype, "config", {
            get: function () {
                return this._config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameContext.prototype, "turn", {
            get: function () {
                return this._turn;
            },
            set: function (playerIndex) {
                this._turn = playerIndex;
            },
            enumerable: true,
            configurable: true
        });
        GameContext.prototype.reset = function () {
            this._turn = null;
            this._mechas = [];
            for (var i = 0; i < this._config.playersSize; i++) {
                this._mechas[i] = [];
                for (var j = 0; j < this._config.teamSize; j++) {
                    this._mechas[i][j] = null;
                }
            }
            this._board = [];
            for (var i = 0; i < this._config.boardSize; i++) {
                this._board[i] = [];
                for (var j = 0; j < this._config.boardSize; j++) {
                    this._board[i][j] = null;
                }
            }
        };
        GameContext.prototype.free = function (x, y) {
            return this._board[x][y] === null;
        };
        GameContext.prototype.set = function (move) {
            var mecha = this._mechas[move.playerIndex][move.position];
            mecha.active = true;
            this._board[move.x][move.y] = mecha;
            this._mechas[move.playerIndex][move.position] = null;
            var checkUp = true;
            var checkDown = true;
            var checkLeft = true;
            var checkRight = true;
            if (move.x === 0) {
                checkDown = false;
            }
            else if (move.x === this._config.boardSize - 1) {
                checkUp = false;
            }
            if (move.y === 0) {
                checkLeft = false;
            }
            else if (move.y === this._config.boardSize - 1) {
                checkRight = false;
            }
            if (checkUp) {
                var upMecha = this._board[move.x + 1][move.y];
                if (upMecha !== null && mecha.ownerIndex !== upMecha.ownerIndex) {
                    if (mecha.up > upMecha.down) {
                        upMecha.ownerIndex = mecha.ownerIndex;
                    }
                }
            }
            if (checkDown) {
                var downMecha = this._board[move.x - 1][move.y];
                if (downMecha !== null && mecha.ownerIndex !== downMecha.ownerIndex) {
                    if (mecha.down > downMecha.up) {
                        downMecha.ownerIndex = mecha.ownerIndex;
                    }
                }
            }
            if (checkLeft) {
                var leftMecha = this._board[move.x][move.y - 1];
                if (leftMecha !== null && mecha.ownerIndex !== leftMecha.ownerIndex) {
                    if (mecha.left > leftMecha.right) {
                        leftMecha.ownerIndex = mecha.ownerIndex;
                    }
                }
            }
            if (checkRight) {
                var rightMecha = this._board[move.x][move.y + 1];
                if (rightMecha !== null && mecha.ownerIndex !== rightMecha.ownerIndex) {
                    if (mecha.right > rightMecha.left) {
                        rightMecha.ownerIndex = mecha.ownerIndex;
                    }
                }
            }
        };
        GameContext.prototype.end = function () {
            for (var i = 0; i < this._config.boardSize; i++) {
                for (var j = 0; j < this._config.boardSize; j++) {
                    if (this.free(i, j))
                        return false;
                }
            }
            return true;
        };
        GameContext.prototype.tie = function () {
            return false;
        };
        GameContext.prototype.win = function (playerIndex) {
            if (!this.end())
                return false;
            var count = 0;
            for (var i = 0; i < this._config.boardSize; i++) {
                for (var j = 0; j < this._config.boardSize; j++) {
                    var mecha = this._board[i][j];
                    if (mecha !== null && mecha.ownerIndex === playerIndex) {
                        count++;
                    }
                }
            }
            if (count > Math.ceil(this._config.boardSize * this._config.boardSize) / 2)
                return true;
            return false;
        };
        GameContext.prototype.getMoves = function (playerIndex) {
            var moves = [];
            var mechas = this._mechas[playerIndex];
            for (var i = 0; i < mechas.length; i++) {
                if (mechas[i] !== null && !mechas[i].active) {
                    for (var j = 0; j < this._board.length; j++) {
                        for (var k = 0; k < this._board[j].length; k++) {
                            if (this.free(j, k)) {
                                moves.push(new Models.Move(playerIndex, i, j, k));
                            }
                        }
                    }
                }
            }
            return moves;
        };
        GameContext.prototype.heuristic = function (playerIndex) {
            var value = 0;
            for (var i = 0; i < this._board.length; i++) {
                for (var j = 0; j < this._board[i].length; j++) {
                    if (!this.free(i, j)) {
                        if (playerIndex === this._board[i][j].ownerIndex) {
                            value++;
                        }
                    }
                }
            }
            return value;
        };
        GameContext.prototype.clone = function () {
            var ctx = new GameContext(this.config);
            ctx.reset();
            ctx._turn = this._turn;
            for (var i = 0; i < this._config.boardSize; i++) {
                ctx._board[i] = [];
                for (var j = 0; j < this._config.boardSize; j++) {
                    if (this._board[i][j] === null)
                        ctx._board[i][j] = null;
                    else
                        ctx._board[i][j] = this._board[i][j].clone();
                }
            }
            for (var i = 0; i < this._config.playersSize; i++) {
                for (var j = 0; j < this._config.teamSize; j++) {
                    if (this._mechas[i][j] === null)
                        ctx._mechas[i][j] = null;
                    else
                        ctx._mechas[i][j] = this._mechas[i][j].clone();
                }
            }
            return ctx;
        };
        GameContext.prototype.debug = function () {
            return "";
        };
        return GameContext;
    }());
    Models.GameContext = GameContext;
})(Models || (Models = {}));
