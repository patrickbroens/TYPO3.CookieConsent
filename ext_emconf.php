<?php
$EM_CONF[$_EXTKEY] = array(
    'title' => 'Cookie consent',
    'description' => 'Show information and get consent for tracking cookies. Handles "doNotTrack" setting from browser automatically. Filters out unwanted tracking scripts by AOP. Javascript based. Needs jQuery.',
    'category' => 'fe',
    'state' => 'stable',
    'author' => 'Patrick Broens',
    'author_email' => 'patrick@patrickbroens.nl',
    'version' => '2.0.0',
    'constraints' => array(
        'depends' => array(
            'typo3' => '7.6.0-7.6.99'
        ),
        'conflicts' => array(),
        'suggests' => array()
    ),
    'autoload' => array(
        'psr-4' => array('PatrickBroens\\CookieConsent\\' => 'Classes')
    )
);