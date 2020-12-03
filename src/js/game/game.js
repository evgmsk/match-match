/**
 * project match-match.
 */

import RegistrationForm from '../handlers/formControls';
import RulesControls from '../handlers/startControls';
import MenuFocus from '../handlers/menuFocusHandler';
import { EventNodes } from '../common/eventNodes';
import { game } from './gameClass';

EventNodes.Invite.querySelector('#invitation-continue').addEventListener('click', RulesControls.inviteClose);
EventNodes.RegForm.querySelector('#reg-form-submit').addEventListener('click', RegistrationForm.formSubmit);
EventNodes.NewPlayer.addEventListener('click', game.newPlayer);
EventNodes.NewGame.addEventListener('click', game.newGame);
EventNodes.GameDesk.addEventListener('click', game.clickOnCard);
// EventNodes.GameDesk.addEventListener('keydown', game.selectCard);
EventNodes.MenuLevel.addEventListener('click', game.setLevel);
EventNodes.NewPlayer.addEventListener('click', game.newPlayer);
EventNodes.MenuSkirts.addEventListener('click', game.setSkirts);

EventNodes.HeadMenu.querySelectorAll('.drop-item:nth-of-type(2)')
    .forEach(x => {
        x.classList.toggle('active-menu-item');
    });
[EventNodes.EmailInput, EventNodes.LastNameInput, EventNodes.FirstNameInput]
    .forEach(x => { x.addEventListener('blur', RegistrationForm.blurValidation); });


[EventNodes.ButtonLevel, EventNodes.ButtonSkirt].forEach(x => {
    x.addEventListener('focus', MenuFocus.focusDropMenu);
});

EventNodes.HeadMenu.querySelectorAll('.drop-menu-list .drop-item:last-of-type')
    .forEach(x => {
        x.addEventListener('blur', MenuFocus.blurDropMenu);
    });
