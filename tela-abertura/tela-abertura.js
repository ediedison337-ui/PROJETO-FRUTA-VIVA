document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('btn-start');
    const installButton = document.getElementById('btn-install');
    const installHint = document.getElementById('install-hint');

    const CHAVE_PERFIL = 'frutaVivaPerfil';
    let deferredInstallPrompt = null;

    function temPerfilConfigurado() {
        try {
            const perfil = JSON.parse(localStorage.getItem(CHAVE_PERFIL) || '{}');

            return Boolean(
                perfil &&
                typeof perfil === 'object' &&
                !Array.isArray(perfil) &&
                typeof perfil.avatar === 'string' &&
                perfil.avatar.trim()
            );
        } catch (erro) {
            console.warn('Não foi possível verificar o perfil salvo.', erro);
            return false;
        }
    }

    // Se a pessoa já configurou o perfil antes, não precisa rever a abertura.
    if (temPerfilConfigurado()) {
        window.location.replace('../tela-principal/principal.html');
        return;
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            startButton.classList.add('btn-clicked');

            setTimeout(() => {
                window.location.href = '../tela-avatar/tela-2-avatar.html';
            }, 200);
        });
    }

    // Instalação PWA em navegadores compatíveis (principalmente Chrome/Edge/Android).
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;

        if (installButton) {
            installButton.hidden = false;
        }

        if (installHint) {
            installHint.hidden = true;
        }
    });

    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (!deferredInstallPrompt) {
                return;
            }

            deferredInstallPrompt.prompt();

            try {
                await deferredInstallPrompt.userChoice;
            } finally {
                deferredInstallPrompt = null;
                installButton.hidden = true;
            }
        });
    }

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;

        if (installButton) {
            installButton.hidden = true;
        }
    });

    // iPhone/iPad não usam o mesmo botão automático. Mostra instrução curta.
    const ehIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const modoStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

    if (ehIOS && !modoStandalone && installHint) {
        installHint.textContent = 'No iPhone/iPad: toque em Compartilhar e depois em “Adicionar à Tela de Início”.';
        installHint.hidden = false;
    }

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
