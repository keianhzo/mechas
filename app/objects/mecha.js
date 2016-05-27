var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Mecha = (function (_super) {
        __extends(Mecha, _super);
        function Mecha(geometry, texture) {
            _super.call(this);
            this._isSelected = false;
            this._isActive = false;
            this.name = "mecha";
            this._isSelected = false;
            this._isActive = false;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = 16;
            this._mecha = new THREE.SkinnedMesh(geometry, new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                skinning: true,
                color: 0xffffff,
                opacity: 1.0,
                transparent: true
            }));
            if (this._mecha instanceof THREE.SkinnedMesh) {
                for (var i = 0; i < geometry.animations.length; i++) {
                    var action = new THREE.AnimationAction(geometry.animations[i]);
                    if (action.clip.name === "mecha_idle") {
                        action.loop = THREE.LoopRepeat;
                        this._idleAction = action;
                    }
                    else if (action.clip.name === "mecha_jump") {
                        action.loop = THREE.LoopOnce;
                        this._jumpAction = action;
                    }
                    else if (action.clip.name === "mecha_shoot") {
                        action.loop = THREE.LoopOnce;
                        this._shotAction = action;
                    }
                }
            }
            this._mixer = new THREE.AnimationMixer(this._mecha);
            this._points = new THREE.Object3D();
            this._up = Objects.TextSprite.create("0", 60, 50, Config.TextStyles.STRENGTHS);
            this._up.position.set(2, 7, 0);
            this.add(this._up);
            this._down = Objects.TextSprite.create("0", 60, 50, Config.TextStyles.STRENGTHS);
            this._down.position.set(-2, 7, 0);
            this._points.add(this._down);
            this._left = Objects.TextSprite.create("0", 60, 50, Config.TextStyles.STRENGTHS);
            this._left.position.set(0, 7, -2);
            this.add(this._left);
            this._right = Objects.TextSprite.create("0", 60, 50, Config.TextStyles.STRENGTHS);
            this._right.position.set(0, 7, 2);
            this._points.add(this._right);
            this.add(this._points);
            this.add(this._mecha);
        }
        Mecha.prototype.destroy = function () {
        };
        Mecha.prototype.update = function (dt) {
            this._mixer.update(dt);
        };
        Object.defineProperty(Mecha.prototype, "mecha", {
            get: function () {
                return this._mecha;
            },
            enumerable: true,
            configurable: true
        });
        Mecha.prototype.setActive = function (active) {
            if (active) {
                if (!this._isActive) {
                    this._mecha.material.color = new THREE.Color(0xffffff);
                }
            }
            else {
                this._mecha.material.color = new THREE.Color(0xaaaaaa);
            }
        };
        Mecha.prototype.tint = function (color) {
            this._mecha.material.color = new THREE.Color(color);
        };
        Mecha.prototype.setSelected = function (selected) {
            var material = this._mecha.material;
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
        Mecha.prototype.setStrength = function (up, down, left, right) {
            this._up.text = up.toString();
            this._down.text = down.toString();
            this._left.text = left.toString();
            this._right.text = right.toString();
        };
        Mecha.prototype.idle = function () {
            if (this._up)
                this._up.visible = true;
            if (this._down)
                this._down.visible = true;
            if (this._left)
                this._left.visible = true;
            if (this._right)
                this._right.visible = true;
        };
        Mecha.prototype.move = function (position) {
            this.position.set(position.x, position.y, position.z);
        };
        return Mecha;
    }(Objects.GameObject));
    Objects.Mecha = Mecha;
})(Objects || (Objects = {}));
