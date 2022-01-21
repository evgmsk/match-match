const Html = `  <div class="menu-item">
                    <a href="" id="new-player" class="head-item" ><h2>New Player</h2></a>
                    </div>
                    <div class="menu-item skirt-menu">
                    <a id="button-skirt" href="#"><h2>Skirt cards</h2></a>
                    <div id="menu-skirts" class="drop-menu-list">
                        <button class="drop-item skirt-item" name="NutsKnacker">
                        </button>
                        <button class="drop-item skirt-item" name="LebKuchen">
                        </button>
                        <button class="drop-item skirt-item" name="SnowFlake">
                        </button>
                    </div>
                </div>`;
export class LeftMenuList {
    constructor(html = Html, handler = f => f) {
        this.html = html;
        this.handler = handler;
    }
}
 

const HtmlRightMenu = `   <div class="menu-item">
                            <a href="" id="new-game" class="head-item" > New Game</h2></a>
                                <div class="menu-item"></div>
                            <a id="button-level" href="#"><h2>Game level</h2></a>
                            <div id="menu-level" class="drop-menu-list">
                                <button class="drop-item" value="3">
                                    Low
                                </button>
                                <button class="drop-item" value="6">
                                    Medium
                                </button>
                                <button class="drop-item" value="12">
                                    High
                                </button>
                                <button class="drop-item" value="18">
                                    Ultimate
                                </button>
                            </div>
                        </div>`;
export class RighttMenuList {
    constructor(html = HtmlRightMenu, handler = f => f) {
        this.html = html;
        this.handler = handler;
    }
}

export class MenuItem {
    constructor(handler, title, _class, active, index, dataAttr) {
        this.title = title;
        this.handler = handler;
        this.class = active ? `${_class} active` : _class;
        this.active = active;
        this.index = index;
        this.dataAttr = dataAttr;
        this.html = null;
        this.createItem = this.createItem.bind(this);
    }
    createItem() {
        this.html = `<li data-value=${this.dataAttr} class=${this.class}>
                        ${this.title}
                    </li>`;
        return this.html;
    }
}
