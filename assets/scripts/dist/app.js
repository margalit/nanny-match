/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _profiles = __webpack_require__(1);

	var _profiles2 = _interopRequireDefault(_profiles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setupMenu = function setupMenu() {
	  var toggle = document.querySelector('[data-toggle]');
	  var menu = document.querySelector('[data-menu]');
	  var toggleMenu = function toggleMenu() {
	    menu.classList.toggle('sm-hide');
	  };
	  toggle.addEventListener('click', toggleMenu);
	};

	var setupForm = function setupForm() {
	  var form = document.querySelector('[data-nanny-form]');
	  if (form) {
	    var fields = form.querySelectorAll('[data-field]');
	    Array.from(fields).map(function (field) {
	      field.addEventListener('change', function () {
	        renderErrorText('');
	      });
	    });
	    form.onsubmit = function (evt) {
	      evt.preventDefault();
	      if (fieldsValid(fields)) {
	        screenResults(fields);
	      } else {
	        renderErrorText('Please answer all the questions');
	      }
	    };
	  }
	};

	var fieldsValid = function fieldsValid(fields) {
	  return Array.from(fields).reduce(function (valid, field) {
	    return field.value === 'Select one' ? false : valid;
	  }, true);
	};

	var renderErrorText = function renderErrorText(text) {
	  var errorContainer = document.querySelector('[data-error]');
	  errorContainer.innerText = text;
	};

	var screenResults = function screenResults(fields) {
	  var satisfyCriteria = true;
	  fields.forEach(function (field) {
	    var value = field.value;

	    if (field.value === '' || field.value === 'Select one') {
	      satisfyCriteria = false;
	    }
	    switch (field.dataset.field) {
	      case 'experience':
	        if (value === 'no-experience') satisfyCriteria = false;
	        break;
	      case 'visa-status':
	        if (value !== 'permanent') satisfyCriteria = false;
	        break;
	      case 'wwcc':
	        if (value === 'will-not-get-wwcc') satisfyCriteria = false;
	        break;
	      case 'first-aid':
	        if (value === 'will-not-get-first-aid') satisfyCriteria = false;
	        break;
	      case 'commited':
	        if (value === 'no') satisfyCriteria = false;
	        break;
	    }
	  });
	  if (satisfyCriteria) {
	    window.location.assign('https://airtable.com/shreBpX2w5XcDiImt');
	  } else {
	    window.location.assign('/sorry');
	  }
	};

	document.addEventListener('DOMContentLoaded', function () {
	  setupMenu();
	  setupForm();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var AIRTABLE_KEY = 'keywcoHiGZUHcYyaO';
	var profiles = document.getElementById('profiles');

	if (profiles) {
	  fetch('https://api.airtable.com/v0/appJv6x50plgdZjnP/Nannies?api_key=' + AIRTABLE_KEY + '&maxRecords=3&view=Nanny%20Match%20Availabilities').then(function (resp) {
	    return resp.json();
	  }).then(function (response) {
	    var profilesMarkup = response.records.map(function (nanny) {
	      return '\n          <div class="col-4 sm-col-14 sm-mb-4">\n            <div class="overflow-hidden mb-3 sm-flex">\n              <div class="col col-5">\n                <div class="col-12 circle bg-cover bg-center" style="background-image: url(' + nanny.fields['Profile photo'][nanny.fields['Profile photo'].length - 1].thumbnails.large.url + ')"></div>\n              </div>\n              <div class="col col-9 f3 sm-f2 sm-my-auto">\n                <div class="bold mt-1">' + nanny.fields['Name'].split(' ')[0] + '</div>\n                <div class="feature">' + nanny.fields['Location'] + '</div>\n                <div>Available ' + nanny.fields['Available to start'] + '</div>\n              </div>\n            </div>\n            <div class="f3 sm-f2">' + nanny.fields['Blurb'] + '</div>\n          </div>\n        ';
	    }).join('');
	    profiles.innerHTML = '\n      <div class="py-5 sm-py-4 mx-auto col-12 lg-col-10 flex sm-block justify-between">\n        ' + profilesMarkup + '\n      </div>\n      ';
	  });
	}

/***/ }
/******/ ]);