/**
 * project match-match.
 */
import Player from '../game/playerClass';
import { game } from '../game/gameClass';
import {
    RegForm,
    HeadMenu,
    EmailInput,
    LastNameInput,
    FirstNameInput,
    GameSection,
    MainContainer,
 } from '../common/event-dom-nodes';
import { Storage, CurrentPlayer, EmailValid } from '../common/constants';

export default class RegistrationForm {
    static showRegForm() {
        RegForm.style.display = 'block';
        setTimeout(() => { RegForm.classList.add('show-form'); }, 100);
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
        RegForm.classList.remove('show-form');
        RegForm.style.display = 'none';
        GameSection.style.display = 'flex';
        HeadMenu.style.visibility = 'visible';
        MainContainer.classList.toggle('big-panda');
        return false;
    }

    static blurValidation(e) {
        e.stopPropagation();
        e.stopPropagation();
        if (e.target.value) {
            if (e.target.id === EmailInput.id) {
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
        const EmailErrorNode = EmailInput.parentElement.querySelector('.email-validation');
        if (LastNameInput.value
            && FirstNameInput.value
            && EmailValid.test(EmailInput.value)) {
            const email = EmailInput.value;
            const firstName = FirstNameInput.value;
            const lastName = LastNameInput.value;
            [
                EmailInput,
                LastNameInput,
                FirstNameInput,
            ].forEach((x) => {
                x.classList.remove('invalid-input');
                x.value = '';
            });
            return RegistrationForm.registration({ email, firstName, lastName });
        }

        [EmailInput, LastNameInput, FirstNameInput]
            .forEach(x => {
            if (!x.value || x.value === ' ') {
                x.classList.add('invalid-input');
                x.setAttribute('placeholder', 'Please fill this field');
            }
            if (!EmailValid.test(EmailInput.value)) {
                EmailInput.classList.add('invalid-input');
                EmailErrorNode.style.visibility = 'visible';
            } else
                EmailErrorNode.style.visibility = 'hidden';
        });
        return false;
    }
}
