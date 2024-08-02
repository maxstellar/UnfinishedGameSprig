/*
@title: Untitled
@author: Vi Du Tran
@tags: ['test']
@addedOn: 2024-00-00

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
ttttttt`
]

const lines = [
  "Hi.",
  "Sorry for the\n sudden appearance.",
  "You might be\n wondering...",
  '"What am I\n doing here?"'
]

setMap(levels[level])

setPushables({
  [ player ]: [box]
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
  if (initial == 1) {
    line = line + 1
    playTune(talk);
    addText(lines[line], {x: 1, y: 11, color: color`2`});
  }
});

function among() {
  playTune(talk);
  addText("Hi.", {x: 1, y: 11, color: color`2`});
  initial = 1
}
afterInput(() => {
})

let line = 0;
setTimeout(among, 6000);
