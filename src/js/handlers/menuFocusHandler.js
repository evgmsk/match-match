/**
 * project match-match.
 */

export default class MenuFocus {
    static focusDropMenu(e) {
        e.stopPropagation();
        e.target.parentElement.classList.add('dropped');
    }

    static blurDropMenu(e) {
        e.stopPropagation();
        e.target.parentElement.parentElement.classList.remove('dropped');
    }
}
