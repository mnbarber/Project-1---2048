// query selectors to grab game board

const gameBoard = document.querySelector('.gameboard')
const score = document.getElementById('score')
const resultDisplay = document.querySelector('.result')
const width = 4
let tiles = []
let currentScore = 0

//create game board insides

function createBoard() {
    for(let i = 0; i < width * width; i++) {
        let tile = document.createElement('div')
        tile.innerHTML = ''
        gameBoard.appendChild(tile)
        tiles.push(tile)
    }
    addNum()
    addNum()
}

createBoard()
// it WORKED 

// add a random 2 to the board
function addNum() {
    let num = Math.floor(Math.random() * tiles.length)
    if(tiles[num].innerHTML == '') {
        tiles[num].innerHTML = 2
        checkForLose()
    } else addNum()
}

// move numbers in a direction
function moveRight() {
    for(let i = 0; i < 16; i++) {
        if(i % 4 === 0) {
            // grabbing all 4 tiles in a single row
            let tileOne = tiles[i].innerHTML
            let tileTwo = tiles[i+1].innerHTML
            let tileThree = tiles[i+2].innerHTML
            let tileFour = tiles[i+3].innerHTML
            // putting those 4 tiles in a single array as numbers
            let row = [parseInt(tileOne), parseInt(tileTwo), parseInt(tileThree), parseInt(tileFour)]

            let filteredRow = row.filter(numb => numb)
            // inserting 0's in the remaining array beside the 2's
            let emptyTile = 4 - filteredRow.length
            let zeroes = Array(emptyTile).fill('')
            // pushing the 2's to the right of the gameboard
            let newRow = zeroes.concat(filteredRow)

            tiles[i].innerHTML = newRow[0]
            tiles[i+1].innerHTML = newRow[1]
            tiles[i+2].innerHTML = newRow[2]
            tiles[i+3].innerHTML = newRow[3]
        }
    }
}

// same thing but left, everything is the same besides the function name and the order you combine(concat)
function moveLeft() {
    for(let i = 0; i < 16; i++) {
        if(i % 4 === 0) {
            // grabbing all 4 tiles in a single row
            let tileOne = tiles[i].innerHTML
            let tileTwo = tiles[i+1].innerHTML
            let tileThree = tiles[i+2].innerHTML
            let tileFour = tiles[i+3].innerHTML
            // putting those 4 tiles in a single array as numbers
            let row = [parseInt(tileOne), parseInt(tileTwo), parseInt(tileThree), parseInt(tileFour)]

            let filteredRow = row.filter(numb => numb)
            // inserting 0's in the remaining array beside the 2's
            let emptyTile = 4 - filteredRow.length
            let zeroes = Array(emptyTile).fill('')
            // pushing the 2's to the right of the gameboard
            let newRow = filteredRow.concat(zeroes)

            tiles[i].innerHTML = newRow[0]
            tiles[i+1].innerHTML = newRow[1]
            tiles[i+2].innerHTML = newRow[2]
            tiles[i+3].innerHTML = newRow[3]
        }
    }
}

// moving down now
function moveDown() {
    for(let i = 0; i < 4; i++) {
        // this time you do +width because you're moving down a row everytime
        let tileOne = tiles[i].innerHTML
        let tileTwo = tiles[i+width].innerHTML
        let tileThree = tiles[i+(width*2)].innerHTML
        let tileFour = tiles[i+(width*3)].innerHTML
        let column = [parseInt(tileOne), parseInt(tileTwo), parseInt(tileThree), parseInt(tileFour)]

        let filteredColumn = column.filter(numb => numb)
        let emptyTile = 4 - filteredColumn.length
        let zeroes = Array(emptyTile).fill('')
        let newColumn = zeroes.concat(filteredColumn)

        tiles[i].innerHTML = newColumn[0]
        tiles[i+width].innerHTML = newColumn[1]
        tiles[i+(width*2)].innerHTML = newColumn[2]
        tiles[i+(width*3)].innerHTML = newColumn[3]
    }
}

