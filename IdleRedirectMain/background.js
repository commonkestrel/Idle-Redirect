let DefaultUrl = "https://www.google.com"
let DefaultTimeout = 15
chrome.storage.sync.get(["Url"], url => {
    url = url["Url"]
    if (typeof url != 'string') {
    chrome.storage.sync.set({Url: DefaultUrl}, function() {
    });
}
});

chrome.storage.sync.get(["Timeout"], timeout => {
    timeout = timeout["Timeout"]
    if (typeof timeout != 'string' && typeof timeout != 'integer') {
    chrome.storage.sync.set({Timeout: DefaultTimeout}, function() {
        });
    }
});

chrome.idle.setDetectionInterval(
    15
);

const IdleCheck = currentState => {
    if (currentState != "active") {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
            var activeTab = tabs[0];
            var activeTabUrl = activeTab.url;
            getUrl((value) => {
                let redirectUrl = value["Url"]
                if (activeTabUrl.includes(redirectUrl) !== true) {
                    chrome.tabs.update({url:redirectUrl});
                    }
                });
            });
        } 
    }

const getUrl = (callback) => {
    chrome.storage.sync.get("Url", callback);
}

chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get(["Timeout"], timeout => {
        newTimeout = parseInt(timeout["Timeout"])
        chrome.idle.setDetectionInterval(newTimeout);
    });
  });

chrome.idle.onStateChanged.addListener(
    newState => {
        IdleCheck(newState)
    }
);
