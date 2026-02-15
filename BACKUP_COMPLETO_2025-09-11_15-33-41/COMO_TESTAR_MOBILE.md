# 🚀 INSTRUÇÕES PARA TESTAR PWA NO MOBILE

## OPÇÃO 1 - SERVIDOR LOCAL (RECOMENDADO):

1. Instale Python: https://www.python.org/downloads/
2. Abra o PowerShell na pasta do site
3. Execute: `python -m http.server 8000`
4. No celular, acesse: `http://[SEU_IP]:8000/pwa-mobile-final.html`

Para descobrir seu IP:
- No PowerShell execute: `ipconfig`
- Procure por "IPv4" (exemplo: 192.168.1.100)

## OPÇÃO 2 - GITHUB PAGES (GRÁTIS):

1. Crie conta no GitHub
2. Crie repositório público
3. Faça upload dos arquivos
4. Ative GitHub Pages nas configurações
5. Acesse a URL gerada no mobile

## OPÇÃO 3 - NETLIFY (MAIS FÁCIL):

1. Vá em: https://netlify.com
2. Arraste a pasta do site para o Netlify
3. Receberá uma URL instantânea
4. Acesse no mobile

## OPÇÃO 4 - TESTE LOCAL:

1. Envie o arquivo `pwa-mobile-final.html` por WhatsApp/Email
2. Baixe no celular
3. Abra com o navegador
4. Teste a instalação

## O QUE TESTAR NO MOBILE:

✅ Botão "📱 Instalar App" deve aparecer
✅ Clicar deve mostrar instruções ou instalar
✅ Em navegadores compatíveis, deve instalar como app nativo
✅ Verificar se funciona como PWA (sem barra do navegador)

## NAVEGADORES RECOMENDADOS:

📱 Android: Google Chrome, Samsung Internet
🍎 iOS: Safari (único que suporta PWA no iPhone)

## DICAS:

💡 PWA só funciona em HTTPS ou localhost
💡 Alguns navegadores móveis não suportam instalação automática
💡 iOS só instala PWA via Safari (não Chrome)
💡 Android tem melhor suporte para PWA
