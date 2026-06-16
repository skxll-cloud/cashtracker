import os
import sqlite3
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

DB_PATH = os.environ.get('DB_PATH', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cash.db'))

DENOMINATIONS = [
    {'id': 'eur50', 'value': 5000, 'label': '50€', 'type': 'bill'},
    {'id': 'eur20', 'value': 2000, 'label': '20€', 'type': 'bill'},
    {'id': 'eur10', 'value': 1000, 'label': '10€', 'type': 'bill'},
    {'id': 'eur5',  'value': 500,  'label': '5€',  'type': 'bill'},
    {'id': 'eur2',  'value': 200,  'label': '2€',  'type': 'coin'},
    {'id': 'eur1',  'value': 100,  'label': '1€',  'type': 'coin'},
    {'id': 'ct50',  'value': 50,   'label': '50ct', 'type': 'coin'},
    {'id': 'ct20',  'value': 20,   'label': '20ct', 'type': 'coin'},
    {'id': 'ct10',  'value': 10,   'label': '10ct', 'type': 'coin'},
    {'id': 'ct5',   'value': 5,    'label': '5ct',  'type': 'coin'},
    {'id': 'ct2',   'value': 2,    'label': '2ct',  'type': 'coin'},
    {'id': 'ct1',   'value': 1,    'label': '1ct',  'type': 'coin'},
]


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS inventory (
            denomination TEXT PRIMARY KEY,
            quantity INTEGER DEFAULT 0
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            amount INTEGER NOT NULL,
            category TEXT NOT NULL,
            description TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    for d in DENOMINATIONS:
        conn.execute(
            'INSERT OR IGNORE INTO inventory (denomination, quantity) VALUES (?, 0)',
            (d['id'],)
        )
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    conn = get_db()
    rows = conn.execute('SELECT denomination, quantity FROM inventory').fetchall()
    conn.close()
    qty_map = {row['denomination']: row['quantity'] for row in rows}

    items = []
    for d in DENOMINATIONS:
        items.append({
            'id': d['id'],
            'value': d['value'],
            'label': d['label'],
            'type': d['type'],
            'quantity': qty_map.get(d['id'], 0),
        })

    total = sum(d['value'] * qty_map.get(d['id'], 0) for d in DENOMINATIONS)
    return jsonify({'items': items, 'total': total})


@app.route('/api/inventory', methods=['POST'])
def update_inventory():
    data = request.get_json()
    denomination = data.get('denomination')
    quantity = max(0, int(data.get('quantity', 0)))

    valid_ids = {d['id'] for d in DENOMINATIONS}
    if denomination not in valid_ids:
        return jsonify({'error': 'Invalid denomination'}), 400

    conn = get_db()
    conn.execute(
        'INSERT OR REPLACE INTO inventory (denomination, quantity) VALUES (?, ?)',
        (denomination, quantity)
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    conn = get_db()
    rows = conn.execute(
        'SELECT * FROM transactions ORDER BY created_at DESC LIMIT 20'
    ).fetchall()

    monthly = conn.execute(
        '''SELECT type, SUM(amount) as total
           FROM transactions
           WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
           GROUP BY type'''
    ).fetchall()
    conn.close()

    monthly_income = 0
    monthly_expense = 0
    for row in monthly:
        if row['type'] == 'income':
            monthly_income = row['total'] or 0
        else:
            monthly_expense = row['total'] or 0

    return jsonify({
        'transactions': [dict(r) for r in rows],
        'monthly': {
            'income': monthly_income,
            'expense': monthly_expense,
            'balance': monthly_income - monthly_expense,
        }
    })


@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    trans_type = data.get('type')
    amount = int(round(float(data.get('amount', 0)) * 100))
    category = data.get('category', '').strip()
    description = data.get('description', '').strip()

    if trans_type not in ('income', 'expense'):
        return jsonify({'error': 'Invalid type'}), 400
    if amount <= 0:
        return jsonify({'error': 'Amount must be positive'}), 400
    if not category:
        return jsonify({'error': 'Category required'}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO transactions (type, amount, category, description) VALUES (?, ?, ?, ?)',
        (trans_type, amount, category, description)
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/transactions/<int:trans_id>', methods=['DELETE'])
def delete_transaction(trans_id):
    conn = get_db()
    conn.execute('DELETE FROM transactions WHERE id = ?', (trans_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})


init_db()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
