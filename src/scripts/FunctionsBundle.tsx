import { useCallback, useEffect, useRef, useState } from "react";
type _CSSProperties = import("react").CSSProperties;

// #region ##################################################################################### SHORTCUTS
// ---------------------------------------------------------------------- RANDOM RANGE
/**
 * Create some random number between the specified ranges.
 *
 * @param _min Range's start (inclusive), `default: 0`.
 * @param _max Range's end (inclusive), `default: 10`.
 * @param _decimal Whether to output a `int` number or a `float` number, `default: false`.
 * @returns A random `number`.
 */
export function randomRange(_min = 0, _max = 10, _decimal?: boolean) {
  const _diff = _max - _min;

  if (!_decimal) return Math.round(_min + _diff * Math.random());
  return _min + _diff * Math.random();
}

// ---------------------------------------------------------------------- BOUNDARIES
/**
 * Returns a valid number between some specific limits (inclusive) without letting it to overflow.
 *
 * @param _value Value to check.
 * @param _min Inferior limit, pass `undefined` for limitless.
 * @param _max Superior limit, pass `undefined` for limitless.
 * @param _wrap Jump the value to the other limit in case of overflow, `default: false`.
 * @returns A `number` between those limits.
 */
export function boundaries(
  _value: number,
  _min?: number,
  _max?: number,
  _wrap?: boolean
) {
  _min = _min ?? _value;
  _max = _max ?? _value;

  if (!_wrap) {
    if (_value < _min) return _min;
    if (_value > _max) return _max;
    return _value;
  }

  if (_value < _min) return _max;
  if (_value > _max) return _min;
  return _value;
}

// ---------------------------------------------------------------------- APPROACH
/**
 * Approach the `_start` param to the `_end` param without overflowing it.
 *
 * @param _start Start value.
 * @param _end End value.
 * @param _amount Step to take, `default: 1`.
 * @returns The new value `_start` one `_amount` step closer to `_end`.
 */
export function approach(_start: number, _end: number, _amount?: number) {
  _amount = _amount ?? 1;

  if (_start < _end) return Math.min(_start + _amount, _end);
  else return Math.max(_start - _amount, _end);
}

// ---------------------------------------------------------------------- STALL
/**
 * Función para simular un tiempo de espera, se utiliza con `async/await`.
 *
 * @param stallTime Tiempo de espera en milisegundos, `default = 3000ms (3s)`.
 * @example console.log("Tiempo inicial");
 * await stall(); // Espera 3s
 * console.log("Después de 3s");
 */
export async function stall(stallTime = 3000) {
  return new Promise<boolean>((r) => setTimeout(() => r(true), stallTime));
}

// ---------------------------------------------------------------------- RANDOM DATE
/**
 * Genera una fecha aleatoria entre dos límites inclusivos.
 *
 * @param start Fecha de inicio, en ISOstring o `Date`, `default: "2000-01-01"`.
 * @param end Fecha final, en ISOstring o `Date`, `default: new Date()`.
 * @returns {Date} Una fecha generada aleatoriamente dentro del rango determinado.
 */
export function randomDate(
  start: string | Date = new Date("2000-01-01"),
  end: string | Date = new Date()
): Date {
  start = new Date(intoInputDate(start));
  end = new Date(intoInputDate(end));

  const mul = 1000 * 3600 * 24;
  const ss = start.getTime() / mul;
  const ee = end.getTime() / mul;
  const rr = randomRange(ss, ee);

  const dd = new Date(rr * mul);
  return new Date(dd.getUTCFullYear(), dd.getUTCMonth(), dd.getUTCDate());
}

// ---------------------------------------------------------------------- CREATE TUPLE
/**
 * Creates a tuple from the given `Array`.
 *
 * @param args Array from which create the tuple.
 * @returns A `Tuple` type with the contents from `args`.
 */
export const createTuple = <T extends unknown[]>(args: [...T]): T => args;

// ---------------------------------------------------------------------- FIT STRING
/**
 * Ajusta un `string` a un tamaño determinado, ya sea abreviando alguna parte si se excede,
 * o agregando caracteres hasta que se complete dicho tamaño.
 * @param str Cadena de texto con la cual trabajar.
 * @param max Máximo de tamaño para ajustar, default `16`.
 * @param pos Alineación de hacia dónde ajustar o expandir (**izquierda**, **derecha** o al **medio**), default `0`.
 * @param grow Representa si debería de expandirse en caso de ser necesario, default `false`.
 * @param shortChar Representa el caracter con el cual abreviar, default `"..."`.
 * @param fillChar Representa el caracter con el cual rellenar, default `" "`.
 * @returns La cadena de texto correctamente ajustada, donde `str.length === max` (si se marca `grow`).
 */
export function fitString(
  str: string,
  max = 16,
  pos:
    | "left"
    | "right"
    | "middle"
    | -1
    | 0
    | 1
    | "start"
    | "end"
    | "center" = 0,
  grow?: boolean,
  shortChar = "...",
  fillChar = " "
) {
  let result = str;
  if (str.length > max) {
    const diff = max - shortChar.length;
    if (pos === "right" || pos === "end" || pos === 1) {
      result = str.substring(0, diff) + shortChar;
    } else if (pos === "left" || pos === "start" || pos === -1) {
      result = shortChar + str.substring(str.length - diff);
    } else {
      result =
        str.substring(0, diff / 2) +
        shortChar +
        str.substring(str.length - diff / 2);
    }
  } else if (grow) {
    if (pos === "right" || pos === "end" || pos === 1) {
      result = str.padEnd(max, fillChar);
    } else if (pos === "left" || pos === "start" || pos === -1) {
      result = str.padStart(max, fillChar);
    } else {
      result =
        str.substring(0, str.length / 2).padStart(max / 2, fillChar) +
        str.substring(str.length / 2).padEnd(max / 2, fillChar);
    }
  }

  return result;
}

// ---------------------------------------------------------------------- GET IMG SIZE
/**
 * Renders an image with an `HTMLImageElement` from the given url.
 * After the element loads, returns the `width` and `height`.
 * @param url Representing the `img.src`.
 * @returns An object with both `width` & `height` as numbers.
 */
export async function getImageSize(url: string) {
  return new Promise<{ width: number; height: number }>((r) => {
    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      r({
        width: img.width,
        height: img.height,
      });
    };
  });
}

// #endregion

// #region ##################################################################################### FORMAT & STYLE TEXT
// ---------------------------------------------------------------------- SEARCH ALL REGEXP
/**
 * Provides a `RegExp` to seach all coincidences of a specified `string`.
 *
 * To replace every entry use `$1$2$3X` where `X` represents the replacement.
 *
 * @param input The `string` to search for within the `RegExp`.
 * @returns The `RegExp` ready to use.
 */
export function searchAll(input: string): RegExp {
  if (input === "") input = " ";

  // Escape any REGEXP special character for integrity
  input = input.replace(REGEXPS._escapeRegExp, "\\$&");

  // Create the REGEXP
  // (?:([^\\])(?:X))|(?:([^\\]\\\\)(?:X))|(?:^X)|(?:^(\\\\)(?:X))
  return new RegExp(
    "(?:([^\\\\])(?:" +
      input +
      "))|(?:([^\\\\]\\\\\\\\)(?:" +
      input +
      "))|(?:^" +
      input +
      ")|(?:^(\\\\\\\\)(?:" +
      input +
      "))",
    "g"
  );
}

// ---------------------------------------------------------------------- ESCAPE CHARACTERS REGEXP
/**
 * Replaces every escaped character from a given `string`; this is, converts a `\*` into `*`.
 *
 * @param input The `string` to manipulate.
 * @returns A `string` sucessfully processed.
 */
export function escapeChars(input: string): string {
  return input.replace(REGEXPS._escapedCharacters, "$1");
}

