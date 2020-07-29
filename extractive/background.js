chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

function onClickCtx(e){
    console.log("CTX", e);
    // send to content script that is active.
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "summarize"}, function(response) {
        });
    });
}
console.log("background.js is alive.")
var ctxMenu = chrome.contextMenus.create({
    title: "summarize",
    onclick: onClickCtx,
    contexts: ['page', 'selection'],
});
