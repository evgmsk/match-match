
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
        if (array.length < this.level) {
            throw (new Error('Not enough cards'));
        }
        const result = [...array.slice(0, this.level), ...array.slice(0, this.level)];
        let i = result.length - 1;
        while (i) {
            const ind = Math.floor(Math.random() * (i + 1));
            if (ind !== i - this.level) {
                [result[ind], result[i]] = [result[i], result[ind]];
            } else if (i > 0) {
                [result[ind], result[i - 1]] = [result[i - 1], result[ind]];
            }
            i -= 1;
        }
        this.deckCards = [...result];
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
        if (ind < this.deck.length - 1)
            setTimeout(() => this.drawDeck(deskNode, ind + 1), 100);
    }
}
