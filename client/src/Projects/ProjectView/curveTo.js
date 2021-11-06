const getPoints = (filters) => {
  const elem = document.getElementById('eq');
  if (elem === null) {
    return null;
  }

  const width = elem.offsetWidth;
  const height = elem.offsetHeight;

  const draw = document.getElementById('eq-draw');
  draw.width = width;
  draw.height = height;

  const step = width * 0.09;
  const start = width * 0.045;

  return filters.map((value, index) => {
    let x = (index * step) + start;
    let y = (1 - ((parseInt(value) + 40) / 80)) * height;
    return { x: x, y: y };
  });
};

const drawPoint = (ctx, x, y) => {
  ctx.fillStyle = '#dc354684'; // Red color
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2, true);
  ctx.fill();
};

const curveTo = (filters, f = 0.3, t = 0.6) => {
  const points = getPoints(filters);
  if (points === null) {
    return;
  }

  const cv = document.getElementById('eq-draw');
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, cv.width, cv.height);

  for (let j = 0; j < points.length; j++) {
    drawPoint(ctx, points[j].x, points[j].y);
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  let m = 0;
  let dx1 = 0;
  let dy1 = 0;
  let dx2 = 0;
  let dy2 = 0;

  let preP = points[0];

  const gradient = (a, b) => {
    return (b.y - a.y) / (b.x - a.x);
  };

  for (let i = 1; i < points.length; i++) {
    let curP = points[i];
    let nexP = points[i + 1];
    if (nexP) {
      m = gradient(preP, nexP);
      dx2 = (nexP.x - curP.x) * -f;
      dy2 = dx2 * m * t;
    } else {
      dx2 = 0;
      dy2 = 0;
    }

    ctx.bezierCurveTo(
      preP.x - dx1, preP.y - dy1,
      curP.x + dx2, curP.y + dy2,
      curP.x, curP.y
    );

    dx1 = dx2;
    dy1 = dy2;
    preP = curP;
  }
  ctx.stroke();
};

export default curveTo;