Logging.Logger.level = Logging.LogLevel.DEBUG;
document.addEventListener("deviceready", function () {
    WebFont.load({
        custom: {
            families: ['Renegado']
        },
        active: function () {
            EZGUI.Theme.load(['data/mecha-theme/mecha-theme.json'], function () {
                Logging.Logger.info("Game start");
                var game = new Models.Game(3, 5);
            });
        }
    });
}, false);
