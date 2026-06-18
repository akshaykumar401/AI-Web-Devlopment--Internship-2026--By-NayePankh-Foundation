import os
import pymongo
from bson import ObjectId
import datetime
from google import genai
from flask import Flask, request, jsonify, render_template, session, redirect

app = Flask(__name__)
app.secret_key = 'nayepankh-admin-secret-key-2026'

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
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DB = os.environ.get('MONGO_DB', 'nayepankh')

# MongoDB Client Instance
mongo_client = None

def get_db():
  global mongo_client
  if not mongo_client:
    mongo_client = pymongo.MongoClient(MONGO_URI)
  return mongo_client[MONGO_DB]

# Parse admin users array
admin_users_str = os.environ.get('ADMIN_USERS', 'admin:admin')
ADMIN_USERS_MAP = {}
for user_pair in admin_users_str.split(','):
  if ':' in user_pair:
    uname, pword = user_pair.split(':', 1)
    ADMIN_USERS_MAP[uname.strip()] = pword.strip()

def init_db():
  try:
    db = get_db()
    # Ping to check connection
    db.client.admin.command('ping')
    # Create index on created_at for sorting efficiency
    db.volunteers.create_index([("created_at", pymongo.DESCENDING)])
    print("Successfully connected to MongoDB!")
  except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")

# Initialize MongoDB connection on app start
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
    db = get_db()
    db.volunteers.insert_one({
      'full_name': full_name,
      'email': email,
      'area_of_interest': area_of_interest,
      'created_at': datetime.datetime.now()
    })
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
    db = get_db()
    
    # Get all volunteers sorted by created_at DESC
    cursor = db.volunteers.find().sort('created_at', pymongo.DESCENDING)
    volunteers = []
    for doc in cursor:
      # Map MongoDB _id to standard 'id' for template rendering compatibility
      doc['id'] = str(doc['_id'])
      if isinstance(doc.get('created_at'), datetime.datetime):
        doc['created_at'] = doc['created_at'].strftime('%Y-%m-%d %H:%M:%S')
      volunteers.append(doc)
      
    # Get total count
    total_count = db.volunteers.count_documents({})
    
    # Get stats by area of interest using MongoDB Aggregation
    stats_query = db.volunteers.aggregate([
      {'$group': {'_id': '$area_of_interest', 'count': {'$sum': 1}}}
    ])
    
    # Default stats dictionary
    stats = {
      'Digital Literacy': 0,
      'Healthcare': 0,
      'Skill Development': 0,
      'Rural Education': 0,
      'Environment': 0
    }
    for item in stats_query:
      area = item['_id']
      if area in stats:
        stats[area] = item['count']
        
    return render_template('Dashboard.html', volunteers=volunteers, total_count=total_count, stats=stats)
  except Exception as e:
    return f"Database Error: {str(e)}", 500

# Delete Volunteer API
@app.route('/api/volunteers/<volunteer_id>', methods=['DELETE'])
def delete_volunteer(volunteer_id):
  if not session.get('logged_in'):
    return jsonify({
      'status': 'error',
      'message': 'Unauthorized: Admin authentication required'
    }), 401
  try:
    db = get_db()
    result = db.volunteers.delete_one({'_id': ObjectId(volunteer_id)})
    if result.deleted_count > 0:
      return jsonify({
        'status': 'success',
        'message': 'Volunteer record deleted successfully'
      }), 200
    else:
      return jsonify({
        'status': 'error',
        'message': 'Volunteer record not found'
      }), 404
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

