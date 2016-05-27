var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loader;
(function (Loader) {
    var TextureAsset = (function (_super) {
        __extends(TextureAsset, _super);
        function TextureAsset(id, path) {
            _super.call(this, id, path, Loader.AssetType.THREE);
        }
        TextureAsset.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.texture) {
                this.texture.dispose();
                delete (this.texture);
            }
        };
        return TextureAsset;
    }(Loader.Asset));
    Loader.TextureAsset = TextureAsset;
})(Loader || (Loader = {}));
