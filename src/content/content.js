// Service Worker との通信を行うため、アクティブな時はメッセージをリッスンできるようにしておく。
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { });

// 歌詞の背景色に該当するクラス名
const TARGET_CLASS_NAME = 'FUYNhisXTCmbzt9IDxnT';

// スタイルを作成して、該当するクラスの背景色を変更する関数
function updateLyricsBackgroundColor(colors) {
    const style = document.createElement('style');
    style.textContent = `
      .${TARGET_CLASS_NAME} {
        --lyrics-color-background: ${colors.backgroundColor} !important;
        --lyrics-color-active: ${colors.activeColor} !important;
        --lyrics-color-inactive: ${colors.inactiveColor} !important;
        --lyrics-color-passed: ${colors.passedColor} !important;
      }
    `;

    document.head.appendChild(style);
}

// ストレージから背景色を取得して適用する関数
function applyColor() {
    chrome.storage.sync.get('colors', function(data) {
        if (data) {
            updateLyricsBackgroundColor({
                backgroundColor: data.colors.backgroundColor,
                activeColor: data.colors.activeColor,
                inactiveColor: data.colors.inactiveColor,
                passedColor: data.colors.passedColor
            });
        }
    });
}
  
// 最初の適用
applyColor();

// DOMの変更を監視して色を適用
const observer = new MutationObserver(function(mutationList) {
    mutationList.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            applyColor();
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });
  
// 保存された色が変更された場合に更新
chrome.storage.onChanged.addListener(function(changes) {
    if (changes.colors) {
        updateLyricsBackgroundColor({
            backgroundColor: changes.colors.newValue.backgroundColor,
            activeColor: changes.colors.newValue.activeColor,
            inactiveColor: changes.colors.newValue.inactiveColor,
            passedColor: changes.colors.newValue.passedColor
        });
    }
});
