/**
 * Formats a number as currency.
 * @param {number} amount - The number to format.
 * @param {string} [currency='USD'] - The currency code (e.g., 'USD', 'EUR').
 * @param {string} [locale='en-US'] - The locale for formatting.
 * @returns {string} The formatted currency string.
 */
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    if (typeof amount !== 'number') {
        return '';
    }
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

/**
 * Formats a Date object or a date string into a more readable format.
 * @param {Date|string} date - The date to format.
 * @param {string} [locale='en-US'] - The locale for formatting.
 * @param {object} [options] - Intl.DateTimeFormat options.
 * @returns {string} The formatted date string.
 */
function formatDate(date, locale = 'en-US', options) {
    const dateToFormat = typeof date === 'string' ? new Date(date) : date;
    if (!(dateToFormat instanceof Date) || isNaN(dateToFormat.getTime())) {
        return '';
    }
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(dateToFormat);
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a specified length and appends an ellipsis if truncated.
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} The truncated string.
 */
function truncateString(str, maxLength) {
    if (typeof str !== 'string') {
        return '';
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

function categoriaMaquinaFormatter(id) {
    const categorias = {
        1: 'Escavadeira',
        2: 'Empilhadeira',
        3: 'Rolo Compressor',
        4: 'Caminhão',
        5: 'Implementos Agrícolas',
        6: 'Máquinas de Terraplenagem',
        7: 'Colhedoras de Cana',
        8: 'Máquinas Florestais',
        9: 'Outros'
    };

    return categorias[id] || 'Categoria Desconhecida';
}

function disponibilidadeFormatter(disponibilidade) {
    return disponibilidade ? 'Disponível' : 'Indisponível';
}

export default function formatter() {
    return {
        formatCurrency,
        formatDate,
        capitalize,
        truncateString,
        categoriaMaquinaFormatter,
        disponibilidadeFormatter
    };
}