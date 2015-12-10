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



.. _constants-plugin-cookie-consent-settings-checkbrowserdnt:

plugin.tx\_cookieconsent.settings.checkBrowserDNT
"""""""""""""""""""""""""""""""""""""""""""""""""

.. container:: table-row

   Property
         checkBrowserDNT

   Data type
         boolean

   Description
         1 (true) when the "Do Not Track" setting of the browser has to be taken into account.

   Default
         {$plugin.tx_cookieconsent.checkBrowserDNT}



.. _constants-plugin-cookie-consent-settings-showdenybutton:

plugin.tx\_cookieconsent.settings.showDenyButton
""""""""""""""""""""""""""""""""""""""""""""""""

.. container:: table-row

   Property
         showDenyButton

   Data type
         boolean

   Description
         1 (true) shows also the button to deny the consent. By clicking this button, the visitor will not be tracked
         and the cookie bar will not be shown anymore.

   Default
         {$plugin.tx_cookieconsent.showDenyButton}