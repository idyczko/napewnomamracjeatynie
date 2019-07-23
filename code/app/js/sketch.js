let time = 0;
let dt;
let path = [];
let coordinates;
let rainbow;
let fourierX;
let fourierY;
let fourier;
let colorPace = 0;
let pace = 1;
let colorIndex = 0;
let takeEvery = 2;

function preload() {
	//rescaleNeal();
	coordinates = janina;//neal_mcbeal;
	skipCoordinates();
}

function rescaleNeal() {
	for (let i = 0; i < neal_mcbeal.length; i++) {
		neal_mcbeal[i].x = neal_mcbeal[i].x / 2.5 - 200;
		neal_mcbeal[i].y = -neal_mcbeal[i].y * 4;
	}
}

function skipCoordinates() {
	let temp = [];
	for (let i = 0; i < coordinates.length; i++) {
		if (i%takeEvery == 0) {
			temp.push(coordinates[i]);
		}
	}
	coordinates = temp;
}

function setup() {
	rainbow = generateRainbow(100);
	createCanvas(windowWidth, windowHeight);
	
	let x_signal = coordinates.map(coordinate => ({re: coordinate.x, im: 0}));
	let y_signal = coordinates.map(coordinate => ({re: coordinate.y, im: 0}));
	let complex_signal = coordinates.map(coordinate => ({re: coordinate.x, im: coordinate.y}));
	
	fourierX = dft(x_signal);
	fourierY = dft(y_signal);
	fourier = dft(complex_signal);
	
	fourierX.sort((a, b) => b.amp - a.amp);
	fourierY.sort((a, b) => b.amp - a.amp);
	fourier.sort((a, b) => b.amp - a.amp);
	dt = TWO_PI / fourier.length;
}

function draw() {
	background(0, 184, 230);
	
	//let vx = epicycles(width/2 - 50, 150, 0, fourierX);
	//let vy = epicycles(300, height/2 + 50, HALF_PI, fourierY);
	let vf = epicycles(width/2 - 50, height/2 + 50, 0, fourier);
	let v = createVector(vf.x, vf.y);
	
	path.unshift(v)
	
	
	//line(vx.x, vx.y, v.x, v.y);
	//line(vy.x, vy.y, v.x, v.y);
	
	let color = rainbow[generateColorIndex()];
	
	beginShape();
	noFill();
	strokeWeight(3);	
	for (let i = 0; i < path.length; i++) {
		stroke(color.r, color.g, color.b);
		vertex(path[i].x, path[i].y);
	}
	endShape();	
	strokeWeight(1);

	time += dt;

	if (time > TWO_PI) {
		time = 0;
		//path = []
	}
}

function epicycles(x, y, rotation, fourier) {
	for (let i = 0; i < fourier.length; i++){
		let sine = fourier[i];
		if (sine.freq == 0) {
			continue;
		}
		let prevx = x;
		let prevy = y;
		x += sine.amp * cos(sine.freq * time + sine.phase + rotation);
		y += sine.amp * sin(sine.freq * time + sine.phase + rotation);
		
		stroke(255, 100);
		noFill();
		ellipse(prevx, prevy, sine.amp * 2);
		stroke(255);
		line(prevx, prevy, x, y);
	}
	
	return createVector(x, y);
}

function generateColorIndex() {
	if (colorPace++ > pace) {
		colorPace = 0;
		colorIndex++;
	}
	
	if (colorIndex >= rainbow.length) {
		colorIndex = 0
	}
	
	return colorIndex;
}

function generateRainbow(points) {
	points -= points%4;
	let rainbow = []
	let color = {r:255, g:0, b:0};
	rainbow.push({r: color.r, g: color.g, b: color.b});
	while (color.g < 255) {
		color.g += 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	while (color.r > 0) {
		color.r -= 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	while (color.b < 255) {
		color.b += 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	while (color.g > 0) {
		color.g -= 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	while (color.r < 255) {
		color.r += 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	while (color.b > 0) {
		color.b -= 255/points*4;
		rainbow.push({r: round(color.r), g: round(color.g), b: round(color.b)});
	}
	return rainbow;
}
