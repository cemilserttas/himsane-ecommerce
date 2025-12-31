/**
 * HIMSANE E-COMMERCE
 * Cart System - Gestion du panier avec localStorage
 * ==================================================
 */

const HimsaneCart = {
    // ==========================================
    // CONFIGURATION
    // ==========================================
    storageKey: 'himsane_cart',

    // ==========================================
    // MÉTHODES CRUD
    // ==========================================

    // Récupérer le panier
    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    },

    // Sauvegarder le panier
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
        this.updateCartUI();
    },

    // Ajouter un produit
    addItem(product) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(item =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingIndex > -1) {
            cart[existingIndex].quantity += product.quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.size,
                color: product.color,
                quantity: product.quantity
            });
        }

        this.saveCart(cart);
        this.showToast(`${product.name} ajouté au panier !`);
        return true;
    },

    // Supprimer un produit
    removeItem(id, size, color) {
        let cart = this.getCart();
        cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));
        this.saveCart(cart);
    },

    // Modifier la quantité
    updateQuantity(id, size, color, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === id && item.size === size && item.color === color);
        if (item) {
            item.quantity = Math.max(1, Math.min(10, quantity));
            this.saveCart(cart);
        }
    },

    // Vider le panier
    clearCart() {
        localStorage.removeItem(this.storageKey);
        this.updateCartUI();
    },

    // Calculer le total
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Nombre d'articles
    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },

    // ==========================================
    // UI UPDATES
    // ==========================================

    // Mettre à jour les badges du panier
    updateCartUI() {
        const count = this.getItemCount();
        const badges = document.querySelectorAll('.cart-badge');

        badges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.remove('hidden');
                badge.classList.add('animate-bounce');
                setTimeout(() => badge.classList.remove('animate-bounce'), 500);
            }
        });
    },

    // Afficher une notification toast
    showToast(message, type = 'success') {
        // Supprimer les toasts existants
        const existingToast = document.getElementById('cart-toast');
        if (existingToast) existingToast.remove();

        // Créer le toast
        const toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform translate-x-full transition-transform duration-300 flex items-center space-x-3 ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl"></i>
            <span class="font-medium">${message}</span>
        `;

        document.body.appendChild(toast);

        // Animer l'entrée
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Animer la sortie
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ==========================================
    // CART DRAWER (Panneau latéral)
    // ==========================================

    // Créer le drawer HTML
    createDrawer() {
        if (document.getElementById('cart-drawer')) return;

        const drawer = document.createElement('div');
        drawer.id = 'cart-drawer';
        drawer.className = 'fixed inset-0 z-50 hidden';
        drawer.innerHTML = `
            <!-- Overlay -->
            <div id="cart-overlay" class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
            
            <!-- Drawer Panel -->
            <div id="cart-panel" class="absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl transform translate-x-full transition-transform duration-300">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 class="font-heading text-2xl text-primary">Votre Panier</h2>
                    <button id="close-cart" class="text-gray-400 hover:text-primary transition-colors">
                        <i class="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>
                
                <!-- Cart Items -->
                <div id="cart-items" class="flex-1 overflow-y-auto p-6" style="max-height: calc(100vh - 280px);">
                    <!-- Items will be inserted here -->
                </div>
                
                <!-- Footer -->
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-cream border-t border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-gray-600">Sous-total</span>
                        <span id="cart-subtotal" class="font-heading text-2xl text-primary">0 €</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-4">Frais de livraison calculés à l'étape suivante</p>
                    <a href="checkout.html" id="checkout-btn" class="block w-full bg-primary hover:bg-accent text-white text-center py-4 font-medium tracking-wide uppercase transition-colors">
                        Commander
                    </a>
                    <a href="cart.html" class="block text-center text-gray-500 hover:text-primary mt-3 text-sm transition-colors">
                        Voir le panier détaillé
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(drawer);

        // Event listeners
        document.getElementById('close-cart').addEventListener('click', () => this.closeDrawer());
        document.getElementById('cart-overlay').addEventListener('click', () => this.closeDrawer());
    },

    // Ouvrir le drawer
    openDrawer() {
        this.createDrawer();
        const drawer = document.getElementById('cart-drawer');
        const panel = document.getElementById('cart-panel');

        drawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            panel.classList.remove('translate-x-full');
        }, 10);

        this.renderDrawerItems();
    },

    // Fermer le drawer
    closeDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const panel = document.getElementById('cart-panel');

        if (panel) panel.classList.add('translate-x-full');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (drawer) drawer.classList.add('hidden');
        }, 300);
    },

    // Afficher les items dans le drawer
    renderDrawerItems() {
        const container = document.getElementById('cart-items');
        const subtotalEl = document.getElementById('cart-subtotal');
        const checkoutBtn = document.getElementById('checkout-btn');
        const cart = this.getCart();

        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fa-solid fa-bag-shopping text-6xl text-gray-200 mb-4"></i>
                    <p class="text-gray-500">Votre panier est vide</p>
                    <a href="index.html#produits" class="inline-block mt-4 text-secondary hover:underline">
                        Découvrir la collection
                    </a>
                </div>
            `;
            if (subtotalEl) subtotalEl.textContent = '0 €';
            if (checkoutBtn) checkoutBtn.classList.add('opacity-50', 'pointer-events-none');
            return;
        }

        if (checkoutBtn) checkoutBtn.classList.remove('opacity-50', 'pointer-events-none');

        container.innerHTML = cart.map(item => `
            <div class="flex space-x-4 py-4 border-b border-gray-100" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-medium text-primary">${item.name}</h3>
                    <p class="text-sm text-gray-500">Taille: ${item.size} | ${item.color}</p>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center border border-gray-200 rounded">
                            <button class="qty-decrease px-2 py-1 text-gray-500 hover:text-primary">
                                <i class="fa-solid fa-minus text-xs"></i>
                            </button>
                            <span class="px-3 text-sm">${item.quantity}</span>
                            <button class="qty-increase px-2 py-1 text-gray-500 hover:text-primary">
                                <i class="fa-solid fa-plus text-xs"></i>
                            </button>
                        </div>
                        <span class="font-medium text-primary">${item.price * item.quantity} €</span>
                    </div>
                </div>
                <button class="remove-item text-gray-400 hover:text-red-500 transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');

        // Subtotal
        if (subtotalEl) subtotalEl.textContent = `${this.getTotal()} €`;

        // Event listeners for quantity buttons
        container.querySelectorAll('.qty-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('[data-id]');
                const id = item.dataset.id;
                const size = item.dataset.size;
                const color = item.dataset.color;
                const currentQty = parseInt(item.querySelector('span').textContent);
                this.updateQuantity(id, size, color, currentQty - 1);
                this.renderDrawerItems();
            });
        });

        container.querySelectorAll('.qty-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('[data-id]');
                const id = item.dataset.id;
                const size = item.dataset.size;
                const color = item.dataset.color;
                const currentQty = parseInt(item.querySelector('span').textContent);
                this.updateQuantity(id, size, color, currentQty + 1);
                this.renderDrawerItems();
            });
        });

        container.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('[data-id]');
                const id = item.dataset.id;
                const size = item.dataset.size;
                const color = item.dataset.color;
                this.removeItem(id, size, color);
                this.renderDrawerItems();
            });
        });
    },

    // ==========================================
    // SEARCH MODAL
    // ==========================================

    createSearchModal() {
        if (document.getElementById('search-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'search-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <!-- Overlay -->
            <div id="search-overlay" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            
            <!-- Modal Content -->
            <div class="absolute top-0 left-0 right-0 bg-cream p-8 shadow-2xl transform -translate-y-full transition-transform duration-300" id="search-content">
                <div class="max-w-3xl mx-auto">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-heading text-2xl text-primary">Rechercher</h2>
                        <button id="close-search" class="text-gray-400 hover:text-primary transition-colors">
                            <i class="fa-solid fa-xmark text-2xl"></i>
                        </button>
                    </div>
                    <div class="relative">
                        <input type="text" id="search-input" placeholder="Que recherchez-vous ?" 
                            class="w-full border-b-2 border-gray-300 focus:border-secondary bg-transparent py-4 text-xl outline-none placeholder:text-gray-400">
                        <button class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors">
                            <i class="fa-solid fa-magnifying-glass text-xl"></i>
                        </button>
                    </div>
                    <div class="mt-8">
                        <p class="text-sm text-gray-500 mb-4">Suggestions populaires :</p>
                        <div class="flex flex-wrap gap-3">
                            <a href="product.html" class="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-primary rounded-full text-sm transition-colors">Blazer Signature</a>
                            <a href="product.html" class="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-primary rounded-full text-sm transition-colors">Chemise Premium</a>
                            <a href="product.html" class="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-primary rounded-full text-sm transition-colors">Trench Élégant</a>
                            <a href="apropos.html" class="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-primary rounded-full text-sm transition-colors">Notre Histoire</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('close-search').addEventListener('click', () => this.closeSearchModal());
        document.getElementById('search-overlay').addEventListener('click', () => this.closeSearchModal());

        // Handle search submit
        document.getElementById('search-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase();
                if (query.includes('blazer') || query.includes('veste') || query.includes('chemise') || query.includes('trench')) {
                    window.location.href = 'product.html';
                } else if (query.includes('histoire') || query.includes('maison') || query.includes('apropos')) {
                    window.location.href = 'apropos.html';
                } else {
                    window.location.href = 'index.html#produits';
                }
            }
        });
    },

    openSearchModal() {
        this.createSearchModal();
        const modal = document.getElementById('search-modal');
        const content = document.getElementById('search-content');

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            content.classList.remove('-translate-y-full');
            document.getElementById('search-input').focus();
        }, 10);
    },

    closeSearchModal() {
        const modal = document.getElementById('search-modal');
        const content = document.getElementById('search-content');

        if (content) content.classList.add('-translate-y-full');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (modal) modal.classList.add('hidden');
        }, 300);
    },

    // ==========================================
    // INITIALIZATION
    // ==========================================

    init() {
        // Mettre à jour les badges au chargement
        this.updateCartUI();

        // Attacher les événements aux icônes panier
        document.querySelectorAll('[aria-label="Panier"], .cart-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openDrawer();
            });
        });

        // Attacher les événements aux icônes recherche
        document.querySelectorAll('[aria-label="Rechercher"], .search-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSearchModal();
            });
        });

        console.log('🛒 HIMSANE Cart System initialized');
    }
};

// Export pour utilisation globale
window.HimsaneCart = HimsaneCart;
