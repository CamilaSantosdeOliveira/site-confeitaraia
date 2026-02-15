// === SERVICE WORKER AVANÇADO - DOÇURAS & SABORES ===
const CACHE_NAME = 'docuras-sabores-v2.1';
const OFFLINE_URL = './confeitaria-mobile.html';
const CACHE_URLS = [
    './confeitaria-mobile.html',
    './manifest.json',
    './css/style.css',
    './js/script.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iMjQiIGZpbGw9IiNlOTFlNjMiLz4KPHN2ZyB4PSI0OCIgeT0iNDgiIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDNWOGg0djRoM2wtNSA1eiIvPgo8L3N2Zz4KPC9zdmc+'
];

// === ESTRATÉGIAS DE CACHE ===
const CACHE_STRATEGIES = {
    NETWORK_FIRST: 'networkFirst',
    CACHE_FIRST: 'cacheFirst',
    STALE_WHILE_REVALIDATE: 'staleWhileRevalidate'
};

// === INSTALAÇÃO DO SERVICE WORKER ===
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Cache aberto');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('✅ Service Worker: Recursos em cache');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Service Worker: Erro na instalação:', error);
            })
    );
});

// === ATIVAÇÃO DO SERVICE WORKER ===
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Cache limpo');
                return self.clients.claim();
            })
    );
});

// === INTERCEPTAÇÃO DE REQUISIÇÕES ===
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorar requisições não HTTP/HTTPS
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Estratégia baseada no tipo de recurso
    if (request.destination === 'document') {
        // HTML: Network First com fallback
        event.respondWith(handleDocumentRequest(request));
    } else if (request.destination === 'image') {
        // Imagens: Cache First
        event.respondWith(handleImageRequest(request));
    } else if (request.destination === 'style' || request.destination === 'script') {
        // CSS/JS: Stale While Revalidate
        event.respondWith(handleAssetRequest(request));
    } else if (url.hostname === 'api.whatsapp.com' || url.hostname === 'wa.me') {
        // WhatsApp: Network Only (sempre online)
        event.respondWith(fetch(request));
    } else {
        // Outros: Cache First com network fallback
        event.respondWith(handleGenericRequest(request));
    }
});

// === ESTRATÉGIAS DE CACHE IMPLEMENTADAS ===

// Documentos HTML - Network First
async function handleDocumentRequest(request) {
    try {
        // Tentar rede primeiro
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Atualizar cache com nova versão
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Resposta da rede não ok');
    } catch (error) {
        // Fallback para cache
        console.log('🌐 Usando versão em cache para:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Última opção: página offline
        return caches.match(OFFLINE_URL);
    }
}

// Imagens - Cache First
async function handleImageRequest(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('❌ Falha ao carregar imagem:', request.url);
        // Retornar imagem placeholder em caso de erro
        return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#e91e63"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="16">Imagem não disponível</text></svg>', {
            headers: { 'Content-Type': 'image/svg+xml' }
        });
    }
}

// CSS/JS - Stale While Revalidate
async function handleAssetRequest(request) {
    const cachedResponse = await caches.match(request);
    
    // Atualizar cache em segundo plano
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    }).catch(() => {
        console.log('🔄 Falha na atualização em segundo plano:', request.url);
    });
    
    // Retornar cache imediatamente se disponível
    return cachedResponse || fetchPromise;
}

// Requisições genéricas - Cache First com Network Fallback
async function handleGenericRequest(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('❌ Recurso não disponível offline:', request.url);
        return new Response('Recurso não disponível offline', { 
            status: 503, 
            statusText: 'Service Unavailable' 
        });
    }
}

// === SINCRONIZAÇÃO EM SEGUNDO PLANO ===
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Executando sincronização em segundo plano');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Verificar conectividade
        if (!navigator.onLine) {
            return;
        }
        
        // Atualizar cache com recursos críticos
        const cache = await caches.open(CACHE_NAME);
        const criticalUrls = [
            './confeitaria-mobile.html',
            './manifest.json'
        ];
        
        for (const url of criticalUrls) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                    console.log('✅ Recurso atualizado:', url);
                }
            } catch (error) {
                console.log('❌ Falha ao atualizar:', url);
            }
        }
    } catch (error) {
        console.error('❌ Erro na sincronização:', error);
    }
}

// === NOTIFICAÇÕES PUSH ===
self.addEventListener('push', (event) => {
    console.log('📢 Push notification recebida');
    
    const options = {
        body: 'Novidades na Doçuras & Sabores!',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iMjQiIGZpbGw9IiNlOTFlNjMiLz4KPHN2ZyB4PSI0OCIgeT0iNDgiIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDNWOGg0djRoM2wtNSA1eiIvPgo8L3N2Zz4KPC9zdmc+',
        badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNlOTFlNjMiLz4KPC9zdmc+',
        vibrate: [200, 100, 200],
        data: {
            url: './confeitaria-mobile.html'
        },
        actions: [
            {
                action: 'view',
                title: 'Ver Novidades',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6IiBmaWxsPSIjZTkxZTYzIi8+CjxwYXRoIGQ9Ik0xMCA4SDEyVjEwSDEwVjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MUwxNy41OSAxOSAxOSAxNy41OUwxMy40MSAxMkwxOSA2LjQxWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K'
            }
        ]
    };
    
    if (event.data) {
        const data = event.data.json();
        options.body = data.body || options.body;
        options.data.url = data.url || options.data.url;
    }
    
    event.waitUntil(
        self.registration.showNotification('Doçuras & Sabores', options)
    );
});

// === CLIQUE EM NOTIFICAÇÕES ===
self.addEventListener('notificationclick', (event) => {
    console.log('👆 Clique na notificação:', event.action);
    
    event.notification.close();
    
    if (event.action === 'view' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || './confeitaria-mobile.html')
        );
    }
});

// === MENSAGENS DO CLIENTE ===
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_STATUS') {
        event.ports[0].postMessage({
            type: 'CACHE_STATUS',
            cacheName: CACHE_NAME,
            isOnline: navigator.onLine
        });
    }
});

console.log('🚀 Service Worker Avançado carregado - Doçuras & Sabores v2.1');
