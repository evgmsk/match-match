/**
 * project match-match.
 */

export default class Player {
    constructor(player) {
        const {
            firstName,
            lastName,
            email,
            score = { 3: 10000, 6: 10000, 12: 10000, 18: 10000 },
        } = player || {};
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.score = score;
        this.greetPlayer = this.greetPlayer.bind(this);
        this.getScore = this.getScore.bind(this);
        this.setScore = this.setScore.bind(this);
        this.playerToString = this.playerToString.bind(this);
    }

    greetPlayer() {
        return `${this.firstName} ${this.lastName}`;
    }

    getScore() {
        return this.score;
    }

    setScore(level, score) {
        this.score[level] = score;
    }

    playerToString() {
        return JSON.stringify({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                score: this.score,
            });
    }
}
