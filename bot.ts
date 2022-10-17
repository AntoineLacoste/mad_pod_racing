/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/



class CheckPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class CheckPointManager {
    checkpoints: [CheckPoint?] = [];
    distances: [number?] = [];
    longerDistanceIndex: number = 0;
    longerDistance: number = 0;

    newCheckpoint(checkPoint: CheckPoint) {
        if (!this.alreadyHere(checkPoint)) {
            this.checkpoints.push(checkPoint);
        }
    }

    alreadyHere(checkPoint: CheckPoint) {
        const alreadyExist = (checkPointExisting) => checkPointExisting.x == checkPoint.x && checkPointExisting.y == checkPoint.y;

        return this.checkpoints.some(alreadyExist)
    }

    calculateDistances() {
        for (let i = 0; i < this.checkpoints.length - 1; i++) {
            const distance: number = this.distanceBetweenCheckPoints(this.checkpoints[i], this.checkpoints[i + 1]);
            this.distances.push(distance);
            if (i == 0) {
                this.longerDistance = distance;
            }
            else if (distance > this.longerDistance) {
                this.longerDistance = distance;
                this.longerDistanceIndex = i;
            }
        }

        const distance: number = this.distanceBetweenCheckPoints(this.checkpoints[this.checkpoints.length - 1], this.checkpoints[0]);
        this.distances.push(distance);

        if (distance > this.longerDistance) {
            this.longerDistance = distance;
            this.longerDistanceIndex = this.checkpoints.length - 1;
        }
    }

    distanceBetweenCheckPoints(checkPoint1: CheckPoint, checkPoint2: CheckPoint) {
        console.error("distance between " + checkPoint1 + " and " + checkPoint2);
        let distance: number = Math.sqrt(Math.pow((checkPoint2.x - checkPoint1.x), 2) + Math.pow((checkPoint2.y - checkPoint1.y), 2))
        console.error(distance);
        return distance;
    }

    compareCheckpoint(checkPoint1: CheckPoint, checkPoint2: CheckPoint) {
        console.error("comparing " + checkPoint1.toString() + " and " + checkPoint2.toString());
        return checkPoint1.x == checkPoint2.x && checkPoint2.y == checkPoint2.y;
    }
}

const checkPointManager = new CheckPointManager();
let firstLoopCalculationDone: boolean = false;
let currentCheckpointIndex = 0;
let lastCheckpointX: number = 0; // x position of the next check point
let lastCheckpointY: number = 0; // y position of the next check point
let hasBoosted: boolean = false;
let firstLoop: boolean = true;

// game loop
while (true) {
    var inputs: string[] = readline().split(' ');
    const x: number = parseInt(inputs[0]);
    const y: number = parseInt(inputs[1]);
    const nextCheckpointX: number = parseInt(inputs[2]); // x position of the next check point
    const nextCheckpointY: number = parseInt(inputs[3]); // y position of the next check point
    const nextCheckpointDist: number = parseInt(inputs[4]); // distance to the next checkpoint
    const nextCheckpointAngle: number = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
    var inputs: string[] = readline().split(' ');
    const opponentX: number = parseInt(inputs[0]);
    const opponentY: number = parseInt(inputs[1]);
    let currentCheckPoint = new CheckPoint(nextCheckpointX, nextCheckpointX);

    console.error("currentCheckPoint : ");
    console.error(currentCheckPoint.toString());

    if (lastCheckpointX == 0 && lastCheckpointY == 0) {
        lastCheckpointX = nextCheckpointX;
        lastCheckpointY = nextCheckpointY;
    }

    if (firstLoop) {
        checkPointManager.newCheckpoint(currentCheckPoint);
    }

    if (!firstLoopCalculationDone && checkPointManager.compareCheckpoint(checkPointManager.checkpoints[0], currentCheckPoint) && checkPointManager.checkpoints.length > 2) {
        firstLoop = false;
        console.error("first loop done");
        checkPointManager.calculateDistances();
        firstLoopCalculationDone = true;
    }

    console.error("currentCheckpointIndex : ");
    console.error(currentCheckpointIndex);
    console.error("checkPointManager.checkpoints : ");
    console.error(checkPointManager.checkpoints);
    console.error("checkPointManager.distances : ");
    console.error(checkPointManager.distances);
    console.error("checkPointManager.longerDistance : ");
    console.error(checkPointManager.longerDistance);
    console.error("checkPointManager.longerDistanceIndex : ");
    console.error(checkPointManager.longerDistanceIndex);
    let thrust: number = 0;
    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    if (nextCheckpointAngle > 90 || nextCheckpointAngle < -90) {
        thrust = 0;
    }
    else {
        thrust = 100;
    }

    if (nextCheckpointDist < 3000) {
        thrust = Math.round(thrust / 1.3);
    }

    if (nextCheckpointDist < 1500) {
        thrust = Math.round(thrust / 1.8);
    }

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    if (firstLoopCalculationDone && checkPointManager.longerDistanceIndex == currentCheckpointIndex - 1 && nextCheckpointAngle < 2 && nextCheckpointAngle > -2) {

        console.error("----BOOSTING : -----");
        console.log(nextCheckpointX + ' ' + nextCheckpointY + ' BOOST');
        hasBoosted = true;
    }
    else {
        console.log(nextCheckpointX + ' ' + nextCheckpointY + ' ' + thrust);
    }

    if (lastCheckpointX != nextCheckpointX && lastCheckpointY != nextCheckpointY) {
        currentCheckpointIndex = currentCheckpointIndex + 1;
        if (currentCheckpointIndex == checkPointManager.checkpoints.length) {
            currentCheckpointIndex = 0;
        }
    }

    lastCheckpointX = nextCheckpointX;
    lastCheckpointY = nextCheckpointY;
}