// ---------------------------------------------------------------------- FORMAT TEXT
/**
 * Applies a format style to the `string` passed, removing every unnecesary (duplicated) whitespace chars.
 *
 * It also allows to add _'manual linebreaks'_ for better control of text.
 *
 * @param _text Text `string` to work with and apply formatting.
 * @param _newLine `string` representing a manual breakline. If an empty string is given `""` *it will add nothing*, `default: ";;"`.
 * @param _translate Translate text with `i18n` **(DEACTIVATED)**, `default: true`.
 * @returns A `string` with one space character between words, every linebreak (`\n`) removed and any manual one replaced.
 * @version 2.0
 */
export function formatText(
  _text: string,
  _newLine?: string,
  _translate?: boolean
): string {
  _newLine = _newLine ?? ";;";
  _translate = _translate ?? true;

  // Replace EVERY WHITESPACE CHARACTER with a single space " ".
  _text = _text.replace(REGEXPS._formatText, " ");

  if (_newLine === "") return _text;

  // (?: )*;;(?!\\)(?: )*
  const temp = new RegExp("(?: )*" + _newLine + "(?!\\\\)(?: )*", "g");

  // Replace EVERY NEWLINE STRING with a LINE BREAK character '\n'
  _text = _text.replace(temp, "\n");
  return _text;
}

// ---------------------------------------------------------------------- STYLE TEXT
/**
 * Proporciona los `props` para la función `styleText`
 */
export type styleTextOptions = {
  /**Texto con el cual trabajar*/
  _text: string;
  /**Todo el texto que esté envuelto en este `string` tendrá aspecto **BOLD**, `default: "*".`*/
  _boldWrap?: string;
  /**Todo el texto que esté envuelto en este `string` tendrá aspecto *ITALICS*, `default: "_".`*/
  _italicsWrap?: string;
  /**Todo el texto que esté envuelto en este `string` tendrá aspecto ~~CROSS~~, `default: "~".`*/
  _crossWrap?: string;
  /**Todo el texto que esté envuelto en este `string` será transparente al 50%, `default: "#".`*/
  _muteWrap?: string;
  /**Todo el texto que esté envuelto en este `string` estará subrayado, `default: "&".`*/
  _underlineWrap?: string;
  /**Todo el texto que esté envuelto en este `string` será de color `emphasis`, `default: "$".`*/
  _emphasisWrap?: string;
  /**Lista que contiene los colores con los cuales colorear el texto de `emphasis`, si hay más selectores en el texto que colores en esta lista, los colores comenzarán a ciclarse, `default: ["#1757cd"]`.*/
  _emphasisColors?: Array<string>;
  /**Todo el texto que esté envuelto en este `string` se convertirá en LINK (< a/>), `default: "="`.*/
  _linkWrap?: string;
  /**Lista que contiene las URLs para los links insertados mediante `linkWrap`, si hay más links en el texto que URLs en esta lista, las URLs comenzarán a ciclarse, `default: ["/"]`.*/
  _linkList?: Array<string>;
  /**Lista que contiene los estilos para los links insertados mediante `linkWrap`, puede ser texto para un `className` o directamente `CSSProperties`, si hay más links en el texto que estilos en esta lista, los estilos comenzarán a ciclarse, `default: "[{}]"`.*/
  _linkStyles?: Array<string | _CSSProperties>;
  /**Todo el texto que esté envuelto en este `string` tendrá tamaño de letra personalizado, `default: "^"`.*/
  _fontSizeWrap?: string;
  /**Lista que contiene los tamaños de letra para el texto seleccionado `fontSizeWrap`, si hay más selectores en el texto que tamaños de letra en esta lista, los tamaños comenzarán a ciclarse, `default: ["16px"]`.*/
  _fontSizeList?: Array<string | number>;
  /**Todo el texto que esté envuelto en este `string` tendrá estilo personalizado, `default: "@"`.*/
  _customWrap?: string;
  /**Lista que contiene los estilos personalizados para `customWrap`, puede ser texto para un `className` o directamente `CSSProperties`, si hay más selectores en el texto que estilos en esta lista, los estilos comenzarán a ciclarse, `default: [{}]`.*/
  _customStyles?: Array<string | _CSSProperties>;
  /**Integración con `formatText` para aplicar formato automáticamente, `default: true`.*/
  _formatText?: boolean;
  /**Integración con `formatText` para ingresar saltos de línea manuales, `default: ";;"`.*/
  _formatText_newLine?: string;
  /**Integración con `formatText` para traducir el texto con i18n **(DESACTIVADO)**, `default: true`.*/
  _formatText_translate?: boolean;
};

/**
 * Estiliza una cadena de texto convirtiéndola en `<span/>` con formato híbrido personalizado similar a `markdown` pero con más aditamientos.
 *
 * Permite agregar colores, links (`<a/>`), opacidad y hasta seleccionar fragmentos de texto con un estilo desde cero.
 *
 * @returns Un elemento `JSX` con el texto estilizado mediante `CSS`
 */
