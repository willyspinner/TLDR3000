var port = chrome.runtime.connect();
console.log("extractive is alive.")


chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    console.log(sender);
    const selection = window.getSelection();
    if (selection.anchorNode === null) {
    // TODO: summarize whole page here.
    } else {
        // we use repeat() to deep copy the string.
        const selectedVal = selection.anchorNode.textContent.repeat(1);
        // TODO: summarize selectedVal
    }
    // use sendResponse({OBJ}) to reply back.
});
