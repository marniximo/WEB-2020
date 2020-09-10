const ANIMATION_DEG_Y=180;
const ANIMATION_DEG_X=90;

var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
    return "(" + this.x + ", " + this.y + ")";
    }
};

var container = document.getElementById("container"),
    inner = document.getElementById("inner");

mouse.setOrigin(container);

var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
        (mouse.y / inner.offsetHeight / 2 * ANIMATION_DEG_X).toFixed(2),
        (mouse.x / inner.offsetWidth / 2 * ANIMATION_DEG_Y).toFixed(2)
    );
};

var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    var shadow = -y/4 + 'px ' + x/4 + 'px black, '+
    -y/6 + 'px ' + x/6 + 'px black, '+
    -y/12 + 'px ' + x/12 + 'px black';
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTranform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
    inner.style.textShadow = shadow;
};

var onMouseEnterHandler = function(event) {
    update(event);
};

var onMouseLeaveHandler = function() {
    inner.style = "";
};

var onMouseMoveHandler = function(event) {
    update();
};

container.onmousemove = onMouseMoveHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmouseenter = onMouseEnterHandler;

var counter = 0;
var refreshRate = 10;
var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
};