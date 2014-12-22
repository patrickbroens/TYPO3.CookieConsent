.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../../Includes.txt


.. _setup:

Setup
^^^^^

Most of the setup properties will be inherited from the constants. However you always override them in the setup part of
your TypoScript Template.

.. _setup-plugin-cookie-consent-settings-pages:

plugin.tx\_cookieconsent.settings.pages
"""""""""""""""""""""""""""""""""""""""


.. _setup-plugin-cookie-consent-settings-pages-privacystatement:

privacyStatement
~~~~~~~~~~~~~~~~

.. container:: table-row

   Property
         privacyStatement

   Data type
         int

   Description
         Page ID where the privacy statement or more information about tracking cookies can be found. This will be
         presented as a link on the bar.

   Default
         {$plugin.tx_cookieconsent.pages.privacyStatement}



.. _setup-plugin-cookie-consent-settings-loadscripts:

plugin.tx\_cookieconsent.settings.loadScripts
"""""""""""""""""""""""""""""""""""""""""""""



.. _setup-plugin-cookie-consent-settings-loadscripts-mode:

mode
~~~~

.. container:: table-row

   Property
         mode

   Data type
         string

   Description
         Only 2 options are possible: blacklist / whitelist. Domains will be filtered by excluding them (blacklist),
         or including them (whitelist)

   Default
         {$plugin.tx_cookieconsent.loadScripts.mode}



.. _setup-plugin-cookie-consent-settings-loadscripts-domains:

domains.[array]
~~~~~~~~~~~~~~~

.. container:: table-row

   Property
         domains.[array]

   Data type
         string

   Description
         List of domains for blacklist (exclude) / whitelist (include)



.. _setup-plugin-cookie-consent-settings-loadscripts-example:

Example
~~~~~~~

The following example will exclude dynamic insertion of script from Google Tag Manager, Google Analytics and
Google DoubleClick.

::

   plugin.tx_cookieconsent {
      settings {
         mode = blacklist
         domains {
            googleTagManager = googletagmanager.com
            googleAnalytics = google-analytics.com
            doubleClick = doubleclick.net
         }
      }
   }