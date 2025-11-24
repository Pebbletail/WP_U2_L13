let clicked = [];
let totalMatches = 0;
let playerTurn = 1;
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
      setTimeout(update_turn_display, 1000)
      setTimeout(unblock_clicks, 1000);
    }
  }
}

function end_game() {
  block_screen()
  
  const winner = determine_winner();
  display_winner(winner);
  update_storage(winner);
  spawn_refresh();
}

function update_storage(winner) {
  if (!sessionStorage.getItem(`player1Wins`)) {
    sessionStorage.setItem(`player1Wins`, "0");
  }
  if (!sessionStorage.getItem(`player2Wins`)) {
    sessionStorage.setItem(`player2Wins`, "0");
  }

  if (winner == "1") {
    let wins = Number(sessionStorage.getItem("player1Wins"));
    sessionStorage.setItem("player1Wins", `${wins+1}`);
    console.log("player 1 won. updated")
  }
  
  else {if (winner == "2") {
    let wins = Number(sessionStorage.getItem("player2Wins"));
    sessionStorage.setItem("player2Wins", `${wins+1}`);
    console.log("player 2 won. updated")
  }
  }
  console.log("player1:");
  console.log(sessionStorage.getItem("player1Wins"));

  console.log("player2:");
  console.log(sessionStorage.getItem("player2Wins"));
  update_player_wins_display();
  
}

function spawn_refresh() {
  const refresh = document.createElement("h2");
  refresh.id = "startNewGame";
  const loc = document.getElementById("otherGameContent");

  refresh.textContent = "new game";
  refresh.onclick = function(){refreshGame()};

  loc.appendChild(refresh);
}

function refreshGame() {
  location.reload();
}


function show_card(card) {
  let picNum = (card.id);
  picNum = picNum.at(0);
  card.src = `resources/common/Leaf${picNum}.png`;
}

function hide_chosen() {
  for (let i=0; i<2; i++) {
    hide_card(clicked[i]);
  }
}

function hide_card(card) {
  card.src = "resources/common/CardBack.png";
  unblock_clicks()
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
}


function add_score() {
  let update = 0;
  if (playerTurn==1) {
    player1Score++; 
    update = ["1", player1Score]; }
  else {
    player2Score++;
    update = ["2", player2Score];
  }

  const parent = document.getElementById("pointTracker");
  const trackers = parent.children;
  trackers[playerTurn-1].textContent = `Player ${update[0]} points: ${update[1]}`;
  }

function flip_player() {
  if (playerTurn == 1) {
    playerTurn = 2;
  }
  else if (playerTurn == 2) {
    playerTurn = 1;
  }

  console.log(playerTurn);
}

function update_turn_display() {
  const turnDisplay = document.getElementById("turnDisplay");
  turnDisplay.textContent = `Player ${playerTurn}'s turn`;
}

function determine_winner() {
  if (player1Score > player2Score) {
    return "1";
  }
  else {if(player2Score > player1Score) {
    return "2";
  }}

  return 0;
}

function display_winner(winner) {
  const put = document.getElementById("otherGameContent");
  const display = document.createElement("h3");
  display.id = "winDisplay";

  if (winner == "1" || winner == "2") {
    display.textContent = `Player ${winner} wins!`;
  }
  else {
    display.textContent = "It's a tie!";
  }

  put.appendChild(display);
}

function update_player_wins_display() {
  if (sessionStorage.getItem("player1Wins")) {
    
    const parent = document.getElementById("winTracker");
    const trackers = parent.children;

    trackers[0].textContent = `Player 1 wins: ${sessionStorage.getItem("player1Wins")}`
    trackers[1].textContent = `Player 2 wins: ${sessionStorage.getItem("player2Wins")}`
  }
}



function main() {
    create_board();
    update_player_wins_display();
}

main();