import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const SHAPES = {
  RECT: 'rect',
  CIRCLE: 'circle',
};

class DisplayObject {
  constructor(x, y, w, h, color, shape) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.shape = shape;
    this.dragged = false;
    this.hovered = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.collided = false;
  }
}

const COMMON_COLORS = {
  BKG: '#FFFFFF',
  GRID: '#000000',
  POSITION: '#f33d03',
  MEASURE: '#025496',
  COLLIDED: '#673ab7',
};

const rect = new DisplayObject(200, 300, 400, 100, '#c32b20', SHAPES.RECT);
const circle = new DisplayObject(400, 250, 20, 20, '#4caf50', SHAPES.CIRCLE);

const displayObjects = [
  rect,
  circle,
];

let showDim = false;
let showPos = false;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App
        ballX={circle.x}
        ballY={circle.y}
        ballRadius={circle.width}
        rectX={rect.x}
        rectY={rect.y}
        rectWidth={rect.width}
        rectHeight={rect.height}
        updateProps={(props) => {
          circle.x = props.ballX;
          circle.y = props.ballY;
          circle.width = props.ballRadius;
          circle.height = props.ballRadius;
          rect.x = props.rectX;
          rect.y = props.rectY;
          rect.width = props.rectWidth;
          rect.height = props.rectHeight;
          render();
        }}
      />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

function onObjectMouseDown(e, target) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.x;
  const y = e.clientY - canvasRect.y;
  target.dragged = true;
  target.dragOffsetX = x - target.x;
  target.dragOffsetY = y - target.y;
}

function onObjectMouseUp() {
  for (let i = 0; i < displayObjects.length; i++) {
    const obj = displayObjects[i];
    if (obj.dragged) {
      obj.dragged = false;
    }
  }
}

function onMouseMove(e) {
  for (let i = 0; i < displayObjects.length; i++) {
    const obj = displayObjects[i];
    if (obj.dragged) {
      const canvasRect = canvas.getBoundingClientRect();
      const x = e.clientX - canvasRect.x;
      const y = e.clientY - canvasRect.y;
      obj.x = x - obj.dragOffsetX;
      obj.y = y - obj.dragOffsetY;
      render();
    }
  }
}

function onMouseEnter(e, obj) {
  obj.hovered = true;
}

function onMouseLeave(e, obj) {
  obj.hovered = false;
}

function onMouseEvent(e) {
  if (e.type === 'mousemove') {
    onMouseMove(e);
    // return;
  } else if (e.type === 'mouseup') {
    onObjectMouseUp(e);
    return;
  }
  let alreadyClickedItem = false;
  for (let i = displayObjects.length - 1; i >= 0; i--) {
    const obj = displayObjects[i];
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.x;
    const y = e.clientY - canvasRect.y;
    let collision;
    if (obj.shape === SHAPES.RECT) {
      collision = x > obj.x
      && x < obj.x + obj.width
      && y > obj.y
      && y < obj.y + obj.height;
    } else {
      collision = x > obj.x - obj.width
      && x < obj.x + obj.width
      && y > obj.y - obj.height
      && y < obj.y + obj.height;
    }
    if (collision) {
      e.targetX = x;
      e.targetY = y;
      if (!alreadyClickedItem && e.type === 'mousedown') {
        onObjectMouseDown(e, obj);
        alreadyClickedItem = true;
      } else if (e.type === 'mousemove') {
        if (!obj.hovered) {
          onMouseEnter(e, obj);
        }
      }
    } else if (e.type === 'mousemove') {
      if (obj.hovered) {
        onMouseLeave(e, obj);
      }
    }
  }
}

canvas.addEventListener('mousedown', onMouseEvent);
canvas.addEventListener('mouseup', onMouseEvent);
canvas.addEventListener('mousemove', onMouseEvent);
window.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft') {
    showDim = true;
  } else if (e.code === 'ControlLeft') {
    showPos = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft') {
    showDim = false;
  } else if (e.code === 'ControlLeft') {
    showPos = false;
  }
});

