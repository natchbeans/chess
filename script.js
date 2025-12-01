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

//Function to set the starting pieces on the board. They are just svg files. 
function setStartingPositionPieces(){
    //Calling the createChessBoard() function to display blank board. 
    const chessBoardNodeListSquares = createChessBoard();
    
    //Section is self explanatory. I loop through these objects/ arrays and append image elements into the child elements of the board.
    const firstBlackRow = {
        0: `./pieces/bR.svg`,
        1: `./pieces/bN.svg`,
        2: `./pieces/bB.svg`,
        3: `./pieces/bQ.svg`,
        4: `./pieces/bK.svg`,
        5: `./pieces/bB.svg`,
        6: `./pieces/bN.svg`,
        7: `./pieces/bR.svg`,
    };

    //These are just arrays because every index is going to have the same pawn image.
    const blackPawnRow = [8,9,10,11,12,13,14,15];
    
    const firstWhiteRow = {
        56: `./pieces/wR.svg`,
        57: `./pieces/wN.svg`,
        58: `./pieces/wB.svg`,
        59: `./pieces/wQ.svg`,
        60: `./pieces/wK.svg`,
        61: `./pieces/wB.svg`,
        62: `./pieces/wN.svg`,
        63: `./pieces/wR.svg`,
    };

    const whitePawnRow = [48,49,50,51,52,53,54,55];

    for (let key in firstBlackRow){
        const img = document.createElement(`img`);
        img.src = firstBlackRow[key];
        chessBoardNodeListSquares[key].appendChild(img);
    };

    blackPawnRow.forEach(function(index){
        const img = document.createElement(`img`);
        img.src = `./pieces/bP.svg`;
        chessBoardNodeListSquares[index].appendChild(img);
    });

    for (let key in firstWhiteRow){
        const img = document.createElement(`img`);
        img.src = firstWhiteRow[key];
        chessBoardNodeListSquares[key].appendChild(img);
    };

    whitePawnRow.forEach(function(index){
        const img = document.createElement(`img`);
        img.src = `./pieces/wP.svg`;
        chessBoardNodeListSquares[index].appendChild(img);
    });

}

setStartingPositionPieces();