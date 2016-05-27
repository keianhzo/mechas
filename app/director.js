var Director = (function () {
    function Director() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this._ratio = Math.min(window.innerWidth / Director.GAME_WIDTH, window.innerHeight / Director.GAME_HEIGHT);
        document.body.style.backgroundColor = "#000000";
        var threeOptions = {
            antialias: false,
            clearColor: 0x000000
        };
        this._three = new THREE.WebGLRenderer(threeOptions);
        this._three.domElement.id = "threejs";
        this._three.domElement.style.position = "absolute";
        this._three.domElement.style.top = "0px";
        this._three.domElement.style.left = "0px";
        this._three.domElement.style.backgroundColor = "#000000";
        this._three.setPixelRatio(window.devicePixelRatio);
        this._three.setSize(Director.GAME_WIDTH, Director.GAME_HEIGHT);
        document.body.appendChild(this._three.domElement);
        this._clock = new THREE.Clock();
        var pixiOptions = {
            antialiasing: false,
            transparent: true,
            resolution: window.devicePixelRatio,
            autoResize: true
        };
        this._pixi = PIXI.autoDetectRenderer(Director.GAME_WIDTH, Director.GAME_HEIGHT, pixiOptions);
        this._pixi.view.id = "pixijs";
        this._pixi.view.style.position = "absolute";
        this._pixi.view.style.top = "0px";
        this._pixi.view.style.left = "0px";
        this._pixi.view.style.backgroundColor = "#00000000";
        document.body.appendChild(this._pixi.view);
        this.animate();
        this.render();
    }
    Director.getInstance = function () {
        if (Director.instance === null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    Director.prototype.stop = function () {
        cancelAnimationFrame(this._requestId);
    };
    Director.prototype.runWithScene = function (scene) {
        var _this = this;
        if (this._currentScene) {
            this._currentScene.hide(function () {
                _this._currentScene.destroy();
                delete (_this._currentScene);
                _this._currentScene = scene;
                _this._currentScene.show(function () {
                    _this.onWindowResize(null);
                });
            });
        }
        else {
            this._currentScene = scene;
            this._currentScene.show(function () {
                _this.onWindowResize(null);
            });
        }
    };
    Director.prototype.replaceScene = function (scene) {
        this.runWithScene(scene);
    };
    Object.defineProperty(Director.prototype, "currentScene", {
        get: function () {
            return this._currentScene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "pixi", {
        get: function () {
            return this._pixi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "three", {
        get: function () {
            return this._three;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "width", {
        get: function () {
            return window.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "height", {
        get: function () {
            return window.innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "ratio", {
        get: function () {
            return this._ratio;
        },
        enumerable: true,
        configurable: true
    });
    Director.prototype.onWindowResize = function (event) {
        this._ratio = Math.min(window.innerWidth / Director.GAME_WIDTH, window.innerHeight / Director.GAME_HEIGHT);
        this._currentScene.camera.aspect = window.innerWidth / window.innerHeight;
        this._currentScene.camera.updateProjectionMatrix();
        this._three.setSize(window.innerWidth, window.innerHeight);
        this._pixi.resize(window.innerWidth, window.innerHeight);
    };
    Director.prototype.animate = function () {
        this._requestId = requestAnimationFrame(this.animate.bind(this));
        var delta = this._clock.getDelta();
        if (this._currentScene) {
            this._currentScene.update(delta);
        }
        this.render();
    };
    Director.prototype.render = function () {
        if (this._currentScene) {
            this._currentScene.render(this._three, this._pixi);
        }
    };
    Director.instance = null;
    Director.GAME_WIDTH = 1280;
    Director.GAME_HEIGHT = 720;
    return Director;
}());
