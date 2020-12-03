/**
 * project match-match.
 */
import Player from '../game/playerClass';
import { game } from '../game/gameClass';
import { EventNodes } from '../common/eventNodes';
import { Storage, CurrentPlayer, EmailValid } from '../common/constants';

export default class RegistrationForm {
    static showRegForm() {
        EventNodes.RegForm.style.display = 'block';
        setTimeout(() => { EventNodes.RegForm.classList.add('show-form'); }, 100);
    }

    static registration({ firstName, lastName, email }) {
        let newPlayer;
        if (!Storage[email]) {
            newPlayer = new Player({ firstName, lastName, email });
            Storage.setItem(email, newPlayer.playerToString());
        } else
            newPlayer = new Player(JSON.parse(Storage[email]));
        Storage.setItem(CurrentPlayer, email);
        game.setPlayer(newPlayer);
        EventNodes.RegForm.classList.remove('show-form');
        EventNodes.RegForm.style.display = 'none';
        EventNodes.GameSection.style.display = 'flex';
        EventNodes.HeadMenu.style.visibility = 'visible';
        EventNodes.MainContainer.classList.toggle('big-panda');
        return false;
    }

    static blurValidation(e) {
        e.stopPropagation();
        e.stopPropagation();
        if (e.target.value) {
            if (e.target.id === EventNodes.EmailInput.id) {
                if (EmailValid.test(e.target.value)) {
                    e.target.setAttribute('class', '');
                    e.target.parentElement.querySelector('.email-validation').style.visibility = 'hidden';
                } else {
                    e.target.classList.add('invalid-input');
                    e.target.parentElement.querySelector('.email-validation').style.visibility = 'visible';
                }
            } else
                e.target.setAttribute('class', '');
        } else {
            e.target.classList.add('invalid-input');
            e.target.setAttribute('placeholder', 'Please fill this field');
        }
    }

    static formSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const EmailErrorNode = EventNodes.EmailInput.parentElement.querySelector('.email-validation');
        if (EventNodes.LastNameInput.value
            && EventNodes.FirstNameInput.value
            && EmailValid.test(EventNodes.EmailInput.value)) {
            const email = EventNodes.EmailInput.value;
            const firstName = EventNodes.FirstNameInput.value;
            const lastName = EventNodes.LastNameInput.value;
            [
                EventNodes.EmailInput,
                EventNodes.LastNameInput,
                EventNodes.FirstNameInput,
            ].forEach((x) => {
                x.classList.remove('invalid-input');
                x.value = '';
            });
            return RegistrationForm.registration({ email, firstName, lastName });
        }

        [EventNodes.EmailInput, EventNodes.LastNameInput, EventNodes.FirstNameInput]
            .forEach(x => {
            if (!x.value || x.value === ' ') {
                x.classList.add('invalid-input');
                x.setAttribute('placeholder', 'Please fill this field');
            }
            if (!EmailValid.test(EventNodes.EmailInput.value)) {
                EventNodes.EmailInput.classList.add('invalid-input');
                EmailErrorNode.style.visibility = 'visible';
            } else
                EmailErrorNode.style.visibility = 'hidden';
        });
        return false;
    }
}
