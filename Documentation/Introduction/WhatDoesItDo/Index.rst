.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../../Includes.txt



.. _what-does-it-do:

What does it do?
----------------

Cookie Consent stops extensions from adding 3rd party tracking code and cookies to your website to protect your
visitor's privacy. When a visitor enters the website for the first time, it will check the following and take action
upon:

#. Do the browser settings allow tracking? If not, the "doNotTrack" cookie will be set to 1

#. If the "doNotTrack" cookie is not set yet, it will present an information bar to the visitor, with a description, a
   link to a page with the privacy statement and a button to accept tracking. When accepted, the "doNotTrack" cookie is
   set to 0.

When the cookie is not present or the user has explicitly denied tracking by the browser settings, the script will
prevent the loading of scripts, images or iframes (using a slightly modified version of jQuery AOP) which are added to
the DOM. These elements can be excluded from the DOM by checking the url of the source of this element. This url will be
compared with domains in a white- or blacklist, depending on the mode setting.

.. WARNING::

   The extension will only check :code:`<script>`, :code:`<iframe>` and :code:`<img>` tags which are added to
   the DOM by Javascript. No checking will be done on these tags if they are already in the page source itself.



.. _what-does-it-do-flowchart:

Flow Chart
^^^^^^^^^^

.. figure:: ../../Images/Introduction/WhatDoesItDo/FlowChart.png
   :alt: Flow Chart

   Flow chart how 'Do Not Track' and consent are handled