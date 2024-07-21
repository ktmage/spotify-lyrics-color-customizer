function updateLyricsBackgroundColor(color) {
    const style = document.createElement('style');
    style.textContent = `
      .FUYNhisXTCmbzt9IDxnT {
        --lyrics-color-background: ${color} !important;
      }
    `;

    document.head.appendChild(style);
}
  
function applyColor() {
    chrome.storage.sync.get('backgroundColor', function(data) {
        if (data.backgroundColor) {
            updateLyricsBackgroundColor(data.backgroundColor);
        }
    });
}
  
// 最初の適用
applyColor();

// DOM変更を監視し、新しい要素が追加されたときに色を適用
const observer = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            applyColor();
        }
    });
});
  
observer.observe(document.body, { childList: true, subtree: true });
  
// 保存された色が変更された場合に更新
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.backgroundColor) {
        updateLyricsBackgroundColor(changes.backgroundColor.newValue);
    }
});