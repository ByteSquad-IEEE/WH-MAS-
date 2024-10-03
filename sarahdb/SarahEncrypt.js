const defs = {
    "A": "&00;",
    "B": "&01;",
    "C": "&02;",
    'D': "&03;",
    'E': "&04;",
    'F': "&05;",
    'G': "&06;",
    'H': "&07;",
    'I': "&08;",
    'J': "&09;",
    'K': "&10;",
    'L': "&11;",
    'M': "&12;",
    'N': "&13;",
    'O': "&14;",
    'P': "&15;",
    'Q': "&16;",
    'R': "&17;",
    'S': "&18;",
    'T': "&19;",
    'U': "&20;",
    'V': "&21;",
    'W': "&22;",
    'X': "&23;",
    'Y': "&24;",
    'Z': "&25;",
    "a": "&001;",
    "b": "&002;",
    'c': "&003;",
    'd': "&004;",
    'e': "&005;",
    'f': "&006;",
    'g': "&007;",
    'h': "&008;",
    'i': "&009;",
    'j': "&010;",
    'k': "&011;",
    'l': "&012;",
    'm': "&013;",
    'n': "&014;",
    'o': "&015;",
    'p': "&016;",
    'q': "&017;",
    'r': "&018;",
    's': "&019;",
    't': "&020;",
    'u': "&021;",
    'v': "&022;",
    'w': "&023;",
    'x': "&024;",
    'y': "&025;",
    'z': "&026;",
    "{": "&co;",
    "}": "&cc;",
    "#": "&hs;",
    "@": "&at;",
    ".": "&st;",
    ",": "&cm;",
    "/": "&fs;",
    "\\": "&bs;",
    "%": "&pc;",
    "'": "&sq;",
    '"': "&dq;",
    "(": "&bo;",
    ")": "&bc;",
    "[": "&so;",
    "]": "&sc;",
    ":": "&fc;",
    ";": "&sm;",
    " ": "&ws;",
    ".com": "&com;",
    "$": "&dl;",
    "-": "&hyph;",
    "_": "&und;",
    "=": "&equ;",
    "+": "&plus;",
    "|": "&orsign;",
    "&": "&amp;",
    "*": "&ast;",
    "^": "&pow;",
    "~": "&crt;",
    "?": "%qa;",
    "": "&nt;",
    "<": "&gt;",
    ">": "&lt;",
    "\n": "&nl;",
    "\t": "&tbsp;",
    "`": "&bctk;"
  };
  
  // Add number definitions
  for (let n = 0; n < 1000; n++) {
    defs[`${n}`] = `&&${n};`;
  }
  
  export function encrypt(string) {
    let encoded = [];
    for (let char of string) {
      encoded.push(defs[char] || char);
    }
    return encoded.join('');
  }
  
  export function decrypt(encodedStr) {
    const enList = encodedStr.split(';');
    const dcList = [];
    for (let item of enList) {
      if (item) {
        const fullItem = item + ';';
        for (let [k, v] of Object.entries(defs)) {
          if (fullItem === v) {
            dcList.push(k);
            break;
          }
        }
      }
    }
    return dcList.join('');
  }
  
  export function validateDc(data, dc) {
    return data === dc;
  }