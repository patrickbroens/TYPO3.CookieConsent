/***************************************************************
 *  Copyright notice
 *
 *  © 2014 Patrick Broens <patrick@patrickbroens.nl>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

(function(configuration) {
	var _mode = configuration.mode;
	var _domains = configuration.domains;
	var _files = configuration.files;
	var _checkBrowserDNT = configuration.checkBrowserDNT;

	/**
	 * Sanitize invocation by removing src urls if not allowed
	 *
	 * @param myTarget
	 * @param myMethod
	 */
	var sanitizeInvocation = function(myTarget, myMethod) {
		aop.around({target: myTarget, method: myMethod},
			function (invocation) {
				if (
					typeof(invocation.arguments[0].src) === 'string'
					&& (
						invocation.arguments[0].tagName.toLowerCase() === 'script'
						|| invocation.arguments[0].tagName.toLowerCase() === 'img'
						|| invocation.arguments[0].tagName.toLowerCase() === 'iframe'
					)
					&& invocation.arguments[0].src !== 'javascript:void(0)'
				) {
					if (isUrlAllowed(invocation.arguments[0].src) === false) {
						invocation.arguments[0].src = 'javascript:void(0)';
					}
				}
				return invocation.proceed();
			}
		);
	};

	/**
	 * Check if a url is allowed
	 *
	 * This is true when it is not a string, in the whitelist, or not on the blacklist
	 *
	 * @param {string} url The URL to check
	 * @returns {boolean}
	 */
	var isUrlAllowed = function(url) {
		var regularExpressionDomain = new RegExp('(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
		var domainAllowed = false;
		var fileAllowed = false;
		var entryFoundInBlacklist = false;
		var fileFound = false;

		try {
			var domain = url.match(regularExpressionDomain)[1].toString();
			var fileName = url.substring(url.lastIndexOf("/")+ 1);
			fileName = (fileName.match(/[^.]+(\.[^?#]+)?/) || [])[0];
		} catch(e) {
			return true;
		}

		if (_mode === 'blacklist') {
			for (var index = 0; index < _domains.length; ++index) {
				if (typeof _domains[index] === 'string') {
					if (domain.indexOf(_domains[index].toLowerCase()) !== -1) {
						entryFoundInBlacklist = true;
						domainAllowed = false;
						break;
					} else {
						entryFoundInBlacklist = false;
					}
				}
			}
			if (!entryFoundInBlacklist) {
				domainAllowed = true;
			}
		} else {
			for (var index = 0; index < _domains.length; ++index) {
				if (typeof _domains[index] === 'string') {
					if (domain.indexOf(_domains[index].toLowerCase()) !== -1) {
						domainAllowed = true;
						break;
					}
				}
			}
		}

		for (var index = 0; index < _files.length; ++index) {
			if (typeof _files[index] === 'string') {
				if (fileName.indexOf(_files[index].toLowerCase()) !== -1) {
					fileFound = true;
					fileAllowed = false;
					break;
				} else {
					fileFound = false;
				}
			}
		}
		if (!fileFound) {
			fileAllowed = true;
		}

		return domainAllowed && fileAllowed;
	};



	/**
	 * Checks if tracking is not allowed by the 'doNotTrack' cookie
	 *
	 * Returns true if cookie does not exist or is set to 1, which means no tracking
	 *
	 * @returns {boolean}
	 */
	var noTrackingAllowedByCookie = function() {
		return (!doesCookieExist() || document.cookie.indexOf('doNotTrack=1') !== -1);
	};

	/**
	 * Checks if the 'doNotTrack' cookie exists
	 *
	 * Returns true when the tracking cookie exists
	 *
	 * @returns {boolean}
	 */
	var doesCookieExist = function() {
		return (document.cookie.indexOf('doNotTrack') !== -1);
	};

	/**
	 * Checks if tracking is not allowed by the browser settings
	 *
	 * Returns true if one of the navigator options is on, which means no tracking
	 *
	 * @returns {boolean}
	 */
	var noTrackingAllowedByNavigator = function() {
		return (
			navigator.doNotTrack === 'yes'
			|| navigator.msDoNotTrack === '1'
			|| navigator.doNotTrack === '1'
			|| window.doNotTrack === '1' // Global in newer versions of Safari
		);
	};

	/**
	 * Set the value of the tracking cookie 'doNotTrack'
	 *
	 * 0 = tracking allowed
	 * 1 = tracking not allowed
	 *
	 * @param {integer} value
	 */
	var setCookie = function(value) {
		var date = new Date();
	    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		document.cookie = 'doNotTrack=' + value + '; expires=' + date.toUTCString() + '; path=/';
	};

	if (noTrackingAllowedByNavigator() && _checkBrowserDNT === true) {
		setCookie(1);
	}

	if (noTrackingAllowedByCookie()) {
		// for document.write, has to be sanitized differently from others
		aop.around({target: document, method: 'write'},
			function(invocation) {
				if (invocation.arguments[0].search(/img|script|iframe/i) !== -1) {
					if (isUrlAllowed(invocation.arguments[0]) === false) {
						invocation.arguments[0] = invocation.arguments[0].replace(/</g, '<!-- ').replace(/>/g, ' -->');
					}
				}
				return invocation.proceed();
			}
		);

		// for dom-methods insertBefore and appendChild on parent of first script and/or head
		scriptParent = document.getElementsByTagName('script')[0].parentNode;
		if (scriptParent.tagName.toLowerCase !== 'head') {
			head = document.getElementsByTagName('head')[0];
			sanitizeInvocation(head, 'insertBefore');
			sanitizeInvocation(head, 'appendChild');
		}
		sanitizeInvocation(scriptParent, 'insertBefore');
		sanitizeInvocation(scriptParent, 'appendChild');
	}

	doNotTrackCookie = {
		/**
		 * Set the value of the tracking cookie 'doNotTrack'
		 *
		 * 0 = tracking allowed
		 * 1 = tracking not allowed
		 *
		 * @param {integer} value
		 */
		set : function(value) {
			setCookie(value);
		},

		/**
		 * Checks if the 'doNotTrack' cookie exists
		 *
		 * Returns true when the tracking cookie exists
		 *
		 * @returns {boolean}
		 */
		doesExist : function() {
			return doesCookieExist();
		}
	};
})(doNotTrackConfiguration);

jQuery(document).ready(function($) {
	'use strict';

	if(doNotTrackCookie.doesExist()) {
		$('#cookie-consent').hide();
	} else {
		$('#cookie-consent').show();
	}

	$('#cookie-consent .accept').click(function() {
		doNotTrackCookie.set(0);
		location.reload(true);
	});

	$('#cookie-consent .deny').click(function() {
		doNotTrackCookie.set(1);
		location.reload(true);
	});
});