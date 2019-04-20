// context.strokeStyle = 'yellow';
// context.strokeRect(10,10,100,100);

// context.fillStyle = 'red';
// context.fillRect(10,10,100,100);

// context.clearRect(50,50,10,10);


// context.beginPath();
// context.moveTo(240,240);
// context.lineTo(300,240);
// context.lineTo(300,300);
// context.fill();


/*********控制宽高******/

var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)


/*******监听鼠标事件*****/
listenToMouse(yyy)


/************控制橡皮擦是否开启**********/
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

/************/
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}



function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black'
    context.moveTo(x1, y1); //起点
    context.lineWidth = 5;
    context.lineTo(x2, y2); //终点
    context.stroke();
    context.closePath();
}



function listenToMouse(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (!using) {
            return
        }

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint

        }

    }

    canvas.onmouseup = function (aaa) {
        using = false
    }
}