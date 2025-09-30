PROYECTO-SURVIVAL- - Guía rápida de instalación y uso
------------------------------------------
1) Descomprime este paquete en la carpeta raíz de tu servidor web local.
   - XAMPP: C:\xampp\htdocs\PROYECTO-SURVIVAL-
   - Laragon: C:\laragon\www\PROYECTO-SURVIVAL-
   - Linux: /var/www/html/PROYECTO-SURVIVAL- (puede requerir permisos)

2) Base de datos:
   - Revisa el archivo de configuración de la base de datos en api/config/db.php.
   - Asegúrate de crear la base de datos en MySQL/MariaDB y ajustar usuario/contraseña.
   - Si tienes un archivo SQL para importar, usa phpMyAdmin o la línea de comandos.

3) Puntos de entrada:
   - Abre en tu navegador: http://localhost/PROYECTO-SURVIVAL-/
   - index.php redirige al login (views/auth.php).

4) Archivos importantes y su función:
   - views/auth.php  -> Formulario de login/registro.
   - views/dashboard.php -> Panel principal después de iniciar sesión.
   - api/ -> Endpoints para autenticación, lista de usuarios, logout, etc.
   - js/ -> Scripts del frontend (auth.js, dashboard.js, etc.).
   - css/ -> Estilos (style.css, dashboard.css, ...).
   - ui/ -> Partes reutilizables como el footer.

5) Si tu login original (views/auth.php) tenía rutas relativas específicas,
   se han respetado. Si ves errores 404 en la consola, revisa las rutas hacia js/ y css/.

6) Problemas comunes:
   - 404 en style.css o script.js: verifica la ruta y que los archivos existan en css/ y js/.
   - Error de conexión DB: abre api/config/db.php y ajusta los parámetros.

7) Soporte:
   - Si quieres, súbeme los archivos auth.php y dashboard.php que estés usando y los reviso para asegurar que no haya rutas rotas.
   - Cuando confirmes, puedo generar otra versión del ZIP con cambios adicionales.

Gracias — ¡a prueba y listo!