export function styleText(props: styleTextOptions) {
  const _formatText = props._formatText ?? true,
    _formatText_newLine = props._formatText_newLine ?? ";;",
    _formatText_translate = props._formatText_translate ?? true;

  if (_formatText) {
    props._text = formatText(
      props._text,
      _formatText_newLine,
      _formatText_translate
    );
  }

  const options: {
    [key: string]: string | (string | _CSSProperties)[] | (string | number)[];
  } = {
    boldWrap: props._boldWrap ?? "*",
    italicsWrap: props._italicsWrap ?? "_",
    crossWrap: props._crossWrap ?? "~",
    muteWrap: props._muteWrap ?? "#",
    underlineWrap: props._underlineWrap ?? "&",
    emphasisWrap: props._emphasisWrap ?? "$",
    emphasisColors: props._emphasisColors ?? ["#1757cd"],
    linkWrap: props._linkWrap ?? "=",
    linkList: props._linkList ?? ["/"],
    linkStyles: props._linkStyles ?? [{}],
    fontSizeWrap: props._fontSizeWrap ?? "^",
    fontSizeList: props._fontSizeList ?? ["16px"],
    customWrap: props._customWrap ?? "@",
    customStyles: props._customStyles ?? [{}],
  };

  const fields = [
    "bold",
    "italics",
    "cross",
    "mute",
    "underline",
    "emphasis",
    "link",
    "fontSize",
    "custom",
  ];

  const refill: {
    [key: string | number]: string[];
  } = {
    bold: ["<span style='font-weight: 700;'>", "</span>"],
    italics: ["<span style='font-style: italic;'>", "</span>"],
    cross: ["<span style='text-decoration: line-through;'>", "</span>"],
    mute: ["<span style='opacity: 40%;'>", "</span>"],
    underline: ["<span style='text-decoration: underline'>", "</span>"],

    emphasis: [`<span style='color: ${options.emphasisColors[0]}'>`, "</span>"],
    link: [`<a class='' href=''> `, "</a>"],
    fontSize: [`<span style=''>`, "</span>"],
    custom: [`<span style=''>`, `</span>`],
  };

  const regEx: {
    [key: string]: RegExp;
  } = {};

  for (let i = 0; i < fields.length; i++) {
    let temp = options[`${fields[i]}Wrap`]!;
    if (typeof temp !== "string") temp = "";
    temp = temp.replace(/./gim, "$&");

    try {
      regEx[fields[i]!] = new RegExp("(?<!\\\\)\\" + temp, "gim");
    } catch (e) {
      regEx[fields[i]!] = new RegExp("\\" + temp, "gim");
    }
  }

  const sections: {
    [key: string]: any;
  } = {};

  for (let i = 0; i < fields.length; i++) {
    sections[fields[i]!] = new Array<number>();
  }

  for (let i = 0; i < fields.length; i++) {
    while (true) {
      let match = regEx[fields[i]!]!.exec(props._text);
      if (match === null) break;

      sections[fields[i]!].push(match.index);
    }
  }

  const process = new Array<Array<string | number>>();

  for (let i = 0; i < fields.length; i++) {
    for (let j = 0; j < sections[fields[i]!].length; j += 2) {
      const pos1 = sections[fields[i]!][j];
      const pos2 = sections[fields[i]!][j + 1];

      if (pos2 !== undefined) {
        process[pos1] = [`${fields[i]}`, 0];
        process[pos2] = [`${fields[i]}`, 1];
      }
    }
  }

  let newText = "";
  let prevCut = 0;

  let lastColor = 0;

  let lastLink = 0;
  let lastLinkStyle = 0;

  let lastFontSize = 0;

  let lastCustomStyle = 0;

  for (let i = 0; i < process.length; i++) {
    if (process[i] !== undefined) {
      if (process[i][0] === "emphasis" && process[i][1] === 0) {
        newText +=
          props._text.slice(prevCut, i) +
          `<span style='color: ${options.emphasisColors[lastColor]}'>`;

        if (options.emphasisColors![lastColor + 1] !== undefined) lastColor++;
      } else if (process[i][0] === "link" && process[i][1] === 0) {
        let newLinkClass = "";
        let newLinkStyle = "";
        let nl = options.linkStyles![lastLinkStyle];

        if (typeof nl === "string") {
          newLinkClass = nl;
        } else if (typeof nl !== "number") {
          newLinkStyle = parseCSS(nl);
        }

        newText +=
          props._text.slice(prevCut, i) +
          `<a class='${newLinkClass}' href=${
            options.linkList![lastLink]
          } style='${newLinkStyle}'>`;

        if (options.linkList![lastLink + 1] !== undefined) lastLink++;
        if (options.linkStyles![lastLinkStyle + 1] !== undefined)
          lastLinkStyle++;
      } else if (process[i][0] === "fontSize" && process[i][1] === 0) {
        let newFontSize = "";
        let fs = options.fontSizeList![lastFontSize];

        if (typeof fs === "string") {
          newFontSize = fs;
        } else if (typeof fs === "number") {
          newFontSize = `${fs}px`;
        }

        newText +=
          props._text.slice(prevCut, i) +
          `<span style='font-size: ${newFontSize}'>`;

        if (options.fontSizeList![lastFontSize + 1] !== undefined)
          lastFontSize++;
      } else if (process[i][0] === "custom" && process[i][1] === 0) {
        let customClass = "";
        let customStyle = "";

        let cc = options.customStyles![lastCustomStyle];
        if (typeof cc === "string") {
          customClass = cc;
        } else if (typeof cc !== "number") {
          customStyle = parseCSS(cc);
        }

        newText +=
          props._text.slice(prevCut, i) +
          `<span className='${customClass}' style='${customStyle}'>`;

        if (options.customStyles![lastCustomStyle + 1] !== undefined)
          lastCustomStyle++;
      } else {
        let temp2 = process[i]![1]!;
        if (typeof temp2 !== "number") temp2 = 0;

        newText +=
          props._text.slice(prevCut, i) +
          refill[process[i]![0]!.toString()]![temp2];
      }
      prevCut = i + 1;
    }
  }
  newText += props._text.slice(prevCut);

  return <span dangerouslySetInnerHTML={{ __html: newText }} />;
}
// #endregion

// #region ##################################################################################### PARSERS
// ---------------------------------------------------------------------- PARSE ID
/**
 * Parses any given `string` to match an alphanumeric type ID, replacing any other char
 * with a hyphen `-` and removes punctuation marks from `Á É Í Ó Ú á é í ó ú Ä Ë Ï Ö Ü ä ë ï ö ü Ý ý ÿ` etc.
 *
 * @param val `string` to transform.
 * @param {boolean} hyphen Whether or not to replace every white space with hyphens. `from this`, `to-this`, default: `false`.
 * @returns Transformed `string`.
 */
export function parseID(val: string, hyphen: boolean = false): string {
  // const rr = /[\u0300-\u036f]/g;
  const a = val
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(REGEXPS._removeAccents, "");

  return hyphen ? a.replace(/[\s\W_]+/gim, "-") : a;
}

// ---------------------------------------------------------------------- PARSE PRICE
/**
 * Parses any given `number` to match an price-based formatting, including `$` at start
 * and a `,` for separation every thousand.
 *
 * @param number `number` to format, it can be a `string` too.
 * @param showDollar Whether or not show a `$` at the start of the number.
 * @param decimalMax Specify the maximum number of decimals shown, limiting the length.
 * @param decimalMin Specify the minimum number of decimals shown, autofilled with `0`.
 * @returns Transformed `string` with formatting, or the same `string` if it does not holds a number.
 */
export function parsePrice(
  number: string | number,
  showDollar: boolean = true,
  decimalMax: number = 0,
  decimalMin: number = 0
): string {
  let temp: string | number = parseNumber(number, true);
  let decimal = temp.toString().replace(/([0-9]*\.*)^([0-9])+/gim, "");
  let dummy = "";
  while (dummy.length < decimalMin) dummy += "0";
  decimal = decimal.slice(1, decimalMax + 1);
  decimal += dummy.slice(decimal.length);

  temp = Number.parseInt(temp.toString()).toString();
  let aux = temp;
  for (let i = temp.length - 4; i >= 0; i -= 3) {
    aux = aux.slice(0, i + 1) + "," + aux.slice(i + 1);
  }

  temp =
    (showDollar ? "$" : "") + aux + (decimal.length === 0 ? "" : "." + decimal);

  return temp;
}

// ---------------------------------------------------------------------- PARSE NUMBER
/**
 * Extended version of `Number.parseInt` & `Number.parseFloat`, it accepts any kind of `string` and does
 * not returns `NaN`, in that case returns `0`.
 *
 * @param str String to parse.
 * @param decimal Whether to use `parseFloat` or `parseInt`, defaults to `false`.
 * @returns A number correctly parsed, or a default `0` if it catches a `NaN`.
 */
export function parseNumber(
  str: string | number,
  decimal: boolean = false
): number {
  if (typeof str === "number") return str;
  const neg = /^[^\d]*-.*\d/.test(str) ? -1 : 1;
  str = str.replace(/[^0-9.]+/gim, "");
  if (decimal) return Number.parseFloat(str || "0") * neg;
  else return Number.parseInt(str || "0") * neg;
}

// ---------------------------------------------------------------------- PARSE CSS
/**
 * Converts an `CSSProperties` object into `string` with correct CSS' sintax,
 * this can be inserted direclty to the `css` function from `styled-components`.
 *
 * @param JS `CSSProperties` object to convert into `string`.
 * @returns parsed `string` with CSS' sintax.
 */
export const parseCSS = (JS?: _CSSProperties) => {
  if (JS === undefined) return "";
  let cssString = "";

  for (const objectKey in JS) {
    cssString +=
      objectKey.replace(/([A-Z])/g, (g) => `-${g[0]?.toLowerCase()}`) +
      ": " +
      JS[objectKey] +
      ";\n";
  }

  return cssString;
};

// ---------------------------------------------------------------------- PARSE DATE
/**
 * Muestra una fecha con formato `"día del mes del año"`.
 *
 * @param date Ya sea tipo `Date` o un ISO string.
 * @param wDay Incluir el día en el resultado, default `true`.
 * @param wYear Incluir el año en el resultado, default `true`.
 */
export function parseDate(date: string | Date, wDay = true, wYear = true) {
  const tt = new Date(date);
  const dd = tt.getDate();
  const mm = MONTHS[tt.getMonth()];
  const yy = tt.getFullYear();

  let res = wDay ? dd + " de " + mm : mm;
  if (wYear) res += " del " + yy;

  return res;
}

// ---------------------------------------------------------------------- INTO INPUT DATE
/**
 * Pasamos de un formato `Date` o un ISO string normal, a algo que entienda el `input[type="date"]`.
 *
 * Cuando creamos un `Date` se crea en tiempo ISO, pero después se "traduce" al tiempo local.
 * Un `input[type="date"]` **SIEMPRE** trabaja con ISO, lo que es un problema porque nosotros lo manipulamos
 * como si fuera el tiempo local.
 *
 * @param date Una fecha real la cual meter al input.
 */
