# 🚀 Configuración de Nginx para PROYECTO-SURVIVAL-

Este documento describe la configuración de Nginx con SSL para el proyecto `PROYECTO-SURVIVAL-`, asumiendo que se encuentra en `/var/www/PROYECTO-SURVIVAL-`.

## 📋 Archivos Incluidos

- `nginx.conf` - Configuración de Nginx
- `install-nginx.sh` - Script de instalación automática
- `ssl-renewal.sh` - Script para renovación automática de SSL
- `SERVER_SETUP.md` - Esta guía

## 🎯 Características de la Configuración

### ✅ Seguridad
- **SSL/TLS** con certificados Let's Encrypt
- **HTTP/2** habilitado
- **Headers de seguridad** (HSTS, X-Frame-Options, etc.)
- **Denegación de acceso** a archivos sensibles
- **Cifrados SSL** modernos y seguros

### ✅ Rendimiento
- **Compresión Gzip** para archivos estáticos
- **Cache de archivos estáticos** con expiración de 1 año
- **HTTP/2** para mejor rendimiento
- **Optimización de sesiones SSL**

### ✅ Funcionalidad
- **Redirección automática** de HTTP a HTTPS
- **Soporte para PHP-FPM**
- **Logs separados** para el proyecto
- **Manejo de SPA** (Single Page Applications) si es necesario

## 🚀 Instalación Rápida

### Opción 1: Instalación Automática (Recomendada)

```bash
# 1. (Opcional) Descargar el script de instalación si está en un servidor remoto.
wget https://tu-servidor.com/install-nginx.sh

# 2. Dar permisos de ejecución
chmod +x install-nginx.sh

# 3. Ejecutar como root
sudo bash install-nginx.sh
```

### Opción 2: Instalación Manual

```bash
# 1. Instalar Nginx
sudo apt update
sudo apt install -y nginx

# 2. Crear directorio del proyecto
sudo mkdir -p /var/www/PROYECTO-SURVIVAL-
sudo chown -R www-data:www-data /var/www/PROYECTO-SURVIVAL-
sudo chmod -R 755 /var/www/PROYECTO-SURVIVAL-

# 3. Copiar configuración
sudo cp server_config/nginx.conf /etc/nginx/sites-available/survival

# 4. Habilitar sitio
sudo ln -sf /etc/nginx/sites-available/survival /etc/nginx/sites-enabled/

# 5. Deshabilitar sitio por defecto
sudo rm -f /etc/nginx/sites-enabled/default

# 6. Verificar configuración
sudo nginx -t

# 7. Reiniciar Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🔐 Configuración de SSL

### 1. Instalar Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtener Certificado SSL

```bash
# Reemplaza 'survival-project.com' con tu dominio real
sudo certbot --nginx -d survival-project.com -d www.survival-project.com
```

### 3. Renovación Automática

```bash
# Agregar al crontab para renovación automática
sudo crontab -e

# Agregar esta línea (ajusta la ruta):
0 12 * * * /usr/bin/bash /path/to/your/project/ssl-renewal.sh
```

## 📁 Estructura de Directorios Esperada

```
/var/www/PROYECTO-SURVIVAL-/  # Directorio raíz del proyecto
├── index.php                # Archivo principal
├── views/
├── api/
├── css/
├── js/
└── ...                      # Otros archivos del proyecto
```

## 🔧 Configuración de Nginx

### Archivo Principal
- **Ubicación**: `/etc/nginx/sites-available/survival`
- **Habilitado en**: `/etc/nginx/sites-enabled/survival`

### Características de la Configuración

```nginx
# Puerto 80: Redirección a HTTPS
server {
    listen 80;
    server_name survival-project.com www.survival-project.com;
    return 301 https://$server_name$request_uri;
}

# Puerto 443: Configuración SSL
server {
    listen 443 ssl http2;
    server_name survival-project.com www.survival-project.com;
    
    # SSL y seguridad
    ssl_certificate /etc/letsencrypt/live/survival-project.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/survival-project.com/privkey.pem;
    
    # Document root
    root /var/www/PROYECTO-SURVIVAL-;
    index index.php index.html;
    
    # Manejo de archivos
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Configuración de PHP-FPM
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock; # Ajusta la versión de PHP
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 🛡️ Configuración de Firewall

### UFW (Ubuntu)
```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Firewalld (CentOS/RHEL)
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 📊 Monitoreo y Logs

### Logs de Acceso
```bash
# Ver logs en tiempo real
sudo tail -f /var/log/nginx/survival.access.log

# Ver logs de error
sudo tail -f /var/log/nginx/survival.error.log
```

## 🚨 Solución de Problemas

### Error: "Permission Denied"
```bash
# Verificar permisos del directorio
sudo chown -R www-data:www-data /var/www/PROYECTO-SURVIVAL-
sudo chmod -R 755 /var/www/PROYECTO-SURVIVAL-
```

### Error: "SSL Certificate Not Found"
```bash
# Verificar que el certificado existe
sudo ls -la /etc/letsencrypt/live/survival-project.com/

# Renovar certificado
sudo certbot renew --nginx
```

## 📝 Personalización

### Cambiar Dominio
1. Editar `/etc/nginx/sites-available/survival`
2. Reemplazar `survival-project.com` con tu dominio
3. Actualizar certificados SSL
4. Reiniciar Nginx

---

## 🎉 ¡Listo!

Tu proyecto `PROYECTO-SURVIVAL-` ahora está listo para ser desplegado con:
- ✅ Nginx optimizado
- ✅ SSL/TLS habilitado
- ✅ Soporte para PHP
- ✅ Renovación automática de SSL

¡Disfruta de tu servidor web seguro y rápido! 🚀