import { i } from '@bablr/boot/shorthand.macro';
import objectEntries from 'iter-tools-es/methods/object-entries';
import { Node } from '@bablr/boot-helpers/decorators';

const escapables = new Map(
  objectEntries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

export const name = 'CSTMLString';

export const cookEscape = (escape, span) => {
  let hexMatch;

  if (!span.startsWith('String')) {
    throw new Error('invalid span');
  }

  if (!escape.startsWith('\\')) {
    throw new Error('string escape must start with \\');
  }

  if ((hexMatch = /\\x([0-9a-f]{2})/iy.exec(escape))) {
    // continue
  } else if ((hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape))) {
    //continue
  } else if ((hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape))) {
    //continue
  }

  if (hexMatch) {
    return parseInt(hexMatch[1], 16);
  }

  let litMatch = /\\([nrt0])/y.exec(escape);

  if (litMatch) {
    return escapables.get(litMatch[1]);
  }

  // Note: this differs from JS which allows them
  throw new Error('Redundant escapes are illegal in CSTML strings');
};

export const grammar = class CSTMLStringGrammar {
  @Node
  *String() {
    let q = yield i`match(/['"]/)`;

    if (!q) yield i`fail()`;

    yield q === "'"
      ? i`eat(<| Punctuator "'" .open balanced="'" innerSpan='String:Single' |>)`
      : i`eat(<| Punctuator '"' .open balanced='"' innerSpan='String:Double' |>)`;

    while (yield i`eatMatch(<Fragment .[fragments]>)`);

    yield q === "'"
      ? i`eat(<| Punctuator "'" .close balancer |>)`
      : i`eat(<| Punctuator '"' .close balancer |>)`;
  }

  @Node
  *Punctuator({ props: { attrs, value } }) {
    yield i`eat(${value})`;

    return { attrs };
  }

  @Node
  *Fragment({ state: { span } }) {
    let esc, lit;
    do {
      esc =
        span === 'String:Single'
          ? yield i`eatMatchEscape(/\\[\\/nrt0']/)`
          : yield i`eatMatchEscape(/\\[\\/nrt0"]/)`;
      lit =
        span === 'String:Single'
          ? yield i`eatMatch(/[^\r\n\\']+/)`
          : yield i`eatMatch(/[^\r\n\\"]+/)`;
    } while (esc || lit);
  }
};
