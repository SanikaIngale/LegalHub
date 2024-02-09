from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel("gemini-pro")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page2')
def page2():
    return render_template('page2.html')

@app.route('/process_input', methods=['POST'])
def process_input():
    data = request.get_json()
    input_text = data['inputText']

    # Call your backend Python function to get the response
    response_text = get_query(input_text)

    return jsonify({'response': response_text})

def get_query(query):
    prompt = "You are now an AI bot integrated into a law website. Do not make the headings bold. You have to answer the following question as an Indian Lawyer. So you are my lawyer.{}".format(query)
    response = model.generate_content(prompt)
    return response.text

if __name__ == '__main__':
    app.run(debug=True)
