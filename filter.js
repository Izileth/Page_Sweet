document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".info-item");
    const filterMenu = document.getElementById("filter-menu");
    const toggleFilter = document.getElementById("toggle-filter");

    // Botão para exibir/ocultar os filtros no mobile
    toggleFilter.addEventListener("click", function () {
        filterMenu.classList.toggle("hidden");
        filterMenu.classList.toggle("flex");
        filterMenu.classList.toggle("flex-col");
        filterMenu.classList.toggle("items-center");
    });

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove 'active' dos botões
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            items.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (category === "all" || category === itemCategory) {
                    item.style.opacity = "1";
                    item.style.display = "flex";
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 500);
                }
            });

            // Fechar menu no mobile após selecionar um filtro
            if (window.innerWidth < 768) {
                filterMenu.classList.add("hidden");
                filterMenu.classList.remove("flex");
            }
        });
    });
});

// Filtro Por Categoria

document.querySelectorAll('.menu-filter-category').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-menu-category');
        
        // Atualiza o botão ativo
        document.querySelectorAll('.menu-filter-category').forEach(btn => {
            btn.classList.remove('bg-black', 'text-white');
            btn.classList.add('hover:bg-gray-100');
        });
        
        this.classList.add('bg-black', 'text-white');
        this.classList.remove('hover:bg-gray-100');
        
        // Filtra apenas os itens do menu (comidas e bebidas)
        document.querySelectorAll('#menu [data-category]').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});