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
                                if (currentSquare.children[0].getAttribute('id').split('-')[0] == moveSquare.children[0].getAttribute('id').split('-')[0]) {
                                    return ''
                                }
                                moveSquare.children[0].remove()
                                return moveSquare.appendChild(currentSquare.children[0])
                            }

                            moveSquare.appendChild(currentSquare.children[0])
                        }

                        const checkSquares = (type) => {
                            let i1 = letters.indexOf(l1)
                            let i2 = letters.indexOf(l2)
                                    
                            let letterMove = parseInt(i2) - parseInt(i1)
                            let numberMove = n2 - n1

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
                                    if (Math.abs(letterMove) == Math.abs(numberMove)) {  
                                        const checkSquares = (add, direction) => {
                                            let iL = letters.indexOf(l1)
                                            let first =  true

                                            const check = (i, n2) => {
                                                if (i == n2) {
                                                    if (document.getElementById(`${letters[iL]}${i}`).children[0] !== undefined) {
                                                        return move(currentId, selectedId, true)
                                                    }

                                                    move(currentId, selectedId, false)
                                                }
                                            }

                                            if (add === true) {
                                                for (let i = n1; i <= n2; i++) {
                                                    if (first === false) {
                                                        if (document.getElementById(`${letters[iL]}${i}`).children[0] != undefined && i != n2) {
                                                            break
                                                        }
                                                    }
                                                    check(i,n2)

                                                    first = false 

                                                    if (direction == 'left') {
                                                        iL--                                                
                                                    } else {
                                                        iL++
                                                    }
                                                }
                                            } else {
                                                for (let i = n1; i >= n2; i--) {
                                                    if (first === false) {
                                                        if (document.getElementById(`${letters[iL]}${i}`).children[0] != undefined && i != n2) {
                                                            break
                                                        }
                                                    }
                                                    check(i,n2)

                                                    first = false

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
                        } else if (type == 'rook') {
                            const rook = () => {
                                    let iL = letters.indexOf(l1)
                                    let first =  true  

                                    const check = (i, type) => {
                                        if (type == 'number') {
                                            if (i == n2) {
                                                if (document.getElementById(`${l2}${i}`).children[0] !== undefined) {
                                                    return move(currentId, selectedId, true)
                                                }
    
                                                move(currentId, selectedId, false)
                                            }
                                        } else {
                                            if (i == letters.indexOf(l2)) {
                                                if (document.getElementById(`${l2}${n2}`).children[0] !== undefined) {
                                                    return move(currentId, selectedId, true)
                                                }
    
                                                move(currentId, selectedId, false)
                                            } 
                                        }
                                    }


                                    const checkMid = (i, direction) => {
                                        if (first === false) {
                                            if (direction == 'horizontal') {
                                                if (document.getElementById(`${letters[i]}${n2}`).children[0] != undefined && i != letters.indexOf(l2)) {
                                                    console.log(document.getElementById(`${letters[i]}${n2}`).children[0])
                                                    return 'break'
                                                }
                                            } else {
                                                if (document.getElementById(`${l2}${letters[i]}`).children[0] != undefined && i != n2) {
                                                    console.log(document.getElementById(`${letters[l2]}${i}`).children[0])
                                                    return 'break'
                                                }
                                            }
                                        }
                                    }

                                    if (i1 == i2 && n2 > n1) {
                                        for (let i = n1; i <= n2; i++) {
                                            if (checkMid(i,'vertical') == 'break') {
                                                break
                                            }
                                            check(i, 'number')
                                            first = false
                                        }
                                    } else if (i1 == i2 && n2 < n1) {
                                        for (let i = n1; i >= n2; i--) {
                                            if (checkMid(i,'vertical') == 'break') {
                                                break
                                            }
                                            check(i, 'number')
                                            first = false
                                       }
                                    } else if (i1 > i2 && n2 == n1) {
                                        for (let i = iL; i >= letters.indexOf(l2); i--) {
                                            if (checkMid(i,'horizontal') == 'break') {
                                                break
                                            }
                                            check(i, 'letter')
                                            first = false
                                       }
                                    } else if (i1 < i2 && n2 == n1) {
                                        for (let i = iL; i <= letters.indexOf(l2); i++) {
                                            if (checkMid(i,'horizontal') == 'break') {
                                                break
                                            }
                                            check(i, 'letter')
                                            first = false
                                       }
                                    }
                            }
                            rook()
                        }
                    }

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