// Script para abrir e fechar o menu mobile
document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("mobile-menu");
  
  // Alterna a classe hidden e o movimento do menu
  menu.classList.toggle("hidden");
  
  // Se o menu estiver visível, mova ele para baixo (mostrando o menu), se estiver oculto, mova para cima
  if (menu.classList.contains("hidden")) {
    menu.classList.add("-translate-y-full"); // Esconde o menu para cima
  } else {
    menu.classList.remove("-translate-y-full"); // Exibe o menu movendo para baixo
  }
});

// Fechar o menu ao clicar em qualquer link dentro dele
const menuLinks = document.querySelectorAll('#mobile-menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.add("hidden");  // Fecha o menu quando um link for clicado
    menu.classList.add("-translate-y-full"); // Reseta a posição para escondido
  });
});


// Captura todos os links de âncoras (links com href iniciando com '#')
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    // Impede o comportamento padrão de rolagem
    e.preventDefault();

    // Captura o destino do link (id do elemento)
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Rolagem suave até o elemento
    targetElement.scrollIntoView({
      behavior: 'smooth',  // Tipo de rolagem suave
      block: 'start'       // Posiciona o elemento no início da tela
    });
  });
});