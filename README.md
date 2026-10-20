# Porfolio

Sitio estático (HTML + CSS + JS, sin instalar nada) para mostrar demo reel, trabajos, sobre mí y contacto.

## Editar el contenido

Todo el contenido está en **`content.js`**: nombre, rol, reel, Game Cinematics, Movies, About y contacto.

- **Cambiar el orden:** los videos y películas aparecen en la web en el mismo orden que en `content.js`. Para reordenar, cortá una línea `{ ... },` y pegala más arriba o más abajo dentro de la lista.
- **Agregar un Game Cinematic:** copiá una línea `{ title, game, link }` y cambiá los datos.
- **Agregar una película/serie:** copiá una línea `{ title, year, type, role, imdb }` (el `imdb` es el código `tt...` de la URL de IMDb) y guardá su póster como `assets/movies/<código>.jpg`.

## Verlo en tu compu

```bash
python3 -m http.server 8000
```

y abrí http://localhost:8000 (los videos de YouTube no siempre funcionan abriendo el `index.html` con doble clic).

## Publicar en GitHub Pages

1. En GitHub, creá un repositorio **público** llamado `TU-USUARIO.github.io`
   (así la web queda en `https://TU-USUARIO.github.io`). Si le ponés otro nombre, por ej. `porfolio`, queda en `https://TU-USUARIO.github.io/porfolio`.
2. Subí los archivos `index.html`, `style.css`, `script.js`, `content.js` y la carpeta `assets`
   (desde la web: *Add file → Upload files*, o con git:)

   ```bash
   git init
   git add index.html style.css script.js content.js assets README.md
   git commit -m "Primer versión del porfolio"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-USUARIO.github.io.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, elegí `main` y carpeta `/ (root)`, y guardá.
4. En 1–2 minutos la web queda online. Cada vez que cambies `content.js` y lo subas, se actualiza sola.
