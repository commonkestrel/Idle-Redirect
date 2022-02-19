# Idle-Redirect

This is a chrome extension that can redirect your current tab to a specified webpage after a customizable period of time. There may still be updates, but the main extension is finished. To add this to chrome, simply go to the [chrome://extensions](chrome extension) page, and enable developer mode if it is not already enabled. Then click "*Load Unpacked*", and select "IdleRedirectMain". Then open the popup for the extension, and you can change the webpage this redirects to (default is Google), and the idle timeout(the period of time after which the user is considered idle).

##Problems

One major problem with this extension is that it must use manifest V2, which will not be supported on chromeium in January, 2023. This extension, however, needs manifest V2 in order to function, because of the very important "persistent" property. Without it, this extension's service worker goes inactive, and does not function.
