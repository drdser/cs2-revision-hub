export type TokenKind =
  | 'plain'
  | 'keyword'
  | 'type'
  | 'string'
  | 'number'
  | 'comment'
  | 'annotation'
  | 'blank';

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
  'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null',
  'var', 'record', 'sealed', 'yield',
]);

/**
 * Java library types that appear in this course. Kept as an explicit list rather
 * than an "identifier starting with a capital" heuristic, so that user-defined
 * class names in the questions are not styled differently from each other.
 */
const TYPES = new Set([
  'String', 'System', 'Object', 'Integer', 'Double', 'Character', 'Boolean',
  'Math', 'Exception', 'RuntimeException', 'Error', 'AssertionError',
  'IOException', 'FileNotFoundException', 'ArithmeticException',
  'InputMismatchException', 'IllegalArgumentException', 'IllegalStateException',
  'ArrayIndexOutOfBoundsException', 'NullPointerException', 'ClassCastException',
  'NumberFormatException', 'File', 'FileReader', 'FileWriter', 'BufferedReader',
  'BufferedWriter', 'PrintWriter', 'FileInputStream', 'FileOutputStream',
  'InputStream', 'OutputStream', 'InputStreamReader', 'Writer', 'Reader',
  'Scanner', 'ArrayList', 'List', 'AutoCloseable', 'Closeable', 'Class',
  'StackTraceElement', 'Thread',
]);

const IDENT_START = /[A-Za-z_$]/;
const IDENT_PART = /[A-Za-z0-9_$]/;
const DIGIT = /[0-9]/;

/**
 * Tokenise a Java snippet for display. This is a display-only lexer: it is
 * deliberately small and never throws, falling back to `plain` for anything it
 * does not recognise. A run of five or more underscores is treated as the
 * fill-in-the-blank placeholder used by the code-completion questions.
 */
export function tokenizeJava(source: string): Token[] {
  const tokens: Token[] = [];
  let buffer = '';
  let i = 0;

  const flush = () => {
    if (buffer) {
      tokens.push({ kind: 'plain', text: buffer });
      buffer = '';
    }
  };
  const push = (kind: TokenKind, text: string) => {
    flush();
    tokens.push({ kind, text });
  };

  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    // Line comment
    if (ch === '/' && next === '/') {
      let end = source.indexOf('\n', i);
      if (end === -1) end = source.length;
      push('comment', source.slice(i, end));
      i = end;
      continue;
    }

    // Block comment
    if (ch === '/' && next === '*') {
      const close = source.indexOf('*/', i + 2);
      const end = close === -1 ? source.length : close + 2;
      push('comment', source.slice(i, end));
      i = end;
      continue;
    }

    // String or char literal
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < source.length) {
        if (source[j] === '\\') {
          j += 2;
          continue;
        }
        if (source[j] === ch || source[j] === '\n') break;
        j += 1;
      }
      const end = Math.min(j + 1, source.length);
      push('string', source.slice(i, end));
      i = end;
      continue;
    }

    // Fill-in-the-blank placeholder
    if (ch === '_' && source.startsWith('_____', i)) {
      let j = i;
      while (j < source.length && source[j] === '_') j += 1;
      push('blank', source.slice(i, j));
      i = j;
      continue;
    }

    // Annotation
    if (ch === '@' && next && IDENT_START.test(next)) {
      let j = i + 1;
      while (j < source.length && IDENT_PART.test(source[j])) j += 1;
      push('annotation', source.slice(i, j));
      i = j;
      continue;
    }

    // Number
    if (DIGIT.test(ch)) {
      let j = i;
      while (j < source.length && /[0-9._a-fA-FxX]/.test(source[j])) j += 1;
      push('number', source.slice(i, j));
      i = j;
      continue;
    }

    // Identifier / keyword / type
    if (IDENT_START.test(ch)) {
      let j = i;
      while (j < source.length && IDENT_PART.test(source[j])) j += 1;
      const word = source.slice(i, j);
      if (KEYWORDS.has(word)) {
        push('keyword', word);
      } else if (TYPES.has(word)) {
        push('type', word);
      } else {
        buffer += word;
      }
      i = j;
      continue;
    }

    buffer += ch;
    i += 1;
  }

  flush();
  return tokens;
}

export const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: '',
  keyword: 'tok-keyword',
  type: 'tok-type',
  string: 'tok-string',
  number: 'tok-number',
  comment: 'tok-comment',
  annotation: 'tok-annotation',
  blank: 'tok-blank',
};
