var Config;
(function (Config) {
    var Textures = (function () {
        function Textures() {
        }
        Textures.GAME_UI = "data/textures/game_ui.json";
        Textures.SCORE_TOP = "ui_score_top.png";
        Textures.SCORE_BOTTOM = "ui_score_bottom.png";
        Textures.ARENA_PREFIX = "data/textures/arena_";
        Textures.MECHA_PREFIX = "data/textures/mecha_";
        Textures.TILE_PREFIX = "data/textures/tile_";
        Textures.CABIN_PREFIX = "data/textures/cabin_";
        return Textures;
    }());
    Config.Textures = Textures;
})(Config || (Config = {}));
