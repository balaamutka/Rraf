from flask import Flask, jsonify, make_response
from flask_cors import CORS  # Імпортуємо CORS
import mysql.connector
import json

app = Flask(__name__)

CORS(app, resources={r"/rraf-get-locations": {"origins": "http://localhost:3000"}})

# Параметри для підключення до бази даних
db_config = {
    'host': '194.44.236.9',
    'user': 'svr_23',
    'password': 'id23_svr',
    'database': 'svr_23'
}

@app.route('/rraf-get-locations', methods=['GET'])
def get_locations():
    locations = []

    # Підключення до бази даних
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)

    try:
        # Викликаємо збережену процедуру
        cursor.callproc('RrafGetLocations')

        # Проходимо через результати
        for result in cursor.stored_results():
            locations = result.fetchall()

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()

    # Повертаємо список локацій у форматі JSON з коректним кодуванням
    response = make_response(json.dumps(locations, ensure_ascii=False))
    response.mimetype = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True)
