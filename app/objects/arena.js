var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Arena = (function (_super) {
        __extends(Arena, _super);
        function Arena(geometry, material) {
            _super.call(this, geometry, material);
            this.name = "arena";
        }
        Arena.prototype.destroy = function () {
            this.geometry.dispose();
            delete (this.material);
            this.material.dispose();
            delete (this.material);
        };
        Arena.create = function (geometry, materials, texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = 16;
            var model = new Arena(geometry, new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide
            }));
            return model;
        };
        return Arena;
    }(THREE.Mesh));
    Objects.Arena = Arena;
})(Objects || (Objects = {}));
