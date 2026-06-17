import os
import sqlite3
from flask import Flask, request, jsonify, render_template, session, redirect

app = Flask(__name__)
app.secret_key = 'nayepankh-admin-secret-key-2026'
DATABASE = os.path.join(os.path.dirname(__file__), 'database.db')

def load_env():
  env_path = os.path.join(os.path.dirname(__file__), '.env')
  if os.path.exists(env_path):
    with open(env_path, 'r') as f:
      for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
          key, val = line.split('=', 1)
          os.environ[key.strip()] = val.strip()

# Load environment variables
load_env()
PORT = os.environ.get('PORT', 8000)

# Parse admin users array
admin_users_str = os.environ.get('ADMIN_USERS', 'admin:admin')
ADMIN_USERS_MAP = {}
for user_pair in admin_users_str.split(','):
  if ':' in user_pair:
    uname, pword = user_pair.split(':', 1)
    ADMIN_USERS_MAP[uname.strip()] = pword.strip()

def init_db():
  conn = sqlite3.connect(DATABASE)
  cursor = conn.cursor()
  cursor.execute('''
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      area_of_interest TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  ''')
  conn.commit()
  conn.close()

def get_db_connection():
  conn = sqlite3.connect(DATABASE)
  conn.row_factory = sqlite3.Row
  return conn

# Initialize SQLite database table on app start
init_db()

@app.before_request
def before_request():
  if request.method == 'OPTIONS':
    return jsonify({'status': 'OK'}), 200

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

# Health Check API
@app.route('/')
def index():
  return jsonify({
    'message': 'Hello, World!',
    'status': 200,
    'data': {
      'name': 'Naye Pankh Foundation',
      'year': 2026,
      'status': 'Online'
    }
  }), 200

# Become Volunteer API
@app.route('/become-volunteer', methods=['POST'])
def become_volunteer():
  data = request.json or {}
  full_name = data.get('full_name')
  email = data.get('email')
  area_of_interest = data.get('area_of_interest')

  # Validating the data
  if not full_name or not email or not area_of_interest:
    return jsonify({
      'message': 'All fields are required!',
      'status': 400
    }), 400

  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
      'INSERT INTO volunteers (full_name, email, area_of_interest) VALUES (?, ?, ?)',
      (full_name, email, area_of_interest)
    )
    conn.commit()
    conn.close()
  except Exception as e:
    return jsonify({
      'message': f'Database error: {str(e)}',
      'status': 500
    }), 500

  return jsonify({
    'message': 'Thank you for becoming a volunteer!',
    'status': 200,
    'data': {
      'full_name': full_name,
      'email': email,
      'area_of_interest': area_of_interest
    }
  }), 200

# Login API / View
@app.route('/login', methods=['GET', 'POST'])
def login():
  if session.get('logged_in'):
    return redirect('/admin')
  error = None
  if request.method == 'POST':
    username = request.form.get('username')
    password = request.form.get('password')
    if username in ADMIN_USERS_MAP and ADMIN_USERS_MAP[username] == password:
      session['logged_in'] = True
      session['username'] = username
      return redirect('/admin')
    else:
      error = 'Invalid username or password'
  return render_template('login.html', error=error)

# Logout Route
@app.route('/logout')
def logout():
  session.pop('logged_in', None)
  session.pop('username', None)
  return redirect('/login')

# Dashboard API
@app.route('/admin')
def dashboard():
  if not session.get('logged_in'):
    return redirect('/login')
  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get all volunteers
    volunteers = cursor.execute('SELECT * FROM volunteers ORDER BY created_at DESC').fetchall()
    
    # Get total count
    total_count = len(volunteers)
    
    # Get stats by area of interest
    stats_query = cursor.execute('SELECT area_of_interest, COUNT(*) as count FROM volunteers GROUP BY area_of_interest').fetchall()
    
    # Default stats dictionary
    stats = {
      'Digital Literacy': 0,
      'Healthcare': 0,
      'Skill Development': 0,
      'Rural Education': 0,
      'Environment': 0
    }
    for row in stats_query:
      area = row['area_of_interest']
      if area in stats:
        stats[area] = row['count']
        
    conn.close()
    return render_template('Dashboard.html', volunteers=volunteers, total_count=total_count, stats=stats)
  except Exception as e:
    return f"Database Error: {str(e)}", 500

# Delete Volunteer API
@app.route('/api/volunteers/<int:volunteer_id>', methods=['DELETE'])
def delete_volunteer(volunteer_id):
  if not session.get('logged_in'):
    return jsonify({
      'status': 'error',
      'message': 'Unauthorized: Admin authentication required'
    }), 401
  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM volunteers WHERE id = ?', (volunteer_id,))
    conn.commit()
    conn.close()
    return jsonify({
      'status': 'success',
      'message': 'Volunteer record deleted successfully'
    }), 200
  except Exception as e:
    return jsonify({
      'status': 'error',
      'message': f'Database error: {str(e)}'
    }), 500

# Donate API
@app.route('/donate')
def donate():
  return jsonify({
    'message': 'Hello, World!',
    'status': 200,
    'data': {
      'name': 'Naye Pankh Foundation',
      'year': 2026,
      'status': 'Online'
    }
  }), 200

# AI Bot API
@app.route('/ai-bot')
def ai_bot():
  return jsonify({
    'message': 'Hello, World!',
    'status': 200,
    'data': {
      'name': 'Naye Pankh Foundation',
      'year': 2026,
      'status': 'Online'
    }
  }), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=PORT, debug=True)