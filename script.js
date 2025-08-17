// Definiçaõ das Variáveis

const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartMobile = document.getElementById('cart-btn2');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const cartCounteMobile = document.getElementById('cart-count2');
const adressInput = document.getElementById('address');
const adressWarn = document.getElementById('address-warn');


let cart = [

];
//Abrir o Modal do Carrinho
cartBtn.addEventListener('click', function () {
    updateCartModal();
    cartModal.style.display = 'flex';
    updateCartModal();
});

cartMobile.addEventListener('click', function () {
    updateCartModal();
    cartModal.style.display = 'flex';
    updateCartModal();
});

// Fechar o Modal do Carrinho

cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal){
        cartModal.style.display = 'none';
    }
});

closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Adicionar Produtos ao Carrinho




document.addEventListener('click', function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        const image = parentButton.getAttribute("data-image");
        addToCart(name, price, image);
    }
});

//Função para adiconar ao carrinho

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if(existingItem){
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

      // Animação diferente para combos
    if(name.includes("Combo")) {
        Toastify({
            text: `🎉 ${name} adicionado ao carrinho!`,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color: "#000",
                background: "linear-gradient(to right, #fff, #fff)",
            },
        }).showToast();
    } else {
        // Animação normal para outros itens
        Toastify({
            text: `${name} adicionado ao carrinho!`,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #000, #000)",
            },
        }).showToast();
    }
    
    
    // Animação do carrinho
    cartBtn.classList.add('cart-animation');
    cartMobile.classList.add('cart-animation');
    setTimeout(() => {
        cartBtn.classList.remove('cart-animation');
        cartMobile.classList.remove('cart-animation');
    }, 500);
    
    updateCartModal();
   
}


// Atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "items-center", "justify-between", "mb-4", "pb-4", "border-b", "border-gray-100");
        
        cartItemElement.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p class="font-medium">${item.name}</p>
                    <p class="text-gray-600 text-sm">R$ ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn decrease-quantity" data-name="${item.name}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-name="${item.name}">+</button>
                </div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    <i class="fas fa-trash text-red-500"></i>
                </button>
            </div>
        `;
        
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Atualiza o total e contador
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.innerHTML = itemCount;
    cartCounteMobile.innerHTML = itemCount;
}
// Remover Produtos do Carrinho

// Adicione esses listeners após a inicialização do carrinho
cartItemsContainer.addEventListener('click', function(event) {
    if(event.target.classList.contains("remove-from-cart-btn") || 
       event.target.closest(".remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name") || 
                    event.target.closest(".remove-from-cart-btn").getAttribute("data-name");
        removeItemCart(name);
    }
    
    if(event.target.classList.contains("decrease-quantity") || 
       event.target.closest(".decrease-quantity")) {
        const name = event.target.getAttribute("data-name") || 
                    event.target.closest(".decrease-quantity").getAttribute("data-name");
        decreaseItemQuantity(name);
    }
    
    if(event.target.classList.contains("increase-quantity") || 
       event.target.closest(".increase-quantity")) {
        const name = event.target.getAttribute("data-name") || 
                    event.target.closest(".increase-quantity").getAttribute("data-name");
        increaseItemQuantity(name);
    }
});

function decreaseItemQuantity(name) {
    const item = cart.find(item => item.name === name);
    if(item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartModal();
    } else if(item && item.quantity === 1) {
        removeItemCart(name);
    }
}

function increaseItemQuantity(name) {
    const item = cart.find(item => item.name === name);
    if(item) {
        item.quantity += 1;
        updateCartModal();
    }
}

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity-= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}    


// Função para pesquisar localização

adressInput.addEventListener('input', function () {
    let inputValue = event.target.value;
    if(inputValue !== ""){
        adressWarn.classList.add("hidden")
        adressInput.classList.remove("border-red-500")
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=YOUR_API_KEY`)
       .then(response => response.json())
    }
});


// Finalizar o Pedido
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text: "Que pena, o Restaurante Não Está Funcionando no Momento",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right,rgb(237, 0, 0),rgb(255, 0, 0))",
            },
        }).showToast();

        return;
    }
    if(cart.length === 0) return;
    if(adressInput.value === ""){
        adressWarn.classList.remove("hidden")
        adressInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) =>{
        return (
            
            `${item.name} Quantidade: (${item.quantity}) Preço: (${item.price}) |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "5591993961874"
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${adressInput.value}`, "_blank")
    cart = [];
    updateCartModal();
})

// função para checar se o restaurante está aberto

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500")
}