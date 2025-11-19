function create_board(layout) {
  const container = document.getElementById("allCards");
  let num=0;
  for (let r=0; r<4; r++) {
    const row = container.children[r];
    for (let c=0; c<5; c++) {
      const cell = row.children[c];

      const card = document.createElement("img");
      card.src = layout[num];
      console.log(layout[num]);
      card.alt = `Card Number ${num}`;
      card.className = "cardImg";
      cell.appendChild(card);

      num++;
    }
  }
}

function store_inital_pos(list) {
  sessionStorage.setItem("cardLayout", `${list}`);
}

function initialize_cards() {
  const list = [];
  for (let i=0; i<10; i++) {
    const currCard = `resources/common/Leaf${i}.png`;
    const matchCard = `resources/common/Leaf${i}.png`;

    list.push(currCard, matchCard);
  }
  return list;
}

function shuffle(list) {
  let shuffled = [];
  for (let i=0; i<list.length; i++) {
    el = list.pop();
    shuffled.push(el);
  }
  return shuffled;
}

function choice(list) {
  return list.randint(0, list.length-1);
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




function main() {
  if (!sessionStorage.getItem("cardLayout")) {
    c = initialize_cards();
    shufc = shuffle(c);
    console.log(`AAA${shufc}`);
    store_inital_pos(shufc);
  }
  layout = sessionStorage.getItem("cardLayout").split(",");
  create_board(layout);
}

main();