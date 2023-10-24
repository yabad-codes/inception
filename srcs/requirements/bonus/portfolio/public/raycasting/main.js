class Map {
	constructor() {
		this.rows = 15;
		this.cols = 11;
		this.tile = 80;
		this.width = this.rows * this.tile;
		this.height = this.cols * this.tile;
		this.wall_strip_width = 10;
		this.scale_factor = 0.2;
		this.grid = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
			[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];
	}

	collideWithWall(plyrX, plyrY, newX, newY) {
		if (newX < 0 || newX > this.width || newY < 0 || newY > this.height)
			return (true);
		if (this.grid[Math.floor(plyrY / this.tile)][Math.floor(newX / this.tile)] === 1)
			return (true);
		if (this.grid[Math.floor(newY / this.tile)][Math.floor(plyrX / this.tile)] === 1)
			return (true);
		return (false);
	}

	isWall(newX, newY) {
		if (newX < 0 || newX > this.width || newY < 0 || newY > this.height)
			return (true);
		if (this.grid[Math.floor(newY / this.tile)][Math.floor(newX / this.tile)] == 1)
			return (true);
		return (false);
	}

	render() {
		for (let j = 0; j < this.cols; j++) {
			for (let i = 0; i < this.rows; i++) {
				fill("#777");
				if (this.grid[j][i] == 1)
					fill("white");
				rect(i * this.tile * this.scale_factor, j * this.tile * this.scale_factor, this.tile * this.scale_factor, this.tile * this.scale_factor);
			}
		}
	}
};

const map = new Map();

class Player {
	constructor() {
		this.x = map.width / 2;
		this.y = map.height / 2;
		this.r_angle = 3 * Math.PI / 2;
		this.side = 8;
		this.fov = 60 * Math.PI / 180;
		this.speed = 4;

		this.number_of_rays = map.width / map.wall_strip_width * 2;
		this.rayInc = this.fov / this.number_of_rays;
	}

	render() {
		fill("lime");
		ellipse(this.x * map.scale_factor, this.y * map.scale_factor, this.side);
		this.castRays();
		stroke("red");
		line(this.x * map.scale_factor, this.y * map.scale_factor, (this.x + Math.cos(this.r_angle) * 90) * map.scale_factor, (this.y + Math.sin(this.r_angle) * 90) * map.scale_factor);
		stroke("black");
	}

	move() {
		if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
			let sign = 1;
			if (keyIsDown(LEFT_ARROW))
				sign *= -1;
			this.r_angle += sign * 0.05;
		}
		if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
			let newX, newY;
			let sign = 1;
			if (keyIsDown(DOWN_ARROW))
				sign *= -1;
			newX = this.x + sign * Math.cos(this.r_angle) * this.speed;
			newY = this.y + sign * Math.sin(this.r_angle) * this.speed;
			if (!map.collideWithWall(this.x, this.y, newX, newY)) {
				this.x = newX;
				this.y = newY;
			}
		}
	}

	horizontalIntersection(rayAngle) {
		let sign = -1;
		let isRayFacingUp = rayAngle > Math.PI && rayAngle < 2 * Math.PI;
		let xstep, ystep;
		ystep = Math.floor(this.y / map.tile) * map.tile;
		if (!isRayFacingUp) {
			sign *= -1;
			ystep += map.tile;
		}
		xstep = this.x + (ystep - this.y) / Math.tan(rayAngle);
		while (true) {
			if ((isRayFacingUp && map.isWall(xstep, ystep - map.tile)) || (!isRayFacingUp && map.isWall(xstep, ystep)))
				break;
			xstep += sign * map.tile / Math.tan(rayAngle);
			ystep += sign * map.tile;
		}
		return ({xstep, ystep});
	}

	verticalIntersetion(rayAngle) {
		let sign = 1;
		let isRayFacingLeft = rayAngle > Math.PI / 2 && rayAngle < 1.5 * Math.PI;
		let xstep, ystep;
		xstep = Math.ceil(this.x / map.tile) * map.tile;
		if (isRayFacingLeft) {
			xstep -= map.tile;
			sign *= -1;
		}
		ystep = this.y - (this.x - xstep) * Math.tan(rayAngle);
		while (true) {
			if ((isRayFacingLeft && map.isWall(xstep - map.tile, ystep)) || (!isRayFacingLeft && map.isWall(xstep, ystep)))
				break;
			xstep += sign * map.tile;
			ystep += sign * map.tile * Math.tan(rayAngle);
		}
		return ({xstep, ystep});
	}

	minPoint(step1, step2) {
		let distance1 = Math.sqrt((step1.xstep - this.x) * (step1.xstep - this.x) + (step1.ystep - this.y) * (step1.ystep - this.y));
		let distance2 = Math.sqrt((step2.xstep - this.x) * (step2.xstep - this.x) + (step2.ystep - this.y) * (step2.ystep - this.y));
		if (distance1 < distance2)
			return (step1);
		return (step2);
	}
	
	castRays() {
		let rayAngle = normalizeAngle(this.r_angle - this.fov / 2);
		for (let rayId = 0; rayId < this.number_of_rays; rayId++) {
			let step = this.minPoint(this.horizontalIntersection(rayAngle), this.verticalIntersetion(rayAngle));
			let wallHeight = (map.tile / getDistance(rayAngle, step)) * (map.width / 2) / Math.tan(this.fov / 2);
			//draw a rectangle
			fill('red');
			noStroke();
			rect(
				rayId * map.wall_strip_width,
				(map.height / 2) - (wallHeight / 2),
				map.wall_strip_width,
				wallHeight
			);
			stroke("yellow");
			line(this.x * map.scale_factor, this.y * map.scale_factor, step.xstep * map.scale_factor, step.ystep * map.scale_factor);
			stroke("black");
			rayAngle = normalizeAngle(rayAngle + this.rayInc);
		}
	}
}

const player = new Player();

function getDistance(rayAngle, step) {
	let eucl_distance = Math.sqrt((step.xstep - player.x) * 
									(step.xstep - player.x) +
									(step.ystep - player.y) *
									(step.ystep - player.y));
	return (eucl_distance * Math.cos(rayAngle - player.r_angle));
}

function normalizeAngle(angle) {
	angle = angle % (2 * Math.PI);
	if (angle < 0)
		angle += 2 * Math.PI;
	return (angle);
}

function setup() {
	createCanvas(map.width, map.height);
}

function draw() {
	background(220);
	map.render();
	player.render();
	player.move();
}