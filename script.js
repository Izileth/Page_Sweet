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

menu.addEventListener('click', function(event){
   // console.log(event.target);
   let parentButton = event.target.closest(".add-to-cart-btn")
   if(parentButton){
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    //Adiconar ao carrinho
    addToCart(name, price);
   }
})

//Função para adiconar ao carrinho

function addToCart(name, price) {
    const existingItem = cart.find( item => item.name === name);
    if(existingItem){
        existingItem.quantity+=1;
    }else{

        cart.push({
            name,
            price,
            quantity: 1
        })
    }

    updateCartModal()
}


// Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd. ${item.quantity}</p>  
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p> 
                </div>
            </div>
            <div>
                 <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    cartCounter.innerHTML = cart.length;
    cartCounteMobile.innerHTML = cart.length;
}

// Remover Produtos do Carrinho

cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

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