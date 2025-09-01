const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, image: "https://via.placeholder.com/250x200?text=Headphones" },
    { id: 2, name: "Smartphone", price: 599.99, image: "https://via.placeholder.com/250x200?text=Smartphone" },
    { id: 3, name: "Laptop", price: 999.99, image: "https://via.placeholder.com/250x200?text=Laptop" },
    { id: 4, name: "Coffee Maker", price: 89.99, image: "https://via.placeholder.com/250x200?text=Coffee+Maker" },
    { id: 5, name: "Running Shoes", price: 129.99, image: "https://via.placeholder.com/250x200?text=Running+Shoes" },
    { id: 6, name: "Backpack", price: 49.99, image: "https://via.placeholder.com/250x200?text=Backpack" },
    { id: 7, name: "Bluetooth Speaker", price: 39.99, image: "https://via.placeholder.com/250x200?text=Speaker" },
    { id: 8, name: "Fitness Tracker", price: 199.99, image: "https://via.placeholder.com/250x200?text=Fitness+Tracker" },
    { id: 9, name: "Gaming Mouse", price: 59.99, image: "https://via.placeholder.com/250x200?text=Gaming+Mouse" },
    { id: 10, name: "Desk Lamp", price: 34.99, image: "https://via.placeholder.com/250x200?text=Desk+Lamp" },
    { id: 11, name: "Water Bottle", price: 19.99, image: "https://via.placeholder.com/250x200?text=Water+Bottle" },
    { id: 12, name: "Wireless Charger", price: 29.99, image: "https://via.placeholder.com/250x200?text=Wireless+Charger" },
    { id: 13, name: "Tablet", price: 299.99, image: "https://via.placeholder.com/250x200?text=Tablet" },
    { id: 14, name: "Sunglasses", price: 89.99, image: "https://via.placeholder.com/250x200?text=Sunglasses" },
    { id: 15, name: "Keyboard", price: 79.99, image: "https://via.placeholder.com/250x200?text=Keyboard" },
    { id: 16, name: "Phone Case", price: 24.99, image: "https://via.placeholder.com/250x200?text=Phone+Case" },
    { id: 17, name: "Webcam", price: 69.99, image: "https://via.placeholder.com/250x200?text=Webcam" },
    { id: 18, name: "Power Bank", price: 39.99, image: "https://via.placeholder.com/250x200?text=Power+Bank" },
    { id: 19, name: "Monitor", price: 249.99, image: "https://via.placeholder.com/250x200?text=Monitor" },
    { id: 20, name: "USB Cable", price: 14.99, image: "https://via.placeholder.com/250x200?text=USB+Cable" }
];

let cart = [];
let cartOpen = false;

function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.style.animationDelay = `${index * 0.1}s`;
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function populateProductSelect() {
    const select = document.getElementById('product-select');
    select.innerHTML = '<option value="">Select Product</option>';
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

function showProducts() {
    document.getElementById('products-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
}

function showAdmin() {
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    populateProductSelect();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    showCartAnimation();
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.style.cssText = `
            padding: 1rem;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>$${item.price} x ${item.quantity}</small>
            </div>
            <button onclick="removeFromCart(${item.id})" style="
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 0.3rem 0.6rem;
                border-radius: 5px;
                cursor: pointer;
            ">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartOpen = !cartOpen;
    
    if (cartOpen) {
        cartSidebar.classList.add('open');
    } else {
        cartSidebar.classList.remove('open');
    }
}

function showCartAnimation() {
    const cartBtn = document.querySelector('.cart');
    cartBtn.style.transform = 'perspective(1000px) rotateX(-15deg) translateY(-8px) scale(1.1)';
    cartBtn.style.boxShadow = '0 15px 30px rgba(255, 107, 107, 0.4)';
    
    setTimeout(() => {
        cartBtn.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px) scale(1)';
        cartBtn.style.boxShadow = '0 10px 20px rgba(255, 107, 107, 0.3)';
    }, 300);
}

function uploadImage() {
    const productId = document.getElementById('product-select').value;
    const fileInput = document.getElementById('image-upload');
    
    if (!productId || !fileInput.files[0]) {
        showNotification('Please select a product and choose an image file.', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const product = products.find(p => p.id == productId);
        if (product) {
            product.image = e.target.result;
            displayProducts();
            showNotification('Image uploaded successfully! 🎉', 'success');
            fileInput.value = '';
            document.getElementById('product-select').value = '';
        }
    };
    
    reader.readAsDataURL(file);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        background: ${type === 'success' ? 'linear-gradient(45deg, #28a745, #20c997)' : 'linear-gradient(45deg, #ff6b6b, #ee5a24)'};
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    populateProductSelect();
});