//color the squares

let squareArray = Object.entries(document.getElementsByClassName('chess-square'))
let rowArray = Object.entries(document.getElementsByClassName('row'))

const colorSquares = (rowL, even) => {
    let num

    if (even === true) {
        num = 0
    } else {
        num = 1
    }

    let squares = Object.entries(rowL[1].children)
        squares.forEach((square) => {
            let index = squares.indexOf(square)
            if (index % 2 == 0) {
                if (even === true) {
                    return square[1].style.background = 'green'
                }
                square[1].style.background = 'lightgreen'
            } else {
                if (even === true) {
                    return square[1].style.background = 'lightgreen'
                }
                square[1].style.background = 'green'
            }
    })
}

const colorSquaresL = () => {
    rowArray.forEach((rowL) => {
        let parentId = rowL[1].getAttribute('id')
    
        let even = parentId.split('-')[1] % 2
    
        if (even == 0) {
            return colorSquares(rowL, true)
        }
    
        colorSquares(rowL, false)
    })
}

colorSquaresL()


// start game

const startButton = document.getElementById('startGame')
let started = false

startButton.onclick = () => {
    let turn = 'light'
    started = true

    //sort pieces

    const chessPieces = Object.entries(document.getElementsByClassName('chess-piece'));
    const lightPieces = [[{"cat": "bishop"}, []], [{"cat":"knight"}, []], [{"cat":"queen"}, []], [{"cat":"king"},[]], [{"cat":"rook"}, []], [{"cat":"pawn"}, []]];
    const darkPieces = [[{"cat": "bishop"}, []], [{"cat":"knight"}, []], [{"cat":"queen"}, []], [{"cat":"king"},[]], [{"cat":"rook"}, []], [{"cat":"pawn"}, []]];

    const sortPieces = (piece,color, type) => {
        let array
        if (color == 'light') {
            array = lightPieces
        } else {
            array = darkPieces
        }

        array.forEach((div) => {
            if (div[0].cat == type) {
                div[1].push(piece)
            }
        })
    }

    chessPieces.forEach((piece) => {
        if (piece[1].getAttribute('id').split('-')[0] == 'light') {
            return sortPieces(piece[1],'light', piece[1].getAttribute('id').split('-')[1])
        }
        sortPieces(piece[1],'dark', piece[1].getAttribute('id').split('-')[1])
    })

    //selected square
    
    let selectedSquare

    squareArray.forEach((squareL) => {
        let square = squareL[1]
        square.onclick = () => {
            if (selectedSquare != undefined) {
                    if (selectedSquare.children[0] !== undefined) {
                        let id = selectedSquare.children[0].getAttribute('id')
                        let type = id.split('-')[1]
                        let currentId = selectedSquare.getAttribute('id')
                        let selectedId = square.getAttribute('id')

                        let letters = ["a", "b","c","d","e","f","g","h"]
                        let l1 = currentId.charAt(0)
                        let n1 = parseInt(currentId.charAt(1))
                        let l2 = selectedId.charAt(0)
                        let n2 = parseInt(selectedId.charAt(1))
                        
                        let possibleSquares = []

                        console.log(type)

                        const move = (currentSquareId, moveSquareId, capture) => {
                            let currentSquare = document.getElementById(`${currentSquareId}`)
                            let moveSquare = document.getElementById(`${moveSquareId}`)
                            
                            if (capture === true) {
                                moveSquare.children[0].remove()
                                moveSquare.appendChild(currentSquare.children[0])
                                return currentSquare.children[0].remove()
                            }

                            moveSquare.appendChild(currentSquare.children[0])
                            currentSquare.children[0].remove()
                        }

                        const checkSquares = (type) => {
                              if (type == 'knight') {
                                   const knight = (numL, numN, lAdd, nAdd) => {
                                        letters.forEach((l) => {
                                            if (l == l1) {
                                                let i = letters.indexOf(l)
                                                let firstCoord 
                                                let secondCoord

                                                if (lAdd === false) {
                                                    firstCoord = letters[i - numL]
                                                } 
                                                if (nAdd === false) {
                                                    secondCoord = n1 - numN
                                                } 
                                                if (lAdd === true) {
                                                    firstCoord = letters[i + numL]
                                                } 
                                                if (nAdd === true) {
                                                    secondCoord = n1 + numN
                                                }

                                                if (firstCoord === undefined || secondCoord === undefined) {
                                                    return undefined
                                                }

                                                possibleSquares.push(`${firstCoord}${secondCoord}`)

                                                let selectedPiece = square.children[0]

                                                if (square.children[0] === undefined) {
                                                      possibleSquares.forEach((squarePos) => {
                                                          if (squarePos == selectedId) {
                                                            move(currentId, selectedId, false)
                                                          }
                                                      })
                                                } else {
                                                    possibleSquares.forEach((squarePos) => {
                                                        if (squarePos == selectedId) {
                                                            if (selectedPiece.getAttribute('id').split('-')[0] == turn) {
                                                                return console.log('Same piece')
                                                            }

                                                            move(currentId, selectedId, true)
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                   }

                                   knight(2, 1, false, false)
                                   knight(1, 2, false, false)
                                   knight(1, 2, true, false)
                                   knight(2, 1, true, false)
                                   knight(2, 1, true, true)
                                   knight(1, 2, true, true)
                                   knight(1, 2, false, true)
                                   knight(2, 1, false, true)
                              } else if (type == 'bishop') {
                                 const bishop = () => {
                                    let i1 = letters.indexOf(l1)
                                    let i2 = letters.indexOf(l2)
                                    
                                    let letterMove = parseInt(i2) - parseInt(i1)
                                    let numberMove = n2 - n1

                                    if (Math.abs(letterMove) == Math.abs(numberMove)) {  
                                        let selectedSquare = document.getElementById(`${l2}${n2}`)
                                        console.log(selectedSquare)

                                        const checkSquares = (add, direction) => {
                                            let iL = letters.indexOf(l1)

                                            if (add === true) {
                                                for (let i = n1; i <= n2; i++) {
                                                    console.log(document.getElementById(`${letters[iL]}${i}`))
                                                    if (direction == 'left') {
                                                        iL--                                                
                                                    } else {
                                                        iL++
                                                    }
                                                }
                                            } else {
                                                for (let i = n1; i >= n2; i--) {
                                                    console.log(document.getElementById(`${letters[iL]}${i}`))
                                                    if (direction == 'left') {
                                                        iL--                                                
                                                    } else {
                                                        iL++
                                                    }
                                                }
                                            }
                                            
                                        }
                                        
                                        if (n2 > n1 && letters.indexOf(l1) > letters.indexOf(l2)) {
                                            checkSquares(true, 'left')
                                        } else if (n2 > n1 && letters.indexOf(l1) < letters.indexOf(l2)) {
                                            checkSquares(true, 'right')
                                        } else if (n2 < n1 && letters.indexOf(l1) > letters.indexOf(l2)) {
                                            checkSquares(false, 'left')
                                        } else {
                                            checkSquares(false, 'right')            
                                        }
                                    }
                              }
                              bishop()
                        }}

                        checkSquares(type)
                    }

                colorSquaresL()
                square.style.background = 'yellow'

                return selectedSquare = square
            }

            square.style.background = 'yellow'
            selectedSquare = square
        }
    })
}