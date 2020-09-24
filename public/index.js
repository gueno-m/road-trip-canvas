const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d');
const fond = document.getElementById("fond");
const car = document.getElementById("car");
const moteur = new Audio('moteur.mp3')
const klaxon = new Audio('klaxon.mp3')
const screen = new Audio('screen.mp3')

let blob;

const cloud = new Image();
cloud.src = 'cloud.png';

const crack = new Image();
crack.src = 'crack.png';

const tree = new Image();
tree.src = 'tree.png';

const sun = new Image();
sun.src = 'sun.png';

let startX = 200;
let startY = 100;

let time = 0;
let speed = 2;
let input = 0;

let isKlaxon = false

let isScreen = false

function animation() {
    requestAnimationFrame(animation);
    time += speed

    ctx.fillStyle = 'grey'
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill()

    const horizon = 300

    ctx.beginPath();
    ctx.rect(0, horizon, canvas.width, canvas.height);
    ctx.drawImage(fond, 0, 0, canvas.width, canvas.height);
    ctx.fill()

    ctx.beginPath();
    ctx.drawImage(sun, (0 + time / 60) % canvas.width, -10, 100, 100);
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo((time / 5 - 3) % canvas.width - 3, 40);
    ctx.lineTo(time / 5 % canvas.width, 40);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((time / 3 - 1) % canvas.width / 2 - 1, 60);
    ctx.lineTo(time / 3 % canvas.width / 2, 60);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.drawImage(cloud, (0 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 150, 100);
    ctx.drawImage(cloud, (250 + time) % canvas.width - 300, Math.sin(time /
        100) * 10 + 100, 150, 160);
    ctx.drawImage(cloud, (470 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 250, 150);
    ctx.drawImage(cloud, (750 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 160, 150);
    ctx.drawImage(cloud, (1000 + time) % canvas.width - 300, Math.sin(time /
        100) * 10 + 100, 300, 130);
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(canvas.width, horizon);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + 50, horizon);
    ctx.lineTo(canvas.width / 2 + 300, canvas.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 50, horizon);
    ctx.lineTo(canvas.width / 2 - 300, canvas.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    for (let i = 0; i < 5; i++) {
        length = 500;
        distance = 90;
        v = ((time + i * distance) % (canvas.height - horizon));

        g = horizon + v;
        h = g + length * g * g * 0.0000002;

        if (h > canvas.height) {
            h = canvas.height;
        }

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, g);
        ctx.lineTo(canvas.width / 2, h);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    oCrack = time / 5 % 85.5

    oTree = (time / 5.8 % 155) + 300

    ctx.beginPath();
    ctx.drawImage(crack, canvas.width / 2 + oCrack, horizon + ((time / 85 * distance) % (canvas.height - horizon)), 60, 28)

    ctx.drawImage(tree, canvas.width / 2 + oTree, horizon + ((time / 150 * distance) % (canvas.height - horizon)), 150, 150)
    ctx.fill()

    let value = navigator.getGamepads()[0].axes[2];

    ctx.beginPath();
    input = lerp(input, value, 0.1);
    ctx.drawImage(car, canvas.width / 2 + input * 190 - 75, Math.sin(time / 20) * 2 + 600, 150, 90);
    ctx.fill();

    if (navigator.getGamepads()[0].buttons[0].value == 1 && isKlaxon == false) {

        klaxon.play()
        klaxon.loop = false
        isKlaxon = true
    }
    if (navigator.getGamepads()[0].buttons[0].value == 0 && isKlaxon == true) {
        isKlaxon = false
    }

    for (let b = 0; b < 1; b++) {

        lengthC = 500;
        distanceC = 15;
        vC = ((time / 2 + b * distanceC) % (canvas.height - horizon));

        gC = horizon + vC;
        hC = gC + length * gC * gC * 0.0000002;

        e = b * distanceC

        if (hC > canvas.height) {
            hC = canvas.height;
        }

        let pDépart = { x: canvas.width / 2 + 100 + e, y: horizon + 3 };
        let pContrôle1 = {
            x: pDépart.x + e * 2,
            y: horizon + 20 + e
        };
        let pContrôle2 = {
            x: pDépart.x + e,
            y: horizon + 20 + e
        };
        let pArrivée = { x: canvas.width / 2 + 400 + e, y: canvas.height - 2 };

        ctx.beginPath();
        ctx.moveTo(pDépart.x, pDépart.y);
        ctx.bezierCurveTo(pContrôle1.x, pContrôle1.y, pContrôle2.x, pContrôle2.y, pArrivée.x, pArrivée.y);
        ctx.strokeStyle = '#7fdb71';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    if (navigator.getGamepads()[0].buttons[1].value == 1 && isScreen == false) {
        screen.play()
        screen.loop = false
        isScreen = true
        const can = document.querySelector('canvas')
        blob = can.toBlob(b => send(b))
    }
    if (navigator.getGamepads()[0].buttons[1].value == 0 && isScreen == true) {
        isScreen = false
    }
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("A gamepad connected:");
    moteur.play();
    animation();
});

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function send(b) {

    const formData = new FormData()
    formData.append('title', 'Your road trip : ')
    formData.append('experiment', b, 'road-trip.jpg')

    fetch('/experiment', {
        method: 'POST',
        body: formData,
    }).then(res => console.log(res.text()))
}