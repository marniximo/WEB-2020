const ANIMATION_DEG_Y = 180;
const ANIMATION_DEG_X = 90;

//ahora con jquery profe

var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (e) {
        this._x = e.getBoundingClientRect().left + Math.floor(e.offsetWidth / 2);
        this._y = e.getBoundingClientRect().top + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
        return "(" + this._x + ", " + this._y + ")";
    }
};

/*var container = document.getElementById("container"),
    inner = document.getElementById("inner");*/



var containers = $(".title-container");
var inner = containers[0].firstElementChild;

mouse.setOrigin(containers[0]);

var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
        (mouse.y / inner.clientHeight / 2 * ANIMATION_DEG_X).toFixed(2),
        (mouse.x / inner.clientWidth / 2 * ANIMATION_DEG_Y).toFixed(2)
    );
};

var updateTransformStyle = function (x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    var shadow = -y / 3 + 'px ' + x / 3 + 'px black, ' +
        -y / 4 + 'px ' + x / 4 + 'px black, ' +
        -y / 5 + 'px ' + x / 5 + 'px black, ' +
        -y / 6 + 'px ' + x / 6 + 'px black, ' +
        -y / 7 + 'px ' + x / 7 + 'px black, ' +
        -y / 8 + 'px ' + x / 8 + 'px black';
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTranform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
    inner.style.textShadow = shadow;
};

var onMouseEnterHandler = function (event) {
    inner = this.firstElementChild;
    mouse.setOrigin(this);
    update(event);
};

var onMouseLeaveHandler = function () {
    inner.style = "";
};

var onMouseMoveHandler = function (event) {
    update(event);
};

for (var container of containers) {
    container.onmousemove = onMouseMoveHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmouseenter = onMouseEnterHandler;
}

var counter = 0;
var refreshRate = 10;
var isTimeToUpdate = function () {
    return counter++ % refreshRate === 0;
};