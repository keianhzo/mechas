var Scenes;
(function (Scenes) {
    var Scene = (function () {
        function Scene(game, assets) {
            var _this = this;
            this.onMouseMoveInternal = function (event) {
                _this.onMouseMove(event);
                event.preventDefault();
            };
            this.onMouseDownInternal = function (event) {
                _this.onMouseDown(event);
                _this._isEventDown = true;
                event.preventDefault();
            };
            this.onMouseUpInternal = function (event) {
                _this.onMouseUp(event);
                _this._isEventDown = false;
                event.preventDefault();
            };
            this.onTouchStartInternal = function (event) {
                _this.onTouchStart(event);
                _this._isEventDown = true;
                event.preventDefault();
            };
            this.onTouchEndInternal = function (event) {
                _this.onTouchEnd(event);
                _this._isEventDown = false;
                event.preventDefault();
            };
            this.onTouchCancelInternal = function (event) {
                _this.onTouchCancel(event);
                _this._isEventDown = false;
                event.preventDefault();
            };
            this.onTouchLeaveInternal = function (event) {
                _this.onTouchLeave(event);
                _this._isEventDown = false;
                event.preventDefault();
            };
            this.onTouchMoveInternal = function (event) {
                _this.onTouchMove(event);
                event.preventDefault();
            };
            this._game = game;
            this._assets = assets;
            this._camera = new THREE.PerspectiveCamera(60, 0 / 0, 1, 100);
            this._camera.position.set(0, 0, 0);
            this._raycaster = new THREE.Raycaster();
            this._mouse = new THREE.Vector2();
            this._isEventDown = false;
            this._threeScene = new THREE.Scene();
            this._threeScene.visible = true;
            this._pixiStage = new PIXI.Container();
            this._pixiStage.interactive = false;
        }
        Scene.prototype.destroy = function () {
            for (var i = 0; i < this._threeScene.children.length; i++) {
                var obj = this._threeScene.children[i];
                if (obj instanceof THREE.Mesh) {
                    var mesh = obj;
                    mesh.geometry.dispose();
                    mesh.material.dispose();
                    delete (mesh);
                }
                else {
                    delete (obj);
                }
            }
            delete (this._threeScene);
            for (var i = 0; i < this._pixiStage.children.length; i++) {
                var displayObj = this._pixiStage.children[i];
                displayObj.destroy();
            }
            this._pixiStage.destroy();
            delete (this._pixiStage);
            if (this._assets !== null) {
                for (var i = 0; i < this._assets.length; i++) {
                    var asset = this._assets[i];
                    asset.destroy();
                }
                delete (this._assets);
            }
            delete (this._raycaster);
            delete (this._camera);
            delete (this._game);
        };
        Object.defineProperty(Scene.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.show = function (callback) {
            document.addEventListener("mousemove", this.onMouseMoveInternal, false);
            document.addEventListener("mousedown", this.onMouseDownInternal, false);
            document.addEventListener("mouseup", this.onMouseUpInternal, false);
            document.addEventListener("touchstart", this.onTouchStartInternal, false);
            document.addEventListener("touchend", this.onTouchEndInternal, false);
            document.addEventListener("touchcancel", this.onTouchCancelInternal, false);
            document.addEventListener("touchleave", this.onTouchLeaveInternal, false);
            document.addEventListener("touchmove", this.onTouchMoveInternal, false);
            callback();
        };
        Scene.prototype.hide = function (callback) {
            document.removeEventListener("mousemove", this.onMouseMoveInternal, false);
            document.removeEventListener("mousedown", this.onMouseDownInternal, false);
            document.removeEventListener("mouseup", this.onMouseUpInternal, false);
            document.removeEventListener("touchstart", this.onTouchStartInternal, false);
            document.removeEventListener("touchend", this.onTouchEndInternal, false);
            document.removeEventListener("touchcancel", this.onTouchCancelInternal, false);
            document.removeEventListener("touchleave", this.onTouchLeaveInternal, false);
            document.removeEventListener("touchmove", this.onTouchMoveInternal, false);
            callback();
        };
        Object.defineProperty(Scene.prototype, "pixiStage", {
            get: function () {
                return this._pixiStage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "threeScene", {
            get: function () {
                return this._threeScene;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.render = function (three, pixi) {
            three.render(this._threeScene, this._camera);
            pixi.render(this._pixiStage);
        };
        Scene.prototype.update = function (dt) {
            for (var i = 0; i < this._threeScene.children.length; i++) {
                var obj = this._threeScene.children[i];
                if (obj instanceof Objects.GameObject) {
                    obj.update(dt);
                }
            }
        };
        Scene.prototype.onMouseMove = function (event) {
        };
        Scene.prototype.onMouseDown = function (event) {
        };
        Scene.prototype.onMouseUp = function (event) {
        };
        Scene.prototype.onTouchStart = function (event) {
        };
        Scene.prototype.onTouchEnd = function (event) {
        };
        Scene.prototype.onTouchCancel = function (event) {
        };
        Scene.prototype.onTouchLeave = function (event) {
        };
        Scene.prototype.onTouchMove = function (event) {
        };
        return Scene;
    }());
    Scenes.Scene = Scene;
})(Scenes || (Scenes = {}));
