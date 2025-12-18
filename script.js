// =====================================================
// CIFRADO CÉSAR
// Algoritmo: Desplaza cada letra un número fijo de posiciones
// Fórmula: E(x) = (x + k) mod 26
// =====================================================

/**
 * Función principal para el cifrado César
 * @param {string} text - Texto a cifrar/descifrar
 * @param {number} shift - Número de posiciones a desplazar (0-25)
 * @param {boolean} encrypt - true para cifrar, false para descifrar
 * @returns {string} - Texto procesado
 */
function caesarShift(text, shift, encrypt = true) {
    // Si es descifrado, invertimos el desplazamiento
    if (!encrypt) shift = -shift;
    
    let result = '';
    
    // Recorremos cada carácter del texto
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Solo procesamos letras (A-Z, a-z)
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            
            // Letras mayúsculas (A=65 ... Z=90)
            if (code >= 65 && code <= 90) {
                // Fórmula: ((código - 65 + desplazamiento + 26) mod 26) + 65
                // El +26 asegura que el resultado sea positivo
                result += String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
            }
            // Letras minúsculas (a=97 ... z=122)
            else if (code >= 97 && code <= 122) {
                result += String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
            }
        } else {
            // Mantener caracteres no alfabéticos sin cambios (espacios, números, puntuación)
            result += char;
        }
    }
    
    return result;
}

// Función para cifrar con César
function caesarEncrypt() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-key').value) || 0;
    const result = caesarShift(text, shift, true);
    document.getElementById('caesar-output').textContent = result;
}

// Función para descifrar con César
function caesarDecrypt() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-key').value) || 0;
    const result = caesarShift(text, shift, false);
    document.getElementById('caesar-output').textContent = result;
}

// =====================================================
// CIFRADO VIGENÈRE
// Algoritmo: Usa una palabra clave para múltiples desplazamientos
// Fórmula Cifrado: C_i = (M_i + K_i) mod 26
// Fórmula Descifrado: M_i = (C_i - K_i + 26) mod 26
// =====================================================

/**
 * Función principal para el cifrado Vigenère
 * @param {string} text - Texto a cifrar/descifrar
 * @param {string} key - Palabra clave (solo letras)
 * @param {boolean} encrypt - true para cifrar, false para descifrar
 * @returns {string} - Texto procesado
 */
function vigenereProcess(text, key, encrypt = true) {
    if (!key || key.length === 0) {
        return "Error: Ingrese una clave válida";
    }
    
    // Limpiar la clave: solo letras mayúsculas
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (key.length === 0) {
        return "Error: La clave debe contener al menos una letra";
    }
    
    let result = '';
    let keyIndex = 0; // Índice para recorrer la clave de forma cíclica
    
    // Recorremos cada carácter del texto
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Solo procesamos letras
        if (char.match(/[a-z]/i)) {
            const isUpper = char === char.toUpperCase();
            char = char.toUpperCase();
            
            // Convertir letra a número (A=0, B=1, ..., Z=25)
            const charCode = char.charCodeAt(0) - 65;
            const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
            
            let newCharCode;
            if (encrypt) {
                // Cifrado: (M + K) mod 26
                newCharCode = (charCode + keyChar) % 26;
            } else {
                // Descifrado: (C - K + 26) mod 26
                newCharCode = (charCode - keyChar + 26) % 26;
            }
            
            // Convertir de vuelta a letra
            let newChar = String.fromCharCode(newCharCode + 65);
            result += isUpper ? newChar : newChar.toLowerCase();
            
            // Avanzar en la clave solo cuando procesamos una letra
            keyIndex++;
        } else {
            // Mantener caracteres no alfabéticos
            result += char;
        }
    }
    
    return result;
}

// Función para cifrar con Vigenère
function vigenereEncrypt() {
    const text = document.getElementById('vigenere-text').value;
    const key = document.getElementById('vigenere-key').value;
    const result = vigenereProcess(text, key, true);
    document.getElementById('vigenere-output').textContent = result;
}

// Función para descifrar con Vigenère
function vigenereDecrypt() {
    const text = document.getElementById('vigenere-text').value;
    const key = document.getElementById('vigenere-key').value;
    const result = vigenereProcess(text, key, false);
    document.getElementById('vigenere-output').textContent = result;
}

// =====================================================
// CIFRADO POR TRANSPOSICIÓN COLUMNAR
// Algoritmo: Reordena las letras usando una matriz
// Proceso: Escribir en filas, leer en columnas según clave
// =====================================================

/**
 * Cifrado por Transposición Columnar
 * Escribe el mensaje en filas y lo lee en columnas según el orden de la clave
 */
