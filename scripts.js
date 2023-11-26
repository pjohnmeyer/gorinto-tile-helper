
const VOID = 'xx &#x7a7a xx';
const WIND = '-- &#x6c34 --';
const EARTH = '.. &#x5730 ..';
const FIRE = '^^ &#x706b ^^';
const WATER = '~~ &#x98a8 ~~';
const DRAGON = '~&gt; &#x1f409; &lt;~';

class Gorinto
{
  constructor() {
    this.bag = this.fillBag();
    this.fiveP = false;
  }

  fillBag() {
    const allTiles = new Array(100);
    allTiles.fill(VOID, 0, 20);
    allTiles.fill(WIND, 20, 40);
    allTiles.fill(EARTH, 40, 60);
    allTiles.fill(FIRE, 60, 80);
    allTiles.fill(WATER, 80, 100);

    return this.shuffle(allTiles)
  }

  addTileToBag(tile) {
    const insertionPos = Math.floor(Math.random() * this.bag.length);
    this.bag.splice(insertionPos, 0, tile);
  }

  enableDragonExpansion() {
    for (let i = 0; i < 5; ++i) {
      const insertionPos = Math.floor(Math.random() * this.bag.length);
      this.bag.splice(insertionPos, 0, DRAGON);
    }
  }

  enableFivePlayerMode() {
    for (let i = 0; i < 5; ++i) {
      this.addTileToBag(VOID);
      this.addTileToBag(WIND);
      this.addTileToBag(EARTH);
      this.addTileToBag(WATER);
      this.addTileToBag(DRAGON);
    }
    this.fiveP = true;
  }

  shuffle(tiles) {
    let currentIndex = tiles.length;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [tiles[currentIndex], tiles[randomIndex]] = [
        tiles[randomIndex], tiles[currentIndex]];
    }

    return tiles;
  }

  draw() {
    return this.bag.pop();
  }

  static populateBoard() {
    const g = new Gorinto();
    let extraMountainTilesPerStack = 0;

    if (document.querySelector('#dragon-chk').checked) {
      g.enableDragonExpansion();
    }

    if (document.querySelector('#fivep-chk').checked) {
      g.enableFivePlayerMode();
      extraMountainTilesPerStack = 1;
    }

    const renderTile = (t) => {
      const tiles = [VOID, WIND, EARTH, FIRE, WATER, DRAGON];
      const classes = ['void', 'wind', 'earth', 'fire', 'water', 'dragon'];

      const tileClasses = {};
      tiles.forEach((t, i) => { tileClasses[t] = classes[i]; });

      return `<div class="tile ${tileClasses[t]}">${t}<br/></div>`
    }

    const cells = document.querySelectorAll('td');
    cells.forEach((e) => {
      let stack = new Array(parseInt(e.getAttribute('data-mountain')) + extraMountainTilesPerStack);
      stack.fill('x');
      stack = stack.map(_ => g.draw());
      e.innerHTML = stack.map(renderTile).join("\n");
    });

    return g;
  }
}
