var Config;
(function (Config) {
    var Gui;
    (function (Gui) {
        var Game = (function () {
            function Game() {
            }
            Game.leftControls = {
                id: 'gameL',
                component: 'Layout',
                padding: 4,
                position: { x: "0%", y: "50%" },
                width: 100,
                height: 300,
                layout: [1, 3],
                children: [
                    {
                        id: 'moveL',
                        text: 'M',
                        font: {
                            size: '28px'
                        },
                        anchor: { x: 0.5, y: 0.5 },
                        component: 'Button',
                        position: 'center',
                        width: 75,
                        height: 75
                    },
                    {
                        id: 'exitL',
                        text: 'E',
                        font: {
                            size: '28px'
                        },
                        anchor: { x: 0.5, y: 0.5 },
                        component: 'Button',
                        position: 'center',
                        width: 75,
                        height: 75
                    },
                    {
                        id: 'otherL',
                        text: 'O',
                        font: {
                            size: '28px'
                        },
                        anchor: { x: 0.5, y: 0.5 },
                        component: 'Button',
                        position: 'center',
                        width: 75,
                        height: 75
                    }
                ]
            };
            Game.rightControls = {
                id: 'gameR',
                component: 'Layout',
                padding: 4,
                position: { x: "0%", y: "50%" },
                width: 100,
                height: 300,
                layout: [1, 3],
                children: [
                    {
                        id: 'moveR',
                        text: 'M',
                        font: {
                            size: '28px'
                        },
                        component: 'Button',
                        position: 'center',
                        anchor: { x: 0.5, y: 0.5 },
                        width: 75,
                        height: 75
                    },
                    {
                        id: 'exitR',
                        text: 'E',
                        font: {
                            size: '28px'
                        },
                        component: 'Button',
                        position: 'center',
                        anchor: { x: 0.5, y: 0.5 },
                        width: 75,
                        height: 75
                    },
                    {
                        id: 'otherR',
                        text: 'O',
                        font: {
                            size: '28px'
                        },
                        component: 'Button',
                        position: 'center',
                        width: 75,
                        height: 75
                    }
                ]
            };
            return Game;
        }());
        Gui.Game = Game;
    })(Gui = Config.Gui || (Config.Gui = {}));
})(Config || (Config = {}));
