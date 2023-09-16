import objectEntries from 'iter-tools-es/methods/object-entries';
import map from 'iter-tools-es/methods/map';
import { buildCovers } from '@bablr/grammar';
import { i, re } from '@bablr/helpers/shorthand';

const escapables = new Map(
  objectEntries({
    '"': '"',
    "'": "'",
    '\\': '\\',
    '/': '/',
    n: '\n',
    r: '\r',
    t: '\t',
  }),
);

const Token = Symbol.for('@bablr/token');

class CSTMLStringTokenGrammar {
  constructor() {
    this.covers = buildCovers({
      [Token]: ['Escape', 'Literal', 'EscapeCode'],
    });
  }

  *String() {
    let lq = i`eat(<| Any {[
        <| Punctuator "'" startSpan='String:Single' balanced="'" |>
        <| Punctuator '"' startSpan='String:Double' balanced='"' |>
      ]} |>)`;

    while (yield i`eatMatch(<| Any {[ <| Literal |> <| EscapeSequence |> ]} |>)`);

    yield i`eat(<| Punctuator ${lq.value} endSpan=${lq.startSpan} |>)`;
  }

  *EscapeSequence() {
    yield i`eat(<| Escape |>)`;
    yield i`eat(<| EscapeCode |>)`;
  }

  // @Token
  *Escape() {
    yield i`eat(\\)`;
  }

  // @Token
  *Literal({ state: { span } }) {
    if (span === 'String:Single') {
      yield i`eat(/[^'\n]+/y)`;
    } else if (span === 'String:Double') {
      yield i`eat(/[^"\n]+/y)`;
    } else {
      throw new Error('invalid literal');
    }
  }

  // @Token
  *EscapeCode() {
    if (yield i`eatMatch(/u{\d{1,6}}/y)`) {
      // break
    } else if (yield i`eatMatch(/u\d\d\d\d/y)`) {
    } else {
      yield i`eat(/${map((key) => re.Character`${key}`, escapables.keys())}/)`;
    }
  }
}
