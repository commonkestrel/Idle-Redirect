# Idle-Redirect

This is a chrome extension that can redirect your current tab to a specified webpage after a customizable period of time. There may still be updates, but the main extension is finished. To add this to chrome, simply go to the [chrome://extensions](chrome extension) page, and enable developer mode if it is not already enabled. Then click "*Load Unpacked*", and select "IdleRedirectMain". Then open the popup for the extension, and you can change the webpage this redirects to (default is Google), and the idle timeout(the period of time after which the user is considered idle).

---

This extension uses Google's Manifest V2, which is depreciated and will not work as of January 2023. [background-new.js](https://github.com/Jibble330/Idle-Redirect/blob/main/IdleRedirectMain/background-new.js) and [manifest-new.json](https://github.com/Jibble330/Idle-Redirect/blob/main/IdleRedirectMain/manifest-new.json) are and in progress fix to this, hopefully being able to work on Manifest V3, but as of now they break when the extension is reloaded. 
