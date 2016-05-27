var Config;
(function (Config) {
    var TextStyles = (function () {
        function TextStyles() {
        }
        TextStyles.STRENGTHS = {
            font: '20px Renegado',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        };
        TextStyles.LOADING = {
            font: '32px Renegado',
            fill: '#000000',
            stroke: '#FFFFFF',
            strokeThickness: 4
        };
        TextStyles.SCORE_NAME = {
            font: '20px Renegado',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4
        };
        return TextStyles;
    }());
    Config.TextStyles = TextStyles;
})(Config || (Config = {}));
