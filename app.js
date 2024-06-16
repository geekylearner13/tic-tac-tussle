const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');
const resetBtn = document.querySelector('.resetBtn');

let XScore = 0;
let OScore = 0;


let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = ("Player1: "+currentPlayer);
player2.textContent = ("Player2: "+nextPlayer);

const startGame = () => { 
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick,true);
    });
}

const handleClick = (e) =>{
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if(checkWin()){
            showAlert(playerTurn+" is a Winner!");
            let sVariableName = playerTurn +"Score";
            if(sVariableName === 'XScore'){
                XScore +=1;
            }
            else{
                OScore += 1;
            }
            disableCells();
        }
        else if(checkTie()){
            showAlert("It's a Tie");
            disableCells();
        }
        else{
            changePlayerTurn(); 
            showAlert("Turn for Player: "+ playerTurn)  
        }
         
    };
}

const changePlayerTurn = ()=>{
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
};

const checkWin = () =>{
    const winningConditions=
        [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
    for(let i=0;i<winningConditions.length;i++){
        const[pos1,pos2,pos3]= winningConditions[i];
        if(gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent && 
        gameCells[pos2].textContent === gameCells[pos3].textContent){
            return true;
        }
    }
    return false;    
}

const checkTie = ()=>{
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if(cell.textContent ===''){
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWin();
}

const disableCells = () =>{
    gameCells.forEach(cell => {
        // cell.removeEventListner('click',handleClick,true);
        cell.classList.add('disabled');
        setTimeout(() => {
            alertBox.style.display = "none";
            updateScore(XScore,OScore);
            higlightPlayer();
            restartGame();
        },5000);
    });
    
}
const restartGame = () =>{
    gameCells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('disabled');       
    });
    startGame();
}

const resetGame = () =>{
    XScore = 0;
    OScore = 0;
    gameCells.forEach(cell =>{
        cell.textContent = '';
    });
    updateScore(XScore,OScore);
    if(document.querySelectorAll(".hText").length>0){
        document.querySelector(".player").classList.remove("hText");
    }
    startGame();
}

const showAlert = (msg) =>{
    alertBox.style.display = "block"
    alertBox.textContent = msg;
    setTimeout(() => {
        alertBox.style.display = "block";
    },5000);
}

const updateScore = (x,o) => {
    document.querySelector(".p1Score").innerHTML = x;
    document.querySelector(".p2Score").innerHTML = o;   
};

const higlightPlayer = () =>{
    if(XScore>OScore){
        if(document.querySelectorAll(".hText").length>1){
            document.querySelector(".player2").classList.remove("hText");
            document.querySelector(".player1").classList.add("hText");
        }
        else{
            document.querySelector(".player1").classList.add("hText");
        }              
    }
    else if(XScore == OScore){
        document.querySelector(".player").classList.remove("hText");
       
    }
    else{
        if(document.querySelectorAll(".hText").length>1){
            document.querySelector(".player1").classList.remove("hText");
            document.querySelector(".player2").classList.add("hText");
        }
        else{
            document.querySelector(".player2").classList.add("hText");
        }

    }
}


restartBtn.addEventListener('click',restartGame);
resetBtn.addEventListener('click',resetGame);

startGame();