from flask import Flask, request, Response
from gensim.summarization import summarize
import json

app = Flask(__name__)

@app.route('/summarize', methods=['GET'])
def summarize_text():
    data = request.get_json()
    text = data.get('text', None)
    engine = data.get('engine', None)
    if text is None:
        return Response(json.dumps({ "error": "no text field supplied."}), 400)
    if engine is None:
        return Response(json.dumps({ "error": "no engine field supplied."}), 400)
    if engine not in ['textrank']:
        return Response(json.dumps({ "error": "unsupported summarization engine."}), 400)

    if engine == 'textrank':
        summarized_points = summarize(text, split=True)

    resp = json.dumps({"summarized_points": summarized_points})
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7200, threaded=True)
