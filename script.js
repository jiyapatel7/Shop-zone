const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "Electronics",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        category: "Fashion",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Casual Backpack",
        price: 999,
        category: "Fashion",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Modern Table Lamp",
        price: 799,
        category: "Home",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
    {
        id: 6,
        name: "Premium Sofa",
        price: 12999,
        category: "Home",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 1299,
        category: "Electronics",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
    },
    {
        id: 8,
        name: "Stylish Sunglasses",
        price: 599,
        category: "Fashion",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let cart = [];
let selectedCategory = "all";

const productGrid = document.getElementById("productGrid");

// Display Products
function displayProducts(items) {

    productGrid.innerHTML = "";

    if (items.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {

        productGrid.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <div class="rating">
                    ${"★".repeat(Math.floor(product.rating))}
                    <span>${product.rating}</span>
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

// Search Products
function searchProducts() {

    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("category").value;

    const filtered = products.filter(product => {

        const matchesName = product.name.toLowerCase()
            .includes(searchValue);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesName && matchesCategory;
    });

    displayProducts(filtered);
}

// Category Filter
function filterCategory(category) {

    selectedCategory = category;

    document.getElementById("category").value =
        category === "all" ? "all" : category;

    document.getElementById("searchInput").value = "";

    const filtered = category === "all"
        ? products
        : products.filter(product => product.category === category);

    displayProducts(filtered);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// Add to Cart
function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

}

// Update Cart
function updateCart() {

    const cartItems = document.getElementById("cartItems");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>₹${item.price.toLocaleString("en-IN")}</p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${item.id}, -1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">+</button>

                    </div>

                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    document.getElementById("cartCount").textContent = count;

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-IN");

}

// Change Quantity
function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    updateCart();
}

// Remove Product
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

// Open / Close Cart
function toggleCart() {

    document.getElementById("cartSidebar")
        .classList.toggle("active");

    document.getElementById("overlay")
        .classList.toggle("active");
}

// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Order Summary\n\n" +
        "Total Amount: ₹" + total.toLocaleString("en-IN") +
        "\n\nThis is a demo checkout. No payment has been processed."
    );
}

// Search with Enter Key
document.getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchProducts();
        }

    });

// Initial Display
displayProducts(products);
updateCart();