export function intoInputDate(date: string | Date) {
  const tt = new Date(date);
  const dd = tt.getDate().toString();
  const mm = (tt.getMonth() + 1).toString();
  const yy = tt.getFullYear().toString();

  const st =
    yy.padStart(4, "0") + "-" + mm.padStart(2, "0") + "-" + dd.padStart(2, "0");
  return st;
}

// ---------------------------------------------------------------------- FROM INPUT DATE
/**
 * Método opuesto al `intoInputDate`, siendo que este revierte los cambios.
 *
 * Cuando un `input[type="date"]` cambia de valor, te regresa un string como "yyyy-MM-dd"
 * según la fecha que le colocaste, pero esa fecha está en tiempo local (porque
 * tú mismo la seleccionaste pensando en tu tiempo local), entonces, si lo conviertes
 * de regreso a ISO, el tiempo local se va a alterar hacia delante o hacia atrás.
 *
 * @param date `string` directamente sacado como value del input.
 */
export function fromInputDate(date: string) {
  const yy = parseNumber(date.substring(0, 4));
  const mm = parseNumber(date.substring(5, 7)) - 1;
  const dd = parseNumber(date.substring(8, 10));

  const dt = new Date(yy, mm, dd);
  dt.setFullYear(yy);
  return dt;
}

// ---------------------------------------------------------------------- AS TYPE
/**
 * Trick `typescript` into *'misinterpreting'* a variable's type as another type passed.
 *
 * ***WARNING:*** as stated, this could lead to *accidental-intentional* errors in runtime, but it also
 * serves like a *'typescript disable'* in certain specific cases.
 *
 * @param val Any variable to misinterpretate, the value will stay the same.
 * @param T `Type` parameter to which trick typescript into.
 * @returns The same value passed in `val` but interpreted like the new `Type`.
 */
export function asType<T extends any>(val: any): T {
  let temp: T = val;
  return temp;
}

// ---------------------------------------------------------------------- PARSE DATA SIZE
/**
 * The `returnFileSize()` function takes a number (of bytes, eg. taken from the current file's size property),
 * and turns it into a nicely formatted size in bytes/KB/MB.
 *
 * Taken from MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#examples
 * @param number Number of bytes.
 * @returns Formatted size in bytes/KB/MB.
 */
export function parseDataSize(number: number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

// ---------------------------------------------------------------------- PARSE FILE DATA
/**
 * Manipula cierta información los strings para trabajar con URLs de los archivos. Por ejemplo, permite
 * extraer el nombre de un archivo de Firebase Cloud Storage separado por ";;".
 *
 * @param str String para trabajar, puede ser el `File.name`;
 * @param type Tipo de acción a realizar, si manipular el nombre o la extensión.
 * @param remove En caso de extraer u omitir el nombre o extensión.
 */
export function parseFileData(
  str: string,
  type: "before" | "full" | "name" | "extension" | "random" | "after",
  encoded?: boolean
) {
  if (encoded) {
    str = decodeURI(str.replace(/%2F/gim, "/").replace(/%3B/gim, ";"));
  }

  const match = REGEXPS._parseFileData.exec(str);
  if (!match) return str;
  const data = {
    before: str.substring(0, match.index),
    full: match[0],
    name: match[1],
    random: match[2],
    extension: match[3],
    after: str.substring(match[0].length + match.index),
  };

  return data[type] || str;
}
// #endregion

// #region ##################################################################################### PROCESSORS
// ---------------------------------------------------------------------- MAP OBJECT
/**
 * Calls the defined `callback` with each property from the given `object` and returns
 * another object with identical properties but holding the return value from the `callback`.
 *
 * Similar to `Array.map` but with an object.
 *
 * @param object Object to operate with.
 * @param callback Callback to apply to each property value from the given object.
 * @returns An `object` with the same properties as the given object but containing
 * the return value of the callback applied with it.
 */
export function mapObject<T, K>(
  object: T,
  callback: (property: string, index: number, obj: typeof object) => K
) {
  let temp = {} as { [Property in keyof T]: K };

  let i: number = 0;
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      temp[key] = callback(key, i, object);
    }
    ++i;
  }

  return temp;
}

// ---------------------------------------------------------------------- HANDLE ERROR
/**
 * Auto-error handler, prints to the console any error passed. Also shows an `window.alert`
 * for user interpretation.
 *
 * @param error Any object containing error data.
 * @param params Which params interpretate in console.
 * @param loc `string` telling at which point the error ocurred (for user interpretation).
 * @param alert Whether or not to show the `window.alert`.
 */
export function handleError(
  error: any,
  params: string | Array<string> = "",
  loc: string = "",
  alert: boolean = true
) {
  if (alert) window.alert("Something went wrong... " + loc);
  if (params !== "") {
    if (typeof params === "string") {
      console.log(error?.[params]);
    } else {
      params.forEach((key) => console.log(key, error?.[params[key]]));
    }
  } else console.log(error);
}

// ---------------------------------------------------------------------- USER SESSION
/**
 * Administra la sesion de usuario, ya sea guardándola en `sessionStorage` o extrayéndola desde ahí.
 *
 * @param param Datos a almacenar, en caso de que no exista (`undefined`), entonces buscará por datos guardados.
 * @returns Un objeto con forma de `param` cuando busca info, y no regresa nada cuando agrega info.
 */
export function userSession(
  param?: { user: string; email: string; pass: string },
  clear?: true
) {
  if (clear) {
    sessionStorage.removeItem("userSession");
    return;
  }

  try {
    if (!param) {
      // Get session
      const i = sessionStorage.getItem("userSession");
      if (i) param = JSON.parse(cipher(i, true));
    } else {
      // Set session
      sessionStorage.setItem("userSession", cipher(JSON.stringify(param)));
    }
  } catch (err) {
    console.error(new Error("User Session Not Found"));
  }
  return param;
}

// ---------------------------------------------------------------------- CIPHER
/**
 * Ciphers any given string for a *slighty* misunderstanding of it.
 *
 * This is not 100% un breakable, but is secure enough of small and really non important data.
 *
 * @param val Value to work with.
 * @param reverse To cipher or de-cipher, defaults to `false` (to cipher).
 * @returns {string} A correctly ciphered or de-ciphered `string`.
 */
export function cipher(val: string, reverse: boolean = false): string {
  let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (reverse) {
    let rev = "";
    for (let i = 0; i < alpha.length; i++) rev = alpha[i] + rev;
    alpha = rev;
  }

  const regex = /[a-z]/gim;
  let prevIndex = 0;
  let output = "";
  let num = 0;

  for (let match = regex.exec(val); match !== null; match = regex.exec(val)) {
    let i = alpha.indexOf(match[0]);
    output +=
      val.slice(prevIndex, match.index) +
      alpha.charAt((i + num) % alpha.length);

    prevIndex = match.index + 1;
    num++;
  }

  output += val.slice(prevIndex);
  return output;
}

// ---------------------------------------------------------------------- RANDOM NAME GENERATOR - TEMPORAL
/**
 * Crea nombres de persona al azar, con dos nombres y dos apellidos.
 *
 * Si se marca el `id`, entonces regresa caracteres random.
 *
 * @param id Si se activa, regresa caracteres random como si de un ID de `firebase` se tratase.
 * @returns Un string con un nombre o id random.
 */
