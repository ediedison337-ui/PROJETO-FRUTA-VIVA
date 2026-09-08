document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('btn-start');

    if (startButton) {
        startButton.addEventListener('click', () => {
            // Efeito visual sutil de clique antes da transição
            startButton.classList.add('btn-clicked');

            // Redirecionamento exato para a Tela 2 do Avatar
            setTimeout(() => {
                window.location.href = '../tela-avatar/tela-2-avatar.html';
            }, 200);
        });
    }

    // Interatividade lúdica ao tocar/clicar na Maraculívia
    const mascotImg = document.querySelector('.mascot-img');
    if (mascotImg) {
        mascotImg.addEventListener('click', () => {
            mascotImg.style.transition = 'transform 0.4s ease';
            mascotImg.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                mascotImg.style.transform = 'scale(1) rotate(0deg)';
            }, 400);
        });
    }
});