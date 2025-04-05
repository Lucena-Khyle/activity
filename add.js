let products = [
  {
    name: 'Chicken',
    details: 'Fried chicken',
    quantity: 1,
    price: 100,
    dateAdded: '',
    type: 'Food',
    image: 'image/Chicken.png'
  },
  {
    name: 'Coke',
    details: 'Drinks',
    quantity: 1,
    price: 50,
    dateAdded: '',
    type: 'Beverages',
    image: 'image/Coke.jpg'
  },
  {
    name: 'Sundae',
    details: 'Cold Dessert',
    quantity: 1,
    price: 59,
    dateAdded: '',
    type: 'Dessert',
    image: 'image/Sundae.png'
  }
];

function updateDateAdded(checkbox) {
  const row = checkbox.closest('tr');
  const dateCell = row.querySelector('.date-added');
  const date = new Date().toLocaleDateString();
  dateCell.textContent = date;
}

function searchProduct() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#inventoryTable tbody tr');
  
  rows.forEach(row => {
    const productName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    row.style.display = productName.includes(searchTerm) ? '' : 'none';
  });
}

function filterByType() {
  const selectedType = document.getElementById('type').value;
  const rows = document.querySelectorAll('#inventoryTable tbody tr');
  
  rows.forEach(row => {
    const productType = row.getAttribute('data-type');
    row.style.display = (selectedType === 'All' || productType === selectedType) ? '' : 'none';
  });
}

function addItemToOrder() {
  window.location.href = 'create_item.html';
}

function editItem(button) {
  const row = button.closest('tr');
  const name = row.querySelector('td:nth-child(3)').textContent;
  const details = row.querySelector('td:nth-child(4)').textContent;
  const quantity = row.querySelector('.product-quantity').value;
  const price = row.querySelector('td:nth-child(6)').textContent.replace('₱', '');
  
  document.getElementById('name').value = name;
  document.getElementById('details').value = details;
  document.getElementById('quantity').value = quantity;
  document.getElementById('price').value = price;
  
  document.getElementById('createItemForm').onsubmit = function(event) {
    event.preventDefault();
    updateProduct(row);
  };
}

function removeItem(button) {
  const row = button.closest('tr');
  row.remove();
}

function updateProduct(row) {
  const name = document.getElementById('name').value;
  const details = document.getElementById('details').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const dateAdded = document.getElementById('date').value;
  const type = document.getElementById('type').value;
  
  row.querySelector('td:nth-child(3)').textContent = name;
  row.querySelector('td:nth-child(4)').textContent = details;
  row.querySelector('.product-quantity').value = quantity;
  row.querySelector('td:nth-child(6)').textContent = '₱' + price;
  row.querySelector('.date-added').textContent = dateAdded;
  row.setAttribute('data-type', type);
  
  alert('Product updated successfully!');
}

document.getElementById('createItemForm').onsubmit = function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const details = document.getElementById('details').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const dateAdded = document.getElementById('date').value;
  const type = document.getElementById('type').value;
  
  const table = document.getElementById('inventoryTable').querySelector('tbody');
  const newRow = document.createElement('tr');
  newRow.classList.add('product-item');
  newRow.setAttribute('data-type', type);
  newRow.innerHTML = `
    <td><input type="checkbox" class="product-checkbox" onchange="updateDateAdded(this)"></td>
    <td><img src="image/${name}.png" alt="${name}" width="50" height="50"></td>
    <td>${name}</td>
    <td>${details}</td>
    <td><input type="number" class="product-quantity" min="1" value="${quantity}"></td>
    <td>₱${price}</td>
    <td class="date-added">${dateAdded}</td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Edit</button>
      <button class="remove-btn" onclick="removeItem(this)">Remove</button>
    </td>
  `;
  table.appendChild(newRow);
  
  alert('Product added successfully!');
  
  document.getElementById('createItemForm').reset();
};

document.querySelector('.filter-btn:nth-child(1)').addEventListener('click', function() {
  const rows = Array.from(document.querySelectorAll('#inventoryTable tbody tr'));
  rows.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('td:nth-child(6)').textContent.replace('₱', ''));
    const priceB = parseFloat(b.querySelector('td:nth-child(6)').textContent.replace('₱', ''));
    return priceA - priceB;
  });
  
  const tbody = document.querySelector('#inventoryTable tbody');
  rows.forEach(row => tbody.appendChild(row));
});

document.querySelector('.filter-btn:nth-child(2)').addEventListener('click', function() {
  const rows = Array.from(document.querySelectorAll('#inventoryTable tbody tr'));
  rows.sort((a, b) => {
    const quantityA = parseInt(a.querySelector('.product-quantity').value);
    const quantityB = parseInt(b.querySelector('.product-quantity').value);
    return quantityA - quantityB;
  });
  
  const tbody = document.querySelector('#inventoryTable tbody');
  rows.forEach(row => tbody.appendChild(row));
});

document.getElementById('productImageContainer').addEventListener('click', function() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        document.getElementById('productImage').src = reader.result;
        document.getElementById('productImage').style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  
  fileInput.click();
});

function openAddModal() {
  document.getElementById('createItemForm').reset();
  document.getElementById('productImage').style.display = 'none';
  document.getElementById('viewSelectedItems').style.display = 'none';
  document.getElementById('selectedItemsDetailsContainer').style.display = 'none';
}