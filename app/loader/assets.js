var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loader;
(function (Loader) {
    var Assets = (function (_super) {
        __extends(Assets, _super);
        function Assets() {
            _super.apply(this, arguments);
        }
        Assets.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < items.length; i++) {
                if (!this.get(items[i].id))
                    _super.prototype.push.call(this, items[i]);
            }
            return this.length;
        };
        Assets.prototype.get = function (id) {
            var ret = undefined;
            for (var i = 0; i < this.length; i++) {
                if (this[i].id === id) {
                    ret = this[i];
                    break;
                }
            }
            return ret;
        };
        return Assets;
    }(Array));
    Loader.Assets = Assets;
})(Loader || (Loader = {}));
