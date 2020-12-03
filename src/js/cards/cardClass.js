/**
 * project match-match.
 */


export default class Card {
    constructor({ cardId, cardName, skirt, img }) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.skirt = skirt;
        this.img = img;
        this.face = false;
        this.onDesk = true;
        this.cardHtml =  this.initializeCard();
        this.openCard = this.openCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.setCardSkirt = this.setCardSkirt.bind(this);
        this.drawCard = this.drawCard.bind(this);
    }
    initializeCard() {
        const C =`
                
                    <div class="card-flipper">
                        <div class="card-face" style="background: ${this.img} no-repeat center/100%"></div>
                        <div class="card-skirt" style="background: ${this.skirt} no-repeat center/100%"></div>
                    </div>
               
            `;
        const Card = document.createElement('a');
        Card.classList.add('card-container');
        Card.setAttribute('id',this.cardId);
        Card.setAttribute('href', "");
       Card.innerHTML = C;
       return Card;
    }

    removeCard() {
        this.onDesk = !this.onDesk;
        document.getElementById(this.cardId).classList.toggle('out-desk');
    }

    setCardSkirt(skirt) {
        this.skirt = skirt;
        const cardElement = document.getElementById(this.cardId);
        if (cardElement)
            cardElement.querySelector('.card-skirt')
            .style.background = `${skirt} no-repeat center/100%`;
    }

    drawCard(deskNode) {
        setTimeout(() => { deskNode.insertAdjacentElement('afterbegin', this.cardHtml); }, 200);
    }

    openCard() {
        document.getElementById(this.cardId).classList.toggle('opened');
        this.face = !this.face;
    }
}