export function randomName(type?: "m" | "f" | "id"): string {
  let res: string = "";
  if (type === "id") {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 16; i++) {
      if (randomRange(0, 1)) res += randomRange(0, 9);
      else if (randomRange(0, 1)) res += alpha[randomRange(0, 25)];
      else res += alpha[randomRange(0, 25)].toLowerCase();
    }

    return res;
  }

  if (!type) type = (randomRange(0, 1) && "m") || "f";

  if (type === "m") {
    res += male[randomRange(0, male.length - 1)];
    if (!res.includes(" ") && randomRange(0, 1))
      res += " " + male[randomRange(0, male.length - 1)];
  } else {
    res += female[randomRange(0, female.length - 1)];
    if (!res.includes(" ") && randomRange(0, 1))
      res += " " + female[randomRange(0, female.length - 1)];
  }

  res +=
    " " +
    last[randomRange(0, last.length - 1)] +
    " " +
    last[randomRange(0, last.length - 1)];

  return res;
}

// ---------------------------------------------------------------------- HANDLE KEYDOWN
/**
 * Función que maneja los focus de los elementos tipo Input, TextArea, Select o Button cuando pulsamos
 * la tecla 'Enter' en algún campo de texto (como si pulsáramos TAB para dirigirnos al siguiente campo).
 *
 * Funciona con `queryselector` y no es un método muy _React_ de hacer las cosas.
 * Para que funcione con los TextArea, es necesario pulsar CTRL + ENTER, de lo contrario se aplicará un '\n'.
 *
 * @param e El evento de onKeyDown, esta función se pasa directamente como: `onkeydown={handleKeyDown}`.
 */
export function handleKeyDown(e: any) {
  // NO ENTER o SI ENTER sin CTRL + NO INPUT
  if (e.key !== "Enter" || (e.currentTarget.nodeName !== "INPUT" && !e.ctrlKey))
    return;

  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;

  // SALTAR AL SIGUIENTE ELEMENTO
  let el: any = e.currentTarget;

  while (el && el.nodeName !== "FORM") {
    if (!el.nextElementSibling) {
      el = el.parentElement;
      continue;
    }

    el = el.nextElementSibling;
    if (
      !el.disabled &&
      (el.type === "submit" ||
        el.nodeName === "INPUT" ||
        el.nodeName === "SELECT" ||
        el.nodeName === "TEXTAREA")
    ) {
      el.focus?.();
      break;
    }

    const next: any = el.querySelector(
      "input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button[type='submit']"
    );
    if (next) {
      next.focus?.();
      break;
    }
  }
}

// ---------------------------------------------------------------------- TIME BETWEEN
/**
 * Gets the time between two given dates, in every single time unit.
 *
 * @param goal Goal date to calc the time.
 * @param from Initial date, defaults to `Date.now()`.
 * @returns Object containing every unit with its corresponding value associated.
 */
export function timeBetween(goal: Date, from?: Date) {
  type timeObj = {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    date: number;
    month: number;
    fullYear: number;
    rawDays: number;
  };

  from = from || new Date();

  if (from > goal) {
    const c = from;
    from = goal;
    goal = c;
  }

  let leftOver = 0;
  let current = 0;
  const absoluteDiff = goal.getTime() - from.getTime();
  const timeDiff = {
    rawDays: Math.floor(absoluteDiff / (24000 * 3600)),
  };

  const tags: [string, number][] = [
    ["milliseconds", 1000],
    ["seconds", 60],
    ["minutes", 60],
    ["hours", 24],
    ["date", 30],
    ["month", 12],
    ["fullYear", 1],
  ];

  // ############################################ START CYCLE
  for (const tag of tags) {
    const [name, unit] = tag;
    const fn = `UTC${name[0].toUpperCase()}${name.substring(1)}`;

    // ignore months leftovers
    if (name === "month") {
      goal.setUTCDate(1);
      from.setUTCDate(1);
    }

    // adapt leftover
    if ((name === "date" || name === "month") && leftOver) {
      goal[`set${fn}`](goal[`get${fn}`]() - 1);
      leftOver = 0;
    }

    // calc
    current = goal[`get${fn}`]() - from[`get${fn}`]() - leftOver;
    leftOver = 0;

    // check leftover
    if (current < 0) {
      leftOver = 1;

      if (name === "date") {
        const ff = new Date(from);
        ff.setUTCDate(1);
        ff.setUTCMonth(ff.getUTCMonth() + 1);
        ff.setUTCDate(ff.getUTCDate() - 1);
        current = ff.getUTCDate() - from.getUTCDate();
        current += goal.getUTCDate();
      } else current = unit + current;
    }

    timeDiff[name] = current; // SAVE
  }

  return timeDiff as timeObj;
}

// #endregion

// #region ##################################################################################### HOOKS
// ---------------------------------------------------------------------- WINDOW SCROLL
/**
 * Hook que reacciona al scroll vertical de la pantalla, de forma similar a como lo hace el componente `Header`.
 *
 * @param threshold Marca el límite para el scroll vertical, `default: 100`.
 * @returns `true` cuando se hace scroll vartical pasado el punto de `threshold`, `false` cuando no.
 */
export const useWindowScroll = (threshold: number = 100) => {
  const [scrolled, setScrolled] = useState(false);

  const changeScroll = useCallback(() => {
    if (window.scrollY > threshold) setScrolled(true);
    else setScrolled(false);
  }, [threshold]);

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
    return () => document.removeEventListener("scroll", changeScroll);
  }, [changeScroll]);

  return scrolled;
};

// ---------------------------------------------------------------------- ON SCREEN
/**
 * Hook para conocer si un elemento está a la vista (en pantalla).
 *
 * @param ref referencia hacia el elemento al cual observar.
 * @returns `true` si el elemento se encuentra dentro de la pantalla, `false` si no lo está.
 */
export function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

// ---------------------------------------------------------------------- SCROLL TO TOP
/**
 * Scrolls the window all the way to the top when rendering.
 *
 * Use this as `<ScrollToTopOnMount/>`.
 */
export function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

// ---------------------------------------------------------------------- USE REFRESH
/**
 * Hook para forzar "reloads" en algún componente.
 *
 * Para remontar un componente completo se usa `volkey` como `key`.
 * (Porque en react los componentes se re-ejecutan o re-montan cuando su llave cambia).
 *
 * @returns Una función que cuando se ejecuta, se refresca el componente.
 */
export function useRefresh(): [() => void, number] {
  const [volkey, sv] = useState(0);
  return [() => sv((p) => p + 1), volkey];
}

// ---------------------------------------------------------------------- USE IS FIRST RENDER
/**
 * Hook para saber si estamos en el primer render o no, para así evitar acciones o permitir otras.
 *
 * @returns `boolean` sobre si estamos en el primer render o no.
 */
export const useIsFirstRender = () => {
  const ifrRef = useRef(true);
  useEffect(() => {
    ifrRef.current = false;
  }, []);
  return ifrRef.current;
};

// ---------------------------------------------------------------------- USE REF CALLBACK
type cleanUp = (prev: HTMLElement) => void | Promise<void>;
/**
 * Simulate a `useEffect` but with a ref element. That is, every time `ref.current` changes
 * the callbacks get executed.
 *
 * Cheers to: https://gist.github.com/thebuilder/fb07c989093d4a82811625de361884e7.
 *
 * @param onMount Callback to execute every time the `ref.current` points to a new element.
 * @param cleanUp Similar to `onMount`, but executes *with* the previous element as to clean up.
 * @param onNull Executes every time the element unmounts, after the `cleanUp` function.
 * @returns `ref function` to insert as a `ref` parameter of any HTMLElement.
 */
export function useRefCallback(
  onMount?: (el: HTMLElement) => void | cleanUp | Promise<void | cleanUp>,
  onNull?: () => void | Promise<void>
) {
  const ref = useRef<null | HTMLElement>(null);
  const [LS] = useState<{ fn: cleanUp | void }>({ fn: undefined });

  const setRef = useCallback(
    async (node: null | HTMLElement) => {
      if (ref.current) await LS.fn?.(ref.current);

      if (node) LS.fn = await onMount?.(node);
      else await onNull?.();

      // Save a reference to the node
      ref.current = node;
    },
    [LS, onMount, onNull]
  );

  return setRef;
}
// #endregion

