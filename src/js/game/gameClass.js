/**
 * project match-match.
 */

import Deck from '../cards/deckClass';
import { Storage, CurrentPlayer } from '../common/constants';
import { EventNodes } from '../common/eventNodes';
import RegistrationForm from '../handlers/formControls';

export class Game extends Deck {
    constructor(deck) {
        super(deck);
        if (Game.instance) {
            return Game.instance;
        }
        this.player = Storage[Storage[CurrentPlayer]]
            ? JSON.parse(Storage[Storage[CurrentPlayer]]) : {};
        this.time = [0, 0];
        this.timerInterval = {};
        this.record = this.player.score ? this.player.score[this.level] : '';
        this.openedCards = [];
        this.cardsOut = 0;
        this.deskClasses = '';
        this.deskNode = EventNodes.GameDesk;
        this.timerNode = EventNodes.Timer.querySelector('span');
        this.eventQueue = false;
        this.timer = this.timer.bind(this);
        this.newPlayer = this.newPlayer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.clickOnCard = this.clickOnCard.bind(this);
        this.setLevel = this.setLevel.bind(this);
        this.setSkirts = this.setSkirts.bind(this);
        this.newGame = this.newGame.bind(this);
        this.selectCard = this.selectCard.bind(this);
        Game.instance = this;
    }

    deskGridClasses() {
        switch (this.level) {
            case 18:
                return 'nine-to-four';
            case 12:
                return 'eight-to-three';
            case 6:
                return 'four-to-three';
            case 3:
                return 'three-to-two';
            default: return '';
        }
    }

    timer() {
        this.time[0] += 1;
        if (this.time[0] === 60) {
            this.time[1] += 1;
            this.time[0] = 0;
        }
        if (this.time[1] === 60) {
            this.time = [0, 0];
            clearInterval(this.timerInterval);
        }
        this.timerNode.textContent = this.setTime();
    }

    setTime() {
        return this.time.reduce((acc, x, i) => {
            const val = String(x);
            if (!i) {
                acc = val.length > 1 ? `${val}` : `0${val}`;
            } else
                acc = val.length > 1 ? `${val}:${acc}` : `0${val}:${acc}`;
            return acc;
        }, '');
    }

    startTimer() {
        setTimeout(() => { this.eventQueue = false; }, 100);
        this.timerInterval = setInterval(this.timer, 1000);
    }

    setPlayer(player) {
        this.player = player;
    }

    newPlayer(e) {
        if (this.eventQueue)
            return;
        e.preventDefault();
        e.stopPropagation();
        clearInterval(this.timerInterval);
        this.clearDesk();
        EventNodes.GameSection.style.display = 'none';
        RegistrationForm.showRegForm();
    }

    setLevel(e) {
        if (this.eventQueue)
            return;
        e.preventDefault();
        e.stopPropagation();
        const level = parseInt(e.target.value, 10);
        if (level === this.level)
            return;
        EventNodes.MenuLevel.querySelector('.active-menu-item').classList.toggle('active-menu-item');
        e.target.classList.toggle('active-menu-item');
        super.setLevel(level);
        this.startGame();
    }

    setSkirts(e) {
        if (this.eventQueue)
            return;
        e.preventDefault();
        e.stopPropagation();
        if (e.target.classList.contains('active-menu-item'))
            return;
        EventNodes.MenuSkirts.querySelector('.active-menu-item').classList.toggle('active-menu-item');
        e.target.classList.toggle('active-menu-item');
        super.setSkirts(e.target.name);
    }

    selectCard(e) {
        if (this.eventQueue.length)
            return;
        e.stopPropagation();
        if (e.keyCode === 13) {
            e.preventDefault();
            const targetCard = e.target;
            this.resolvePickedCard(targetCard);
        }
    }

    clickOnCard(e) {
        if (this.eventQueue.length)
            return;
        e.preventDefault();
        e.stopPropagation()
        const targetCard = e.target;
        if (targetCard.classList.contains('card-container'))
            this.resolvePickedCard(targetCard);
    }

    gameCard() {
        if (this.openedCards[0].cardName === this.openedCards[1].cardName) {
            this.openedCards[0].removeCard();
            this.openedCards[1].removeCard();
            this.cardsOut += 2;
            if (this.cardsOut === this.deck.length) {
                this.fin();
            }
        }
        if (this.openedCards[0].cardName !== this.openedCards[1].cardName) {
            this.openedCards[0].openCard();
            this.openedCards[1].openCard();
        }
        this.openedCards.length = 0;
    }

    resolvePickedCard(targetCard) {
        const pickedCard = this.deck.filter(x => x.cardId === targetCard.id)[0];
        if (pickedCard.face || this.openedCards[1]) {
            return;
        }
        pickedCard.openCard();
        if (!this.openedCards[0]) {
            this.openedCards.push(pickedCard);
            return;
        }
        this.openedCards.push(pickedCard);
        setTimeout(() => this.gameCard(), 500);
    }

    clearDesk() {
        const cards = this.deskNode.childNodes;
        while (cards.length) {
            cards[0].remove();
        }
    }

    newGame(e) {
        if (this.eventQueue)
            return;
        e.preventDefault();
        e.stopPropagation();
        this.startGame();
    }

    startGame() {
        this.eventQueue = true;
        clearInterval(this.timerInterval);
        this.time = [0, 0];
        this.cardsOut = 0;
        this.clearDesk();
        this.newDeck();
        this.drawDeck(this.deskNode);
        if (this.deskClasses && this.deskClasses !== this.deskGridClasses()) {
            this.deskNode.classList.toggle(this.deskClasses);
            this.deskNode.classList.add(this.deskGridClasses());
        }
        if (!this.deskClasses) {
            this.deskNode.classList.add(this.deskGridClasses());
        }
        this.deskClasses = this.deskGridClasses();
        setTimeout(this.startTimer, this.level * 200);
    }

    fin() {
        clearInterval(this.timerInterval);
        this.clearDesk();
        const result = (this.time[1] * 60) + this.time[0];
        if (this.player.score[this.level] > result) {
            this.player.setScore(this.level, result);
            Storage.setItem(this.player.email, this.player.playerToString());
        }
    }
}

export const game = new Game();
