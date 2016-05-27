var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(normal, pressed, text, textOpts) {
            var _this = this;
            _super.call(this);
            this.mouseDown = function (event) {
                _this._sprite.texture = _this._pressedTex;
                _this.scale.set(0.95, 0.95);
                _this.emit("down", event);
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            };
            this.mouseUp = function (event) {
                _this._sprite.texture = _this._normalTex;
                _this.scale.set(1, 1);
                _this.emit("up", event);
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            };
            this.mouseOut = function (event) {
                _this._sprite.texture = _this._normalTex;
                _this.scale.set(1, 1);
                _this.emit("out", event);
                event.stopPropagation();
                event.data.originalEvent.preventDefault();
                event.data.originalEvent.stopPropagation();
            };
            this._normalTex = normal;
            this._pressedTex = pressed;
            this._sprite = new PIXI.Sprite(this._normalTex);
            this._sprite.anchor.set(0.5, 0.5);
            this._sprite.interactive = true;
            this._sprite.on('mousedown', this.mouseDown);
            this._sprite.on('touchstart', this.mouseDown);
            this._sprite.on('mouseup', this.mouseUp);
            this._sprite.on('touchend', this.mouseUp);
            this._sprite.on('mouseupoutside', this.mouseOut);
            this._sprite.on('touchendoutside', this.mouseOut);
            this.addChild(this._sprite);
            if (text) {
                this._text = new PIXI.Text(text, textOpts, 2);
                this._text.anchor.set(0.5, 0.5);
                this.addChild(this._text);
            }
        }
        return Button;
    }(PIXI.Container));
    Objects.Button = Button;
})(Objects || (Objects = {}));