// annnd moving up
function moveUp() {
    for(let i = 0; i < 4; i++) {
        // this time you do +width because you're moving down a row everytime
        let tileOne = tiles[i].innerHTML
        let tileTwo = tiles[i+width].innerHTML
        let tileThree = tiles[i+(width*2)].innerHTML
        let tileFour = tiles[i+(width*3)].innerHTML
        let column = [parseInt(tileOne), parseInt(tileTwo), parseInt(tileThree), parseInt(tileFour)]

        let filteredColumn = column.filter(numb => numb)
        let emptyTile = 4 - filteredColumn.length
        let zeroes = Array(emptyTile).fill('')
        let newColumn = filteredColumn.concat(zeroes)

        tiles[i].innerHTML = newColumn[0]
        tiles[i+width].innerHTML = newColumn[1]
        tiles[i+(width*2)].innerHTML = newColumn[2]
        tiles[i+(width*3)].innerHTML = newColumn[3]
    }
}

// combine tiles in a row if they are the same number
function combineRow() {
    for(let i = 0; i < 15; i++) {
        if(tiles[i].innerHTML === tiles[i+1].innerHTML) {
            let combinedTile = parseInt(tiles[i].innerHTML) + parseInt(tiles[i+1].innerHTML)
            tiles[i].innerHTML = combinedTile
            tiles[i+1].innerHTML = ''
            currentScore += combinedTile
            score.innerHTML = currentScore
        }
    }
    checkForWin()
}

// and also combine tiles in a column if they are the same number
function combineColumn() {
    for(let i = 0; i < 12; i++) {
        if(tiles[i].innerHTML === tiles[i+width].innerHTML) {
            let combinedTile = parseInt(tiles[i].innerHTML) + parseInt(tiles[i+width].innerHTML)
            tiles[i].innerHTML = combinedTile
            tiles[i+width].innerHTML = ''
            currentScore += combinedTile
            score.innerHTML = currentScore
        }
    }
    checkForWin()
}

// assigning arrow key functionality! keycode.info gives you any keycode for your keyboard
function control(e) {
    if(e.keyCode === 39) {
        keyRight()
    } else if(e.keyCode === 37) {
        keyLeft()
    } else if(e.keyCode === 38) {
        keyUp()
    } else if(e.keyCode === 40) {
        keyDown()
    }
}

// event listener looking for key press and will invoke the control function
document.addEventListener('keyup', control)

// everytime you press the right arrow key the following will happen - tiles will move to the right and combine if they are the same and a new random tile will be assigned the value of 2
function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    addNum()
}

function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    addNum()
}

function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    addNum()
}

function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    addNum()
}

// tested game so far and everything works!! arrows keys function to move all directions, numbers combine together and random 2's appear on every move! WOW! i can see clearly now the rain is gone

// now to check for the mighty 2048 number to win the game! added this function on every combine number function 
function checkForWin() {
    for(let i = 0; i < tiles.length; i++) {
        if(tiles[i].innerHTML == 2048) {
            resultDisplay.innerHTML = 'YOU WIN!'
            document.removeEventListener('keyup', control)
        }
    }
}
// changed the winning sum to 32 to check if it works cus i literally cannot get to 2048 but it does! game stops and YOU WIN! message comes up above the game board! changed back to 2048

// now to check for lose! if there are no empty spaces left and no more moves available we lose
function checkForLose() {
    let emptyTile = 0
    for(let i = 0; i < tiles.length; i++) {
        if(tiles[i].innerHTML == '') {
            emptyTile++
        }
    }   
    if(emptyTile === 0) {
        resultDisplay.innerHTML = 'YOU LOSE :('
        document.removeEventListener('keyup', control)
    }
}

// need some way to check if a move is valid - if you try to move and nothing happens it should not generate a new number
// function checkValidMove() {
    
// }
