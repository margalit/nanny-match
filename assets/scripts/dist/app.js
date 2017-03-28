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
/***/ function(module, exports) {

	'use strict';

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
	  var submit = document.querySelector('[data-submit]');
	  var validateFormWithFields = validateForm(form)(submit);
	  if (form) {
	    var fields = form.querySelectorAll('[data-field]');
	    fields.forEach(function (field) {
	      field.addEventListener('change', function () {
	        validateFormWithFields(fields);
	      });
	    });
	    form.onsubmit = function (evt) {
	      evt.preventDefault();
	      screenResults(fields);
	    };
	  }
	};

	var validateForm = function validateForm(form) {
	  return function (button) {
	    return function (fields) {
	      var valid = true;
	      fields.forEach(function (field) {
	        if (field.value === '' || field.value === 'Select one') {
	          valid = false;
	        }
	      });
	      if (valid) {
	        form.onsubmit = function (evt) {
	          evt.preventDefault();
	          screenResults(fields);
	        };
	        button.disabled = false;
	      } else {
	        form.onSubmit = function (evt) {
	          evt.preventDefault();
	        };
	        button.disabled = true;
	      }
	    };
	  };
	};

	var screenResults = function screenResults(fields) {
	  var satisfyCriteria = true;
	  var dateOfBirth = void 0;
	  fields.forEach(function (field) {
	    var value = field.value;

	    switch (field.dataset.field) {
	      case 'date-of-birth':
	        dateOfBirth = value;
	        var ageDiff = Date.now() - new Date(value).getTime();
	        var age = Math.abs(new Date(ageDiff).getUTCFullYear() - 1970);
	        if (age < 22) satisfyCriteria = false;
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
	    window.location.assign('https://airtable.com/shreBpX2w5XcDiImt?prefill_Date%20of%20Birth=' + dateOfBirth);
	  } else {
	    window.location.assign('/sorry');
	  }
	};

	document.addEventListener("DOMContentLoaded", function () {
	  setupMenu();
	  setupForm();
	});

/***/ }
/******/ ]);