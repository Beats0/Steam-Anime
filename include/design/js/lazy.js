/*ES6 lazy.js by jawil: https://github.com/jawil/lazyImages*/
'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
!function () {
    var context = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
    var callback = arguments[1];
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return callback(context);
        });
    }
    else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = callback();
    }
    else {
        context.Lazy = callback(context);
    }
}(undefined, function (context) {
    'use strict';

    var DEFAULT_OPTIONS = {
        containerId: context, //图片顶层容器
        offset: 100, //在定义可视区的范围内开始加载
        throttle: 100, //100ms触发一次元素scroll时间，函数节流防抖
        unload: false, //一旦图片不在可视区就移除已经加载的图片
        callback: function callback(element, op) {//图片加载完成之后的回调函数
            //doSomething
        }
    };
    var throttle = function throttle(fn) {
        var interval = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];

        var timer = undefined,
            firstTime = true;
        return function () {
            var args = arguments,
                me = this;
            if (firstTime) {
                fn.apply(me, args);
                return firstTime = false;
            }
            if (timer) {
                return false;
            }
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                fn.apply(me, args);
            }, interval);
        };
    };
    var inView = function inView(element, view) {
        var react = element.getBoundingClientRect();
        return react.right >= view.l && react.bottom >= view.t && react.left <= view.r && react.top <= view.b;
    };
    var Lazy = function () {
        function Lazy() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            _classCallCheck(this, Lazy);
            this.opts = Object.assign({}, DEFAULT_OPTIONS, opts);
            this.init();
        }
        Lazy.prototype.init = function init() {
            var _this = this;
            var offsetAll = this.opts.offset,
                offsetVertical = this.opts.offsetVertical || offsetAll,
                offsetHorizontal = this.opts.offsetHorizontal || offsetAll,
                offsetTop = this.opts.offsetTop || offsetVertical,
                offsetBottom = this.opts.offsetBottom || offsetVertical,
                offsetLeft = this.opts.offsetLeft || offsetHorizontal,
                offsetRight = this.opts.offsetRight || offsetHorizontal;
            this.opts.offset = {
                t: offsetTop,
                b: offsetBottom,
                l: offsetLeft,
                r: offsetRight
            };
            this.render();
            this.opts.containerId.addEventListener('scroll', throttle(function (f) {
                _this.render();
            }, 1000), false);
        };
        Lazy.prototype.render = function render() {
            var _this2 = this;
            var container = this.opts.containerId === window ? document : this.opts.containerId,
                root = this.opts.containerId,
                nodes = container.querySelectorAll('[data-lazy],[data-lazy-bg]'),
                length = nodes.length,
                srcCache = undefined,
                view = {
                    l: 0 - this.opts.offset.l,
                    t: 0 - this.opts.offset.t,
                    b: root.innerHeight + this.opts.offset.b,
                    r: root.innerWidth + this.opts.offset.r
                };
            Array.from(nodes).forEach(function (ele, index) {
                if (inView(ele, view)) {
                    if (_this2.opts.unload && !ele.getAttribute('data-lazy-placeholer')) {
                        ele.setAttribute('data-lazy-placeholer', ele.src);
                    }
                    if (ele.getAttribute('data-lazy-bg') !== null) {
                        ele.style.backgroundImage = 'url(' + ele.getAttribute('data-lazy-bg') + ')';
                    } else if (ele.src !== (srcCache = ele.getAttribute('data-lazy'))) {
                        ele.src = srcCache;
                    }
                    if (!_this2.opts.unload) {
                        ele.removeAttribute('data-lazy');
                        ele.removeAttribute('data-lazy-bg');
                    }
                    _this2.opts.callback && _this2.opts.callback(ele, 'load');
                }
                else if (_this2.opts.unload && !!(srcCache = ele.getAttribute('data-lazy-placeholer'))) {
                    if (ele.getAttribute('data-lazy-bg' !== null)) {
                        ele.style.backgroundImage = 'url(' + srcCache + ')';
                    } else {
                        ele.src = srcCache;
                    }
                    _this2.opts.callback && _this2.opts.callback(ele, 'load');
                }
            });
            if (!length) {
                this.detach();
            }
        };
        Lazy.prototype.detach = function detach() {
            this.opts.containerId.removeEventListener('scroll', throttle);
        };
        return Lazy;
    }();
    return Lazy;
});

new Lazy();
