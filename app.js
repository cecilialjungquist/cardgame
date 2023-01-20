
let cardstack = [];
let suits = ['&hearts;', '&diams;', '&spades;', '&clubs;'];

// Loopar över färgerna
for (let i = 0; i < suits.length; i++) {
    // Loopar över värden
    for (let j = 2; j < 15; j++) {
        let newCard = {};

        // Skapar en ny egenskap (suit) i objektet newCard
        newCard.suit = suits[i];

        // För att identifiera klädda kort
        if (j === 11) {
            // Skapar en ny egenskap (value) i objektet newCard
            newCard.value = 'J';
        } else if (j === 12) {
            newCard.value = 'Q';
        } else if (j === 13) {
            newCard.value = 'K';
        } else if (j === 14) {
            newCard.value = 'A';
        } else {
            newCard.value = j;
        }
        // Lägger till det nya kortet i arrayen cardstack
        cardstack.push(newCard);
    }
}

let nextLower = document.querySelector('#lower');
let nextEqual = document.querySelector('#equal');
let nextHigher = document.querySelector('#higher');

let newCard = 0;
let oldCard = drawCard();

function randomNumber() {
    return Math.floor(Math.random() * cardstack.length);
};

function setCard(card) {
    // Skapa kortet
    let cardEl = document.createElement('article');

    cardEl.classList.add('card');
    // Ge kortet rätt färg i UIn
    if (card.suit === '&hearts;' || card.suit === '&diams;') {
        card.color = 'red';
    } else {
        card.color = 'black';
    }

    cardEl.innerHTML = `
        <section class="front">
            <header>
                <span class="${card.color}">${card.suit}</span>
                <span>${card.value}</span>
            </header>
            <section class="${card.color} suit">${card.suit}</section>
            <footer>
                <span class="${card.color}">${card.suit}</span>
                <span>${card.value}</span>
            </footer>
        </section>
        <section class="back"></section>
        `;
    document.querySelector('.placeholder').appendChild(cardEl);
};

function drawCard() {
    let index = randomNumber();
    setCard(cardstack[index]);

    // Fixar jämförelsevärden (nummer istället för bokstäver)
    if (cardstack[index].value === 'J') {
        cardstack[index].value = 11;
    } else if (cardstack[index].value === 'Q') {
        cardstack[index].value = 12;
    } else if (cardstack[index].value === 'K') {
        cardstack[index].value = 13;
    } else if (cardstack[index].value === 'A') {
        cardstack[index].value = 14;
    }

    // Lagra det värdet vi vill returnera
    let renderedCard = cardstack[index].value;

    // Tar bort slumpat kort
    cardstack.splice(index, 1);

    return renderedCard;
};


function addPoints(points) {
    let score = document.querySelector('header p .score');
    let scoreCounter = parseInt(score.innerHTML) + points;
    score.innerHTML = `${scoreCounter}`;
};

function decreaseCards() {
    let cardsLeft = document.querySelector('main .left');
    let cardsLeftCounter = cardstack.length;
    cardsLeft.textContent = `${cardsLeftCounter} kort kvar.`;
};

function wrong() {
    let triesLeft = document.querySelector('.attempts');
    let triesLeftCounter = triesLeft.innerHTML - 1;

    if (triesLeftCounter < 1) {
        gameOver();
    } else {
        triesLeft.textContent = triesLeftCounter;
    }
};

nextLower.addEventListener('click', function () {
    newCard = drawCard();
    decreaseCards();

    if (newCard < oldCard) {
        let points = 3;
        // Om gamla kortet är mindre än 8, högre risk att betta lägre
        if (oldCard < 8) {
            // mer poäng ju lägre nya är
            points = 14 - newCard;
        }

        addPoints(points);
    } else {
        wrong();
    }
    oldCard = newCard;
});

nextEqual.addEventListener('click', function () {
    newCard = drawCard();
    decreaseCards();

    if (newCard === oldCard) {
        // Hög risk med likvärdigt = maxpoäng
        addPoints(15);
    } else {
        wrong();
    }
    oldCard = newCard;
});

nextHigher.addEventListener('click', function () {
    newCard = drawCard();

    decreaseCards();
    if (newCard > oldCard) {
        let points = 3;
        // Om gamla kortet är högre än 8, högre risk att betta högre
        if (oldCard > 8) {
            // mer poäng ju högre nya kortet är
            points = newCard - 2;
        }
        addPoints(points);
    } else {
        wrong();
    }
    oldCard = newCard;
});

// game over-vy - Av Philippa
function gameOver() {
    document.querySelector('#gameover').classList.add('show');
    let retryBtn = document.querySelector('.retry');

    retryBtn.addEventListener('click', () => {
    location.reload();
    });

};
