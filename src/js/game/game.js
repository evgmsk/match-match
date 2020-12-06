/**
 * project match-match.
 */

import RegistrationForm from '../handlers/form-controls';
import RulesControls from '../handlers/homepage-controls';
import MenuFocus from '../handlers/interface-controls';
import Header from '../UI/header';
import {
    Invite,
    RegForm,
    NewGame,
    GameDesk,
    MenuLevel,
    NewPlayer,
    MenuSkirts,
    HeadMenu,
    EmailInput,
    LastNameInput,
    FirstNameInput,
    ButtonLevel,
    ButtonSkirt,
} from '../common/event-dom-nodes';
import { game } from './gameClass';

Invite.querySelector('#invitation-continue').addEventListener('click', RulesControls.inviteClose);
RegForm.querySelector('#reg-form-submit').addEventListener('click', RegistrationForm.formSubmit);
NewPlayer.addEventListener('click', game.newPlayer);
NewGame.addEventListener('click', game.newGame);
GameDesk.addEventListener('click', game.clickOnCard);
// EventNodes.GameDesk.addEventListener('keydown', game.selectCard);
MenuLevel.addEventListener('click', game.setLevel);
NewPlayer.addEventListener('click', game.newPlayer);
MenuSkirts.addEventListener('click', game.setSkirts);

HeadMenu.querySelectorAll('.drop-item:nth-of-type(2)')
    .forEach(x => {
        x.classList.toggle('active-menu-item');
    });
[EmailInput, LastNameInput, FirstNameInput]
    .forEach(x => { x.addEventListener('blur', RegistrationForm.blurValidation); });


[ButtonLevel, ButtonSkirt].forEach(x => {
    x.addEventListener('focus', MenuFocus.focusDropMenu);
});


HeadMenu.querySelectorAll('.drop-menu-list .drop-item:last-of-type')
    .forEach(x => {
        x.addEventListener('blur', MenuFocus.blurDropMenu);
    });
