import objectEntries from 'iter-tools-es/methods/object-entries';
import map from 'iter-tools-es/methods/map';
import { Token, String } from '@bablr/helpers/decorators';
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

export default class CSTMLStringTokenGrammar {
  // A string must be decodable
  // Its inner tokens must be literals, escape sequences or gaps (\0)
  // how do we get the inner tokens?
  //   assume one punctuator on either end?
  //   assume a token that changes to String span on either end
  @String
  *String() {
    let lq = i`eat(<| Any {[
        <| Punctuator "'" startSpan='String' balanced="'" |>
        <| Punctuator '"' startSpan='String' balanced='"' |>
      ]} |>)`;

    while (yield i`eatMatch(<| Any {[ <| Literal |> <| EscapeSequence |> ]} |>)`);

    // balanced suggests a BooleanAttribute type
    // shift information about syntax left!
    yield i`eat(<| Punctuator ${lq.value} balanced |>)`;
  }

  *EscapeSequence() {
    yield i`eat(<| Escape |>)`;
    yield i`eat(<| EscapeCode |>)`;
  }

  @Token
  *Escape() {
    yield i`eat(\\)`;
  }

  @Token
  *Literal({ state: { span } }) {
    if (span === 'String') {
      yield i`eat(/[^\n]+/y)`;
    } else {
      throw new Error('invalid literal');
    }
  }

  @Token
  *EscapeCode() {
    if (yield i`eatMatch(/u{\d{1,6}}/y)`) {
      // break
    } else if (yield i`eatMatch(/u\d\d\d\d/y)`) {
    } else {
      yield i`eat(/${map((key) => re.Character`${key}`, escapables.keys())}/)`;
    }
  }
}
