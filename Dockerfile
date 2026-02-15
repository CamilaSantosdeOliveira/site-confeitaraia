# Multi-stage build para otimização
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build do frontend
RUN npm run build

# Stage para o servidor PHP
FROM php:8.1-apache

# Instalar extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Configurar Apache
COPY backend/.htaccess /var/www/html/.htaccess

# Copiar arquivos do backend
COPY backend/ /var/www/html/

# Copiar build do frontend
COPY --from=frontend-builder /app/dist/ /var/www/html/public/

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Comando padrão
CMD ["apache2-foreground"]












