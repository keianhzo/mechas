var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Cabin = (function (_super) {
        __extends(Cabin, _super);
        function Cabin(geometry, texture) {
            _super.call(this);
            this._isOpened = false;
            this._isSelected = false;
            this._isActive = false;
            this.name = "cabin";
            this._isSelected = false;
            this._isActive = false;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = 16;
            this._cabin = new THREE.SkinnedMesh(geometry, new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                skinning: true,
                color: 0xffffff,
                opacity: 1.0,
                transparent: true
            }));
            if (this._cabin instanceof THREE.SkinnedMesh) {
                for (var i = 0; i < geometry.animations.length; i++) {
                    var action = new THREE.AnimationAction(geometry.animations[i]);
                    action.loop = THREE.LoopOnce;
                    if (action.clip.name === "door_close") {
                        this._closeAction = action;
                    }
                    else if (action.clip.name === "door_open") {
                        this._openAction = action;
                    }
                }
            }
            this._mixer = new THREE.AnimationMixer(this._cabin);
            this.add(this._cabin);
        }
        Cabin.prototype.destroy = function () {
            delete (this._mixer);
            delete (this._openAction);
            delete (this._closeAction);
            delete (this._cabin);
        };
        Cabin.prototype.update = function (dt) {
            this._mixer.update(dt);
        };
        Cabin.prototype.setActive = function (active) {
            if (active) {
                if (!this._isActive) {
                    this._cabin.material.color = new THREE.Color(0xffffff);
                }
            }
            else {
                this._cabin.material.color = new THREE.Color(0xaaaaaa);
            }
        };
        Cabin.prototype.tint = function (color) {
            this._cabin.material.color = new THREE.Color(color);
        };
        Cabin.prototype.setSelected = function (selected) {
            var material = this._cabin.material;
            if (selected) {
                if (!this._isSelected) {
                    this._isSelected = true;
                    material.opacity;
                    createjs.Tween.get(material, { paused: false, loop: true })
                        .to({ opacity: 0.25 }, 350, createjs.Ease.linear)
                        .to({ opacity: 1.0 }, 350, createjs.Ease.linear);
                }
            }
            else {
                this._isSelected = false;
                material.opacity = 1.0;
                if (createjs.Tween.hasActiveTweens(material))
                    createjs.Tween.removeTweens(material);
            }
        };
        Cabin.prototype.open = function () {
            if (!this._isOpened) {
                this._mixer.removeAllActions();
                this._mixer.play(this._openAction);
                this._isOpened = true;
            }
        };
        Cabin.prototype.close = function () {
            if (this._isOpened) {
                this._mixer.removeAllActions();
                this._mixer.play(this._closeAction);
                this._isOpened = false;
            }
        };
        return Cabin;
    }(Objects.GameObject));
    Objects.Cabin = Cabin;
})(Objects || (Objects = {}));
