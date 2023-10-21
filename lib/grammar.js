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
      ? i`eat(<| Punctuator "'" startSpan='String' balanced="'" |>)`
      : i`eat(<| Punctuator '"' startSpan='String' balanced='"' |>)`;

    while (yield i`eatMatch(<Any {[ <| Literal |> <| Escape |> ]}>)`);

    yield q === "'" ? i`eat(<| Punctuator "'" balancer |>)` : i`eat(<| Punctuator '"' balancer |>)`;
  }

  *Escape() {
    yield i`eatMatchEscape(/\\[\\/nrt0'"]/)`;
  }

  @Node
  *Literal({ state: { span } }) {
    if (span === 'String') {
      yield i`eat(/(\\[\\/nrt0'"]|[^\r\n])+/)`;
    } else {
      throw new Error('invalid literal');
    }
  }
};
