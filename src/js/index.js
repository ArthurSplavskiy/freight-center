import "../scss/style.scss";
import './core/utils/inline-svg.js';
import './core/utils/sliders.js';
import './core/scroll/lazyload.js';
import './core/forms/select.js';
import { formFieldsInit, formSubmit } from './core/forms/forms.js';
import { isTarget, spollers, removeClasses, _slideUp, bodyLockStatus, bodyLockToggle, tabs } from './core/utils/functions.js';

const $searchForm = document.querySelector('[data-search-form]')

export const popup = {
	open (selector) {
		document.querySelector(selector).classList.add('_open');
	},
	close (e, selector) {
		e.target.closest(selector).closest('.popup').classList.remove('_open');
	}
};

const clickOnDocument = (e) => {
	const targetElement = e.target;
	
	const $searchTrigger = isTarget(targetElement, '[data-search-trigger]')
	const $searchClose = isTarget(targetElement, '[data-search-close]')
	if ($searchTrigger) {
		$searchForm.classList.toggle('js-active')
	}
	if ($searchClose) {
		$searchForm.classList.toggle('js-active')
	}

	const $targetHeaderSpoller = isTarget(targetElement, '.header [data-spoller]')
	if (!$targetHeaderSpoller) {
		removeClasses('.header [data-spoller]', '_spoller-active')
		_slideUp('.header [data-spoller] + *', 500);
	}

	const $pageBurger = isTarget(targetElement, '[data-burger]')
	const $headerMenu = document.querySelector('[data-mobile-menu]');
	if ($pageBurger && $headerMenu) {
		if (bodyLockStatus) {
			bodyLockToggle();
			$headerMenu.classList.toggle('js-open');
			$pageBurger.classList.toggle('js-open');
		}
	}

	if(targetElement.closest('.popup__close')) {
		popup.close(e, '.popup__close');
	}
	if(targetElement.closest('.popup') && !targetElement.closest('.popup__content')) {
		popup.close(e, '.popup');
	}
	
	if(targetElement.closest('[href="#"]')) {
		e.preventDefault();
	}
};

const setCopyrightYear = (el) => {
	el ? el.innerHTML = `${new Date().getFullYear()}` : null;
};

const playPreloaderAnimation = () => {
	const $preloader = document.querySelector('.preloader');
	$preloader && $preloader.classList.add('_animate');
};

const showFormClass = () => {
	const $showOption = document.querySelector('[data-showclass-option]');
	const $showOptionInputs = $showOption && $showOption.querySelectorAll('input[type="radio"]')
	const $showFormClass = $showOption && $showOption.nextElementSibling;

	const hiddenSelect = () => {
		if($showFormClass) {
			$showFormClass.style.display = 'none';
			$showFormClass.hidden = true;
		}
	}
	const showSelect = () => {
		if($showFormClass) {
			$showFormClass.style.display = 'block';
			$showFormClass.hidden = false;
		}
	}

	hiddenSelect();

	$showOptionInputs && $showOptionInputs.forEach(input => {
		input.addEventListener('change', function() {
			if(this.hasAttribute('data-showclass-option-yes') && this.checked) {
				showSelect();
			} else {
				hiddenSelect();
			}
		})
	})
}

const init = () => {
	const $html = document.documentElement;
	$html.classList.add('loaded');

	playPreloaderAnimation();
	spollers();
	setCopyrightYear(document.querySelector('.js-copyright-year'));
	formFieldsInit();
	formSubmit(true);
	tabs();
	showFormClass();
	
	document.addEventListener('click', clickOnDocument)
};

window.addEventListener('load', init);