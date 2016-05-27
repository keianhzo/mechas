var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scenes;
(function (Scenes) {
    var MenuScene = (function (_super) {
        __extends(MenuScene, _super);
        function MenuScene(game, assets) {
            var _this = this;
            _super.call(this, game, assets);
            var background = new PIXI.Graphics();
            background.beginFill(0xDADADA);
            background.drawRect(0, 0, window.innerWidth, window.innerHeight);
            this._pixiStage.addChild(background);
            var container = EZGUI.create(Config.Gui.Menu.screen, "mecha");
            container.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            container.position.x = window.innerWidth / 2 - container.width / 2;
            container.position.y = window.innerHeight / 2 - container.height / 2;
            this._pixiStage.addChild(container);
            this.pvp = EZGUI.components.pvp;
            this.pvp.on('click', function () {
                _this._game.findmatch(Models.GameMode.LOCAL_PLAYER);
            });
            this.pvp.width = 0;
            this.pvp.height = 0;
            this.pvc = EZGUI.components.pvc;
            this.pvc.on('click', function () {
                _this._game.findmatch(Models.GameMode.LOCAL_IA);
            });
            this.pvc.width = 0;
            this.pvc.height = 0;
            this.online = EZGUI.components.online;
            this.online.on('click', function () {
                _this._game.findmatch(Models.GameMode.NETWORK_PLAYER);
            });
            this.online.width = 0;
            this.online.height = 0;
            if (!this._game.isMultiplayerEnabled())
                this.online.visible = false;
        }
        MenuScene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        MenuScene.prototype.show = function (callback) {
            _super.prototype.show.call(this, callback);
            createjs.Tween.get(this.pvp, { paused: false, loop: false })
                .to({ width: 320, height: 120 }, 500, createjs.Ease.backOut);
            createjs.Tween.get(this.pvc, { paused: false, loop: false })
                .to({ width: 320, height: 120 }, 500, createjs.Ease.backOut);
            createjs.Tween.get(this.online, { paused: false, loop: false })
                .to({ width: 320, height: 120 }, 500, createjs.Ease.backOut);
        };
        MenuScene.prototype.onMouseUp = function (event) {
            _super.prototype.onMouseUp.call(this, event);
        };
        MenuScene.prototype.onTouchEnd = function (event) {
            _super.prototype.onTouchEnd.call(this, event);
        };
        return MenuScene;
    }(Scenes.Scene));
    Scenes.MenuScene = MenuScene;
})(Scenes || (Scenes = {}));
