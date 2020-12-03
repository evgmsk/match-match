/**
 * project match-match.
 */
import Card from './cardClass';
import { DefaultLevel, DefaultSkirt } from '../common/constants';
import { CardsImages, CardsSkirts } from './cardsUrls';

export default class Deck {
    constructor(deck) {
        const {
            deckSkirt = DefaultSkirt,
            level = DefaultLevel,
        } = deck || {};
        this.deckSkirt = deckSkirt;
        this.level = level;
        this.deckCards = [];
        this.allCards = Object.keys(CardsImages);
        this.deck = [];
        this.newDeck();
    }

    shuffleCards(array) {
        const arr = [...array];
        let length = array.length;
        for (;length--;) {
            const ind = Math.floor(Math.random() * (length + 1));
            [arr[ind], arr[length]] = [arr[length], arr[ind]];
        }
        if (array.length === this.level * 2) {
            this.deckCards = arr;
            return;
        }
        this.shuffleCards([...arr.slice(0, this.level), ...arr.slice(0, this.level)]);
    }

    newDeck() {
        this.shuffleCards(this.allCards);
        this.deck = this.deckCards.reduce((acc, name, i) => {
            const cardName = name;
            const img = `url(${CardsImages[cardName]})`;
            const skirt = `url(${CardsSkirts[this.deckSkirt]})`;
            const card = new Card({ cardId: `${i}`, cardName, skirt, img });
            acc.push(card);
            return acc;
        }, []);
    }

    setSkirts(skirt) {
        this.deckSkirt = skirt;
        const newSkirt = `url(${CardsSkirts[skirt]})`;
        this.deck.forEach(x => {
            x.setCardSkirt(newSkirt);
        });
    }

    setLevel(level) {
        this.level = level;
    }

    drawDeck(deskNode, ind = 0) {
        this.deck[ind].drawCard(deskNode);
        ind += 1;
        if (ind < this.deck.length)
            setTimeout(() => this.drawDeck(deskNode, ind), 100);
    }
}
