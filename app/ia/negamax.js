var IA;
(function (IA) {
    var Negamax = (function () {
        function Negamax(maxDepth) {
            this._maxDepth = maxDepth;
        }
        Negamax.prototype.eval = function (context, sign) {
            return this.negamax(context, null, this._maxDepth, sign).move;
        };
        Negamax.prototype.negamax = function (context, move, depth, sign) {
            if (context.end() || depth > this._maxDepth) {
                return new IA.Node(sign * context.heuristic(move.playerIndex), move);
            }
            var max = new IA.Node(-Number.POSITIVE_INFINITY, move);
            var playerIndex = 0;
            if (sign > 0)
                playerIndex = 0;
            else
                playerIndex = 1;
            var moves = context.getMoves(playerIndex);
            for (var i = 0; i < moves.length; i++) {
                var newContext = context.clone();
                newContext.set(moves[i]);
                var x = this.negamax(newContext, moves[i], depth + 1, 1 - sign);
                x.value = -x.value;
                if (x.value > max.value) {
                    max = x;
                }
            }
            return max;
        };
        return Negamax;
    }());
    IA.Negamax = Negamax;
})(IA || (IA = {}));
