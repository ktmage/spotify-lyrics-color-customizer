

// saveボタンをクリックしたときに、設定した情報をストレージに保存する
document.getElementById('save').addEventListener('click', function() {
    const backgroundColor = document.getElementById('background-color-picker').value;
    const activeColor = document.getElementById('active-color-picker').value;
    const inactiveColor = document.getElementById('inactive-color-picker').value;
    const passedColor = document.getElementById('passed-color-picker').value;
    
    // 複数デバイス間で動機できるstorageの保存領域を使用
    chrome.storage.sync.set({colors: {backgroundColor, activeColor, inactiveColor, passedColor}}, function() {
        console.log('Color is saved');
    });
});

// 設定をリセットする
document.getElementById('reset').addEventListener('click', function() {
    // ストレージに保存されている背景色を削除
    chrome.storage.sync.remove('colors');

    // ページをリロード
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
});

// ストレージから背景色を取得して、input要素に設定する
chrome.storage.sync.get('colors', function(data) {
    if (data.colors) {
        document.getElementById('background-color-picker').value = data.colors.backgroundColor;
        document.getElementById('active-color-picker').value = data.colors.activeColor;
        document.getElementById('inactive-color-picker').value = data.colors.inactiveColor;
        document.getElementById('passed-color-picker').value = data.colors.passedColor;
    }
});