/**
 * project match-match.
 */
import { Invite } from '../common/eventNodes';
import RegistrationForm from './formControls';

export default class RulesControls {
    static rulesClose(e) {
        e.preventDefault();
        e.stopPropagation();
        Invite.classList.add('hide-invitation');
    }

    static inviteClose(e) {
        e.preventDefault();
        e.stopPropagation();
        Invite.classList.add('hide-invitation');
        Invite.querySelector('#invitation-continue')
            .removeEventListener('click', RulesControls.inviteClose);
        Invite.querySelector('#invitation-continue')
            .addEventListener('click', RulesControls.rulesClose);
        RegistrationForm.showRegForm();
    }
}