function columnarEncrypt() {
    const text = document.getElementById('columnar-text').value;
    const keyStr = document.getElementById('columnar-key').value;
    
    try {
        // Convertir clave a array de números
        const key = keyStr.split(',').map(n => parseInt(n.trim()));
        
        // Validar que todos los valores sean números
        if (key.some(isNaN) || key.length === 0) {
            document.getElementById('columnar-output').textContent = "Error: Clave inválida. Use números separados por comas (ej: 3,1,4,2)";
            return;
        }
        
        // Eliminar espacios del texto
        const cleanText = text.replace(/\s/g, '');
        const numCols = key.length;
        const numRows = Math.ceil(cleanText.length / numCols);
        
        // PASO 1: Crear matriz y llenar con el texto
        const matrix = [];
        let textIndex = 0;
        
        for (let i = 0; i < numRows; i++) {
            matrix[i] = [];
            for (let j = 0; j < numCols; j++) {
                // Si nos quedamos sin texto, rellenar con 'X'
                matrix[i][j] = textIndex < cleanText.length ? cleanText[textIndex++] : 'X';
            }
        }
        
        // PASO 2: Ordenar las columnas según la clave
        // Crear array de índices con sus valores para ordenar
        const sortedKey = key.map((val, idx) => ({val, idx}))
            .sort((a, b) => a.val - b.val);
        
        // PASO 3: Leer columnas en orden
        let result = '';
        for (let k of sortedKey) {
            for (let i = 0; i < numRows; i++) {
                result += matrix[i][k.idx];
            }
        }
        
        document.getElementById('columnar-output').textContent = result;
        
    } catch (e) {
        document.getElementById('columnar-output').textContent = "Error en el cifrado: " + e.message;
    }
}

/**
 * Descifrado por Transposición Columnar
 * Proceso inverso: escribir en columnas según orden, leer en filas
 */
function columnarDecrypt() {
    const text = document.getElementById('columnar-text').value;
    const keyStr = document.getElementById('columnar-key').value;
    
    try {
        // Convertir clave a array de números
        const key = keyStr.split(',').map(n => parseInt(n.trim()));
        
        if (key.some(isNaN) || key.length === 0) {
            document.getElementById('columnar-output').textContent = "Error: Clave inválida";
            return;
        }
        
        const cleanText = text.replace(/\s/g, '');
        const numCols = key.length;
        const numRows = Math.ceil(cleanText.length / numCols);
        
        // PASO 1: Crear matriz vacía
        const matrix = Array(numRows).fill().map(() => Array(numCols).fill(''));
        
        // PASO 2: Ordenar clave para saber el orden original de las columnas
        const sortedKey = key.map((val, idx) => ({val, idx}))
            .sort((a, b) => a.val - b.val);
        
        // PASO 3: Llenar matriz columna por columna según el orden
        let textIndex = 0;
        for (let k of sortedKey) {
            for (let i = 0; i < numRows; i++) {
                if (textIndex < cleanText.length) {
                    matrix[i][k.idx] = cleanText[textIndex++];
                }
            }
        }
        
        // PASO 4: Leer por filas para obtener el mensaje original
        let result = '';
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                result += matrix[i][j];
            }
        }
        
        // Eliminar las 'X' de relleno al final
        document.getElementById('columnar-output').textContent = result.replace(/X+$/, '');
        
    } catch (e) {
        document.getElementById('columnar-output').textContent = "Error en el descifrado: " + e.message;
    }
}

// =====================================================
// CIFRADO ATBASH
// Algoritmo: Invierte el alfabeto (A↔Z, B↔Y, C↔X)
// Fórmula: newChar = 'Z' - (char - 'A')
// Es su propio inverso: cifrar = descifrar
// =====================================================

/**
 * Cifrado Atbash
 * Invierte completamente el alfabeto
 * A→Z, B→Y, C→X, D→W, ... , Z→A
 */
function atbashTransform() {
    const text = document.getElementById('atbash-text').value;
    let result = '';
    
    // Recorremos cada carácter
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Solo procesamos letras
        if (char.match(/[a-z]/i)) {
            const isUpper = char === char.toUpperCase();
            char = char.toUpperCase();
            
            // Fórmula Atbash: newChar = Z - (char - A)
            // Ejemplo: Si char = A (código 65), newChar = Z (código 90)
            //          Si char = Z (código 90), newChar = A (código 65)
            const charCode = char.charCodeAt(0);
            const newCharCode = 90 - (charCode - 65);
            const newChar = String.fromCharCode(newCharCode);
            
            result += isUpper ? newChar : newChar.toLowerCase();
        } else {
            // Mantener caracteres no alfabéticos
            result += char;
        }
    }
    
    document.getElementById('atbash-output').textContent = result;
}

// =====================================================
// NOTAS ADICIONALES PARA LA EXPOSICIÓN
// =====================================================

/*
COMPLEJIDAD TEMPORAL:
- César: O(n) donde n es la longitud del texto
- Vigenère: O(n) donde n es la longitud del texto
- Transposición: O(n) para cifrar/descifrar
- Atbash: O(n) donde n es la longitud del texto

SEGURIDAD:
- César: Muy baja (solo 25 claves posibles)
- Vigenère: Media (vulnerable a análisis de frecuencias)
- Transposición: Media (preserva frecuencias de letras)
- Atbash: Muy baja (solo 1 posible cifrado)

HISTORIA:
- César: Usado por Julio César en el 58 a.C.
- Vigenère: Creado en el siglo XVI, considerado "indescifrable" por 300 años
- Transposición: Usado en WWI y WWII
- Atbash: Origen en el alfabeto hebreo antiguo
*/