# Predefined answers for common questions to save API latency and token cost
PREDEFINED_ANSWERS = {
  'volunteer': "We'd love to have you join NayePankh Foundation! You can sign up right now by filling out the 'Become a Changemaker' form next to this chat. Select an area of interest (Digital Literacy, Rural Education, etc.) and submit. Our team will contact you within 24-48 hours! 🙋‍♂️",
  'join': "We'd love to have you join NayePankh Foundation! You can sign up right now by filling out the 'Become a Changemaker' form next to this chat. Select an area of interest (Digital Literacy, Rural Education, etc.) and submit. Our team will contact you within 24-48 hours! 🙋‍♂️",
  'changemaker': "We'd love to have you join NayePankh Foundation! You can sign up right now by filling out the 'Become a Changemaker' form next to this chat. Select an area of interest (Digital Literacy, Rural Education, etc.) and submit. Our team will contact you within 24-48 hours! 🙋‍♂️",
  
  'project': "Our active initiatives include:\n• 📚 **Rural Education**: Providing resources and schooling support to children in rural areas.\n• 💻 **Digital Literacy**: Building computer training labs to prepare youth for the digital world.\n• 🛠️ **Skill Development**: Job-oriented training programs for young adults.\n• 🏥 **Healthcare & Environment**: Direct social welfare, hygiene camps, and tree planting. 🌟",
  'program': "Our active initiatives include:\n• 📚 **Rural Education**: Providing resources and schooling support to children in rural areas.\n• 💻 **Digital Literacy**: Building computer training labs to prepare youth for the digital world.\n• 🛠️ **Skill Development**: Job-oriented training programs for young adults.\n• 🏥 **Healthcare & Environment**: Direct social welfare, hygiene camps, and tree planting. 🌟",
  'campaign': "Our active initiatives include:\n• 📚 **Rural Education**: Providing resources and schooling support to children in rural areas.\n• 💻 **Digital Literacy**: Building computer training labs to prepare youth for the digital world.\n• 🛠️ **Skill Development**: Job-oriented training programs for young adults.\n• 🏥 **Healthcare & Environment**: Direct social welfare, hygiene camps, and tree planting. 🌟",
  'work': "Our active initiatives include:\n• 📚 **Rural Education**: Providing resources and schooling support to children in rural areas.\n• 💻 **Digital Literacy**: Building computer training labs to prepare youth for the digital world.\n• 🛠️ **Skill Development**: Job-oriented training programs for young adults.\n• 🏥 **Healthcare & Environment**: Direct social welfare, hygiene camps, and tree planting. 🌟",

  'donate': "Thank you for supporting NayePankh Foundation! You can make a secure contribution by clicking the 'Donate' button in the navigation header. Your donation directly funds learning materials, computer equipment, and school renovations. 🤝",
  'money': "Thank you for supporting NayePankh Foundation! You can make a secure contribution by clicking the 'Donate' button in the navigation header. Your donation directly funds learning materials, computer equipment, and school renovations. 🤝",
  'support': "Thank you for supporting NayePankh Foundation! You can make a secure contribution by clicking the 'Donate' button in the navigation header. Your donation directly funds learning materials, computer equipment, and school renovations. 🤝",
  'contribution': "Thank you for supporting NayePankh Foundation! You can make a secure contribution by clicking the 'Donate' button in the navigation header. Your donation directly funds learning materials, computer equipment, and school renovations. 🤝",

  'contact': "You can reach NayePankh Foundation via:\n• 📧 **Email**: support@nayepankh.org\n• 📞 **Phone**: +91-XXXXXXXXXX\n• 📍 **Office**: Noida, UP, India.\nFeel free to write to us anytime! 📞",
  'email': "You can reach NayePankh Foundation via:\n• 📧 **Email**: support@nayepankh.org\n• 📞 **Phone**: +91-XXXXXXXXXX\n• 📍 **Office**: Noida, UP, India.\nFeel free to write to us anytime! 📞",
  'phone': "You can reach NayePankh Foundation via:\n• 📧 **Email**: support@nayepankh.org\n• 📞 **Phone**: +91-XXXXXXXXXX\n• 📍 **Office**: Noida, UP, India.\nFeel free to write to us anytime! 📞",
  'address': "You can reach NayePankh Foundation via:\n• 📧 **Email**: support@nayepankh.org\n• 📞 **Phone**: +91-XXXXXXXXXX\n• 📍 **Office**: Noida, UP, India.\nFeel free to write to us anytime! 📞",
}

# AI Bot API
@app.route('/ai-bot', methods=['POST'])
def ai_bot():
  data = request.json or {}
  content = data.get('content', '')
  query_lower = content.lower().strip()
  
  # Check if there is an exact key match in the query for predefined options
  for keyword, predefined_reply in PREDEFINED_ANSWERS.items():
    if keyword in query_lower:
      return jsonify({
        'message': predefined_reply,
        'status': 200
      }), 200
      
  # Dynamic Gemini generation with try-except safety block
  try:
    load_env()
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
      return jsonify({
        'message': 'AI Assistant Error: GEMINI_API_KEY is not configured in the environment variables.',
        'status': 500
      }), 500
      
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
      model="gemini-2.5-flash",
      contents=f"""
      You are NayePankh Foundation's elite AI Assistant.
      
      About NayePankh Foundation:
      - We are one of the leading non-governmental organizations working for the upliftment of the underprivileged.
      - We empower individuals, specifically students and youth, through education, technology, and career skills.
      - We have successfully mobilized over 5,300+ volunteers.
      
      Core Programs:
      1. Digital Literacy: Building state-of-the-art computer labs and providing digital skills to bridge the digital divide.
      2. Rural Education: Equipping village primary schools with learning aids, textbooks, and teacher training.
      3. Skill Development: Conducting vocational training workshops to make youngsters job-ready.
      4. Healthcare & Environment: Organizing hygiene drives, medical camps, and sustainability tree-planting campaigns.
      
      How to Volunteer:
      - Fill out the "Become a Changemaker" form right next to this chat panel.
      - Select your preferred interest (Digital Literacy, Rural Education, Skill Development, Healthcare, or Environment).
      - Our onboarding coordinators review submissions and respond within 24-48 hours.
      
      How to Donate:
      - Click on the "Donate" button located in the top navigation header of the webpage.
      
      Contact Options:
      - Email: support@nayepankh.org
      - Location: Noida, Uttar Pradesh, India
      
      Response Guidelines:
      - Keep responses concise, warm, helpful, and polite.
      - Format response using bullet points and emojis where appropriate to maintain a modern, friendly reading experience.
      - If asked about unrelated topics, politely guide the user back to NayePankh Foundation's mission.
      
      User Question: {content}
      """
    )
    
    return jsonify({
      'message': response.text,
      'status': 200,
    }), 200
  except Exception as e:
    # Graceful fallback to rule-based or default helpful offline answer on API errors
    fallback_reply = None
    for keyword, predefined_reply in PREDEFINED_ANSWERS.items():
      if keyword in query_lower:
        fallback_reply = predefined_reply
        break
    if not fallback_reply:
      fallback_reply = "Thank you for reaching out! NayePankh Foundation is dedicated to bringing positive social change through education, technology, and social welfare. You can join our 5,300+ volunteers by filling out the form on the right, or contact us at support@nayepankh.org. 🌟"
      
    return jsonify({
      'message': fallback_reply,
      'status': 200,
      'note': f'Fallback activated due to API error: {str(e)}'
    }), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=PORT, debug=True)