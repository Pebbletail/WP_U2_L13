let clicked = [];
let totalMatches = 0;
let playerTurn = 0;
let player1Score = 0;
let player2Score = 0;


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
      delete list[rand];
      shuffled.push(el);
    }
  }
  return shuffled;
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
      card.src = "resources/common/CardBack.png";
      card.alt = `Card Number ${num}`;
      card.className = layout[num].split(" ")[0];
      card.id = layout[num];

      card.onclick = function(){clicked_card(card)};

      cell.appendChild(card);

      num++;
    }
  }
}



function clicked_card(card) {
  show_card(card);
  clicked.push(card);
  console.log(clicked);

  if (clicked.length == 2) {
    if (clicked[0].className == clicked[1].className) {
      console.log("Match!");
      totalMatches++;

      add_score();
      clear_clicked();
      flip_player();

      console.log(totalMatches);
      if (totalMatches == 10) {
        end_game();
      }
    }
    else {
      console.log("Not a match!");
      block_screen();

      setTimeout(hide_chosen, 1000);
      setTimeout(clear_clicked, 1000);
      setTimeout(flip_player, 1000);
      setTimeout(unblock_clicks, 1000);
    }
  }
}

function end_game() {
  block_screen()
  
  const winner = String(playerTurn++);
  console.log(`game ended! player ${winner} wins!`);
  update_storage(winner);
}

function update_storage(winner) {
  if (!sessionStorage.getItem(`player1Wins`)) {
    sessionStorage.setItem(`player1Wins`, "0");
  }
  if (!sessionStorage.getItem(`player2Wins`)) {
    sessionStorage.setItem(`player2Wins`, "0");
  }

  else {
    const wins = Number(sessionStorage.getItem(`player${winner}Wins`));
    sessionStorage.setItem(`player${winner}Wins`, `${wins++}`);
  }
  console.log(sessionStorage.getItem(`player${winner}Wins`));
}


function show_card(card) {
  let picNum = (card.id);
  picNum = picNum.at(0);
  card.src = `resources/common/Leaf${picNum}.png`;
  block_card(card);
}

function hide_chosen() {
  console.log("hiding chosen cards");
  for (let i=0; i<2; i++) {
    hide_card(clicked[i]);
  }
}

function hide_card(card) {
  card.src = "resources/common/CardBack.png";
  unblock_clicks()
}

function block_card(card) {
  const toBlock = document.getElementById(card.id).parentElement;
  const blocker = document.createElement("div");
  blocker.className = "blockDiv";
  toBlock.appendChild(blocker);
}

function block_screen() {
  const toBlock = document.getElementById("allCards");
  const blocker = document.createElement("div");
  blocker.className = "blockDiv";
  toBlock.appendChild(blocker);
}

function unblock_clicks() {
  const toRemove = document.getElementsByClassName("blockDiv");

  for (let i=0; i<toRemove.length; i++) {
    toRemove[i].remove();
  }
}

function clear_clicked() {
  for (let i=0; i<clicked.length+1; i++) {
    clicked.pop();
  }
  console.log(clicked);
}


function add_score() {
  if (playerTurn==0) {
    player1Score++; }
  else {
    player2Score++;
  }
  }

function flip_player() {
  playerTurn = Number(!Boolean(playerTurn));
  console.log(playerTurn++);
}



function main() {
    create_board();
}

main();