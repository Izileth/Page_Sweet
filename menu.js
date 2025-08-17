

// Elementos da Sidebar
const menuToggle = document.getElementById("menu-toggle");
const mobileSidebar = document.getElementById("mobile-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const closeSidebar = document.getElementById("close-sidebar");
const sidebarCartBtn = document.getElementById("sidebar-cart-btn");

// Função para abrir/fechar a sidebar
function toggleSidebar() {
    mobileSidebar.classList.toggle("open");
    mobileSidebar.classList.toggle("-translate-x-full");
    sidebarOverlay.classList.toggle("hidden");
    
    // Bloquear/desbloquear scroll do body
    document.body.classList.toggle("overflow-hidden");
}

// Event Listeners
menuToggle.addEventListener("click", toggleSidebar);
closeSidebar.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", toggleSidebar);

// Fechar sidebar ao clicar em links (opcional)
document.querySelectorAll('#mobile-sidebar a').forEach(link => {
    link.addEventListener('click', toggleSidebar);
});

// Sincronizar carrinho na sidebar
function updateSidebarCart() {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("sidebar-cart-count").textContent = itemCount;
}


// Abrir carrinho a partir da sidebar
sidebarCartBtn.addEventListener("click", function() {
    toggleSidebar(); // Fecha a sidebar
    updateCartModal();
    cartModal.style.display = 'flex';
});

// Rolagem suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});