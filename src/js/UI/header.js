
import { Body } from '../common/event-dom-nodes';

const Html = `<header class="header">
                <div id="head-menu" class="head-menu">
                    <div class="menu-list player-menu">
                      
                    </div>
                    <div class="menu-list timer-menu">
                       
                    </div>
                    <div class="menu-list">
                       
                    </div>
                </div>
            </header>`;

class HeaderConstructor {
    constructor(html = Html) {
        this.headerHtml = html;
        this.attachHeader();
    }
    attachHeader(position = 'afterbegin') {
        if (this.Body) {
            Body.insertAdjacentHTML(position, this.headerHtml);
        }
    }
}

const Header = new HeaderConstructor();

export default Header;
