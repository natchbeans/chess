//Creates a BLANK chess board. Uses DOM manipulation to dynamically create div elements.
function createChessBoard() {
    const chessBoardDiv = document.querySelector('.chessBoard'); //select chess board div
    const rows = 8;
    const cols = 8;

    for (let i = 1; i <= rows; i++){

        for(let j = 1; j <= cols; j++){

            const square = document.createElement('div');
            square.classList.add('square');
            
            //on chess board, add row number and col number together. If even its always a black square. 
            if ( (i + j) % 2 === 1){
                square.classList.add('darkSquare');
            }
            else {
                square.classList.add('lightSquare');
            }

            chessBoardDiv.appendChild(square);
            
        }
    }
    //Return the child elements so I can use them in my startingPosition function
    return chessBoardDiv.children;
}

function boardDataStructure(){
    //Create data structure, return board
    const boardDataStructure = [
        [`bR`, `bN`, `bB`, `bQ`, `bK`, `bB`, `bN`, `bR`],
        [`bP`, `bP`, `bP`, `bP`, `bP`, `bP`, `bP`, `bP`],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [`wP`, `wP`, `wP`, `wP`, `wP`, `wP`, `wP`, `wP`],
        [`wR`, `wN`, `wB`, `wQ`, `wK`, `wB`, `wN`, `wR`],
    ];

    return boardDataStructure;

}


function renderPosition(currentBoard, nodeListOfSquares){

    //Render position pieces into the DOM

    //nodelist number 10 is 1st row, 2nd col. but on this array, its 1,1 i think. 
    //So i think to get it matched, its 1(row) * 8 so 8, then + col. 8+2 =10.
    //So 11 would be (1 * 8) + 3 = 11.
    
    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            //convert [row][col] to nodeList number
            const indexNumber = (row * 8) + col;
            //get specific square <div>, connects DOM single number with [row][col]
            const square = nodeListOfSquares[indexNumber]; //takes in nodelist 0-63. so nodelist[10] or something.
            square.innerHTML = ''; //clear html

            const piece = currentBoard[row][col];

            if (piece === null){
                continue;
            }


            const img = document.createElement(`img`);
            img.src = `./pieces/${currentBoard[row][col]}.svg`;
            //DOM does not know about data structure, so we need to find correct div that matches [row][col]
            //So square = 9, is actually [1][1]. right cause (1 * 8) + 1 = 9.
            square.appendChild(img);
        }
    }
}

// function movePiece(currentBoard,row, col){
//     //Given current board, move this piece, needs to loop or something
//     const currentPiece = currentBoard[row][col];
//     currentBoard[row][col] = null;
//     currentBoard[row + 1][col] = currentPiece;

// }

function movePieceTest(currentBoard, nodeListOfSquares){
    //Piece is 'clicked' on the DOM, needs to relate to datastructure, add click event to move
    for (let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col ++){
            //Connects grid to DOM
            const indexNumber = (row * 8) + col; //gives matching index in DOM to rows and cols
            const square = nodeListOfSquares[indexNumber]; //where that index in the DOM actually is


            square.addEventListener(`click`, function(){
                //Adding this listener to every square
                //Listener attached to square[9] knows its row 1, col 1, etc.

                const currentPiece = currentBoard[row][col];

                if (currentPiece === null){
                    //When i click again, currentPlace should be null
                    return;
                }

                console.log(`PIECE HAS BEEN CLICKED`);
                currentBoard[row][col] = null;
                currentBoard[row + 1][col] = currentPiece; 


                renderPosition(currentBoard, nodeListOfSquares);
                console.log(currentBoard);
            });
        }
    }

}


const nodeListOfSquares = createChessBoard();
const currentBoard = boardDataStructure();
renderPosition(currentBoard, nodeListOfSquares);
console.log(currentBoard);
movePieceTest(currentBoard, nodeListOfSquares);