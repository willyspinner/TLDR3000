var port = chrome.runtime.connect();
console.log("I AM ALIVEE HAHAH")

// For early testing, we use huggingface's API url just for now.
const apiUrl="https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

let oldVal; 


// drag
const delta = 6;
let startX;
let startY;


window.addEventListener('mousedown', function (event) {
  startX = event.pageX;
  startY = event.pageY;
});

window.addEventListener('mouseup', function (event) {
    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);

    if (diffX >= delta || diffY >= delta) {
        const selection = window.getSelection();
        if (selection.anchorNode === null) {
            console.log("FALSE ALARM");
        } else {
            // we use repeat() to deep copy the string.
            const oldVal = selection.anchorNode.textContent.repeat(1);
            if (oldVal.trim() === '') {
                return;
            }

            const confirmSummarize = confirm("Do you want to summarize?");
            if (confirmSummarize) {
                console.log("summarizing ",oldVal);
                selection.anchorNode.textContent = "...... summarizing ......";
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=UTF-8',
                    },
                    body: JSON.stringify(oldVal)
                })
                .then((res) => res.json())
                .then((jsonResponse) => {
                    if (Array.isArray(jsonResponse) && jsonResponse[0] && typeof(jsonResponse[0].summary_text) === "string") {
                        const summary_text = jsonResponse[0].summary_text;
                        console.log("NEW", summary_text);
                        //TODO: highlight? Do some fancy stuff?
                        selection.anchorNode.textContent = summary_text;
                    }
                }).catch((e) => {
                    selection.anchorNode.textContent = "Failed to summarize. Sorry!"
                    console.error(e);
                });
            }
        }
    }


});

/*
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
if (event.source != window)
    return;

if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
}
}, false);
*/
