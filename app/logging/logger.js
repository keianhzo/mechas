var Logging;
(function (Logging) {
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["INFO"] = 1] = "INFO";
        LogLevel[LogLevel["WARN"] = 2] = "WARN";
        LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    })(Logging.LogLevel || (Logging.LogLevel = {}));
    var LogLevel = Logging.LogLevel;
    var Logger = (function () {
        function Logger() {
        }
        Logger.error = function (msg) {
            if (Logger.level <= LogLevel.ERROR)
                console.error("[ERROR] " + msg);
        };
        Logger.warn = function (msg) {
            if (Logger.level <= LogLevel.WARN)
                console.warn("[WARN] " + msg);
        };
        Logger.info = function (msg) {
            if (Logger.level <= LogLevel.INFO)
                console.info("[INFO] " + msg);
        };
        Logger.debug = function (msg) {
            if (Logger.level <= LogLevel.DEBUG)
                console.debug("[DEBUG] " + msg);
        };
        Logger.level = LogLevel.INFO;
        return Logger;
    }());
    Logging.Logger = Logger;
})(Logging || (Logging = {}));
