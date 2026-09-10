const CACHE_NAME = "fruta-viva-v2";

const ARQUIVOS_INICIAIS = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./tela-abertura/tela-abertura.html",
    "./tela-abertura/tela-abertura.css",
    "./tela-abertura/tela-abertura.js",
    "./tela-principal/principal.html"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ARQUIVOS_INICIAIS))
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((nomes) =>
            Promise.all(
                nomes
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request)
            .then((arquivoSalvo) => {
                if (arquivoSalvo) {
                    return arquivoSalvo;
                }

                return fetch(event.request)
                    .then((resposta) => {
                        const copia = resposta.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, copia);
                            });

                        return resposta;
                    });
            })
    );
});
