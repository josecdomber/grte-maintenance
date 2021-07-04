/**
 * Comprueba si es un array vacio
 * @param {Any} value Valor a comprobar
 * @returns {Boolean}
 */
export function isEmptyArray(value) {
  return Array.isArray(value) && !value.length;
}

/**
 * Comprueba si es un date
 * @param {Any} value Valor a comprobar
 * @returns {Boolean}
 */
export function isDate(value) {
  return value instanceof Date;
}

/**
 * Comprueba si es un objeto (no un array ni un date)
 * @param {Any} value Valor a comprobar
 * @returns {Boolean}
 */
export function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && !isDate(value);
}

/**
 * Comprueba si es un objeto vacio
 * @param {Any} value Valor a comprobar
 * @returns {Boolean}
 */
export function isEmptyObject(value) {
  return isObject(value) && !Object.keys(value).length;
}

/**
 * Check if value type is string
 * @param {Any} value Value to check
 * @returns {Boolean}
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Comprueba si es un string
 * @param {String} value Valor a comprobar
 * @returns {Boolean}
 */
export function isEmptyString(value) {
  return value === '';
}

/**
 * Comprueba si una fecha en formato string es valida para una conversion new Date(valor)
 * @param {String} date Fecha en formato string que se quiere comprobar
 * @returns {Boolean}
 */
export function isValidDate(date) {
  return !Number.isNaN(Date.parse(date));
}

/**
 * Evalua si el valor pasado es de tipo error
 * @param {Any} value Dato a comparar para saber si es de tipo Error
 * @returns {Boolean} Te devuelve un valor booleano para saber si es Error o no
 */
export function isError(value) {
  return value instanceof Error;
}

/**
 * Dado un elemento HTML emite un evento nativo
 * @param {HTMLElement} element Nodo HTML que emitira el evento
 * @param {String} event Nombre del evento
 * @param {Any} detail Payload del evento
 * @param {Boolean} bubbles
 * @param {Boolean} composed
 */
export function dispatch(element, event, detail, bubbles = true, composed = true) {
  element.dispatchEvent(
    new CustomEvent(event, {
      detail,
      bubbles,
      composed,
    }),
  );
}

/**
 * Asigna un array de listeners a un objeto que emita eventos
 * @param {Object} reference: Objeto referencia de un elemento que pueda emitir eventos
 * @param {Object} eventActions: Objeto con relaciones uno a uno entre el nombre del evento y su handler
 */
export function addEventListeners(reference, eventActions) {
  for (const [key, value] of Object.entries(eventActions)) {
    reference.addEventListener(key, value);
  }
}

/**
 * Clona un objeto de forma profunda (o un Array)
 * Si no recibe nada devuelve null
 * @param {Object|Array} target Elemento a clonar
 * @returns {Object|null}
 */
export function clon(target) {
  return target ? JSON.parse(JSON.stringify(target)) : null;
}

/**
 * Equivalente a Array.map pero con un Object
 * Ejecuta la funcion proporcionada una vez por cada elemento del objeto
 * @param {Object} target Objeto sobre el que se quiere iterar
 * @param {Function} callback Función a la que se llama en cada iteracion. Recibe los parametros: value, key, target
 * @returns {Object}
 */
export function mapObject(target = {}, callback) {
  const result = {};
  Object.keys(target).forEach(key => {
    result[key] = callback(target[key], key, target);
  });
  return result;
}

/**
 * Equivalente a Array.filter pero con un Object
 * Ejecuta la funcion proporcionada una vez por cada elemento del objeto
 * @param {Object} target Objeto sobre el que se quiere iterar
 * @param {Function} callback Función a la que se llama en cada iteracion. Recibe los parametros: value, key, target
 * @returns {Object}
 */
export function filterObject(target = {}, callback) {
  const result = {};
  Object.keys(target).forEach(key => {
    const value = target[key];
    if (callback(value, key, target)) {
      result[key] = value;
    }
  });
  return result;
}

/**
 * Accede a las propiedades de un objeto sin fallar en caso de que no existan
 * Similar a: obj?.prop1?.prop2
 * Es una copia de cells-check-nested-keys-behavior
 * https://globaldevtools.bbva.com/bitbucket/projects/GLOMO/repos/cells-check-nested-keys-behavior/browse/cells-check-nested-keys-behavior.html
 * @param {Object} target Objeto del que se quiere obtener la propiedad
 * @param {String|Array} path Ruta de la propiedad. Ej 'prop1.prop2' ['prop1', 0, 'prop2']
 * @param {Any} defaultValue Valor por defecto en caso de no encontrarse la propiedad
 * @returns {Any} Devuelve la propiedad o su defaultValue si no se encuentra
 */
export function getProperty(target, path, defaultValue) {
  if (target && path) {
    const newPath = Array.isArray(path) ? path : path.split('.');
    return newPath.reduce((acc, key, index) => {
      const value = acc[key];
      const isLast = index + 1 === newPath.length;
      const isAnObject = value === Object(value);
      if (!isAnObject && !isLast) {
        return defaultValue || {};
      }

      if (!!value || value === 0 || value === false) {
        return value;
      }

      return defaultValue !== undefined ? defaultValue : value;
    }, target);
  }
  return defaultValue;
}

