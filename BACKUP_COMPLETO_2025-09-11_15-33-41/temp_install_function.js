// Função para tentar instalação automática SIMPLIFICADA
async function tryAutomaticInstall() {
    console.log('🚀 INICIANDO INSTALAÇÃO');
    
    // MÉTODO 1: Prompt nativo (se disponível)
    if (deferredInstallPrompt) {
        console.log('✅ Prompt nativo disponível');
        try {
            deferredInstallPrompt.prompt();
            const result = await deferredInstallPrompt.userChoice;
            
            if (result.outcome === 'accepted') {
                showSuccessMessage();
                return;
            }
        } catch (error) {
            console.error('Erro no prompt:', error);
        }
    }
    
    // MÉTODO 2: Instruções por navegador
    console.log('📱 Mostrando instruções...');
    
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // iOS Safari
        alert(`🍎 COMO INSTALAR NO iOS:

1️⃣ Toque no ícone de COMPARTILHAR (⬆️)
2️⃣ Role para baixo
3️⃣ Toque em "Adicionar à Tela de Início"
4️⃣ Toque em "Adicionar"

✅ Pronto! O app aparecerá na tela inicial!`);
    } else if (/Chrome/.test(navigator.userAgent)) {
        // Chrome Android
        alert(`🤖 COMO INSTALAR NO CHROME:

1️⃣ Toque nos 3 PONTINHOS (⋮) no canto superior direito
2️⃣ Procure "Adicionar à tela inicial"
3️⃣ Toque em "Adicionar"

✅ O app aparecerá na tela inicial!`);
    } else {
        // Outros navegadores
        alert(`📱 COMO INSTALAR:

1️⃣ Toque no MENU do navegador (⋮ ou ☰)
2️⃣ Procure "Adicionar à tela inicial" ou "Instalar"
3️⃣ Confirme

💡 Use o Chrome para melhor experiência!`);
    }
}
