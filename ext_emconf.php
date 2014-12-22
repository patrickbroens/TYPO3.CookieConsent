<?php

/***************************************************************
 * Extension Manager/Repository config file for ext "cookie_consent".
 *
 * Auto generated 19-12-2014 18:53
 *
 * Manual updates:
 * Only the data in the array - everything else is removed by next
 * writing. "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array(
	'title' => 'Cookie consent',
	'description' => 'Show information and get consent for tracking cookies. Handles "doNotTrack" setting from browser automatically. Filters out unwanted tracking scripts by AOP. Javascript based. Needs jQuery.',
	'category' => 'fe',
	'state' => 'stable',
	'uploadfolder' => FALSE,
	'createDirs' => '',
	'clearCacheOnLoad' => TRUE,
	'author' => 'Patrick Broens',
	'author_email' => 'patrick@patrickbroens.nl',
	'author_company' => '',
	'version' => '1.0.0',
	'constraints' => array(
		'depends' => array(
			'php' => '5.3.3-5.6.99',
			'typo3' => '6.2.0-7.99.99',
		),
		'conflicts' => array(
		),
		'suggests' => array(
		),
	),
);