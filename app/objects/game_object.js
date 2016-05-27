var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            _super.apply(this, arguments);
        }
        GameObject.prototype.update = function (dt) {
        };
        GameObject.prototype.destroy = function () {
        };
        return GameObject;
    }(THREE.Object3D));
    Objects.GameObject = GameObject;
})(Objects || (Objects = {}));
