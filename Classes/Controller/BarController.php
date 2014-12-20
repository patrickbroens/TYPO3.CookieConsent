<?php
namespace PatrickBroens\CookieConsent\Controller;

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

/**
 * Cookie consent controller
 */
class BarController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {

	/**
	 * Show the bar
	 *
	 * @return void
	 */
	public function indexAction() {
		$this->addJavascript();

		$this->view->assign('pages', $this->settings['pages']);
	}

	/**
	 * Add settings as javascript variable to the output
	 *
	 * @return void
	 */
	private function addJavascript() {
		$mode = $this->settings['loadScripts']['mode'] === 'whitelist' ? 'whitelist' : 'blacklist';

		$configuration = array(
			'mode' => $mode,
			'domains' => array_values($this->settings['loadScripts']['domains'])
		);

		$GLOBALS['TSFE']->getPageRenderer()->addJsInlineCode(
			'cookieConsent',
			'var doNotTrackConfiguration = ' . json_encode($configuration) . ';'
		);
	}
}