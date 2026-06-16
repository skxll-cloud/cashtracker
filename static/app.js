'use strict';

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = {
  expense: ['Courses', 'Salle de sport', 'Sortie', 'Transport', 'Nourriture', 'Achat', 'Autre'],
  income:  ['Argent de poche', 'Travail', 'Vente', 'Cadeau', 'Autre'],
};

// ── State ──────────────────────────────────────────────────────────────────
let inventoryData = [];
let currentType   = 'expense';

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(cents) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function fmtDate(str) {
  const d = new Date(str.replace(' ', 'T'));
  const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

// ── Inventory ──────────────────────────────────────────────────────────────
async function loadInventory() {
  const res  = await fetch('/api/inventory');
  const data = await res.json();
  inventoryData = data.items;
  renderInventory(data.items);
  setTotal(data.total);
}

function renderInventory(items) {
  const bills = items.filter(i => i.type === 'bill');
  const coins = items.filter(i => i.type === 'coin');
  document.getElementById('bills-list').innerHTML = bills.map(rowHTML).join('');
  document.getElementById('coins-list').innerHTML = coins.map(rowHTML).join('');

  document.querySelectorAll('.btn-minus').forEach(btn =>
    btn.addEventListener('click', () => changeQty(btn.dataset.id, -1))
  );
  document.querySelectorAll('.btn-plus').forEach(btn =>
    btn.addEventListener('click', () => changeQty(btn.dataset.id, +1))
  );
}

function rowHTML(item) {
  const sub    = item.value * item.quantity;
  const subStr = sub > 0 ? fmt(sub) : '—';
  return `
  <div class="denom-row" data-id="${item.id}">
    <span class="denom-label">${item.label}</span>
    <div class="denom-controls">
      <button class="btn-round btn-minus" data-id="${item.id}" aria-label="Retirer un ${item.label}">&#x2212;</button>
      <span class="denom-qty" id="qty-${item.id}">${item.quantity}</span>
      <button class="btn-round btn-plus"  data-id="${item.id}" aria-label="Ajouter un ${item.label}">&#x2B;</button>
    </div>
    <span class="denom-subtotal ${sub > 0 ? 'nonzero' : ''}" id="sub-${item.id}">${subStr}</span>
  </div>`;
}

const saveTimers = {};

function changeQty(id, delta) {
  const item = inventoryData.find(i => i.id === id);
  if (!item) return;

  item.quantity = Math.max(0, item.quantity + delta);

  // Instant DOM update
  const qtyEl = document.getElementById(`qty-${id}`);
  const subEl = document.getElementById(`sub-${id}`);
  if (qtyEl) qtyEl.textContent = item.quantity;
  if (subEl) {
    const sub = item.value * item.quantity;
    subEl.textContent = sub > 0 ? fmt(sub) : '—';
    subEl.className   = `denom-subtotal ${sub > 0 ? 'nonzero' : ''}`;
  }

  // Recalculate total immediately
  const total = inventoryData.reduce((s, i) => s + i.value * i.quantity, 0);
  setTotal(total);

  // Debounced API save (300 ms)
  clearTimeout(saveTimers[id]);
  saveTimers[id] = setTimeout(() => {
    fetch('/api/inventory', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ denomination: id, quantity: item.quantity }),
    }).catch(console.error);
  }, 300);
}

function setTotal(cents) {
  document.getElementById('total-cash').textContent = fmt(cents);
}

// ── Transactions ───────────────────────────────────────────────────────────
async function loadTransactions() {
  const res  = await fetch('/api/transactions');
  const data = await res.json();
  renderTransactions(data.transactions);
  renderSummary(data.monthly);
}

function renderTransactions(list) {
  const container = document.getElementById('transactions-list');
  if (!list.length) {
    container.innerHTML = '<div class="empty-state">Aucune transaction pour le moment</div>';
    return;
  }

  container.innerHTML = list.map(t => {
    const isIncome = t.type === 'income';
    const sign     = isIncome ? '+' : '−';
    const descHTML = t.description ? `<div class="tx-desc">${esc(t.description)}</div>` : '';
    return `
    <div class="transaction-item">
      <div class="tx-icon ${t.type}">${sign}</div>
      <div class="tx-info">
        <div class="tx-category">${esc(t.category)}</div>
        ${descHTML}
        <div class="tx-date">${fmtDate(t.created_at)}</div>
      </div>
      <div class="tx-amount ${t.type}">${sign}${fmt(t.amount)}</div>
      <button class="btn-delete" onclick="deleteTx(${t.id})" aria-label="Supprimer">&#x2715;</button>
    </div>`;
  }).join('');
}

function renderSummary(m) {
  document.getElementById('monthly-expense').textContent = fmt(m.expense || 0);
  document.getElementById('monthly-income').textContent  = fmt(m.income  || 0);
  const balEl = document.getElementById('monthly-balance');
  const bal   = m.balance || 0;
  balEl.textContent = fmt(Math.abs(bal));
  balEl.className   = `summary-amount ${bal >= 0 ? 'positive-color' : 'negative-color'}`;
}

async function deleteTx(id) {
  await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
  loadTransactions();
}

// XSS safety: escape user-supplied strings before innerHTML insertion
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ── Type Toggle ────────────────────────────────────────────────────────────
function setType(type) {
  currentType = type;

  document.querySelectorAll('.toggle-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.type === type)
  );

  const select = document.getElementById('category');
  select.innerHTML = CATEGORIES[type].map(c => `<option value="${c}">${c}</option>`).join('');

  const btn = document.getElementById('submit-btn');
  if (type === 'expense') {
    btn.textContent = 'Valider la dépense';
    btn.className   = 'btn-submit expense-submit';
  } else {
    btn.textContent = 'Valider le revenu';
    btn.className   = 'btn-submit income-submit';
  }
}

document.querySelectorAll('.toggle-btn').forEach(btn =>
  btn.addEventListener('click', () => setType(btn.dataset.type))
);

// ── Transaction Form Submit ────────────────────────────────────────────────
document.getElementById('transaction-form').addEventListener('submit', async e => {
  e.preventDefault();

  const amountStr = document.getElementById('amount').value.trim();
  const amount    = parseFloat(amountStr.replace(',', '.'));
  const category  = document.getElementById('category').value;
  const desc      = document.getElementById('description').value.trim();

  if (!amount || amount <= 0) {
    document.getElementById('amount').focus();
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;

  try {
    const res = await fetch('/api/transactions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ type: currentType, amount, category, description: desc }),
    });
    if (res.ok) {
      document.getElementById('amount').value      = '';
      document.getElementById('description').value = '';
      loadTransactions();
    }
  } finally {
    btn.disabled = false;
  }
});

// ── Splash ─────────────────────────────────────────────────────────────────
function hideSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  splash.classList.add('hidden');
  splash.addEventListener('transitionend', () => splash.remove(), { once: true });
}

// ── Init ───────────────────────────────────────────────────────────────────
setType('expense');
Promise.all([loadInventory(), loadTransactions()]).then(hideSplash);