function clear() {
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBkg() {
  ctx.globalAlpha = 1;
  ctx.fillStyle = COMMON_COLORS.BKG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(fromX, fromY, toX, toY, alpha) {
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.strokeStyle = COMMON_COLORS.GRID;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawGrid() {
  const width = canvas.width / 10;
  const height = canvas.height / 10;
  let tenMult = false;
  for (let i = 0; i < height; i++) {
    tenMult = i % 10 === 0;
    drawLine(0, i * 10, canvas.width, i * 10, tenMult ? 1 : 0.1);
    if (tenMult) {
      const txtHei = 5;
      ctx.font = `${txtHei}pt Arial`;
      ctx.fillStyle = COMMON_COLORS.GRID;
      const txt = i * 10;
      ctx.fillText(txt, 5, i * 10 + txtHei + 5);
    }
  }
  for (let j = 0; j < width; j++) {
    tenMult = j % 10 === 0;
    drawLine(j * 10, 0, j * 10, canvas.height, j % 10 === 0 ? 1 : 0.1);
    if (j > 0 && tenMult) {
      const txtHei = 5;
      ctx.font = `${txtHei}pt Arial`;
      ctx.fillStyle = COMMON_COLORS.GRID;
      const txt = j * 10;
      ctx.fillText(txt, j * 10 + 5, txtHei + 5);
    }
  }
}

function drawOrigin(bounds) {
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = COMMON_COLORS.POSITION;
  ctx.beginPath();
  ctx.arc(bounds.x, bounds.y, 5, 0, 2 * Math.PI);
  ctx.fill();
  if (showPos) {
    const fontSize = Math.exp(bounds.width / 400) * 6;
    ctx.font = `${fontSize}pt Arial`;
    const txtX = `x:${bounds.x}`;
    const txtY = `y:${bounds.y}`;
    const txtXWid = ctx.measureText(txtX).width;
    const txtYWid = ctx.measureText(txtY).width;
    const txtHei = fontSize;
    const isEnougthSpace = bounds.x >= Math.max(txtXWid, txtYWid) + 10
     && bounds.y >= txtHei * 2 + 30;
    // ctx.strokeStyle = '#000000';
    ctx.fillStyle = isEnougthSpace ? COMMON_COLORS.POSITION : '#000000';
    ctx.lineWidth = 0.5;
    ctx.fillText(txtX,
      isEnougthSpace ? bounds.x - txtXWid - 10 : bounds.x + 10,
      isEnougthSpace ? bounds.y - txtHei * 2 - 10 : bounds.y + txtHei + 10);
    ctx.fillText(txtY,
      isEnougthSpace ? bounds.x - txtYWid - 10 : bounds.x + 10,
      isEnougthSpace ? bounds.y - txtHei : bounds.y + txtHei * 2 + 20);
    // ctx.strokeText(txtX,
    //   isEnougthSpace ? bounds.x - txtXWid - 10 : bounds.x + 10,
    //   isEnougthSpace ? bounds.y - txtHei * 2 - 10 : bounds.y + txtHei + 10);
    // ctx.strokeText(txtY,
    //   isEnougthSpace ? bounds.x - txtYWid - 10 : bounds.x + 10,
    //   isEnougthSpace ? bounds.y - txtHei : bounds.y + txtHei * 2 + 20);
    ctx.lineWidth = 1;
  }
}

function drawBounds(bounds) {
  ctx.globalAlpha = 1;
  ctx.strokeStyle = COMMON_COLORS.MEASURE;
  ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawDimensions(bounds) {
  const fontSize = Math.exp(bounds.width / 400) * 6;
  ctx.globalAlpha = 1;
  ctx.font = `${fontSize}pt Arial`;
  ctx.fillStyle = COMMON_COLORS.MEASURE;
  const leftTxt = bounds.width;
  const leftTxtWid = ctx.measureText(leftTxt).width;
  const leftTxtHei = fontSize;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 0.5;
  // ctx.strokeText(leftTxt,
  //   bounds.x >= leftTxtWid + 10 ? bounds.x - leftTxtWid - 10 : bounds.x + bounds.width + 10,
  //   (bounds.y + bounds.height / 2) + leftTxtHei / 2);
  ctx.fillText(leftTxt,
    bounds.x >= leftTxtWid + 10 ? bounds.x - leftTxtWid - 10 : bounds.x + bounds.width + 10,
    (bounds.y + bounds.height / 2) + leftTxtHei / 2);
  const topTxt = bounds.height;
  const topTxtHei = fontSize;
  const topTxtWid = ctx.measureText(topTxt).width;
  // ctx.strokeText(topTxt, bounds.x + bounds.width / 2 - topTxtWid / 2,
  //   bounds.y >= topTxtHei + 10 ? bounds.y - 10 : bounds.y + bounds.height + topTxtHei + 10);
  ctx.fillText(topTxt, bounds.x + bounds.width / 2 - topTxtWid / 2,
    bounds.y >= topTxtHei + 10 ? bounds.y - 10 : bounds.y + bounds.height + topTxtHei + 10);
  ctx.lineWidth = 1;
}

function drawDisplayObject(dob) {
  if (dob.shape === SHAPES.RECT) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = dob.collided ? COMMON_COLORS.COLLIDED : dob.color;
    ctx.fillRect(dob.x, dob.y, dob.width, dob.height);
    if (dob.hovered) {
      drawBounds({
        x: dob.x,
        y: dob.y,
        width: dob.width,
        height: dob.height,
      });
      if (showDim) {
        drawDimensions({
          x: dob.x,
          y: dob.y,
          width: dob.width,
          height: dob.height,
        });
      }
      drawOrigin({
        x: dob.x,
        y: dob.y,
        width: dob.width,
        height: dob.height,
      });
    }
  } else {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = dob.color;
    ctx.beginPath();
    ctx.arc(dob.x, dob.y, dob.width, 0, 2 * Math.PI);
    ctx.fill();
    if (dob.hovered) {
      drawBounds({
        x: dob.x - dob.width,
        y: dob.y - dob.height,
        width: dob.width * 2,
        height: dob.height * 2,
      });
      if (showDim) {
        drawDimensions({
          x: dob.x - dob.width,
          y: dob.y - dob.height,
          width: dob.width * 2,
          height: dob.height * 2,
        });
      }
      drawOrigin({
        x: dob.x,
        y: dob.y,
        width: dob.width * 2,
        height: dob.height * 2,
      }, true);
    }
  }
}

function drawDisplayObjects() {
  for (let i = 0; i < displayObjects.length; i++) {
    const dob = displayObjects[i];
    drawDisplayObject(dob);
  }
}

function detectCollisions() {
  for (let i = 0; i < displayObjects.length; i++) {
    const dob = displayObjects[i];
    let collided = false;
    for (let j = 0; j < displayObjects.length; j++) {
      const colDob = displayObjects[j];
      if (dob === colDob) {
        continue;
      }
      const dobLeft = dob.shape === SHAPES.RECT ? dob.x : dob.x - dob.width;
      const dobRight = dob.x + dob.width;
      const dobTop = dob.shape === SHAPES.RECT ? dob.y : dob.y - dob.height;
      const dobBot = dob.y + dob.height;
      const colDobLeft = colDob.shape === SHAPES.RECT ? colDob.x : colDob.x - colDob.width;
      const colDobRight = colDob.x + colDob.width;
      const colDobTop = colDob.shape === SHAPES.RECT ? colDob.y : colDob.y - colDob.height;
      const colDobBot = colDob.y + colDob.height;
      if (dobLeft < colDobRight
      && dobRight > colDobLeft
    && dobTop < colDobBot
    && dobBot > colDobTop) {
        collided = true;
        break;
      }
    }
    dob.collided = collided;
  }
}

function onFrame() {
  clear();
  drawBkg();
  drawGrid();
  detectCollisions();
  drawDisplayObjects();
  requestAnimationFrame(onFrame);
}

requestAnimationFrame(onFrame);

render();
