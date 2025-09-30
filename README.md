# 🚀 PROYECTO-SURVIVAL-

Este es un proyecto de aplicación web con funcionalidades de Realidad Aumentada (AR) para gestionar usuarios, tendencias y estadísticas, con un componente de juego inmersivo.

## 🧩 Tecnologías Utilizadas

- 🐘 **Backend**: PHP 8.4
- 🛢️ **Base de Datos**: MySQL / MariaDB 10.6
- 🎨 **Frontend**: HTML, CSS, JavaScript (ES6+), jQuery, Bootstrap
- 🎮 **Realidad Aumentada**: A-Frame
- 🚀 **Entorno de Desarrollo**: XAMPP / Coolify (Ubuntu 22.04, Apache2)


## ✨ Funcionalidades Principales

- 🔐 **Autenticación**: Paneles de Login y Registro de usuarios.
- 🫂 **Gestión de Usuarios**: Panel para administrar usuarios (crear, editar, eliminar).
- 🎮 **Juego AR "Survival"**: Un mini-juego inmersivo construido con A-Frame.
- 📊 **Dashboard**: Panel principal con estadísticas y actividad reciente.

---

## 🚀 Guía de Instalación Rápida (Local)

1.  **Descomprimir**: Coloca los archivos del proyecto en la carpeta raíz de tu servidor web local.
    -   **XAMPP**: `C:\xampp\htdocs\PROYECTO-SURVIVAL-`
    -   **Laragon**: `C:\laragon\www\PROYECTO-SURVIVAL-`
    -   **Linux**: `/var/www/html/PROYECTO-SURVIVAL-`

2.  **Base de Datos**:
    -   Crea una base de datos en MySQL/MariaDB.
    -   Revisa y ajusta las credenciales en `api/config/db.php`.
    -   Importa el archivo `.sql` si se proporciona para crear la estructura de tablas.

3.  **Acceder a la Aplicación**:
    -   Abre en tu navegador: `http://localhost/PROYECTO-SURVIVAL-/`
    -   Serás redirigido a la página de login: `views/auth.php`.

---

## 📚 Documentación Adicional

Para información más detallada sobre la API, los componentes de frontend y la configuración del servidor, consulta la carpeta `docs/`:

-   **docs/API_DOCUMENTATION.md**: Referencia completa de las APIs del backend y frontend.
-   **docs/COMPONENT_DOCUMENTATION.md**: Documentación detallada sobre los componentes de A-Frame y módulos JavaScript.
-   **docs/QUICK_REFERENCE.md**: Guía de referencia rápida para comandos y patrones comunes.
-   **docs/SERVER_SETUP.md**: Guía para configurar el entorno de producción con Nginx y SSL.

---

## 🎯 Cómo Usar Esta Documentación

### 🆕 Para Nuevos Desarrolladores
1.  **Comienza con**: `docs/QUICK_REFERENCE.md` para una vista rápida.
2.  **Continúa con**: `docs/API_DOCUMENTATION.md` para entender el backend y las APIs.
3.  **Finalmente**: `docs/COMPONENT_DOCUMENTATION.md` para los detalles del frontend y AR.

### 🔧 Para Desarrollo de Backend
1.  **Principal**: `docs/API_DOCUMENTATION.md` - Sección de APIs de Backend.
2.  **Referencia rápida**: `docs/QUICK_REFERENCE.md` - Sección de APIs de Backend.

### 🎨 Para Desarrollo de Frontend y AR
1.  **Principal**: `docs/COMPONENT_DOCUMENTATION.md` para componentes de A-Frame y módulos JS.
2.  **Referencia**: `docs/API_DOCUMENTATION.md` - Sección de APIs de Frontend.
3.  **Ejemplos**: `docs/QUICK_REFERENCE.md` - Sección de Operaciones AR.

---

## 📁 Estructura del Proyecto

```bash
/PROYECTO-SURVIVAL-
│
├── api                        # API del servidor
├── assets                     # Recursos (modelos 3D, iconos, etc.)
├── css                        # Estilos del frontend
├── dist                       # Librerías de frontend
├── js                         # Lógica del frontend
├── ui                         # Componentes de UI reutilizables (footer)
├── views                      # Vistas PHP (auth, dashboard)
├── index.php                  # Punto de entrada principal
├── API_DOCUMENTATION.md       # Documentación de la API
├── COMPONENT_DOCUMENTATION.md # Documentación de componentes
├── install-nginx.sh           # Script de instalación del servidor
└── nginx.conf                 # Archivo de configuración de Nginx
```
=======
