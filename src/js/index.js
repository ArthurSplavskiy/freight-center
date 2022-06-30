import "../scss/style.scss";
import './core/utils/inline-svg.js';
import './core/utils/sliders.js';
import './core/scroll/lazyload.js';
import './core/forms/select.js';
import { formFieldsInit, formSubmit } from './core/forms/forms.js';
import { isTarget, spollers, removeClasses, _slideUp, bodyLockStatus, bodyLockToggle, tabs } from './core/utils/functions.js';

const $searchForm = document.querySelector('[data-search-form]')

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
};

const setCopyrightYear = (el) => {
	el ? el.innerHTML = `${new Date().getFullYear()}` : null;
}

const init = () => {
	const $html = document.documentElement;
	$html.classList.add('loaded');

	spollers();
	setCopyrightYear(document.querySelector('.js-copyright-year'));
	formFieldsInit();
	formSubmit(true);
	tabs();
	
	document.addEventListener('click', clickOnDocument)
};

window.addEventListener('load', init);