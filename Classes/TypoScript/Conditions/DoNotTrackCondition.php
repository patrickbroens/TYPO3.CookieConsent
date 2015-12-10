<?php
namespace PatrickBroens\CookieConsent\TypoScript\Conditions;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Core\Configuration\TypoScript\ConditionMatching\AbstractCondition;

/**
 * Do not track condition
 */
class DoNotTrackCondition extends AbstractCondition {

        /**
         * Evaluate condition
         *
         * Returns true when the 'doNotTrack' cookie has not been set or set to 1
         *
         * @param array $conditionParameters Parameters from condition, not used here
         * @return bool
         */
        public function matchCondition(array $conditionParameters) {
            return (!isset($_COOKIE['doNotTrack']) || (int) $_COOKIE['doNotTrack'] === 1);
        }
}