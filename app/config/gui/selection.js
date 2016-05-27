var Config;
(function (Config) {
    var Gui;
    (function (Gui) {
        var Selection = (function () {
            function Selection() {
            }
            Selection.screen = {
                id: 'mechas_selection',
                component: 'Layout',
                padding: 4,
                position: 'center',
                width: 1280,
                height: 720,
                children: [
                    {
                        id: 'label1',
                        text: 'Select Mechas',
                        font: {
                            size: '72px'
                        },
                        component: 'Label',
                        position: { x: "50%", y: "10%" },
                        anchor: { x: 0.5, y: 0.5 },
                        width: 1280,
                        height: 80
                    },
                    {
                        id: 'layout1',
                        component: 'Layout',
                        position: { x: 0, y: 200 },
                        width: 1280,
                        height: 420,
                        layout: [1, 3],
                        children: [
                            {
                                id: 'play',
                                text: 'Play',
                                font: {
                                    size: '32px'
                                },
                                anchor: { x: 0.5, y: 0.5 },
                                component: 'Button',
                                position: 'center',
                                width: 320,
                                height: 120
                            }
                        ]
                    }
                ]
            };
            return Selection;
        }());
        Gui.Selection = Selection;
    })(Gui = Config.Gui || (Config.Gui = {}));
})(Config || (Config = {}));
