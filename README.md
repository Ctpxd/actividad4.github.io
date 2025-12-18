# 🔐 Herramientas de Cifrado Clásico

Aplicación web interactiva que implementa cuatro algoritmos de cifrado clásico para propósitos educativos.

## 🌐 URL Pública

**[Insertar aquí la URL de tu aplicación desplegada]**

Ejemplo: `https://tu-usuario.github.io/cifrado-clasico/`

---

## 📋 Descripción

Esta aplicación web permite cifrar y descifrar mensajes utilizando cuatro métodos criptográficos históricos:

1. **Cifrado César**: Desplazamiento fijo de letras en el alfabeto
2. **Cifrado Vigenère**: Desplazamiento múltiple usando una palabra clave
3. **Cifrado por Transposición Columnar**: Reordenamiento de letras mediante matriz
4. **Cifrado Atbash**: Inversión completa del alfabeto

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura y contenido de la página
- **CSS3**: Diseño visual y responsive
- **JavaScript (Vanilla)**: Lógica de cifrado/descifrado
- **Sin dependencias externas**: Código 100% nativo

---

## 📁 Estructura del Proyecto

```
proyecto-cifrado/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación
```

---

## 🚀 Cómo Ejecutar Localmente

### Opción 1: Abrir Directamente
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` con tu navegador favorito

### Opción 2: Servidor Local
```bash
# Si tienes Python 3 instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve
```

Luego visita: `http://localhost:8000`

---

## 📖 Manual de Uso

### 1. Cifrado César

**Descripción**: Desplaza cada letra del alfabeto un número fijo de posiciones.

**Pasos**:
1. Ingresa tu mensaje en el campo "Texto"
2. Ajusta el "Desplazamiento" (0-25)
3. Haz clic en "Cifrar" o "Descifrar"

**Ejemplo**:
- Texto: `HOLA`
- Desplazamiento: `3`
- Cifrado: `KROD`

### 2. Cifrado Vigenère

**Descripción**: Usa una palabra clave para aplicar múltiples desplazamientos César.

**Pasos**:
1. Ingresa tu mensaje
2. Escribe una palabra clave (solo letras)
3. Haz clic en "Cifrar" o "Descifrar"

**Ejemplo**:
- Texto: `ATAQUE`
- Clave: `SOL`
- Cifrado: `SZHDCE`

### 3. Transposición Columnar

**Descripción**: Reordena las letras escribiendo en filas y leyendo en columnas.

**Pasos**:
1. Ingresa tu mensaje
2. Define la clave (números separados por comas, ej: `3,1,4,2`)
3. Haz clic en "Cifrar" o "Descifrar"

**Ejemplo**:
- Texto: `MENSAJE`
- Clave: `3,1,4,2`
- Cifrado: `EJMNSEAX`

### 4. Cifrado Atbash

**Descripción**: Invierte el alfabeto (A↔Z, B↔Y, etc.).

**Pasos**:
1. Ingresa tu mensaje
2. Haz clic en "Cifrar / Descifrar" (es la misma operación)

**Ejemplo**:
- Texto: `HOLA`
- Resultado: `SLOZ`

---

## 🎥 Contenido del Video de Demostración

El video debe incluir:

### Bloque 1: Demostración (6-7 minutos)
1. Presentación de la URL y la interfaz
2. Demostración de cada algoritmo:
   - Cifrado César con desplazamiento 5
   - Vigenère con palabra clave "SEGURIDAD"
   - Transposición Columnar con clave 4,2,1,3
   - Atbash con varios ejemplos
3. Verificar que el descifrado devuelve el mensaje original

### Bloque 2: Código Fuente (3-4 minutos)
1. Mostrar archivo `script.js`
2. Explicar la función `caesarShift()`
3. Explicar la función `vigenereProcess()`
4. Explicar las funciones `columnarEncrypt/Decrypt()`
5. Explicar la función `atbashTransform()`

---

## 🔒 Algoritmos Implementados

### Cifrado César
```javascript
Fórmula Cifrado: E(x) = (x + k) mod 26
Fórmula Descifrado: D(x) = (x - k) mod 26
```

### Cifrado Vigenère
```javascript
Fórmula Cifrado: C_i = (M_i + K_i) mod 26
Fórmula Descifrado: M_i = (C_i - K_i) mod 26
```

### Transposición Columnar
```javascript
1. Escribir mensaje en filas de n columnas
2. Leer columnas según orden de clave
3. Para descifrar: invertir el proceso
```

### Cifrado Atbash
```javascript
Fórmula: newChar = 'Z' - (char - 'A')
```

---

## 🌐 Opciones de Despliegue

### GitHub Pages (Gratis)
1. Crea un repositorio en GitHub
2. Sube los archivos
3. Ve a Settings → Pages
4. Selecciona la rama `main`
5. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo/`

### Netlify (Gratis)
1. Arrastra la carpeta del proyecto a [netlify.com/drop](https://app.netlify.com/drop)
2. Obtendrás una URL instantánea

### Vercel (Gratis)
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

---

## 👨‍💻 Autor

**[Tu Nombre]**

Proyecto desarrollado para la asignatura de Seguridad Informática

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🔗 Enlaces Útiles

- [Documentación de Cifrado César](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Documentación de Cifrado Vigenère](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)
- [Transposición Columnar](https://en.wikipedia.org/wiki/Transposition_cipher)
- [Cifrado Atbash](https://en.wikipedia.org/wiki/Atbash)

---

## ✅ Checklist de Entrega

- [ ] Código fuente completo en repositorio público
- [ ] README.md con URL pública
- [ ] Aplicación desplegada y accesible
- [ ] Video de demostración (10+ minutos)
- [ ] Todos los algoritmos funcionando correctamente
- [ ] Código comentado y documentado