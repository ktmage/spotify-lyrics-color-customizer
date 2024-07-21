document.getElementById('save').addEventListener('click', function() {
    const color = document.getElementById('color-picker').value;
    chrome.storage.sync.set({backgroundColor: color}, function() {
        console.log('Color is saved');
    });
});
  
// 保存された色を読み込む
chrome.storage.sync.get('backgroundColor', function(data) {
    if (data.backgroundColor) {
        document.getElementById('color-picker').value = data.backgroundColor;
    }
});