const getValues = () => {
    let x = document.getElementById("options");
    let NewUrl = x.elements[0].value;
    let NewTimeout = x.elements[1].value;
    let Select = x.elements[2].value
    let text;
    if (NewUrl != "") {
      chrome.storage.sync.set({Url: NewUrl});
      text = "<strong class=\"success\">Success!</strong>"
    }
    if (NewTimeout != "") {
      if(Select == "Minutes") {
        NewTimeout *= 60
      }
      if (NewTimeout >= 15) {
        chrome.storage.sync.set({Timeout: NewTimeout});
        text = "<strong class=\"success\">Success!</strong>"
        }
      else {
        text = "<strong class=\"error\">Timeout must be more than 15 seconds</strong>"
      }
    }
    if (NewUrl == "" && NewTimeout == "") {
    text = "Nothing entered!"
    }
    document.getElementById("showValue").innerHTML = text;
    getUrl((value) => {
      document.getElementById("urlDisplay").innerHTML = value;
    });
    getTimeout((value) => {
      document.getElementById("timeoutDisplay").innerHTML = value;
    })
  }

const testUrl = () => {
  getUrl((value) => {
  chrome.tabs.create({ url: value["Url"] });
  });
}
const getUrl = callback => {
  chrome.storage.sync.get("Url", callback);
}
const getTimeout = callback => {
  chrome.storage.sync.get("Timeout", callback)
}

document.getElementById("urlDisplay").innerHTML = "Loading";
document.getElementById("timeDisplay").innerHTML = "Loading";

setTimeout(() => {getUrl((value) => {
  document.getElementById("urlDisplay").innerHTML = value["Url"];
});
getTimeout((value) => {
  document.getElementById("timeDisplay").innerHTML = value["Timeout"];
})
},
100);

document.getElementById('submit').addEventListener('click', getValues);
document.getElementById('urltest').addEventListener('click', testUrl);
