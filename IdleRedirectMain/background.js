let DefaultUrl = "https://oceanside.iii.com"
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

/* chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

const keepAliveForced = () => {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

const keepAlive = async () => {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://add * here/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

const retryOnTabUpdate = async (tabId, info, tab) => {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}

keepAlive(); */

setInterval(IdleCheck, 4000)