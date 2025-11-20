function create_board() {
  const container = document.getElementById("allCards");
  let num=0;
  const cardList = initialize_cards();
  const layout = shuffle(cardList);

  for (let r=0; r<4; r++) {
    const row = container.children[r];
    for (let c=0; c<5; c++) {
      const cell = row.children[c];

      const card = document.createElement("img");
      /*console.log(layout[num]);*/
      card.src = "resources/common/CardBack.png";
      card.alt = `Card Number ${num}`;

      card.id = layout[num];

      card.onclick = function(){clicked_card(card)};

      cell.appendChild(card);

      num++;
    }
  }
}

function clicked_card(card) {
  const picNum = show_card(card);

}


function show_card(card) {
  let picNum = (card.id);
  picNum = picNum.at(0);
  card.src = `resources/common/Leaf${picNum}.png`;
  return picNum;
}

function initialize_cards() {
  let list = [];
  for (let i=0; i<10; i++) {
    for (let n=0; n<2; n++) {
      const card = `${i} ${n}`;

      list.push(card);
    }
  }
  return list;
}

function shuffle(list) {
  let shuffled = [];
  while (shuffled.length < list.length) {
    const rand = randint(0, list.length);
    const el = list[rand];
    if (el != undefined) {
      console.log(el)
      delete list[rand];
      shuffled.push(el);
    }
  }
  return shuffled;
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




function main() {
    create_board();
}

main();