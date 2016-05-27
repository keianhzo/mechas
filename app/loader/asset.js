var Loader;
(function (Loader) {
    (function (AssetType) {
        AssetType[AssetType["THREE"] = 0] = "THREE";
        AssetType[AssetType["PIXI"] = 1] = "PIXI";
    })(Loader.AssetType || (Loader.AssetType = {}));
    var AssetType = Loader.AssetType;
    var Asset = (function () {
        function Asset(id, path, type) {
            this.id = id;
            this.path = path;
            this.type = type;
        }
        Asset.prototype.destroy = function () {
        };
        return Asset;
    }());
    Loader.Asset = Asset;
})(Loader || (Loader = {}));
