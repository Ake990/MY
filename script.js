let products = [];
const selectedProducts = {};
const productGrid = document.getElementById('productGrid');
const orderSummaryList = document.getElementById('orderSummary');
const customerNameInput = document.getElementById('customerNameInput');
const customerPhoneInput = document.getElementById('customerPhoneInput');
const branchInput = document.getElementById('branchInput');
const notesInput = document.getElementById('notesInput');
const sendOrderButton = document.getElementById('sendOrderButton');
const messageBox = document.getElementById('messageBox');

// Show temporary message
function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.add('show');
  setTimeout(() => {
    messageBox.classList.remove('show');
  }, 3000);
}

// Validate
function validateForm() {
  let isValid = true;
  [customerNameInput, customerPhoneInput, branchInput, notesInput].forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('border-red-500', 'animate-pulse');
      isValid = false;
    } else {
      input.classList.remove('border-red-500', 'animate-pulse');
    }
  });

  if (Object.values(selectedProducts).length === 0) {
    showMessage('ກະລຸນາເລືອກສິນຄ້າ');
    isValid = false;
  }
  return isValid;
}

// Render Products
function renderProducts() {
  productGrid.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = "bg-white p-4 rounded-xl shadow-sm border text-center";
    div.innerHTML = `
      <img src="${product.images[0]}" class="w-24 h-24 mx-auto rounded-lg mb-2">
      <h3 class="font-bold">${product.name}</h3>
      <p class="text-pink-700">₭${product.price}</p>
      <input type="number" min="0" value="0" data-id="${product.id}" class="w-20 p-2 text-center border rounded-lg mt-2">
    `;
    productGrid.appendChild(div);

    const input = div.querySelector('input');
    input.addEventListener('input', e => {
      const qty = parseInt(e.target.value, 10);
      if (qty > 0) {
        selectedProducts[product.id] = { ...product, quantity: qty };
      } else {
        delete selectedProducts[product.id];
      }
      updateOrderSummary();
    });
  });
}

// Update order summary
function updateOrderSummary() {
  orderSummaryList.innerHTML = '';
  let total = 0;
  Object.values(selectedProducts).forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.quantity} - ₭${item.price * item.quantity}`;
    orderSummaryList.appendChild(li);
    total += item.price * item.quantity;
  });
  if (total > 0) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>ຍອດລວມ: ₭${total}</strong>`;
    orderSummaryList.appendChild(li);
  }
}

// Load products
function loadProducts() {
  products = [
    { id: 'p1', name: 'ເສື້ອຮາວາຍ', price: 120, images: ['https://i.ibb.co/6P6Xw9X/hawaiian-shirt-1.png'] },
    { id: 'p2', name: 'ຊຸດກະໂປງ', price: 150, images: ['https://i.ibb.co/K50hTz8/dress-1.png'] }
  ];
  renderProducts();
}

loadProducts();
