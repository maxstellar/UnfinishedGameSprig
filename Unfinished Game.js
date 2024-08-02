/*
@title: Unfinished Game
@author: Vi Du Tran
@tags: ['test']
@addedOn: 2024-00-00

This game is totally unfinished. There is nothing to see here.
WASD to move. L to advance text. J to reset level.
*/

const player = "p"
const textwall = "t"
const box = "b"
const talk = tune`
159.5744680851064: C4~159.5744680851064,
159.5744680851064: C5/159.5744680851064,
159.5744680851064: G4-159.5744680851064,
4627.659574468085`;
let initial = 0;
let line = 0;

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
1111111111111111` ]
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
ttttttt`
]

const lines = [
  "Hi.",
  "Sorry for the \ninconvenience, but \nthis game is \nunfinished.",
  "There is nothing for you to do here.",
  "The truth is, I \ndon't know.",
  "Heck, I don't even \nknow where I am.",
  "I suppose we are \ntrapped here \ntogether.",
  "Well, while you're \nhere, let me give \nyou something to \ndo.",
  "There! A box."
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
  if (line == 7 && initial != 2) {
    initial = 0;
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    spawn(2, 2, box);
    level = 1;
    initial = 2;
  } else if (initial == 1 || initial == 2) {
      clearText();
      line = line + 1;
      playTune(talk);
      addText(lines[line], {x: 1, y: 11, color: color`2`});
  }
});

function among() {
  clearText();
  playTune(talk);
  addText(lines[line], {x: 1, y: 11, color: color`2`});
  initial = 1;
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
