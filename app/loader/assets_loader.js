var Loader;
(function (Loader) {
    var AssetsLoader = (function () {
        function AssetsLoader() {
        }
        AssetsLoader.load = function (assets, progress) {
            PIXI.loader.reset();
            var totalLoadedAssets = 0;
            var totalAssets = assets.length;
            if (totalAssets === 0) {
                progress(0, 0);
                return;
            }
            assets.forEach(function (asset) {
                if (asset.type === Loader.AssetType.THREE) {
                    if (asset instanceof Loader.ModelAsset) {
                        AssetsLoader.loadingManager.itemStart(asset.path);
                        AssetsLoader.jsonLoader.load(asset.path, function (geometry, materials) {
                            asset.geometry = geometry;
                            asset.materials = materials;
                            AssetsLoader.loadingManager.itemEnd(asset.path);
                        });
                    }
                    else if (asset instanceof Loader.TextureAsset) {
                        AssetsLoader.textureLoader.load(asset.path, function (texture) {
                            texture.needsUpdate = true;
                            asset.texture = texture;
                        });
                    }
                }
                else if (asset.type === Loader.AssetType.PIXI) {
                    if (asset instanceof Loader.PixiAsset) {
                        var pixiAsset = asset;
                        if (pixiAsset.pixiType === Loader.PixiAssetType.JSON) {
                            totalAssets++;
                        }
                        PIXI.loader.add(asset.id, asset.path);
                    }
                }
            });
            AssetsLoader.loadingManager.onProgress = function (item, loaded, total) {
                totalLoadedAssets++;
                Logging.Logger.debug("[AssetLoader] Loading ThreeJS asset " + totalLoadedAssets + "/" + total + ": " + item);
                progress(totalLoadedAssets, totalAssets);
            };
            var loadCallback = function (loader, resource) {
                totalLoadedAssets++;
                Logging.Logger.debug("[AssetLoader] Loading PIXI asset " + totalLoadedAssets + "/" + totalAssets + ": " + resource.url);
                progress(totalLoadedAssets, totalAssets);
            };
            PIXI.loader.on('load', loadCallback);
            var errorCallback = function (error, loader, resource) {
                throw error;
            };
            PIXI.loader.on('error', errorCallback);
            PIXI.loader.once('complete', function (loader, object) {
                PIXI.loader.off('load', loadCallback);
                PIXI.loader.off('error', errorCallback);
                PIXI.loader.reset();
            });
            PIXI.loader.load();
        };
        AssetsLoader.loadingManager = new THREE.LoadingManager();
        AssetsLoader.jsonLoader = new THREE.JSONLoader();
        AssetsLoader.textureLoader = new THREE.TextureLoader(AssetsLoader.loadingManager);
        return AssetsLoader;
    }());
    Loader.AssetsLoader = AssetsLoader;
})(Loader || (Loader = {}));
