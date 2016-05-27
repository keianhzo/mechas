var IA;
(function (IA) {
    (function (Sign) {
        Sign[Sign["BLUE"] = 1] = "BLUE";
        Sign[Sign["RED"] = -1] = "RED";
    })(IA.Sign || (IA.Sign = {}));
    var Sign = IA.Sign;
    var Node = (function () {
        function Node(value, move) {
            this._value = value;
            this._move = move;
        }
        Object.defineProperty(Node.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "move", {
            get: function () {
                return this._move;
            },
            enumerable: true,
            configurable: true
        });
        return Node;
    }());
    IA.Node = Node;
})(IA || (IA = {}));
