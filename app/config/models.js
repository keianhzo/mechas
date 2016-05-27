var Config;
(function (Config) {
    var Models = (function () {
        function Models() {
        }
        Models.ARENA_PREFIX = "data/models/arena_";
        Models.MECHA_PREFIX = "data/models/mecha_";
        Models.TILE_PREFIX = "data/models/tile_";
        Models.CABIN_PREFIX = "data/models/cabin_";
        return Models;
    }());
    Config.Models = Models;
})(Config || (Config = {}));
