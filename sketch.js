let chaserX, chaserY;  // Chasing circle position
let chaserSpeedX, chaserSpeedY;  // Chasing circle speed

let animalX, animalY;  // "Animal" position
let animalSpeed = 2;   // Animal speed

// Extra circles for artistic effect
let extraCircles = [];

function setup() {
    createCanvas(800, 600);
    noStroke();

    // Initialize the chaser circle
    chaserX = width / 2;
    chaserY = height / 2;
    chaserSpeedX = 4;
    chaserSpeedY = 3;

    // Initialize the animal's position
    animalX = random(width);
    animalY = random(height);

    // Create extra moving circles
    for (let i = 0; i < 20; i++) {
        extraCircles.push({
            x: random(width),
            y: random(height),
            size: random(20, 50),
            speedX: random(-3, 3),
            speedY: random(-3, 3),
            color: [random(255), random(255), random(255), 150]
        });
    }
}

function draw() {
    // Fading background for a trail effect
    fill(0, 25);
    rect(0, 0, width, height);

    // Artistic chasing circle
    fill(255, 100, 150, 200);
    ellipse(chaserX, chaserY, 50, 50);

    // Update chasing circle's position
    chaserX += chaserSpeedX;
    chaserY += chaserSpeedY;

    // Bounce off walls
    if (chaserX <= 25 || chaserX >= width - 25) chaserSpeedX *= -1;
    if (chaserY <= 25 || chaserY >= height - 25) chaserSpeedY *= -1;

    // Artistic representation of the "animal"
    fill(100, 255, 150, 200);
    ellipse(animalX, animalY, 40, 40);

    // Move the animal away from the circle
    if (chaserX < animalX) animalX += animalSpeed;
    else animalX -= animalSpeed;

    if (chaserY < animalY) animalY += animalSpeed;
    else animalY -= animalSpeed;

    // Reset animal if caught
    let distance = dist(chaserX, chaserY, animalX, animalY);
    if (distance < 45) {
        animalX = random(width);
        animalY = random(height);
        animalSpeed += 0.5;  // Increase animal speed
    }

    // Draw extra moving circles
    for (let circle of extraCircles) {
        fill(circle.color);
        ellipse(circle.x, circle.y, circle.size, circle.size);

        // Update circle positions
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Bounce off edges
        if (circle.x <= 0 || circle.x >= width) circle.speedX *= -1;
        if (circle.y <= 0 || circle.y >= height) circle.speedY *= -1;
    }

    // Display a message in the center
    fill(255, 255, 255, 200);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Thanks for a Great Semester!", width / 2, height / 2);
}