// #region ##################################################################################### CONSTANTS
// ---------------------------------------------------------------------- REGEXPS
/**
 * Grupo de **Expresiones Regulares** muy utilizadas a lo largo de las funciones y del proyecto.
 *
 * Solo se incluyen aquellas expresiones que sean lo suficientemente complejas como para que valga
 * la pena guardarse por separado, mínimamente para ahorrar espacio.
 *
 * Se usan mayormente dentro de algunas funciones, pero pueden usarse individualmente en la app.
 */
export const REGEXPS = {
  /** Busca espacios en blanco y cosas, se usa con ayuda de `formatText`. */
  _formatText: /(?:[\n\t\r\s]{2,})|(?:[\n\t\r])/g,
  /** Busca caracteres escapados, se usa con ayuda de `escapeChars`. */
  _escapedCharacters: /\\([\s\S])/g,
  /** Busca caracteres especiales de RegExp, se usa con ayuda de `searchAll`. */
  _escapeRegExp: /[+*?^$.[\]{}()|/-]/gim,
  /** Busca e identifica propiedades dentro de `styleText`. */
  _getProperties: /((?:[\S].*?)+?)(?::(?:({[^}]+})|([^,\n\t]+)))?(?:[,\n]|$)/g,
  /** Quita todos los acentos de las letras, se usa con ayuda de `parseID`. */
  _removeAccents: /[\u0300-\u036f]/g,
  /** Busca todos los emails dentro de un string. */
  _email: /[\w-.]+@(?:[\w-]+\.)+[\w-]{2,4}/gm,
  /** Para usarse con la función `parseFileData`. */
  _parseFileData: /(?!\/)([^/]+);;([\w-]+)\.([\w]+)(?:(?=\?)|$)/,
};

// ---------------------------------------------------------------------- MONTHS
/**
 * Lista con los meses del año, se usa para `parseDate`.
 */
export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// ---------------------------------------------------------------------- TRANSLATE
/**
 * Objeto para traducir palabras y expresiones en inglés al español.
 * Como por ejemplo decir "usuarios" en lugar de "users".
 */
export const TRANSLATE = {
  file: "Archivo",
  files: "Archivos",
  user: "Usuario",
  users: "Usuarios",
  study: "Análisis",
  studies: "Análisis",
  employee: "Empleado",
  employees: "Empleados",
  create: "Crear",
  delete: "Eliminar",
  update: "Modificar",
};

// ---------------------------------------------------------------------- FILE TYPES
/**
 * Representa una lista de tipos de archivos aceptados para subir análisis a la base de datos.
 *
 * Se incluyen formatos de imagen estándar al igual que PDF.
 */
