let cart = [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCartCount();
    showToast(`${productName} ha sido agregado al carrito`);
}

function updateCartCount() {
    document.getElementById('cart').textContent = ` Carrito (${cart.length})`;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCartModal();
    showToast(`Producto eliminado del carrito`);
}

function showCartForWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const mensaje = cart.map(item => `• ${item.productName} - $${item.price} MXN`).join('%0A');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const mensajeFinal = `Hola, me gustaría comprar los siguientes productos:%0A%0A${mensaje}%0A%0ATotal: $${total.toFixed(2)} MXN`;

    
    const telefono = '4421971889'; 
    const url = `https://wa.me/${telefono}?text=${mensajeFinal}`;

    window.open(url, '_blank');
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const whatsappBtn = document.getElementById('whatsappBtn');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartTotal.textContent = '';
        whatsappBtn.style.display = 'none';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.marginBottom = '8px';

            const itemText = document.createElement('span');
            itemText.textContent = `${item.productName} - $${item.price} MXN`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.style.backgroundColor = '#bfab72';
            removeBtn.style.color = '#191919';
            removeBtn.style.border = 'none';
            removeBtn.style.padding = '4px 8px';
            removeBtn.style.borderRadius = '4px';
            removeBtn.style.cursor = 'pointer';

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromCart(index);
            });

            div.appendChild(itemText);
            div.appendChild(removeBtn);
            cartItems.appendChild(div);

            total += item.price;
        });

        cartTotal.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)} MXN`;
        whatsappBtn.style.display = 'inline-block';
        whatsappBtn.onclick = showCartForWhatsApp;
    }

    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription = document.getElementById("modalDescription");
    const closeBtn = document.querySelector(".close");
    const cartBtn = document.getElementById("cart");

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.dataset.img;
            const title = card.dataset.title;
            const price = card.dataset.price;
            const description = card.dataset.description;

            modalImg.src = img;
            modalTitle.textContent = title;
            modalPrice.textContent = `$${price} MXN`;
            modalDescription.textContent = description;

            productModal.style.display = "block";
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        });
    });

    closeBtn.addEventListener('click', () => {
        productModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == productModal) {
            productModal.style.display = "none";
        }
        if (event.target == document.getElementById('cartModal')) {
            document.getElementById('cartModal').style.display = "none";
        }
    });

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = "none";
    });
});
