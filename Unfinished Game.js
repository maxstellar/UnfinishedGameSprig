/*
@title: Unfinished Game
@author: Vi Du Tran
@tags: ['test']
@addedOn: 2024-00-00

This game is totally unfinished. There is nothing to see here.
WASD to move. L to advance text. J to reset level.
*/

const player = "p";
const textwall = "t";
const box = "b";
const goal = "g";
const talk = tune`
159.5744680851064: C4~159.5744680851064,
159.5744680851064: C5/159.5744680851064,
159.5744680851064: G4-159.5744680851064,
4627.659574468085`;
let initial = 0;
let line = -1;

setLegend(
  [ player, bitmap`
................
................
.......000......
.......060......
......0660......
......06660.0...
....000L6L0.0...
....0.0666000...
....0.0LLL0.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................` ],
  [ textwall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ box, bitmap`
1111111111111111
1111111111111111
111LLLLLLLLLL111
11L1LLLLLLLL1L11
11LL1LLLLLL1LL11
11LLL1LLLL1LLL11
11LLLL1LL1LLLL11
11LLLLL11LLLLL11
11LLLLL11LLLLL11
11LLLL1LL1LLLL11
11LLL1LLLL1LLL11
11LL1LLLLLL1LL11
11L1LLLLLLLL1L11
111LLLLLLLLLL111
1111111111111111
1111111111111111` ],
  [ goal, bitmap`
....DDDDDDDD....
...DDDDDDDDDD...
..DDDDDDDDDDDD..
.DDDD444444DDDD.
DDDD44444444DDDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDDD44444444DDDD
.DDDD444444DDDD.
..DDDDDDDDDDDD..
...DDDDDDDDDD...
....DDDDDDDD....` ]
)

setSolids([ player, textwall, box ])

let level = 0
const levels = [
  map`
p......
.......
.......
.......
ttttttt
ttttttt`,
  map`
p......
.......
..b....
.......
ttttttt
ttttttt`,
  map`
p......
.......
..b....
......g
ttttttt
ttttttt`
]

const lines = [
  "Hi.",
  "Sorry for the \ninconvenience, but \nthis game is \nunfinished.",
  "There is nothing \nfor you to do \nhere.",
  "...",
  "Well, since you \nmade it all the \nway here...",
  "Let me \ngive you something \nto do.",
  "There! A box.",
  "Have fun! Play \naround with it a \nlittle, even.",
  "What's that?",
  "You're bored?",
  "Hm... Here. Let me \nset a little \nsomething up...",
  ""
]

setMap(levels[level])

setPushables({
  [ player ]: [box],
  [ box ]: [box]
})

onInput("w", () => {
  getFirst(player).y -= 1;
})

onInput("a", () => {
  getFirst(player).x -= 1;
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("d", () => {
  getFirst(player).x += 1;
})

// reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// advance text
onInput("l", () => {
  if (line == 5 && initial != 2) {
    if (initial == 0) {
        return
    }
    initial = 0;
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    spawn(2, 2, box);
    level = 1;
    initial = 2;
  } else if (line == 7) {
      if (initial == 0) {
        return
      }
      initial = 0;
      clearText();
      setTimeout(among, 3000);
      setTimeout(among, 6000);
      setTimeout(among, 9000);
      setTimeout(() => {
      addSprite(6, 3, goal);
      }, 12000);
      setTimeout(() => {
      level = 2;
      }, 12000);
      setTimeout(() => {
      playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
      }, 12000);
      
  } else if (initial == 1 || initial == 2) {
      clearText();
      line += 1;
      playTune(talk);
      addText(lines[line], {x: 1, y: 11, color: color`2`});
  }
});

function among() {
  line += 1
  clearText();
  playTune(talk);
  addText(lines[line], {x: 1, y: 11, color: color`2`});
}

function spawn(x, y, sprite) {
  let tile = getTile(x,y)
  console.log(tile.length)
  if (tile.length == 0)  {
    addSprite(x, y, sprite);
  } else {
    addSprite(x + 1, y, sprite);
  }
}

afterInput(() => {
})


setTimeout(among, 100);
setTimeout(() => {
  initial = 1;
}, 100);