/**
 * Transform data into key-value object
 * @param {Object} data Data to index
 * @param {String} key Path to key
 * @returns {Object} Returns key-value object
 */
export function toKeyValueObject(data, key) {
  return { [getProperty(data, key, '')]: data };
}

/**
 * Transform array into key-value object
 * @param {Array} requests Array of values
 * @param {String} key Path to key
 * @returns {Object} Returns key-value object
 */
export function arrayToKeyValueObject(arr = [], key) {
  return arr.reduce(
    (accumulator, currValue) => ({
      ...accumulator,
      [getProperty(currValue, key, '')]: currValue,
    }),
    {},
  );
}

/**
 * Trata de asignar un valor a un objeto
 * Si el objeto o sus subobjetos no existen no genera un fallo
 * Similar a: obj?.prop1?.prop2 = newValue
 * @param {Object} target Objeto que se quiere modificar
 * @param {String|Array} path String o Array con la ruta de la propiedad que se quiere modificar. Ej 'prop1.prop2' ['prop1', 0, 'prop2']
 * @param {Any} newValue Nuevo valor de la propiedad
 */
export function setProperty(target, path, newValue) {
  if (target && path) {
    const newPath = Array.isArray(path) ? path : path.split('.');
    newPath.reduce((acc, key, index) => {
      const prop = acc[key];
      const isLast = index + 1 === newPath.length;
      const isAnObject = prop === Object(prop);
      const value = isLast ? newValue : {};

      acc[key] = isAnObject ? { [key]: value, ...acc[key] } : value;
      return acc[key];
    }, target);
  }
}


/**
 * Formatea una cadena poniendo de cada palabra la primera letra en mayuscula y el resto en minuscula
 * @param {String} str Cadena de texto que se quiere capitalizar
 * @returns {String}
 */
export function capitalize(str = '') {
  return str
    .split(' ')
    .filter(Boolean)
    .map(i => `${i[0].toUpperCase()}${i.slice(1).toLowerCase()}`)
    .join(' ');
}

/**
 * Devuelve la interseccion de dos arrays: Los elementos que se encuentren en ambos arrays.
 * @param {Array} array1 Array donde se quiere buscar
 * @param {Array} array2 Array que se quiere comprobar
 * @returns {Array}
 */
export function intersection(array1 = [], array2 = []) {
  return array1.filter(key => array2.includes(key));
}

/**
 * Ordena un array de objetos numericamente (no alfabeticamente) segun una clave
 * @param {Array} arr Array de objetos
 * @param {String} key Clave que se busca en el objeto
 * @param {Boolean} reverse Opcionalmente se puede invertir el orden del array
 * @returns {Array}
 */
export function sortNumericByKey(arr = [], key = '', reverse = false) {
  const result = arr.sort((a, b) => +a[key] - +b[key]);
  return reverse ? result.reverse() : result;
}

/**
 * Dado un objeto elimina los valores null o undefined (o 'null' o 'undefined')
 * @param {Object} obj Objeto que se quiere limpiar
 * @returns {Object}
 */
export function removeNullValues(obj) {
  return filterObject(obj, value => ![null, undefined, 'null', 'undefined'].includes(value));
}

/**
 * Dado un objeto elimina los valores irrelevantes como dato (null, undefined, [], {}, '')
 * @param {Object} obj Objeto que se quiere limpiar
 * @returns {Object}
 */
export function removeNullAndEmptyValues(obj) {
  let temp = removeNullValues(obj);
  // Filtro el objeto y solo devuelvo los valores que NO son un array vacio, un objeto vacio o una cadena vacia
  temp = filterObject(temp, value => {
    if ([isEmptyArray, isEmptyObject, isEmptyString].some(checkFunction => checkFunction(value))) {
      return false;
    }
    return true;
  });
  return temp;
}

/**
 * Convert UTC date to local date
 * @param {Date} date - UTC date
 * @returns {Date} newDate - local timezone date
 */
function convertUTCDateToLocalDate(date) {
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate;
}

/**
 * Obtiene la hora y fecha parseada a partir del parámetro recibido
 * Necesario para mostrarse en la tabla
 * @param {Number} value
 * @returns {Object} { date: '07 Abr 1978', time: '16:13' }
 */
export function parseDateToDateTimeFormat(value, utc = false) {
  if (!isValidDate(value)) {
    return { date: '', time: '' };
  }
  const dateGMT = utc ? convertUTCDateToLocalDate(new Date(value)) : new Date(value);

  const partsDate = Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(new Date(dateGMT).getTime());
  const [day, , month, , year, , hour, separator, minute] = partsDate;
  return {
    date: `${day.value} ${capitalize(month.value.replace('.', ''))} ${year.value}`,
    time: `${hour.value}${separator.value}${minute.value}`,
  };
}