export const FILE_TYPES = [
  // "image/apng",
  // "image/bmp",
  // "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  // "image/tiff",
  "image/webp",
  // "image/x-icon",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
// #endregion

// #region ##################################################################################### XD INFO - TEMPORAL
/**
 * Los 250 nombres de hombre más usados en España. Se supone que están colocados por popularidad.
 *
 * Para utilizarse exclusivamente en `randomName`.
 */
const male = [
  "José",
  "Juan",
  "Luis",
  "Manuel",
  "Antonio",
  "Jesús",
  "Carlos",
  "Francisco",
  "Alberto",
  "Jorge",
  "Miguel",
  "Ángel",
  "Javier",
  "Alejandro",
  "Enrique",
  "Víctor",
  "Arturo",
  "Cesar",
  "Fernando",
  "Pedro",
  "Martin",
  "Roberto",
  "Eduardo",
  "Mario",
  "Armando",
  "Sergio",
  "Raúl",
  "Alfredo",
  "Rafael",
  "Ricardo",
  "Héctor",
  "Oscar",
  "Gerardo",
  "David",
  "Daniel",
  "Hugo",
  "Jaime",
  "Julio",
  "Rubén",
  "Ramon",
  "Marco",
  "Gabriel",
  "Edgar",
  "Guadalupe",
  "Alfonso",
  "Guillermo",
  "Salvador",
  "Omar",
  "Iván",
  "Humberto",
  "Felipe",
  "Ernesto",
  "Pablo",
  "Ignacio",
  "Gustavo",
  "Andrés",
  "Adrián",
  "Joel",
  "Agustín",
  "Rodolfo",
  "Gilberto",
  "Rogelio",
  "Rene",
  "Tomas",
  "Saul",
  "Israel",
  "Octavio",
  "Vicente",
  "Noe",
  "Gregorio",
  "Ismael",
  "Nicolas",
  "Benjamín",
  "Moisés",
  "Santiago",
  "Efraín",
  "Alonso",
  "Abel",
  "José de Jesús",
  "Álvaro",
  "Félix",
  "Marcos",
  "Adolfo",
  "Rodrigo",
  "Ramiro",
  "Samuel",
  "Joaquín",
  "Abraham",
  "Esteban",
  "Ulises",
  "Raymundo",
  "Fidel",
  "Lorenzo",
  "German",
  "Mauricio",
  "Leonardo",
  "Josué",
  "Emmanuel",
  "Julián",
  "Santos",
  "Román",
  "Cruz",
  "Domingo",
  "Bernardo",
  "Emilio",
  "Isidro",
  "Felipe de Jesús",
  "Aurelio",
  "Diego",
  "Federico",
  "Gonzalo",
  "Rigoberto",
  "Benito",
  "Maria",
  "Isaac",
  "Adan",
  "Genaro",
  "Elías",
  "Aaron",
  "Orlando",
  "Leonel",
  "Efrén",
  "Isaías",
  "Heriberto",
  "Rolando",
  "Horacio",
  "Fabian",
  "Reynaldo",
  "Eugenio",
  "Trinidad",
  "Marcelino",
  "Uriel",
  "Augusto",
  "Eleazar",
  "Edmundo",
  "Erick",
  "Erik",
  "Ezequiel",
  "Reyes",
  "Fermín",
  "Christian",
  "Margarito",
  "Néstor",
  "Valentín",
  "Leopoldo",
  "Eloy",
  "Cuauhtémoc",
  "Everardo",
  "Arnulfo",
  "Lucio",
  "Ariel",
  "Darío",
  "Delfino",
  "Florencio",
  "Eusebio",
  "Faustino",
  "Eliseo",
  "Oswaldo",
  "Amado",
  "Leobardo",
  "Artemio",
  "Misael",
  "Norberto",
  "Manuel de Jesús",
  "Adalberto",
  "Mariano",
  "Hilario",
  "Cristóbal",
  "Filiberto",
  "Salomón",
  "Noel",
  "Aldo",
  "Lázaro",
  "Pascual",
  "Mauro",
  "Edgardo",
  "Marcelo",
  "Fausto",
  "Homero",
  "Jonathan",
  "Eric",
  "Carmen",
  "Simón",
  "Vladimir",
  "Abelardo",
  "Erasmo",
  "Clemente",
  "Sebastián",
  "Maximino",
  "Osvaldo",
  "Porfirio",
  "Feliciano",
  "Isabel",
  "Florentino",
  "Claudio",
  "Silvestre",
  "Hipólito",
  "Jacinto",
  "Luciano",
  "Demetrio",
  "Apolinar",
  "Justino",
  "Cristian",
  "Juan de dios",
  "Cirilo",
  "Rey",
  "Alan",
  "Ubaldo",
  "Baltazar",
  "Damián",
  "Hernán",
  "Modesto",
  "Anselmo",
  "Fredy",
  "Cándido",
  "Gildardo",
  "Constantino",
  "Rosario",
  "Bernabé",
  "Gabino",
  "Cecilio",
  "Refugio",
  "Candelario",
  "Edwin",
  "Rosendo",
  "Gamaliel",
  "Roger",
  "Evaristo",
  "Mateo",
  "Virgilio",
  "Eligio",
  "Lenin",
  "Emiliano",
  "Patricio",
  "Aureliano",
  "Juventino",
  "Teodoro",
  "Concepción",
  "Jerónimo",
  "Jacobo",
  "Aristeo",
  "Rosalio",
  "Dagoberto",
  "Milton",
  "Arnoldo",
  "Sabino",
  "Wilbert",
  "Bernardino",
  "Maximo",
  "Fortino",
];

/**
 * Los 250 nombres de mujer más usados en España. Se supone que están colocados por popularidad.
 *
 * Para utilizarse exclusivamente en `randomName`.
 */
const female = [
  "María",
  "Guadalupe",
  "Rosa",
  "Martha",
  "Ana",
  "Patricia",
  "Leticia",
  "Elena",
  "Laura",
  "Elizabeth",
  "Isabel",
  "Alicia",
  "Margarita",
  "Luz",
  "Angelica",
  "Claudia",
  "Silvia",
  "Norma",
  "Juana",
  "Gabriela",
  "Adriana",
  "Verónica",
  "Teresa",
  "Alejandra",
  "Alma",
  "Beatriz",
  "María del Carmen",
  "Yolanda",
  "Blanca",
  "Sandra",
  "Araceli",
  "Irma",
  "Gloria",
  "Carmen",
  "Luisa",
  "Rocío",
  "Concepción",
  "Cristina",
  "Edith",
  "Esther",
  "Lilia",
  "Lorena",
  "Magdalena",
  "Cecilia",
  "Josefina",
  "Dolores",
  "Karina",
  "Lucia",
  "Estela",
  "Susana",
  "Maribel",
  "María de los Ángeles",
  "Lourdes",
  "Erika",
  "Mónica",
  "María del Rosario",
  "Diana",
  "Eugenia",
  "María de Lourdes",
  "María de Jesús",
  "Francisca",
  "Virginia",
  "Liliana",
  "Graciela",
  "Bertha",
  "Olga",
  "Miriam",
  "Fabiola",
  "Delia",
  "Carolina",
  "Karla",
  "Hilda",
  "Antonia",
  "Maricela",
  "Sonia",
  "Nancy",
  "Berenice",
  "Yadira",
  "Mayra",
  "Judith",
  "Marisol",
  "Rosario",
  "Reyna",
  "Aurora",
  "Olivia",
  "Raquel",
  "Irene",
  "Elvira",
  "Catalina",
  "Lidia",
  "Victoria",
  "Dulce",
  "Isela",
  "Sara",
  "Marcela",
  "Elvia",
  "Esperanza",
  "Guillermina",
  "Dora",
  "Eva",
  "Julia",
  "Elsa",
  "Esmeralda",
  "Brenda",
  "Socorro",
  "Georgina",
  "Mercedes",
  "Sofia",
  "Noemi",
  "Celia",
  "María del Socorro",
  "María de la Luz",
  "Minerva",
  "Nora",
  "Griselda",
  "Elia",
  "Rosalba",
  "Imelda",
  "Ivonne",
  "Marina",
  "Ruth",
  "Lizbeth",
  "Mireya",
  "Soledad",
  "Clara",
  "Ofelia",
  "Inés",
  "Aida",
  "Xóchitl",
  "Rebeca",
  "Elisa",
  "Mirna",
  "Cruz",
  "Jesús",
  "Lizeth",
  "Perla",
  "Yazmina",
  "Julieta",
  "Angela",
  "Elva",
  "Flor",
  "Azucena",
  "Selene",
  "María del Rocío",
  "Emma",
  "Adela",
  "Yesenia",
  "María del pilar",
  "Andrea",
  "Mariana",
  "Rosalía",
  "Jazmín",
  "Ángeles",
  "Paola",
  "Nohemí",
  "Natividad",
  "Marisela",
  "Trinidad",
  "Nelly",
  "Teresa de Jesús",
  "Leonor",
  "Consuelo",
  "Amparo",
  "Paula",
  "Anabel",
  "Alba",
  "Jessica",
  "Martina",
  "Marlene",
  "Tania",
  "Petra",
  "Lucila",
  "Janet",
  "Candelaria",
  "Amalia",
  "Vanessa",
  "Eloísa",
  "Nadia",
  "Hortensia",
  "Nayeli",
  "Evangelina",
  "Oralia",
  "Dalia",
  "Antonieta",
  "Janeth",
  "Hermelinda",
  "Emilia",
  "Angelina",
  "Karen",
  "Micaela",
  "Aracely",
  "Evelia",
  "María del refugio",
  "Abigail",
  "Amelia",
  "Lucero",
  "Rubí",
  "Ivette",
  "Rita",
  "Elda",
  "Iris",
  "Matilde",
  "Idalia",
  "Areli",
  "Violeta",
  "Ramona",
  "Manuela",
  "Cynthia",
  "Itzel",
  "Viridiana",
  "Enriqueta",
  "Daniela",
  "Gisela",
  "América",
  "Edna",
  "Paulina",
  "Elba",
  "Rosalinda",
  "Aidé",
  "Nidia",
  "Asunción",
  "Monserrat",
  "Maritza",
  "Gladys",
  "Natalia",
  "Eréndira",
  "Marta",
  "Ernestina",
  "Estela",
  "Rosaura",
  "Tomasa",
  "Wendy",
  "Fatima",
  "Arely",
  "Mariela",
  "Nallely",
  "Iliana",
  "Genoveva",
  "Enedina",
  "Santa",
  "Herlinda",
  "Teresita",
  "Aurelia",
  "Denisse",
  "Anel",
  "Pilar",
  "Alejandrina",
  "Agustina",
  "Lucina",
  "Yanet",
];

/**
 * Los 500 apellidos más usados en España. Se supone que están colocados por popularidad.
 *
 * Para utilizarse exclusivamente en `randomName`.
 */
const last = [
  "Hernández",
  "García",
  "Martínez",
  "López",
  "González",
  "Rodríguez",
  "Pérez",
  "Sánchez",
  "Ramírez",
  "Flores",
  "Cruz",
  "Gómez",
  "Morales",
  "Vásquez",
  "Jiménez",
  "Reyes",
  "Diaz",
  "Torres",
  "Gutierrez",
  "Ruiz",
  "Aguilar",
  "Mendoza",
  "Castillo",
  "Ortiz",
  "Moreno",
  "Rivera",
  "Ramos",
  "Romero",
  "Juárez",
  "Álvarez",
  "Méndez",
  "Chávez",
  "Herrera",
  "Medina",
  "Domínguez",
  "Castro",
  "Guzmán",
  "Vargas",
  "Velázquez",
  "Salazar",
  "Rojas",
  "Ortega",
  "Cortes",
  "Santiago",
  "Guerrero",
  "Contreras",
  "Bautista",
  "Estrada",
  "Luna",
  "Lara",
  "Ríos",
  "Ávila",
  "Alvarado",
  "De la cruz",
  "Silva",
  "Delgado",
  "Carrillo",
  "Solís",
  "Soto",
  "León",
  "Fernández",
  "Cervantes",
  "Márquez",
  "Espinosa",
  "Mejía",
  "Vega",
  "Sandoval",
  "Campos",
  "Nava",
  "Cabrera",
  "Ibarra",
  "Espinoza",
  "Santos",
  "Acosta",
  "Camacho",
  "Valdez",
  "Fuentes",
  "Muñoz",
  "Miranda",
  "Maldonado",
  "Robles",
  "Rosas",
  "Meza",
  "Molina",
  "Trejo",
  "Rosales",
  "Pacheco",
  "Navarro",
  "Salgado",
  "Aguirre",
  "Salas",
  "Velasco",
  "Cárdenas",
  "Pineda",
  "Orozco",
  "Serrano",
  "Rangel",
  "Valencia",
  "Sosa",
  "Vásquez",
  "Valenzuela",
  "Tapia",
  "Barrera",
  "Arellano",
  "Figueroa",
  "Padilla",
  "Ayala",
  "Huerta",
  "Duran",
  "Salinas",
  "Montes",
  "Mora",
  "Calderón",
  "Marín",
  "Cuevas",
  "Villanueva",
  "Palacios",
  "Olvera",
  "Escobar",
  "Suarez",
  "Benítez",
  "Gallegos",
  "Franco",
  "Ochoa",
  "Cano",
  "Zamora",
  "Beltrán",
  "Villegas",
  "Macias",
  "Zavala",
  "Lozano",
  "Alonso",
  "Galván",
  "Osorio",
  "Peña",
  "Román",
  "Trujillo",
  "Garza",
  "Ponce",
  "Peralta",
  "Galindo",
  "Leyva",
  "Núñez",
  "Corona",
  "Zarate",
  "Andrade",
  "Bernal",
  "Toledo",
  "Rubio",
  "Arias",
  "Bravo",
  "Mata",
  "Parra",
  "Castañeda",
  "Antonio",
  "Enríquez",
  "Vera",
  "Cisneros",
  "Rivas",
  "Montoya",
  "Olivares",
  "Rocha",
  "Castellanos",
  "Zúñiga",
  "Arroyo",
  "Esquivel",
  "Quiroz",
  "Navarrete",
  "Villalobos",
  "Villa",
  "Guevara",
  "Ángeles",
  "Tovar",
  "Córdova",
  "Villarreal",
  "Carmona",
  "Quintero",
  "Gallardo",
  "De la rosa",
  "Ocampo",
  "Téllez",
  "Zapata",
  "Caballero",
  "Esparza",
  "Montiel",
  "Becerra",
  "Lugo",
  "Dávila",
  "Santana",
  "De león",
  "Reyna",
  "Galicia",
  "Paredes",
  "Muñoz",
  "Alarcón",
  "Nájera",
  "Acevedo",
  "Ojeda",
  "Mercado",
  "Guerra",
  "Guillen",
  "Murillo",
  "Avalos",
  "Barrios",
  "Félix",
  "Bello",
  "Solano",
  "Chan",
  "Rendon",
  "Escamilla",
  "Escobedo",
  "Saucedo",
  "Amador",
  "Leal",
  "Cortez",
  "Segura",
  "Palma",
  "Uribe",
  "Blanco",
  "Altamirano",
  "Nieto",
  "Reséndiz",
  "Sierra",
  "Islas",
  "Monroy",
  "Bonilla",
  "Alfaro",
  "Valle",
  "Granados",
  "Avilés",
  "Barrón",
  "Barajas",
  "Escalante",
  "Carrasco",
  "Arteaga",
  "Gil",
  "Duarte",
  "Meléndez",
  "Valdés",
  "Ventura",
  "Aquino",
  "Barragán",
  "Arriaga",
  "Arenas",
  "Báez",
  "Montero",
  "Pech",
  "Meneses",
  "Del ángel",
  "Armenta",
  "Godínez",
  "Balderas",
  "Vidal",
  "Carbajal",
  "Jaimes",
  "Quezada",
  "Coronado",
  "May",
  "Cantú",
  "Arredondo",
  "Varela",
  "Aguilera",
  "Soriano",
  "Santiz",
  "Gálvez",
  "Zepeda",
  "Sotelo",
  "Arce",
  "Romo",
  "Chi",
  "Carranza",
  "Hidalgo",
  "Gaytán",
  "Covarrubias",
  "Moran",
  "Alcántara",
  "Medrano",
  "Rico",
  "Uc",
  "Cota",
  "Gámez",
  "Robledo",
  "Anaya",
  "Arreola",
  "Barrientos",
  "Carrera",
  "Ceballos",
  "Gamboa",
  "De Jesús",
  "Jaramillo",
  "Portillo",
  "Guadarrama",
  "Aranda",
  "Aparicio",
  "De",
  "Holguín",
  "Cerón",
  "Martin",
  "Rentería",
  "Roque",
  "Aragón",
  "Mondragón",
  "Saavedra",
  "Vélez",
  "Bahena",
  "Castaneda",
  "Alemán",
  "De la",
  "Hurtado",
  "Pena",
  "Cordero",
  "Vergara",
  "Fonseca",
  "Becerril",
  "Núñez",
  "Lira",
  "Bustos",
  "Mena",
  "Zamudio",
  "Arcos",
  "Canul",
  "Serna",
  "Osuna",
  "Correa",
  "Valadez",
  "Baltazar",
  "Quintana",
  "Santillán",
  "Rincón",
  "Luis",
  "Carreón",
  "Badillo",
  "Cazares",
  "Adame",
  "Jasso",
  "Millán",
  "Urbina",
  "De los santos",
  "Chacón",
  "Heredia",
  "Bustamante",
  "Colin",
  "Paz",
  "Casillas",
  "Madrigal",
  "Alcocer",
  "Pedraza",
  "Zaragoza",
  "Vite",
  "Merino",
  "Rosado",
  "Cuellar",
  "Piña",
  "Terán",
  "Alcaraz",
  "Saldaña",
  "Venegas",
  "Abarca",
  "Salvador",
  "Lázaro",
  "Ordaz",
  "Delgadillo",
  "Ontiveros",
  "Vicente",
  "Chavarría",
  "Montalvo",
  "Rueda",
  "Gordillo",
  "Lima",
  "Noriega",
  "Casas",
  "Roldan",
  "Cedillo",
  "Ramon",
  "Brito",
  "Cardona",
  "Dorantes",
  "Sáenz",
  "Angulo",
  "Briones",
  "Puente",
  "Hinojosa",
  "De la torre",
  "Yáñez",
  "Matus",
  "Mota",
  "Francisco",
  "Tejeda",
  "Garrido",
  "Perales",
  "Reynoso",
  "Galeana",
  "Miguel",
  "Pulido",
  "Alcalá",
  "Limón",
  "Neri",
  "Nolasco",
  "Treviño",
  "Cadena",
  "Manzano",
  "Prado",
  "Góngora",
  "Avendaño",
  "Vallejo",
  "Almanza",
  "Arguelles",
  "Basilio",
  "Linares",
  "Sarmiento",
  "Alanís",
  "Betancourt",
  "Trinidad",
  "Damián",
  "Mireles",
  "Frías",
  "Jaime",
  "Ángel",
  "Araujo",
  "Montaño",
  "Páez",
  "Velásquez",
  "Negrete",
  "Castejón",
  "Dzul",
  "Prieto",
  "Rivero",
  "Munguía",
  "Mancilla",
  "Vela",
  "Anguiano",
  "Camarillo",
  "Viveros",
  "Verdugo",
  "Amaro",
  "Maya",
  "Narváez",
  "Bermúdez",
  "Camargo",
  "Nicolas",
  "Solorzano",
  "Corral",
  "Magaña",
  "Tenorio",
  "Espino",
  "Jacobo",
  "Saldívar",
  "Olmos",
  "Canche",
  "Amaya",
  "Moctezuma",
  "Oliva",
  "Poot",
  "Burgos",
  "Barbosa",
  "Ruvalcaba",
  "Segovia",
  "Melo",
  "Oropeza",
  "Lizárraga",
  "Larios",
  "Gastelum",
  "Lucero",
  "Roblero",
  "Salmerón",
  "Banda",
  "Ornelas",
  "Bárcenas",
  "Santamaria",
  "Arévalo",
  "Ovando",
  "Lorenzo",
  "Mares",
  "Alejandro",
  "Cerda",
  "Fierro",
  "Almazán",
  "Catalán",
  "Ku",
  "Muñoz",
  "Landa",
  "Valdivia",
  "Gaspar",
  "Girón",
  "Lozada",
  "Santoyo",
  "Novelo",
  "Coronel",
  "Ledesma",
  "Loera",
  "Partida",
  "Soria",
  "Zúñiga",
  "Balam",
  "Albarrán",
  "Tello",
  "Aguayo",
  "Olivas",
  "Muniz",
  "Aceves",
];
// #endregion
