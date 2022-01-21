import { Timer as TimerNode } from '../common/event-dom-nodes';

const Html = ` <div class="menu-item">
                    <a href="" id="timer">
                        <h2>
                        Timer: <span>00:00</span>
                        </h2>
                    </a>
                    </div>
                    <div class="menu-item">
                    <a href="" id="best-time">
                        <h2>Best time:</h2>
                        <span></span>
                    </a>
                </div>`;

export default class TimerClass {
    constructor(html = Html, timerNode = TimerNode) {
        this.html = html;
        this.timerDomElement = timerNode;
        this.attachToDom();
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
    startTimer() {
        setTimeout(() => { this.eventQueue = false; }, 100);
        this.timerInterval = setInterval(this.timer, 1000);
    }
    setTime() {
        return this.time.reduce((acc, x, i) => {
            const val = String(x);
            if (!i) {
                return acc + val.length > 1 ? `${val}` : `0${val}`;
            }
            return acc + val.length > 1 ? `${val}:${acc}` : `0${val}:${acc}`;
        }, '');
    }
    attachToDom(position = 'afterbegin') {
        if (this.timerDomElement) {
            this.timerDomElement.insertAdjacentElement(position, this.html);
        }
    }
}
