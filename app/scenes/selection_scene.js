var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scenes;
(function (Scenes) {
    var SelectionScene = (function (_super) {
        __extends(SelectionScene, _super);
        function SelectionScene(game, assets) {
            var _this = this;
            _super.call(this, game, assets);
            this._setupCompleted = false;
            ;
            if (this._assets) {
            }
            var background = new PIXI.Graphics();
            background.beginFill(0xDADADA);
            background.drawRect(0, 0, window.innerWidth, window.innerHeight);
            this._pixiStage.addChild(background);
            var container = EZGUI.create(Config.Gui.Selection.screen, "mecha");
            container.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            container.position.x = window.innerWidth / 2 - container.width / 2;
            container.position.y = window.innerHeight / 2 - container.height / 2;
            this._pixiStage.addChild(container);
            this._playButton = EZGUI.components.play;
            this._playButton.on('click', function () {
                _this._game.play();
            });
            this.camera.position.y = 20;
            this.camera.lookAt(this._threeScene.position);
            this.sendTestSelection();
        }
        SelectionScene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        SelectionScene.prototype.sendTestSelection = function () {
            this._game.setupName(0, "Player 1");
            this._game.setupMecha(0, { name: "mecha001", modelId: "001", level: 0, position: 0, up: 1, down: 2, left: 3, right: 4 });
            this._game.setupMecha(0, { name: "mecha002", modelId: "001", level: 0, position: 1, up: 1, down: 2, left: 3, right: 4 });
            this._game.setupMecha(0, { name: "mecha003", modelId: "001", level: 0, position: 2, up: 1, down: 2, left: 3, right: 4 });
            this._game.setupMecha(0, { name: "mecha004", modelId: "001", level: 0, position: 3, up: 1, down: 2, left: 3, right: 4 });
            this._game.setupMecha(0, { name: "mecha005", modelId: "001", level: 0, position: 4, up: 1, down: 2, left: 3, right: 4 });
            this._game.setupStage(0, { arenaId: "001", tileId: "001", cabinId: "001" });
            if (this._game.mode === Models.GameMode.LOCAL_PLAYER || this._game.mode === Models.GameMode.LOCAL_IA) {
                this._game.setupName(1, "Player 2");
                this._game.setupMecha(1, { name: "mecha006", modelId: "001", level: 0, position: 0, up: 10, down: 2, left: 3, right: 4 });
                this._game.setupMecha(1, { name: "mecha007", modelId: "001", level: 0, position: 1, up: 10, down: 2, left: 3, right: 4 });
                this._game.setupMecha(1, { name: "mecha008", modelId: "001", level: 0, position: 2, up: 10, down: 2, left: 3, right: 4 });
                this._game.setupMecha(1, { name: "mecha009", modelId: "001", level: 0, position: 3, up: 10, down: 2, left: 3, right: 4 });
                this._game.setupMecha(1, { name: "mecha0010", modelId: "001", level: 0, position: 4, up: 10, down: 2, left: 3, right: 4 });
            }
            this.onSetupCompletedButtonPressed();
        };
        SelectionScene.prototype.showPlayButton = function () {
        };
        SelectionScene.prototype.onSetupCompletedButtonPressed = function () {
            this._game.setupCompleted(0);
            if (this._game.mode === Models.GameMode.LOCAL_PLAYER || this._game.mode === Models.GameMode.LOCAL_IA)
                this._game.setupCompleted(1);
        };
        SelectionScene.prototype.hidePlayButton = function () {
            this._playButton.visible = false;
        };
        SelectionScene.prototype.playerNameSetup = function (playerIndex, name) {
            Logging.Logger.debug("player: " + playerIndex + " set name: " + name);
        };
        SelectionScene.prototype.playerMechaSetup = function (playerIndex, mecha) {
            Logging.Logger.debug("player: " + playerIndex + " setup mecha: " + JSON.stringify(mecha));
        };
        SelectionScene.prototype.playerStageSetup = function (playerIndex, stage) {
            Logging.Logger.debug("player: " + playerIndex + " set stage: " + JSON.stringify(stage));
        };
        SelectionScene.prototype.playerSetupCompleted = function (playerIndex) {
            Logging.Logger.debug("player: " + playerIndex + " completed setup");
            this.showPlayButton();
        };
        return SelectionScene;
    }(Scenes.Scene));
    Scenes.SelectionScene = SelectionScene;
})(Scenes || (Scenes = {}));
