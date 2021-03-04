'use strict';

(function () {
  const KEYCODE = {
    esc: 27
  };
  const link = document.querySelector(`.main-nav__button`);
  const popup = document.querySelector(`.modal-overlay`);
  const close = popup.querySelector(`.modal-overlay__close`);
  const form = popup.querySelector(`.modal-overlay__form`);
  const callbackName = popup.querySelector(`#callback-name`);
  const callbackPhone = popup.querySelector(`#callback-phone`);
  const callbackLetter = popup.querySelector(`#callback-letter`);
  const modalName = popup.querySelector(`#modal-name`);
  const modalPhone = popup.querySelector(`#modal-phone`);
  const modalLetter = popup.querySelector(`#modal-letter`);
  const isStorageSupport = true;
  const storage = {};

  const openPopup = function () {
    popup.classList.add(`modal-overlay--opened`);
    document.body.classList.add(`modal-overlay__no-scroll`);
  };

  const closePopup = function () {
    popup.classList.remove(`modal-overlay--opened`);
    document.body.classList.remove(`modal-overlay__no-scroll`);
  };

  try {
    storage.name = localStorage.getItem(`name`);
    storage.phone = localStorage.getItem(`phone`);
    storage.letter = localStorage.getItem(`letter`);
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    openPopup();

    if (storage.name) {
      callbackName.value = storage.name;
      callbackPhone.value = storage.phone;
      callbackLetter.value = storage.question;
      modalName.value = storage.name;
      modalPhone.value = storage.phone;
      modalLetter.value = storage.question;
      question.focus();
    } else {
      userName.focus();
    }
  });

  close.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    closePopup();
  });

  form.addEventListener(`submit`, function () {
    if (isStorageSupport) {
      localStorage.setItem(`name`, callbackName.value);
      localStorage.setItem(`phone`, callbackPhone.value);
      localStorage.setItem(`letter`, callbackLetter.value);
      localStorage.setItem(`name`, modalName.value);
      localStorage.setItem(`phone`, modalPhone.value);
      localStorage.setItem(`letter`, modalLetter.value);
    }
  });

  window.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === KEYCODE.esc) {
      evt.preventDefault();
      if (popup.classList.contains(`modal-overlay--opened`)) {
        closePopup();
      }
    }
  });

  popup.addEventListener(`click`, function (evt) {
    if (evt.target === popup) {
      closePopup();
    }
  });
})();

(function () {
  const maskedInputs = document.querySelectorAll(`input[data-inputmask]`);

  const applyMask = function () {
    Array.prototype.forEach.call(maskedInputs, function (input) {
      const maskOption = {
        mask: input.getAttribute(`data-inputmask`)
      };
      IMask(input, maskOption);
    });
  };

  applyMask();

})();


(function () {
  const accordionItems = document.querySelectorAll(`.accordion`);
  const accordionPanes = document.querySelectorAll(`.accordion__pane`);

  const hidePane = function (button, pane) {
    button.classList.add(`accordion__toggle--inactive`);
    pane.classList.add(`accordion__pane--hidden`);
  };

  const showPane = function (button, pane) {
    button.classList.remove(`accordion__toggle--inactive`);
    pane.classList.remove(`accordion__pane--hidden`);
  };

  const toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
      const button = accordionPane.closest(`.accordion`).querySelector(`.accordion__toggle`);
      if (button === evt.target && !button.classList.contains(`accordion__toggle--inactive`) || button !== evt.target) {
        hidePane(button, accordionPane);
      } else if (button === evt.target) {
        showPane(button, accordionPane);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    const accordionToggleButton = accordion.querySelector(`.accordion__toggle`);
    const accordionPane = accordion.querySelector(`.accordion__pane`);
    hidePane(accordionToggleButton, accordionPane);
    accordionToggleButton.addEventListener(`click`, toggleAccordion);
  });
})();
