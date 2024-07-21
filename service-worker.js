// タブにメッセージを送り、リッスンされたときに有効化します
function update(tabId) {
    chrome.tabs.sendMessage(tabId, { message: "echo" }).then((response) => {
        chrome.action.enable();
        chrome.action.setIcon({ path: "assets/icon/neutral/16x16.png" });
    }).catch((error) => {
        chrome.action.disable();
        chrome.action.setIcon({ path: "assets/icon/disabled/16x16.png" });
    });
}
  
// タブがアクティブになったとき
chrome.tabs.onActivated.addListener((activeInfo) => {
    update(activeInfo.tabId);
});
  
// タブか更新された（ページ遷移した）とき
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        update(tabId);
    }
});
  
// ウィンドウがアクティブになったとき
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        update(tabs[0].id);
    });
});