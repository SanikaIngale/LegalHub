from flask import Flask, redirect, render_template, request, jsonify, send_from_directory, url_for
import google.generativeai as genai
from pymongo import MongoClient
import os

app = Flask(__name__)

genai.configure(api_key="AIzaSyBd385XupzEu4oYXmWC2aZxBGj5pja4kHI")
model = genai.GenerativeModel("gemini-pro")

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['user']  # Change this to your database name
users_collection = db['users']  # Change this to your collection name


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


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        try:
            users_collection.insert_one({'fullname': fullname, 'email': email, 'password': password})
            return redirect(url_for('login'))  # Redirect to the login page after signup
        except Exception as e:
            print("Error inserting user data:", e)
            return "An error occurred while signing up. Please try again."

        # Insert the user data into MongoDB
    #     users_collection.insert_one({'fullname': fullname, 'email': email, 'password': password})
    #     return redirect(url_for('login'))  # Redirect to the login page after signup
    return render_template('signup.html')
from flask import request, redirect, url_for, render_template

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        fullname = request.form['fullname']
        password = request.form['password']
        # Check if the username and password match a record in MongoDB
        user = users_collection.find_one({'fullname': fullname, 'password': password})
        if user:
            # Successful login
            return render_template('index.html')
        else:
            # Login failed, render the login page again with an alert message
            return render_template('login.html', alert_message='Invalid username or password')
    return render_template('login.html', alert_message=None)


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
    app.run(debug=True,port=3000)
