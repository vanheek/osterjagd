
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100, y: 100, width: 50, height: 50, color: 'red', dy: 0, jumping: false
};
let gravity = 0.5;
let keys = {};
let dialogIndex = 0;
let dialogActive = true;

const dialogs = [
  { character: 'OMA-Drohne', text: 'Luca! Onkel Matze hat sich die Eier geschnappt und will sie im Rathaus horten!' },
  { character: 'Luca', text: 'Was?! Das kann ich nicht zulassen. Ich mach mich auf die Suche!' },
  { character: 'OMA-Drohne', text: 'Beeil dich! Ich fliege voraus und halte dich auf dem Laufenden!' }
];

const dialogBox = document.getElementById('dialogBox');
const dialogCharacter = document.getElementById('dialogCharacter');
const dialogText = document.getElementById('dialogText');
const nextDialog = document.getElementById('nextDialog');

function showDialog(index) {
  if (index < dialogs.length) {
    dialogCharacter.innerText = dialogs[index].character;
    dialogText.innerText = dialogs[index].text;
    dialogBox.classList.remove('hidden');
  } else {
    dialogBox.classList.add('hidden');
    dialogActive = false;
  }
}

nextDialog.addEventListener('click', () => {
  dialogIndex++;
  showDialog(dialogIndex);
});

showDialog(dialogIndex);

document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);
document.getElementById('leftBtn').addEventListener('touchstart', () => keys['ArrowLeft'] = true);
document.getElementById('leftBtn').addEventListener('touchend', () => keys['ArrowLeft'] = false);
document.getElementById('rightBtn').addEventListener('touchstart', () => keys['ArrowRight'] = true);
document.getElementById('rightBtn').addEventListener('touchend', () => keys['ArrowRight'] = false);
document.getElementById('jumpBtn').addEventListener('touchstart', () => keys['Space'] = true);
document.getElementById('jumpBtn').addEventListener('touchend', () => keys['Space'] = false);

let platforms = [
  { x: 0, y: canvas.height - 50, width: canvas.width, height: 50 },
  { x: 200, y: canvas.height - 150, width: 100, height: 20 },
  { x: 400, y: canvas.height - 250, width: 100, height: 20 }
];

function update() {
  if (!dialogActive) {
    if (keys['ArrowRight']) player.x += 5;
    if (keys['ArrowLeft']) player.x -= 5;
    if (keys['Space'] && !player.jumping) {
      player.dy = -10;
      player.jumping = true;
    }

    player.dy += gravity;
    player.y += player.dy;

    platforms.forEach(p => {
      if (
        player.x < p.x + p.width &&
        player.x + player.width > p.x &&
        player.y + player.height < p.y + 20 &&
        player.y + player.height + player.dy >= p.y
      ) {
        player.y = p.y - player.height;
        player.dy = 0;
        player.jumping = false;
      }
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = 'saddlebrown';
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
