const tileDisplay = document.querySelector('.tile-container')
const keyBoard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

wordBank = ['HELLO', 'SEPER', 'MADHAV', 'BYE', 'SUPEE', 'SUPER','CRATE','ZZZZZZZZZZ']
const answer = "ZZZZZZZZZZ"
var keyString = "QWERTYUIOPASDFGHJKL"
const keys = keyString.split('')
keys.push("ENTER")
keys.push.apply(keys,"ZXCVBNM".split(''))
keys.push("<<")

const guessRows = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})
keys.forEach(key => {
   const buttonElement = document.createElement('button')
   buttonElement.textContent = key
   buttonElement.setAttribute('id', key)
   buttonElement.addEventListener('click', () => handleClick(key))
   keyBoard.append(buttonElement)
})

const handleClick = (key) => {
    if (key === '<<' && !isGameOver) {
        deleteLetter()
        return
    }

    if (key === 'ENTER' && !isGameOver) {
        checkRow()
        return
    }
    addLetter(key)
}

const addLetter = (letter) => {
    const tile = document.getElementById('guessRow' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    tile.setAttribute('data', letter)
    guessRows[currentRow][currentTile] = letter
    currentTile++
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const inWordBank = () => {
    const guess = guessRows[currentRow].join('')
    for (let i = 0; i < wordBank.length; i++) {
        if (guess === wordBank[i]) {
            return true
        }
    }
    return false
}

const checkRow = () => {
        console.log(currentTile)
        console.log(guessRows[0].length - 1)
    if (currentTile > guessRows[0].length - 1) {
        const guess = guessRows[currentRow].join('')

        let inWB = inWordBank()
        if (!inWB) {
            for (let i = guessRows[0].length; i > 0; i--) {
                currentTile--
                const tile = document.getElementById('guessRow' + currentRow + '-tile-' + currentTile)
                tile.textContent = ''
                guessRows[currentRow][currentTile] = ''
                tile.setAttribute('data', '')
                //console.log('It is false')
            }
            return
        }
        flipTile()
        if (answer == guess) {
            console.log('Made it to loop')
            showMessage("Congratulations!")
            console.log("DO you work")
            isGameOver = true
            copyToClipBoard()
            return
        } else {
            if (currentRow >= guessRows[0].length) {
                console.log(currentRow)
                showMessage("Game Over")
                isGameOver = true
                copyToClipBoard()
                return
            }

            if (currentRow < guessRows[0].length) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    //setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let copyAnswer = answer
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'gray-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter === answer[index]) {
            guess.color = 'green-overlay'
            copyAnswer = copyAnswer.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (copyAnswer.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            copyAnswer = copyAnswer.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        console.log('At last part')
        tile.classList.add(guess[index].color)
        addColorToKey(guess[index].letter, guess[index].color)
    })
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const copyToClipBoard = () => {
    answerRow = currentRow + 1
    var greenSqaure = String.fromCodePoint(0x1F7E9)
    var yellowSqaure = String.fromCodePoint(0x1F7E8)
    var blackSqaure = String.fromCodePoint(0x1F7E7)

    let resultText = 'Congratulations you guessed the word!!!\n\nFriendle: ' + answer + ' ' + answerRow + '/6\n\n'
    if (currentRow == guessRows.length && guessRows[5] != answer) {
        resultText = 'Whoops you missed the word!\n\nFriendle: ' + answer + ' X/6\n\n'
    }
    
    for (let i = 0; i < answerRow; i++) {
        for (let j = 0; j < guessRows[0].length; j++) {
            if (guessRows[i][j] == answer[j]) {
                resultText += greenSqaure
            } else if (answer.includes(guessRows[i][j])) {
                resultText += yellowSqaure
            } else {
                resultText += blackSqaure
            }
        }
        if (i == answerRow - 1) {
            break
        }
        resultText += '\n'
    }
    navigator.clipboard.writeText(resultText)
    alert(resultText + '\nScore copied to clipboard!')
    console.log(resultText)
    return
}