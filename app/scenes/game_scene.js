var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scenes;
(function (Scenes) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(game, assets) {
            var _this = this;
            _super.call(this, game, assets);
            this.rot = new THREE.Euler(-Math.PI / 4, -Math.PI / 2, 0, 'YXZ');
            this.isCameraRotating = false;
            this.distance = 28;
            this.lastX = 0;
            this.lastY = 0;
            this.eventStart = 0;
            this._arenaObject = null;
            this._tileObjects = null;
            this._cabinObjects = null;
            this._mechaObjects = null;
            this._selectedPlayerIndex = -1;
            this._selectedObjectIndex = -1;
            this._selectedObject = null;
            this._playerNames = [];
            this._camera.position.set(0, 0, 0);
            this._camera.setRotationFromEuler(this.rot);
            this._camera.translateOnAxis(new THREE.Vector3(0, 0, 1), this.distance);
            this._camera.lookAt(new THREE.Vector3(0, 0, 0));
            var cancelEventFunction = function (event) {
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            };
            var scoreTex = PIXI.Texture.fromImage(Config.Textures.SCORE_TOP);
            var scoreLeft = new PIXI.Sprite(scoreTex);
            scoreLeft.interactive = true;
            scoreLeft.position.x = 0;
            scoreLeft.position.y = 0;
            scoreLeft.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            scoreLeft.on('mousedown', cancelEventFunction);
            scoreLeft.on('touchstart', cancelEventFunction);
            scoreLeft.tint = 0xCCCCFF;
            this._pixiStage.addChild(scoreLeft);
            var decoBottomTex = PIXI.Texture.fromImage(Config.Textures.SCORE_BOTTOM);
            var decoBottomLeft = new PIXI.Sprite(decoBottomTex);
            decoBottomLeft.interactive = true;
            decoBottomLeft.rotation = -Math.PI;
            decoBottomLeft.position.x = window.innerWidth;
            decoBottomLeft.position.y = window.innerHeight;
            decoBottomLeft.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            decoBottomLeft.on('mousedown', cancelEventFunction);
            decoBottomLeft.on('touchstart', cancelEventFunction);
            decoBottomLeft.tint = 0xCCCCFF;
            this._pixiStage.addChild(decoBottomLeft);
            this._playerNames[0] = new PIXI.Text('Player 1', Config.TextStyles.SCORE_NAME);
            this._playerNames[0].anchor.set(0.5, 0.5);
            this._playerNames[0].style.align = 'left';
            this._playerNames[0].position.x = 120 * Director.getInstance().ratio;
            this._playerNames[0].position.y = (15 + this._playerNames[0].height / 2) * Director.getInstance().ratio;
            this._playerNames[0].scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            this._pixiStage.addChild(this._playerNames[0]);
            var scoreRight = new PIXI.Sprite(scoreTex);
            scoreRight.interactive = true;
            scoreRight.position.x = window.innerWidth;
            scoreRight.position.y = 0;
            scoreRight.scale.set(-Director.getInstance().ratio, Director.getInstance().ratio);
            scoreRight.on('mousedown', cancelEventFunction);
            scoreRight.on('touchstart', cancelEventFunction);
            scoreRight.tint = 0xCCCCFF;
            this._pixiStage.addChild(scoreRight);
            var decoBottomRight = new PIXI.Sprite(decoBottomTex);
            decoBottomRight.interactive = true;
            decoBottomRight.rotation = -Math.PI;
            decoBottomRight.position.x = 0;
            decoBottomRight.position.y = window.innerHeight;
            decoBottomRight.scale.set(-Director.getInstance().ratio, Director.getInstance().ratio);
            decoBottomRight.on('mousedown', cancelEventFunction);
            decoBottomRight.on('touchstart', cancelEventFunction);
            decoBottomRight.tint = 0xCCCCFF;
            this._pixiStage.addChild(decoBottomRight);
            this._playerNames[1] = new PIXI.Text('Player 2', Config.TextStyles.SCORE_NAME);
            this._playerNames[1].anchor.set(0.5, 0.5);
            this._playerNames[1].style.align = 'right';
            this._playerNames[1].position.x = Director.getInstance().width - (120 * Director.getInstance().ratio);
            this._playerNames[1].position.y = (15 + this._playerNames[1].height / 2) * Director.getInstance().ratio;
            this._playerNames[1].scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            this._pixiStage.addChild(this._playerNames[1]);
            var gameL = EZGUI.create(Config.Gui.Game.leftControls, "mecha");
            gameL.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            gameL.position.x = 0;
            gameL.position.y = window.innerHeight / 2 - gameL.height / 2;
            this._pixiStage.addChild(gameL);
            var moveL = EZGUI.components.moveL;
            moveL.on('click', function (event) {
                _this._game.moveFinished(0);
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            });
            moveL.on('mousedown', cancelEventFunction);
            moveL.on('mouseup', cancelEventFunction);
            moveL.on('mouseupoutside', cancelEventFunction);
            if (this._game.mode === Models.GameMode.LOCAL_PLAYER) {
                var gameR = EZGUI.create(Config.Gui.Game.rightControls, "mecha");
                gameR.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
                gameR.position.x = window.innerWidth - gameR.width;
                gameR.position.y = window.innerHeight / 2 - gameR.height / 2;
                this._pixiStage.addChild(gameR);
                var moveR = EZGUI.components.moveR;
                moveR.on('click', function (event) {
                    _this._game.moveFinished(1);
                    event.stopPropagation();
                    event.data.originalEvent.preventDefault();
                    event.data.originalEvent.stopPropagation();
                });
                moveR.on('mousedown', cancelEventFunction);
                moveR.on('mouseup', cancelEventFunction);
                moveR.on('mouseupoutside', cancelEventFunction);
            }
            var back = new EZGUI.Component.Button({
                id: 'back',
                text: 'Back',
                font: {
                    size: '26px'
                },
                anchor: { x: 0.5, y: 0.5 },
                component: 'Button',
                position: 'center',
                width: 160,
                height: 60
            }, "mecha");
            back.scale.set(Director.getInstance().ratio, Director.getInstance().ratio);
            back.position.x = Director.getInstance().width / 2;
            back.position.y = Director.getInstance().height - back.height / 2;
            this._pixiStage.addChild(back);
            back.on('click', function (event) {
                _this._game.exit(0);
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            });
            back.on('mousedown', cancelEventFunction);
            back.on('mouseup', cancelEventFunction);
            back.on('mouseupoutside', cancelEventFunction);
            this._mechaObjects = [];
            for (var i = 0; i < this._game.getPlayersSize(); i++) {
                this._mechaObjects[i] = [];
                for (var j = 0; j < this._game.getTeamSize(); j++) {
                    this._mechaObjects[i][j] = null;
                }
            }
        }
        GameScene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            delete (this._arenaObject);
            for (var i = 0; i < this._mechaObjects.length; i++) {
                for (var j = 0; j < this._mechaObjects.length; j++) {
                    delete (this._mechaObjects[i][j]);
                }
                delete (this._mechaObjects[i]);
            }
            delete (this._mechaObjects);
            for (var i = 0; i < this._cabinObjects.length; i++) {
                for (var j = 0; j < this._cabinObjects.length; j++) {
                    delete (this._cabinObjects[i][j]);
                }
                delete (this._cabinObjects[i]);
            }
            delete (this._cabinObjects);
            for (var i = 0; i < this._tileObjects.length; i++) {
                for (var j = 0; j < this._tileObjects.length; j++) {
                    delete (this._tileObjects[i][j]);
                }
                delete (this._tileObjects[i]);
            }
            delete (this._tileObjects);
            delete (this._raycaster);
            delete (this._selectedObject);
        };
        GameScene.prototype.render = function (three, pixi) {
            _super.prototype.render.call(this, three, pixi);
            this._camera.position.set(0, 0, 0);
            this._camera.setRotationFromEuler(this.rot);
            this._camera.translateOnAxis(new THREE.Vector3(0, 0, 1), this.distance);
            this._camera.lookAt(new THREE.Vector3(0, 0, 0));
        };
        GameScene.prototype.onMouseMove = function (event) {
            _super.prototype.onMouseMove.call(this, event);
            this.onEventMove(this.lastX - event.clientX, this.lastY - event.clientY);
            this.lastX = event.clientX;
            this.lastY = event.clientY;
        };
        GameScene.prototype.onTouchMove = function (event) {
            _super.prototype.onTouchMove.call(this, event);
            this.onEventMove(this.lastX - event.changedTouches[0].clientX, this.lastY - event.changedTouches[0].clientY);
            this.lastX = event.changedTouches[0].clientX;
            this.lastY = event.changedTouches[0].clientY;
        };
        GameScene.prototype.onEventMove = function (dx, dy) {
            if (this._isEventDown) {
                if (Date.now() - this.eventStart > GameScene.INPUT_THRESOLD) {
                    this.isCameraRotating = true;
                    dx = dx * (Math.PI / 180);
                    dy = dy * (Math.PI / 180);
                    this.rot.y += dx;
                    this.rot.z = 0;
                    if (this.rot.x + dy < GameScene.MIN_X_ANGLE && this.rot.x + dy > GameScene.MAX_X_ANGLE) {
                        this.rot.x += dy;
                    }
                }
            }
        };
        GameScene.prototype.onMouseDown = function (event) {
            _super.prototype.onMouseDown.call(this, event);
            this.eventStart = event.timeStamp;
            this.lastX = event.clientX;
            this.lastY = event.clientY;
            this.onEventStart(event.clientX, event.clientY);
        };
        GameScene.prototype.onTouchStart = function (event) {
            _super.prototype.onMouseDown.call(this, event);
            this.eventStart = event.timeStamp;
            this.lastX = event.changedTouches[0].clientX;
            this.lastY = event.changedTouches[0].clientY;
            this.onEventStart(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        };
        GameScene.prototype.onEventStart = function (posX, posY) {
            this.lastX = posX;
            this.lastY = posY;
            this._mouse.x = (posX / window.innerWidth) * 2 - 1;
            this._mouse.y = -(posY / window.innerHeight) * 2 + 1;
            var vector = new THREE.Vector3(this._mouse.x, this._mouse.y, 0.5);
            this._raycaster.setFromCamera(vector, this.camera);
            var intersects = this._raycaster.intersectObjects(this._threeScene.children, true);
            if (!intersects || !intersects[0])
                return;
            if (intersects[0].object.parent instanceof Objects.Cabin) {
                var cabin = intersects[0].object.parent;
                for (var i = 0; i < this._cabinObjects.length; i++) {
                    for (var j = 0; j < this._cabinObjects[i].length; j++) {
                        if (cabin === this._cabinObjects[i][j]) {
                            this._selectedPlayerIndex = i;
                            this._selectedObject = cabin;
                            this._selectedObjectIndex = j;
                        }
                    }
                }
            }
            else if (intersects[0].object.parent instanceof Objects.Tile) {
                var tile = intersects[0].object.parent;
                for (var i = 0; i < this._tileObjects.length; i++) {
                    for (var j = 0; j < this._tileObjects[i].length; j++) {
                        if (tile === this._tileObjects[i][j]) {
                            this._selectedPlayerIndex = -1;
                            this._selectedObject = tile;
                            this._selectedTileIndexX = i;
                            this._selectedTileIndexY = j;
                        }
                    }
                }
            }
            else if (intersects[0].object.parent instanceof Objects.Mecha) {
                var mecha = intersects[0].object.parent;
                for (var i = 0; i < this._mechaObjects.length; i++) {
                    for (var j = 0; j < this._mechaObjects[i].length; j++) {
                        if (mecha === this._mechaObjects[i][j]) {
                            this._selectedPlayerIndex = i;
                            this._selectedObject = mecha;
                            this._selectedObjectIndex = j;
                        }
                    }
                }
            }
        };
        GameScene.prototype.onMouseUp = function (event) {
            _super.prototype.onMouseUp.call(this, event);
            this.onEventEnd(event.clientX, event.clientY);
        };
        GameScene.prototype.onTouchEnd = function (event) {
            _super.prototype.onTouchEnd.call(this, event);
            this.onEventEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        };
        GameScene.prototype.onEventEnd = function (posX, posY) {
            this.eventStart = 0;
            this.lastX = 0;
            this.lastY = 0;
            if (this._selectedObject instanceof Objects.Cabin) {
                this._game.selectCabin(this._selectedPlayerIndex, this._selectedObjectIndex);
            }
            else if (this._selectedObject instanceof Objects.Tile) {
                this._game.selectTile(this._selectedTileIndexX, this._selectedTileIndexY);
            }
            else if (this._selectedObject instanceof Objects.Mecha) {
                this._game.selectMecha(this._selectedPlayerIndex, this._selectedObjectIndex);
            }
        };
        GameScene.prototype.log = function (PlayerIndex, msg) {
        };
        GameScene.prototype.setupStage = function (stage) {
            var sceneTexture = this._assets.get('arenaTexture_' + stage.arenaId);
            var arenaModel = this._assets.get('arenaModel_' + stage.arenaId);
            this._arenaObject = Objects.Arena.create(arenaModel.geometry, arenaModel.materials, sceneTexture.texture);
            this._threeScene.add(this._arenaObject);
            this._tileObjects = [];
            var arenaModel = this._assets.get('tileModel_' + stage.tileId);
            for (var i = 0; i < this._game.getBoardSize(); i++) {
                this._tileObjects[i] = [];
                for (var j = 0; j < this._game.getBoardSize(); j++) {
                    this._tileObjects[i][j] = new Objects.Tile(arenaModel.geometry, sceneTexture.texture);
                    this._tileObjects[i][j].position.set(-GameScene.TILE_INITAL_GAP + i * GameScene.TILE_INITAL_GAP, 0, -GameScene.TILE_INITAL_GAP + j * GameScene.TILE_INITAL_GAP);
                    this._threeScene.add(this._tileObjects[i][j]);
                    this._tileObjects[i][j].setSelected(false);
                }
            }
            this._cabinObjects = [];
            var cabinModel = this._assets.get('cabinModel_' + stage.cabinId);
            for (var i = 0; i < this._game.getPlayersSize(); i++) {
                this._cabinObjects[i] = [];
                for (var j = 0; j < this._game.getTeamSize(); j++) {
                    this._cabinObjects[i][j] = new Objects.Cabin(cabinModel.geometry, sceneTexture.texture);
                    this._cabinObjects[i][j].position.set(-GameScene.MECHA_INITIAL_GAP_X * 2 + j * GameScene.MECHA_INITIAL_GAP_X, GameScene.MECHA_INITIAL_POSITION_Y, -GameScene.MECHA_INITIAL_POSITION_Z + 2 * i * GameScene.MECHA_INITIAL_POSITION_Z);
                    this._cabinObjects[i][j].rotation.set(0, i * Math.PI, 0);
                    if (i === 0) {
                        this._cabinObjects[i][j].tint(0xccccff);
                    }
                    else {
                        this._cabinObjects[i][j].tint(0xffcccc);
                    }
                    this._threeScene.add(this._cabinObjects[i][j]);
                    this._cabinObjects[i][j].setSelected(false);
                }
            }
        };
        GameScene.prototype.setupMecha = function (playerIndex, mechaIndex, mecha) {
            var mechaTexture = this._assets.get('mechaTexture_' + mecha.modelId);
            var mechaModel = this._assets.get('mechaModel_' + mecha.modelId);
            this._mechaObjects[playerIndex][mechaIndex] = new Objects.Mecha(mechaModel.geometry, mechaTexture.texture);
            this._mechaObjects[playerIndex][mechaIndex].position.set(-GameScene.MECHA_INITIAL_GAP_X * 2 + mechaIndex * GameScene.MECHA_INITIAL_GAP_X, 0, -GameScene.MECHA_INITIAL_POSITION_Z + 2 * playerIndex * GameScene.MECHA_INITIAL_POSITION_Z);
            this._mechaObjects[playerIndex][mechaIndex].mecha.rotation.set(0, playerIndex * Math.PI, 0);
            this._mechaObjects[playerIndex][mechaIndex].setStrength(mecha.up, mecha.down, mecha.left, mecha.right);
            if (playerIndex === 0) {
                this._mechaObjects[playerIndex][mechaIndex].tint(0xccccff);
            }
            else {
                this._mechaObjects[playerIndex][mechaIndex].tint(0xffcccc);
            }
            this._threeScene.add(this._mechaObjects[playerIndex][mechaIndex]);
            this._mechaObjects[playerIndex][mechaIndex].setSelected(false);
        };
        GameScene.prototype.setupPlayerName = function (playerIndex, name) {
            this._playerNames[playerIndex].text = name;
        };
        GameScene.prototype.onStart = function () {
            for (var i = 0; i < this._cabinObjects.length; i++) {
                for (var j = 0; j < this._cabinObjects[i].length; j++) {
                    this._cabinObjects[i][j].open();
                }
            }
        };
        GameScene.prototype.mechaSelected = function (playerIndex, mechaIndex) {
            if (playerIndex >= 0) {
                for (var i = 0; i < this._mechaObjects.length; i++) {
                    for (var j = 0; j < this._mechaObjects[i].length; j++) {
                        this._mechaObjects[i][j].setSelected(false);
                    }
                }
                this._mechaObjects[playerIndex][mechaIndex].setSelected(true);
            }
        };
        GameScene.prototype.cabinSelected = function (playerIndex, mechaIndex) {
            for (var i = 0; i < this._cabinObjects.length; i++) {
                for (var j = 0; j < this._cabinObjects[i].length; j++) {
                    this._cabinObjects[i][j].setSelected(false);
                }
            }
            this._cabinObjects[playerIndex][mechaIndex].setSelected(true);
        };
        GameScene.prototype.tileSelected = function (x, y) {
            for (var i = 0; i < this._tileObjects.length; i++) {
                for (var j = 0; j < this._tileObjects[i].length; j++) {
                    this._tileObjects[i][j].setSelected(false);
                }
            }
            this._tileObjects[x][y].setSelected(true);
        };
        GameScene.prototype.moveFinished = function (playerIndex, mechaIndex, tileIndex) {
            for (var i = 0; i < this._mechaObjects.length; i++) {
                for (var j = 0; j < this._mechaObjects[i].length; j++) {
                    this._mechaObjects[i][j].setSelected(false);
                }
            }
            for (var i = 0; i < this._tileObjects.length; i++) {
                for (var j = 0; j < this._tileObjects[i].length; j++) {
                    this._tileObjects[i][j].setSelected(false);
                }
            }
            var position = this._tileObjects[tileIndex.x][tileIndex.y].position;
            this._mechaObjects[playerIndex][mechaIndex].move(position);
            this._mechaObjects[playerIndex][mechaIndex].idle();
            this._cabinObjects[playerIndex][mechaIndex].close();
        };
        GameScene.prototype.updateMecha = function (playerIndex, mechaIndex, ownerIndex) {
            if (ownerIndex === 0) {
                this._mechaObjects[playerIndex][mechaIndex].tint(0xccccff);
            }
            else {
                this._mechaObjects[playerIndex][mechaIndex].tint(0xffcccc);
            }
        };
        GameScene.prototype.tie = function () {
        };
        GameScene.prototype.win = function (playerIndex, name) {
        };
        GameScene.TILE_INITAL_GAP = 5.5;
        GameScene.MECHA_INITIAL_POSITION_Z = 30;
        GameScene.MECHA_INITIAL_POSITION_Y = -4;
        GameScene.MECHA_INITIAL_GAP_X = 10;
        GameScene.INPUT_THRESOLD = 100;
        GameScene.MAX_X_ANGLE = -Math.PI / 2;
        GameScene.MIN_X_ANGLE = -Math.PI / 9;
        return GameScene;
    }(Scenes.Scene));
    Scenes.GameScene = GameScene;
})(Scenes || (Scenes = {}));
