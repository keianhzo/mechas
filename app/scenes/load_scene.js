var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scenes;
(function (Scenes) {
    var LoadScene = (function (_super) {
        __extends(LoadScene, _super);
        function LoadScene(game, assets) {
            _super.call(this, game, assets);
            var background = new PIXI.Graphics();
            background.beginFill(0xDADADA);
            background.drawRect(0, 0, window.innerWidth, window.innerHeight);
            this._pixiStage.addChild(background);
            this._bar = new PIXI.Graphics();
            this._bar.beginFill(0x0000FF);
            this._bar.drawRect(0, 0, LoadScene.BAR_WIDTH, LoadScene.BAR_HEIGHT);
            this._bar.width = 0;
            this._bar.position.x = window.innerWidth / 2 - LoadScene.BAR_WIDTH * Director.getInstance().ratio / 2;
            this._bar.position.y = window.innerHeight / 2 - LoadScene.BAR_HEIGHT * Director.getInstance().ratio / 2;
            this._bar.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            this._pixiStage.addChild(this._bar);
            this._loadingText = new PIXI.Text('Loading...', Config.TextStyles.LOADING);
            this._loadingText.position.x = window.innerWidth / 2 - this._loadingText.width / 2;
            this._loadingText.position.y = window.innerHeight / 2 + LoadScene.BAR_HEIGHT * Director.getInstance().ratio * 2;
            this._loadingText.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            this._pixiStage.addChild(this._loadingText);
        }
        LoadScene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        LoadScene.prototype.setProgress = function (progress, total) {
            this._loadingText.text = "Loading assets " + progress + "/" + total;
            this._bar.width = (progress * LoadScene.BAR_WIDTH * Director.getInstance().ratio) / total;
            if (progress === total)
                this._loadingText.text = "Loading scene...";
        };
        LoadScene.BAR_WIDTH = 500;
        LoadScene.BAR_HEIGHT = 50;
        return LoadScene;
    }(Scenes.Scene));
    Scenes.LoadScene = LoadScene;
})(Scenes || (Scenes = {}));
