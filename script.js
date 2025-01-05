let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;   //playerX,playerO
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log('Box was clicked');
        if (turnX){     //playerX
            box.style.color = "#b0413e" ;
            box.innerText = 'X';
            turnX = false;
        }
        else{           //playerO
            box.style.color = "black" ;
            box.innerText = 'O';
            turnX = true;
        }
        count ++;
        // console.log(count);
        box.disabled = true;       //It is used to block the box from overwritting
        
        if (count === 9){
            msgContainer.classList.remove("hide");
            msg.innerText = "The game is Draw!";
        }

        checkWinner();
    });
});

const newGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.style.backgroundColor = "#ffffc7";
        box.innerText = '';
        count = 0;
    }
}

const checkWinner = () =>{
    for (const pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerTextb,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        if(pos1Val !== '' && pos2Val !== '' && pos3Val !== ''){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val,pattern[0],pattern[1],pattern[2]);
            }
        }
    }
}

const showWinner = (winner,a,b,c) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();  
    boxes[a].style.backgroundColor = "white";
    boxes[b].style.backgroundColor = "white";
    boxes[c].style.backgroundColor = "white";
}

newBtn.addEventListener("click",newGame);
resetBtn.addEventListener("click",newGame);

