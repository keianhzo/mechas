var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loader;
(function (Loader) {
    var ModelAsset = (function (_super) {
        __extends(ModelAsset, _super);
        function ModelAsset(id, path) {
            _super.call(this, id, path, Loader.AssetType.THREE);
        }
        ModelAsset.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.geometry) {
                this.geometry.dispose();
                delete (this.geometry);
            }
            if (this.materials) {
                for (var i = 0; i < this.materials.length; i++) {
                    this.materials[i].dispose();
                    delete (this.materials[i]);
                }
                delete (this.materials);
            }
        };
        return ModelAsset;
    }(Loader.Asset));
    Loader.ModelAsset = ModelAsset;
})(Loader || (Loader = {}));
