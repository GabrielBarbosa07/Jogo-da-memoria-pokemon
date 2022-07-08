let cardsList = [
    { "name": "pokemon1", "img_src": "../assets/pokemon-1.jpg" },
    { "name": "pokemon2", "img_src": "../assets/pokemon-2.jpg" },
    { "name": "pokemon3", "img_src": "../assets/pokemon-3.jpg" },
    { "name": "pokemon4", "img_src": "../assets/pokemon-4.jpg" },
    { "name": "pokemon5", "img_src": "../assets/pokemon-5.jpg" },
    { "name": "pokemon6", "img_src": "../assets/pokemon-6.jpg" },
    { "name": "pokemon7", "img_src": "../assets/pokemon-7.jpg" },
    { "name": "pokemon8", "img_src": "../assets/pokemon-8.jpg" },
    { "name": "pokemon9", "img_src": "../assets/pokemon-9.jpg" }
];

let count = 0
let firtCardGuess = ""
let secondCardGuess = ""
let cardBoard = document.getElementById("card-board")
let grid = document.createElement("div")
grid.setAttribute("class", "grid")
cardBoard.appendChild(grid)

//creating the card clone
let cardGrid = cardsList.concat(cardsList);

// creating random grid by shuffling the array of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

let shuffledCards = shuffleArray(cardGrid);

function showCardBoard() {
    shuffledCards.forEach(item => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.dataset.name = item.name
        card.innerHTML = `<img src ="${item.img_src}" alt=""/>`
        grid.appendChild(card);
    })
}

showCardBoard()

//event listener
grid.addEventListener("click", function (e) {
    let selectedCard = e.target.parentElement
    if (e.target.classList.contains("grid")) {
        return
    }

    if (count < 2) {
        count++
        if (count == 1) {
            firtCardGuess = selectedCard.dataset.name
            selectedCard.classList.add("selected", "is_clicked")
        } else {
            if (!selectedCard.classList.contains("is_clicked")) {
                secondCardGuess = selectedCard.dataset.name
                selectedCard.classList.add("selected")
                checkCardMath(firtCardGuess, secondCardGuess)
                document.querySelectorAll(".card").forEach((card) => {
                    card.classList.remove("is_clicked")
                })
            } else {
                count--
            }
        }
    }
})

function checkCardMath(guess1, guess2) {
    if (guess1 == guess2) match()
    else unmatch()
}

const match = () => {
    let selectedCards = document.querySelectorAll(".selected")
    selectedCards.forEach(card => {
        card.classList.add("matched")
        card.querySelector("img").style.opacity = "1"
        card.style.pointerEvents = "none"
        card.style.opacity = "0.8"
        card.classList.remove("selected")
    })
    count = 0
}

const unmatch = () => {
    let selectedCards = document.querySelectorAll(".selected")
    setTimeout(() => {
        selectedCards.forEach((card) => {
            card.classList.remove("selected")
        })
    }, 500)
    count = 0
}

const btnReload = document.getElementById("btnReload")
btnReload.addEventListener("click", () => {
    window.location.reload()
})