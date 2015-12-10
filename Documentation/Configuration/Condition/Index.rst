.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../../Includes.txt


.. _condition:

TypoScript condition
^^^^^^^^^^^^^^^^^^^^

A TypoScript condition can be used to include or exclude lines of TypoScript. You can use it to exclude the inclusion of
javascript files or to pass "do not track" settings to your own extension(s).

.. code-block:: typoscript

   [PatrickBroens\CookieConsent\TypoScript\Conditions\DoNotTrackCondition]
       do something here ...
   [global]