/**
 * Dada una fecha en formato string devuelve su fecha como Date
 * Opcionalmente como milisegundos
 * @param {String} dateString Fecha como string
 * @param {Boolean} returnInMilliseconds Si se quiere la fecha como unix timestamp
 * @returns {Date|null}
 */
export function stringToDate(dateString, returnInMilliseconds = true) {
  const date = dateString ? new Date(dateString) : null;
  const dateTimestamp = date ? date.getTime() : null;
  return returnInMilliseconds ? dateTimestamp : date;
}

/**
 * Download the file that the user wants to view.
 * @param {String} name
 * @param {String} url
 */
export function downloadFile(name, url) {
  const tmp = document.createElement('a');
  tmp.href = url;
  tmp.download = name;
  tmp.click();
}

/**
 * Utillería para devolver undefined en caso de haber algun error en un servicio y continuar las promesas sin provocar un error
 * @param {HTMLElement} element Componente donde se produce el error
 * @param {Any} defaultValue Valor que se devuelve en la respuesta
 * @returns {Any} Si no se pasa ningun defaultValue devuelve undefined
 * @emits 'tckt-modal-generic-error'
 */
export function handleError(element, defaultValue) {
  return error => {
    dispatch(element, 'tckt-modal-generic-error', error);
    return defaultValue;
  };
}

/**
 * Busca en un array de objetos por igualdad estricta con un valor dado
 * @param {Array} arr Array de objetos Ej: [{id: '1'}, {id: '2'}]
 * @param {String} key Clave a comparar Ej: 'id'
 * @param {String} value Valor con el que compararlo Ej: '2'
 * @returns {Object} El primer objeto resultante o undefined Ej: {id: '2'}
 */
export function findByKey(arr, key, value) {
  return arr.find(entity => entity[key] === value);
}

/**
 * Filtra en un array de objetos por igualdad estricta con un valor
 * @param {Array} arr Array de objetos
 * @param {String} key Clave a comparar
 * @param {String} value Valor con el que compararlo
 * @returns {Array}
 */
export function filterByKey(arr, key, value) {
  return arr.filter(entity => entity[key] === value);
}

/**
 * Devuelve true si el valor que se le pasa es igual al valor esperado
 * @param {String} value
 * @param {String} expectedValue
 * @returns {Boolean}
 */
export function isValueExpected(value, expectedValue) {
  return value === expectedValue;
}

/**
 * Hace un JSON.parse de forma segura.
 * En caso de fallar, devuelve un objeto vacio
 * @param {String} jsonString Cadena de texto que se quiere convertir a JSON
 * @param {Any} defaultValue Valor en caso de fallar el parse. Por defecto objeto vacio
 * @returns {Any} Devuelve el defaultValue
 */
export function jsonParse(jsonString, defaultValue = {}) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Devuelve la posición del último item del array o un valor por defecto
 * @param {Array} arr Array para retornar el último valor de este
 * @param {Any} defaultValue Valor que queremos devolver si no se encuentra la última posición del array
 * @returns {Any} Te devuelve el valor de la última posición del array o undefined
 */
export function getLastItem(arr, defaultValue) {
  return Array.isArray(arr) && arr.length ? arr[arr.length - 1] : defaultValue;
}

/**
 * Upload file to targetUrl.
 * Like Fetch native method but with progress status.
 * @param {String} targetUrl Server endpoint to upload file
 * @param {Object} init Upload request config params (similar signature than fetch native method)
 * @property {String} method
 * @property {Object} headers
 * @property {Object} body
 * @property {Function} statusCallback
 */
export function uploadFileWithProgress(targetUrl, init) {
  return new TcktFetch(targetUrl, init);
}

/**
 * Parse text into HTML nodes
 * @param {String} text Text to parse
 * @returns {HTMLCollection}
 */
export function textToHtml(text) {
  const tmpElement = document.createElement('div');
  tmpElement.innerHTML = text;
  return tmpElement.childNodes;
}

/**
 * Replace percentage
 * @param {String} text Text to replace
 * @returns {String}
 */
export function replacePercentage(text) {
  return text.replace(/%/g, '&#37;');
}

/**
 * Remove HTML tags from content
 * @param {String} content Text with HTML tags
 * @returns {String}
 */
export function removeHTMLTags(content, exceptions = []) {
  return content.replace(REGEX_TAG, match => (exceptions.includes(match) ? match : ''));
}

/**
 * Clean error trace of line breaks and extra characters
 * @param {String} trace Error trace string
 * @returns {Array}
 */
function cleanErrorTrace(trace) {
  const paths = trace.split('\n').slice(1);
  return paths.map(path => path.substring(path.indexOf(' at ') + 4));
}

/**
 * Get current stack trace array
 * @returns {Array}
 */
export function getStackTrace() {
  return cleanErrorTrace(new Error().stack);
}


/**
 * Gets two array difference
 * @param {Array} a First element array
 * @param {Array} b Second element array
 * @returns {Array}
 */
export function difference(a, b) {
  return a.filter(element => !b.includes(element));
}
