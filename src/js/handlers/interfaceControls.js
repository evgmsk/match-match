/**
 * project match-match.
 */

import { EventNodes } from '../common/eventNodes';
// drop menu onFocus handlers


[EventNodes.ButtonLevel, EventNodes.ButtonSkirt]

EventNodes.HeadMenu.querySelectorAll('.drop-item:last-of-type')
    .forEach(x => {
        x.addEventListener('blur', menuHandlers.blurDropMenu);
    });

EventNodes.HeadMenu.querySelectorAll('.drop-item:nth-of-type(2)')
    .forEach(x => {
        x.classList.toggle('active-menu-item');
    });

export default menuHandlers;


/*
 *
 *
 * export function focusDropMenu(e) {
 e.stopPropagation();
 e.target.parentElement.classList.add('dropped');
 }

 export function blurDropMenu(e) {
 e.stopPropagation();
 e.target.parentElement.parentElement.classList.remove('dropped');
 }
 export function showRegForm() {
 RegForm.style.display = 'block';
 setTimeout(() => { RegForm.classList.add('show-form'); }, 100);
 }

 export function registration({ firstName, lastName, email }) {
 if (!Storage[email]) {
 const newPlayer = new Player({ firstName, lastName, email });
 Storage.setItem(email, newPlayer.playerToString());
 }
 Storage.setItem(CurrentPlayer, email);
 game.setPlayer(new Player(Storage[email]));
 RegForm.classList.remove('show-form');
 RegForm.style.display = 'none';
 GameSection.style.display = 'flex';
 HeadMenu.style.visibility = 'visible';
 return false;
 }

 export function blurValidation(e) {
 e.stopPropagation();
 if (e.target.value) {
 if (e.target.id === EmailInput.id) {
 if (EmailValid.test(e.target.value)) {
 e.target.classList.remove('invalid-input');
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

 export function formSubmit(e) {
 e.preventDefault();
 const EmailErrorNode = EmailInput.parentElement.querySelector('.email-validation');
 if (LastNameInput.value
 && FirstNameInput.value
 && EmailValid.test(EmailInput.value)) {
 const email = EmailInput.value;
 const firstName = FirstNameInput.value;
 const lastName = LastNameInput.value;

 [EmailInput, LastNameInput, FirstNameInput].forEach((x) => {
 x.removeAttribute('class');
 x.value = '';
 });
 return registration({ email, firstName, lastName });
 }
 [EmailInput, LastNameInput, FirstNameInput].forEach(x => {
 if (!x.value) {
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

 const FormTemplate = `
 <section id="reg-form-container" class="reg-form-container">
 <h2>Please fill registration form</h2>
 <form id="reg-form" action="" name="reservationForm" class="reg-form" method="post" novalidate>
 <div class="form-fieldset">
 <label for="firstName">First Name</label>
 <input type="text" name="firstName" id="firstName" placeholder="your First Name *" >
 </div>
 <div class="form-fieldset">
 <label for="lastName">Last Name</label>
 <input type="text" name="lastName" id="lastName" placeholder="your Last Name *" >
 </div>
 <div class="form-fieldset">
 <label for="regFormEmail">Email</label>
 <input type="email" name="email" id="regFormEmail" placeholder="your Email *" >
 <p class="email-validation">Please enter valid email</p>
 </div>
 <div class="form-fieldset">
 <input id="regFormSubmit" type="submit" value="Submit" >
 </div>
 </form>
 </section>
 `;

 /*
 export const CardsBg = {
 card1: `url(${card1})`,
 card2: `url(${card2})`,
 card3: `url(${card3})`,
 card4: `url(${card4})`,
 card5: `url(${card5})`,
 card6: `url(${card6})`,
 card7: `url(${card7})`,
 card8: `url(${card8})`,
 card9: `url(${card9})`,
 card10: `url(${card10})`,
 card11: `url(${card11})`,
 card12: `url(${card12})`,
 card13: `url(${card13})`,
 card14: `url(${card14})`,
 card15: `url(${card15})`,
 card16: `url(${card16})`,
 card17: `url(${card17})`,
 card18: `url(${card18})`,
 };

 {
 test: /\.html$/,
 loader: "raw-loader",
 },
 */


