let DefaultUrl = "https://www.google.com"
let DefaultTimeout = 30
chrome.storage.sync.get(["Url"], url => {
  url = url["Url"]
  if (typeof url != 'string') {
  chrome.storage.sync.set({Url: DefaultUrl}, function() {
    console.log('Url is set to ' + DefaultUrl);
  });
}
});
chrome.storage.sync.get(["Timeout"], timeout => {
  timeout = timeout["Timeout"]
  if (typeof timeout != 'string' && typeof timeout != 'integer') {
  chrome.storage.sync.set({Timeout: DefaultTimeout}, function() {
    console.log('Timeout is set to ' + DefaultTimeout);
  });
}
});
let lifeline;

const IdleCheck = () => {
  chrome.storage.sync.get(["Timeout"], timeout => {
    timeout = parseInt(timeout["Timeout"]);
    chrome.idle.queryState(
        timeout, // in seconds
        currentState => {
          if (currentState != "active") {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
              var activeTab = tabs[0];
              var activeTabUrl = activeTab.url;
              console.log(activeTabUrl);
              getUrl((value) => {
                let redirectUrl = value["Url"]
                if (activeTabUrl.includes(redirectUrl) !== true) {
                  chrome.tabs.update({url:redirectUrl});
                  }
              });
            });
          } 
        }
      );
    });
  }

const getUrl = (callback) => {
  chrome.storage.sync.get("Url", callback);
}

setInterval(IdleCheck, 4000)
