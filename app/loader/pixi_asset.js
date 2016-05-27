var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loader;
(function (Loader) {
    (function (PixiAssetType) {
        PixiAssetType[PixiAssetType["Texture"] = 0] = "Texture";
        PixiAssetType[PixiAssetType["JSON"] = 1] = "JSON";
    })(Loader.PixiAssetType || (Loader.PixiAssetType = {}));
    var PixiAssetType = Loader.PixiAssetType;
    var PixiAsset = (function (_super) {
        __extends(PixiAsset, _super);
        function PixiAsset(id, path, pixiType) {
            _super.call(this, id, path, Loader.AssetType.PIXI);
            this.pixiType = pixiType;
        }
        PixiAsset.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return PixiAsset;
    }(Loader.Asset));
    Loader.PixiAsset = PixiAsset;
})(Loader || (Loader = {}));
