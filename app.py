from flask import Flask, render_template, request, jsonify, send_from_directory
import google.generativeai as genai
import os

app = Flask(__name__)

genai.configure(api_key="AIzaSyBd385XupzEu4oYXmWC2aZxBGj5pja4kHI")
model = genai.GenerativeModel("gemini-pro")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page2')
def page2():
    return render_template('page2.html')

@app.route('/templatess')
def templatess():
    return render_template('templatess.html')

@app.route('/pdfs/<path:filename>')
def pdfs(filename):
    return send_from_directory('static/pdfs', filename)

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/legalCases')
def legalCases():
    return render_template('legalCases.html')

@app.route('/lawyersPage')
def lawyersPage():
    return render_template('lawyersPage.html')

@app.route('/lawinfoo')
def lawinfoo():
    return render_template('lawinfoo.html')

@app.route('/applicationForm')
def applicationForm():
    return render_template('applicationForm.html')

@app.route('/process_input', methods=['POST'])
def process_input():
    data = request.get_json()
    input_text = data['inputText']

    response_text = get_query(input_text)

    return jsonify({'response': response_text})

def get_query(query):
    print(query)
    prompt = "You are now an AI bot integrated into a law website. You have to answer the following question as an Indian Lawyer. So you are my lawyer.{}".format(query)
    response = model.generate_content(prompt)
    return response.text

if __name__ == '__main__':
    app.run(debug=True, port=3000)
