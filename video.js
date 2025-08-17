// Controle do Video Background
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('header video');
    
    // Verifica se o vídeo está carregado
    if(heroVideo) {
        // Forçar recomeçar o vídeo se ele pausar (para alguns navegadores mobile)
        heroVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        
        // Tentar reproduzir novamente se houver erro
        heroVideo.addEventListener('error', function() {
            setTimeout(() => {
                this.play();
            }, 1000);
        });
        
        // Solução para autoplay em mobile
        function attemptPlay() {
            heroVideo.play()
                .then(() => {
                    // Vídeo iniciou com sucesso
                })
                .catch(error => {
                    // Fallback para dispositivos que bloqueiam autoplay
                    document.querySelector('header').style.background = "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)";
                });
        }
        
        // Tenta reproduzir quando o usuário interagir com a página
        document.addEventListener('click', attemptPlay, { once: true });
        document.addEventListener('scroll', attemptPlay, { once: true });
        document.addEventListener('touchstart', attemptPlay, { once: true });
        
        // Tenta reproduzir imediatamente
        attemptPlay();
    }
});