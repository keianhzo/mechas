var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var TextSprite = (function (_super) {
        __extends(TextSprite, _super);
        function TextSprite(text, spriteMaterial, width, height, parameters) {
            _super.call(this);
            this._text = null;
            this._params = null;
            this.scale.set(1, 1, 1);
            this._text = text;
            this._with = width;
            this._height = height;
            this._params = parameters;
            this.material = spriteMaterial;
            this.name = "TextSprite";
        }
        TextSprite.prototype.destroy = function () {
            this.material.dispose();
            delete (this.material);
        };
        Object.defineProperty(TextSprite.prototype, "text", {
            set: function (text) {
                this._text = text;
                delete this.material;
                var pixiText = new PIXI.Text(this._text, this._params);
                var renderTexture = new PIXI.RenderTexture(Director.getInstance().pixi, this._with * Director.getInstance().ratio, this._height * Director.getInstance().ratio);
                renderTexture.render(pixiText);
                pixiText.destroy();
                delete (pixiText);
                var texture = new THREE.Texture(renderTexture.getCanvas());
                texture.minFilter = THREE.LinearFilter;
                texture.needsUpdate = true;
                var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
                renderTexture.destroy();
                delete (renderTexture);
                this.material = spriteMaterial;
            },
            enumerable: true,
            configurable: true
        });
        TextSprite.create = function (message, width, height, parameters) {
            var pixiText = new PIXI.Text(message, parameters);
            var renderTexture = new PIXI.RenderTexture(Director.getInstance().pixi, width * Director.getInstance().ratio, height * Director.getInstance().ratio);
            renderTexture.render(pixiText);
            pixiText.destroy();
            var texture = new THREE.Texture(renderTexture.getCanvas());
            texture.minFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            renderTexture.destroy();
            return new TextSprite(message, spriteMaterial, width, height, parameters);
        };
        return TextSprite;
    }(THREE.Sprite));
    Objects.TextSprite = TextSprite;
})(Objects || (Objects = {}));
