
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

//Depending on what piece is clicked, there is going to be available moves I think.
//For instance a pawn cannot move more than 1 square(or 2 from starting square)
//But a Rook or Queen can move the length of the board if there is nothing occupying those squares. 

function highlightLegalMoves(currentBoard, row, col){
    //Returns array of legal moves
    const legalMovesWhite = [];
    const legalMovesBlack = [];
    const pieceColor = currentBoard[row][col][0];
    //return list of legal moves for pawn
    if (pieceColor === `w`){
        if (currentBoard[row - 1][col] === null){
            legalMovesWhite.push([row - 1, col]); //return coord, if pawn at 5,0 is clicked, and 4,0 is null, it returns 4,0
        }
        console.log(`White legal moves are: ${legalMovesWhite}`);
        return legalMovesWhite;
    }
    else {
        if (currentBoard[row + 1][col] === null){
            legalMovesBlack.push([row + 1, col]);
        }
        console.log(`Black legal moves are: ${legalMovesBlack}`);
        return legalMovesBlack
    }
}

function selectPieceToMove(currentBoard, nodeListOfSquares){
    //Lichess: Piece is clicked -> current square is darkened, legal moves are given small dark circle.
    //When mouse hovers over legal move (hover event?) adds darkened effect, removes circle.
    //Piece is moved when legal square clicked. Yellow effect on square that was piece moved from and to.

    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            const indexNumber = (row * 8) + col; //convert row,col to indexNumber in DOM
            const square = nodeListOfSquares[indexNumber]; //Grab that square in DOM

            square.addEventListener(`click`, function(){
                //Loop through all nodeList, and remove the legalMove class
                for (let i = 0; i < nodeListOfSquares.length; i++){
                    nodeListOfSquares[i].classList.remove(`legalMoveCircle`);
                    nodeListOfSquares[i].classList.remove(`move-dest`);
                }
                
                //For each square when clicked => display legalMoves
                console.log(`Piece has been clicked`);
                highlightLegalMoves(currentBoard, row, col).forEach(coord => {
                    const indexNumberOfLegalSquares = (coord[0] * 8) + coord[1];
                    const squareOfLegalMove = nodeListOfSquares[indexNumberOfLegalSquares];
                    squareOfLegalMove.classList.add(`legalMoveCircle`);
                    squareOfLegalMove.classList.add(`move-dest`);
                });


                //On Lichess, piece is clicked -> ONLY while piece is clicked, can you hover over legal moves

            });
        }
    }
}

function movePiece (currentBoard, nodeListOfSquares){
    //When legal move is clicked, move piece, need to figure out hover.
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





let currentPlayer = `w`;
const nodeListOfSquares = createChessBoard();
const currentBoard = boardDataStructure();
renderPosition(currentBoard, nodeListOfSquares);
console.log(currentBoard);
selectPieceToMove(currentBoard, nodeListOfSquares);