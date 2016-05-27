var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(geometry, texture) {
            _super.call(this);
            this._isSelected = false;
            this.name = "tile";
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = 16;
            this._tile = new THREE.SkinnedMesh(geometry, new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                opacity: 1.0,
                transparent: true
            }));
            this.add(this._tile);
        }
        Tile.prototype.destroy = function () {
            delete (this._tile);
        };
        Tile.prototype.tint = function (color) {
            this._tile.material.color = new THREE.Color(color);
        };
        Tile.prototype.setSelected = function (selected) {
            var material = this._tile.material;
            if (selected) {
                if (!this._isSelected) {
                    this._isSelected = true;
                    material.opacity;
                    createjs.Tween.get(material, { paused: false, loop: true })
                        .to({ opacity: 0.25 }, 350, createjs.Ease.linear)
                        .to({ opacity: 1.0 }, 350, createjs.Ease.linear);
                }
            }
            else {
                this._isSelected = false;
                material.opacity = 1.0;
                if (createjs.Tween.hasActiveTweens(material))
                    createjs.Tween.removeTweens(material);
            }
        };
        return Tile;
    }(Objects.GameObject));
    Objects.Tile = Tile;
})(Objects || (Objects = {}));
