<?php
namespace PatrickBroens\CookieConsent\ViewHelpers;

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

use TYPO3\CMS\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Facets\CompilableInterface;

/**
 * Configuration viewhelper for cookie consent
 */
class ConfigurationViewHelper extends AbstractViewHelper implements CompilableInterface
{
    /**
     * Javascript configuration
     *
     * @param string $mode The exclusion mode (whitelist/blacklist)
     * @param array|null $domains The domains to be excluded/included
     * @param array|null $files The files to be excluded/included
     * @param bool $checkBrowserDnt True if the browser Do Not Track settings needs to be taken into account
     * @return string Configuration in JSON format
     * @api
     */
    public function render($mode = 'blacklist', $domains = null, $files = null, $checkBrowserDnt = false)
    {
        return static::renderStatic(
            array(
                'mode' => $mode,
                'domains' => $domains,
                'files' => $files,
                'checkBrowserDnt' => $checkBrowserDnt
            ),
            $this->buildRenderChildrenClosure(),
            $this->renderingContext
        );
    }

    /**
     * JSON encodes the configuration
     *
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param \TYPO3\CMS\Fluid\Core\Rendering\RenderingContextInterface $renderingContext
     * @return string Configuration in JSON format
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {

        $configuration = [
            'mode' => $arguments['mode'] === 'whitelist' ? 'whitelist' : 'blacklist',
            'domains' => array_values($arguments['domains']),
            'files' => array_values($arguments['files']),
            'checkBrowserDNT' => (bool) $arguments['checkBrowserDnt']
        ];

        return '<script type="text/javascript">var doNotTrackConfiguration=' . json_encode($configuration) . ';</script>';
    }
}
