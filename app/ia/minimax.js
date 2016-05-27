var IA;
(function (IA) {
    var Minimax = (function () {
        function Minimax(maxDepth) {
            this._maxDepth = maxDepth;
        }
        Minimax.prototype.eval = function (board, deck, sign) {
            return null;
        };
        Minimax.prototype.max = function (board, depth) {
            return Number.POSITIVE_INFINITY;
        };
        Minimax.prototype.min = function (board, depth) {
            return Number.POSITIVE_INFINITY;
        };
        return Minimax;
    }());
    IA.Minimax = Minimax;
})(IA || (IA = {}));
