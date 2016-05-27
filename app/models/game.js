var Models;
(function (Models) {
    (function (GameMode) {
        GameMode[GameMode["LOCAL_PLAYER"] = 0] = "LOCAL_PLAYER";
        GameMode[GameMode["LOCAL_IA"] = 1] = "LOCAL_IA";
        GameMode[GameMode["NETWORK_PLAYER"] = 2] = "NETWORK_PLAYER";
    })(Models.GameMode || (Models.GameMode = {}));
    var GameMode = Models.GameMode;
    var Game = (function () {
        function Game(boardSize, teamSize) {
            var _this = this;
            this._fsm = null;
            this._socialService = null;
            this._multiplayerService = null;
            this._loggedIn = false;
            this._isMultiplayerEnabled = false;
            this._selectedMechaIndex = null;
            this._selectedTileIndex = null;
            this.onLoginStatusChanged = function (loggedIn, error) {
                if (loggedIn) {
                    Logging.Logger.info("Logged into social service");
                }
                else {
                    Logging.Logger.info("Logged out social service");
                    _this._fsm.disconnect();
                }
            };
            this.onInvitationReceived = function () {
                Logging.Logger.info("Invitation received");
            };
            this.onInvitationLoaded = function (match, error) {
                Logging.Logger.info("Invitation ready: (Error: + " + JSON.stringify(error) + ")");
            };
            this.onMatchDataReceived = function (match, data, playerId) {
                var parsedData = JSON.parse(data);
                _this._fsm[parsedData.msg].call(_this._fsm, { playerIndex: _this.getPlayerIndexFromPlayerId(playerId), data: parsedData.data });
            };
            this.onMatchStateChanged = function (match, playerId, connectionState) {
                Logging.Logger.debug(connectionState);
                if (connectionState === Cocoon.Multiplayer.ConnectionState.CONNECTED) {
                    if (match.getExpectedPlayerCount() === 0) {
                        match.requestPlayersInfo(_this.onRequestPlayersInfo);
                    }
                }
                else if (connectionState === Cocoon.Multiplayer.ConnectionState.DISCONNECTED) {
                    _this._fsm.disconnect({ playerIndex: _this.getPlayerIndexFromPlayerId(playerId), data: {} });
                }
            };
            this.onConnectionWithPlayerFailed = function (match, playerId, errorMsg) {
                Logging.Logger.error(errorMsg);
            };
            this.onMatchFailed = function (match, errorMsg) {
                Logging.Logger.error(errorMsg);
            };
            this.onRequestPlayersInfo = function (players, error) {
                if (error) {
                    Logging.Logger.error(error);
                    return;
                }
                var localPlayerId = _this._mp[0].getMatch().getLocalPlayerID();
                for (var i = 0; i < players.length; i++) {
                    if (players[i].userID === localPlayerId) {
                        _this._players[0] = new Models.Player(players[i].userID, players[i].userName);
                    }
                    else {
                        _this._players[1] = new Models.Player(players[i].userID, players[i].userName);
                    }
                }
                _this._mp[0].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "matchfound", data: {} }));
            };
            this.fsmErrorHandler = function (eventName, from, to, args, errorCode, errorMessage) {
                Logging.Logger.debug('event ' + eventName + ' was naughty :- ' + errorMessage);
                _this._fsm.disconnect();
            };
            this.onEnterWaiting = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                var menu = new Scenes.MenuScene(_this, null);
                Director.getInstance().runWithScene(menu);
                for (var i = 0; i < _this._mp.length; i++) {
                    delete (_this._mp[i]);
                }
            };
            this.onEnterFindingMatch = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._mode === GameMode.NETWORK_PLAYER) {
                    if (_this._socialService.isLoggedIn()) {
                        _this.startMultiplayerMatch();
                    }
                    else {
                        _this._socialService.login(function (loggedIn, error) {
                            if (!loggedIn || error) {
                                Logging.Logger.error(error);
                                _this._fsm.disconnect();
                            }
                            else {
                                _this.startMultiplayerMatch();
                            }
                        });
                    }
                }
                else {
                    _this.startMultiplayerMatch();
                }
            };
            this.onEnterSettingUp = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                _this._context.reset();
                var selection = new Scenes.SelectionScene(_this, null);
                Director.getInstance().runWithScene(selection);
                if (_this._players[0].playerId !== _this.getLowestPlayerId())
                    Director.getInstance().currentScene.hidePlayButton();
            };
            this.onEnterPlaying = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                _this._context.turn = _this.getPlayerIndexFromPlayerId(_this.getLowestPlayerId());
                _this._selectedMechaIndex = null;
                _this._selectedTileIndex = null;
                var loadScene = new Scenes.LoadScene(_this, null);
                Director.getInstance().runWithScene(loadScene);
                var assets = new Loader.Assets();
                assets.push(new Loader.PixiAsset('game_ui', Config.Textures.GAME_UI, Loader.PixiAssetType.JSON));
                assets.push(new Loader.TextureAsset('arenaTexture_' + _this._stage.arenaId, Config.Textures.ARENA_PREFIX + _this._stage.arenaId + '.png'));
                assets.push(new Loader.ModelAsset('arenaModel_' + _this._stage.arenaId, Config.Models.ARENA_PREFIX + _this._stage.arenaId + '.json'));
                assets.push(new Loader.ModelAsset('tileModel_' + _this._stage.tileId, Config.Models.TILE_PREFIX + _this._stage.tileId + '.json'));
                assets.push(new Loader.ModelAsset('cabinModel_' + _this._stage.cabinId, Config.Models.CABIN_PREFIX + _this._stage.cabinId + '.json'));
                for (var i = 0; i < _this._context.mechas.length; i++) {
                    var mechas = _this._context.mechas[i];
                    for (var j = 0; j < mechas.length; j++) {
                        assets.push(new Loader.ModelAsset('mechaModel_' + mechas[j].modelId, Config.Models.MECHA_PREFIX + mechas[j].modelId + '.json'));
                        assets.push(new Loader.TextureAsset('mechaTexture_' + mechas[j].modelId, Config.Textures.MECHA_PREFIX + mechas[j].modelId + '.png'));
                    }
                }
                Loader.AssetsLoader.load(assets, function (loaded, total) {
                    loadScene.setProgress(loaded, total);
                    if (loaded === total) {
                        var game = new Scenes.GameScene(_this, assets);
                        Director.getInstance().runWithScene(game);
                        Director.getInstance().currentScene.setupStage(_this._stage);
                        for (var i = 0; i < _this.getPlayersSize(); i++) {
                            for (var j = 0; j < _this.getTeamSize(); j++) {
                                Director.getInstance().currentScene.setupMecha(i, j, _this._context.mechas[i][j]);
                            }
                        }
                        for (var i = 0; i < _this.getPlayersSize(); i++) {
                            Director.getInstance().currentScene.setupPlayerName(i, _this._players[i].name);
                        }
                        Director.getInstance().currentScene.onStart();
                    }
                });
            };
            this.onEnterEnded = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
            };
            this.onAfterNameSetup = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                _this._players[msg.playerIndex].name = msg.data.name;
                Director.getInstance().currentScene.playerNameSetup(msg.playerIndex, msg.data.name);
            };
            this.onAfterMechaSetup = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                var mechaData = msg.data.mecha;
                var mecha = new Models.Mecha(msg.playerIndex, mechaData);
                _this._context.mechas[msg.playerIndex][mechaData.position] = mecha;
                Director.getInstance().currentScene.playerMechaSetup(msg.playerIndex, msg.data.mecha);
            };
            this.onAfterStageSetup = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                var stageData = msg.data.stage;
                var stage = new Models.Stage(stageData);
                _this._stage = stage;
                Director.getInstance().currentScene.playerStageSetup(msg.playerIndex, msg.data.stage);
            };
            this.onAfterSetupCompleted = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
            };
            this.onAfterPlay = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                _this._players[msg.playerIndex].setup = true;
                var setupCompleted = true;
                var playerIds = [];
                for (var i = 0; i < playerIds.length; i++) {
                    setupCompleted = setupCompleted && _this._players[_this.getPlayerIndexFromPlayerId(playerIds[i])].setup;
                }
                if (setupCompleted && _this.isTurnSet()) {
                    if (Director.getInstance().currentScene instanceof Scenes.SelectionScene) {
                        Director.getInstance().currentScene.playerSetupCompleted(msg.playerIndex);
                    }
                }
            };
            this.onAfterSelectMecha = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": invalid turn");
                    return;
                }
                ;
                if (!_this._context.mechas[msg.playerIndex][msg.data.position].active) {
                    Director.getInstance().currentScene.mechaSelected(msg.playerIndex, msg.data.position);
                }
                else {
                    Director.getInstance().currentScene.log(msg.playerIndex, "that mecha has already been activated, you humans!");
                    Logging.Logger.error(event + ": the mecha has already been activated");
                    return;
                }
                _this._selectedMechaIndex = msg.data.position;
            };
            this.onAfterSelectCabin = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": invalid turn");
                    return;
                }
                ;
            };
            this.onAfterSelectTile = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": arrived out of turn");
                    return;
                }
                ;
                if (_this._selectedMechaIndex === null) {
                    Director.getInstance().currentScene.log(msg.playerIndex, "select a mecha first human!");
                    Logging.Logger.error(event + ": select mecha first");
                    return;
                }
                if (!_this._context.free(msg.data.x, msg.data.y)) {
                    Director.getInstance().currentScene.log(msg.playerIndex, "stupid human!, that position is already occupied!");
                    Logging.Logger.error(event + ": the tile position is already occupied");
                    return;
                }
                _this._selectedTileIndex = new THREE.Vector2(msg.data.x, msg.data.y);
                Director.getInstance().currentScene.tileSelected(msg.data.x, msg.data.y);
            };
            this.onAfterMoveFinished = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": arrived out of turn");
                    return;
                }
                ;
                var move = new Models.Move(msg.playerIndex, _this._selectedMechaIndex, _this._selectedTileIndex.x, _this._selectedTileIndex.y);
                _this._context.set(move);
                for (var i = 0; i < _this._context.board.length; i++) {
                    for (var j = 0; j < _this._context.board[i].length; j++) {
                        var mecha = _this._context.board[i][j];
                        if (mecha !== null) {
                            Director.getInstance().currentScene.updateMecha(mecha.playerIndex, mecha.position, mecha.ownerIndex);
                        }
                    }
                }
                Director.getInstance().currentScene.moveFinished(msg.playerIndex, _this._selectedMechaIndex, _this._selectedTileIndex);
                if (_this._context.turn === msg.playerIndex) {
                    if (_this._context.end()) {
                        Logging.Logger.debug("end: true");
                        if (_this._context.tie()) {
                            _this.tie(msg.playerIndex);
                        }
                        else if (_this._context.win(msg.playerIndex)) {
                            _this.win(msg.playerIndex, msg.playerIndex);
                        }
                        else {
                            var oponentPlayerIndex = _this.getPlayerIndexFromPlayerId(_this.getOponentPlayerId(_this.getPlayerIdFromPlayerIndex(msg.playerIndex)));
                            _this.win(msg.playerIndex, oponentPlayerIndex);
                        }
                    }
                    else {
                        _this._context.turn = _this.switchTurn();
                        _this._selectedMechaIndex = null;
                        _this._selectedTileIndex = null;
                        if (_this._mode === Models.GameMode.LOCAL_IA) {
                            if (_this._context.turn === 1) {
                                var nextMove;
                                var nextMove = _this._ia.eval(_this._context, IA.Sign.RED);
                                setTimeout(function () {
                                    _this.selectMecha(_this._context.turn, nextMove.position);
                                }, 250);
                                setTimeout(function () {
                                    _this.selectTile(nextMove.x, nextMove.y);
                                }, 500);
                                setTimeout(function () {
                                    _this.moveFinished(_this._context.turn);
                                }, 750);
                            }
                        }
                    }
                }
                _this._context.debug();
            };
            this.onAfterTie = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": arrived out of turn");
                    return;
                }
                ;
                if (_this._context.tie()) {
                    Logging.Logger.debug(event + ": there was a tie");
                    Director.getInstance().currentScene.tie();
                }
            };
            this.onAfterWin = function (event, from, to, msg) {
                Logging.Logger.debug(from + " -> " + event + " -> " + to);
                if (_this._context.turn !== msg.playerIndex) {
                    Logging.Logger.error(event + ": arrived out of turn");
                    return;
                }
                ;
                if (_this._context.win(msg.data.winnerIndex)) {
                    Logging.Logger.debug(event + ": player " + msg.data.winnerIndex + " have won");
                    Director.getInstance().currentScene.win(msg.playerIndex, msg.data.winnerIndex);
                }
            };
            this.startMultiplayerMatch = function () {
                var matchRequest = new Cocoon.Multiplayer.MatchRequest(Game.PLAYERS_SIZE, Game.PLAYERS_SIZE);
                if (_this._mode === Models.GameMode.LOCAL_PLAYER || _this._mode === Models.GameMode.LOCAL_IA) {
                    _this._mp[0] = new Cocoon.Multiplayer.LoopbackService();
                }
                else if (_this._mode === Models.GameMode.NETWORK_PLAYER) {
                    _this._mp[0] = _this._multiplayerService;
                }
                if (_this._mode === Models.GameMode.LOCAL_IA)
                    _this._ia = new IA.Negamax(10);
                _this._mp[0].findMatch(matchRequest, function (match, error) {
                    if (error) {
                        Logging.Logger.error(error);
                        _this._fsm.disconnect();
                        return;
                    }
                    if (match === null) {
                        Logging.Logger.info("User hit back button");
                        _this._fsm.disconnect();
                        return;
                    }
                    match.on("match", {
                        dataReceived: _this.onMatchDataReceived,
                        stateChanged: _this.onMatchStateChanged,
                        connectionWithPlayerFailed: _this.onConnectionWithPlayerFailed,
                        failed: _this.onMatchFailed
                    });
                    match.start();
                    if (match.getExpectedPlayerCount() == 0) {
                        match.requestPlayersInfo(_this.onRequestPlayersInfo);
                    }
                });
                if (_this._mode === Models.GameMode.LOCAL_PLAYER || _this._mode === Models.GameMode.LOCAL_IA) {
                    _this._mp[1] = new Cocoon.Multiplayer.LoopbackService();
                    _this._mp[1].findMatch(matchRequest, function (match, error) {
                        match.start();
                    });
                }
            };
            this._stage = null;
            this._players = [];
            this._context = new Models.GameContext({
                playersSize: Game.PLAYERS_SIZE,
                boardSize: Game.BOARD_SIZE,
                teamSize: Game.TEAM_SIZE,
                type: Models.GameType.ALL_OPEN
            });
            this._mp = [];
            if (Cocoon.getPlatform() === 'ios') {
                this._socialService = Cocoon.Social.GameCenter.getSocialInterface();
                this._multiplayerService = Cocoon.Social.GameCenter.getMultiplayerInterface();
                this._isMultiplayerEnabled = true;
            }
            else if (Cocoon.getPlatform() === 'android') {
                Cocoon.Social.GooglePlayGames.init({});
                this._socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();
                this._multiplayerService = Cocoon.Social.GooglePlayGames.getMultiplayerInterface();
                this._isMultiplayerEnabled = true;
            }
            else {
                this._isMultiplayerEnabled = false;
            }
            if (this._socialService !== null) {
                this._socialService.on("loginStatusChanged", this.onLoginStatusChanged);
            }
            if (this._multiplayerService !== null) {
                this._multiplayerService.on("invitation", {
                    received: this.onInvitationReceived,
                    loaded: this.onInvitationLoaded
                });
            }
            this._fsm = StateMachine.create({
                initial: 'WAITING',
                events: [
                    { name: 'findmatch', from: 'WAITING', to: 'FINDINGMATCH' },
                    { name: 'nomatchfound', from: 'FINDINGMATCH', to: 'WAITING' },
                    { name: 'matchfound', from: 'FINDINGMATCH', to: 'SETTINGUP' },
                    { name: 'namesetup', from: 'SETTINGUP', to: 'SETTINGUP' },
                    { name: 'mechasetup', from: 'SETTINGUP', to: 'SETTINGUP' },
                    { name: 'stagesetup', from: 'SETTINGUP', to: 'SETTINGUP' },
                    { name: 'setupcompleted', from: 'SETTINGUP', to: 'SETTINGUP' },
                    { name: 'play', from: 'SETTINGUP', to: 'PLAYING' },
                    { name: 'selectmecha', from: 'PLAYING', to: 'PLAYING' },
                    { name: 'selectcabin', from: 'PLAYING', to: 'PLAYING' },
                    { name: 'selecttile', from: 'PLAYING', to: 'PLAYING' },
                    { name: 'movefinished', from: 'PLAYING', to: 'PLAYING' },
                    { name: 'tie', from: 'PLAYING', to: 'ENDED' },
                    { name: 'win', from: 'PLAYING', to: 'ENDED' },
                    { name: 'disconnect', from: ['FINDINGMATCH', 'SETTINGUP', 'PLAYING', 'ENDED'], to: 'WAITING' }
                ],
                callbacks: {
                    onenterWAITING: this.onEnterWaiting,
                    onenterFINDINGMATCH: this.onEnterFindingMatch,
                    onenterSETTINGUP: this.onEnterSettingUp,
                    onenterPLAYING: this.onEnterPlaying,
                    onenterENDED: this.onEnterEnded,
                    onafternamesetup: this.onAfterNameSetup,
                    onaftermechasetup: this.onAfterMechaSetup,
                    onafterstagesetup: this.onAfterStageSetup,
                    onaftersetupcompleted: this.onAfterSetupCompleted,
                    onafterplay: this.onAfterPlay,
                    onafterselectmecha: this.onAfterSelectMecha,
                    onafterselectcabin: this.onAfterSelectCabin,
                    onafterselecttile: this.onAfterSelectTile,
                    onaftermovefinished: this.onAfterMoveFinished,
                    onaftertie: this.onAfterTie,
                    onafterwin: this.onAfterWin
                }
            });
        }
        Object.defineProperty(Game.prototype, "mode", {
            get: function () {
                return this._mode;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.getPlayersSize = function () {
            return Game.PLAYERS_SIZE;
        };
        Game.prototype.getBoardSize = function () {
            return Game.BOARD_SIZE;
        };
        Game.prototype.getTeamSize = function () {
            return Game.TEAM_SIZE;
        };
        Game.prototype.isMultiplayerEnabled = function () {
            return this._isMultiplayerEnabled;
        };
        Game.prototype.getPlayerIdFromPlayerIndex = function (playerIndex) {
            return this._players[playerIndex].playerId;
        };
        Game.prototype.getPlayerIndexFromPlayerId = function (playerId) {
            for (var i = 0; i < this._players.length; i++) {
                if (this._players[i].playerId === playerId)
                    return i;
            }
            return null;
        };
        Game.prototype.getOponentPlayerId = function (playerId) {
            var oponent = null;
            for (var i = 0; i < this._players.length; i++) {
                if (playerId !== this._players[i].playerId)
                    oponent = this._players[i].playerId;
            }
            return oponent;
        };
        Game.prototype.isTurnSet = function () {
            if (this._context.turn !== null)
                return true;
            return false;
        };
        Game.prototype.switchTurn = function () {
            var index = this._context.turn;
            if (index < Game.PLAYERS_SIZE - 1)
                index++;
            else
                index = 0;
            return index;
        };
        Game.prototype.getLowestPlayerId = function () {
            var playerId = this._players[0].playerId;
            for (var i = 0; i < this._players.length; i++) {
                var pId = this._players[i].playerId;
                if (pId < playerId)
                    playerId = pId;
            }
            return playerId;
        };
        Game.prototype.findmatch = function (gameMode) {
            this._mode = gameMode;
            this._fsm.findmatch(gameMode);
        };
        Game.prototype.play = function () {
            this._mp[0].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "play", data: {} }));
        };
        Game.prototype.setupName = function (playerIndex, name) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "namesetup", data: { name: name } }));
        };
        Game.prototype.setupMecha = function (playerIndex, mechaData) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "mechasetup", data: { mecha: mechaData } }));
        };
        Game.prototype.setupStage = function (playerIndex, stageData) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "stagesetup", data: { stage: stageData } }));
        };
        Game.prototype.setupCompleted = function (playerIndex) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "setupcompleted", data: {} }));
        };
        Game.prototype.selectMecha = function (playerIndex, mechaIndex) {
            if (!this._context.end() && playerIndex === this._context.turn && this._context.mechas[playerIndex][mechaIndex] !== null) {
                this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "selectmecha", data: { position: mechaIndex } }));
            }
        };
        Game.prototype.selectCabin = function (playerIndex, mechaIndex) {
            if (!this._context.end() && playerIndex === this._context.turn && this._context.mechas[playerIndex][mechaIndex] !== null) {
                this.selectMecha(playerIndex, mechaIndex);
            }
        };
        Game.prototype.selectTile = function (x, y) {
            if (!this._context.end() && this._selectedMechaIndex !== null) {
                this._mp[this._context.turn].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "selecttile", data: { x: x, y: y } }));
            }
        };
        Game.prototype.moveFinished = function (playerIndex) {
            if (!this._context.end() && this._selectedMechaIndex !== null && this._selectedTileIndex !== null) {
                this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "movefinished", data: { turn: this.switchTurn() } }));
            }
        };
        Game.prototype.win = function (playerIndex, winnerIndex) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "win", data: { winnerIndex: winnerIndex } }));
        };
        Game.prototype.tie = function (playerIndex) {
            this._mp[playerIndex].getMatch().sendDataToAllPlayers(JSON.stringify({ msg: "tie", data: {} }));
        };
        Game.prototype.exit = function (playerIndex) {
            this._mp[playerIndex].getMatch().disconnect();
            this._fsm.disconnect();
        };
        Game.PLAYERS_SIZE = 2;
        Game.BOARD_SIZE = 3;
        Game.TEAM_SIZE = 5;
        return Game;
    }());
    Models.Game = Game;
})(Models || (Models = {}));
