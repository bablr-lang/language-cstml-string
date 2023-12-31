import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/boot-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/boot-helpers/template";
import * as _t from "@bablr/boot-helpers/types";
var _initProto;
import objectEntries from 'iter-tools-es/methods/object-entries';
import { Node } from '@bablr/boot-helpers/decorators';
const escapables = new Map(objectEntries({
  n: '\n',
  r: '\r',
  t: '\t',
  0: '\0'
}));
export const name = 'CSTMLString';
export const cookEscape = (escape, span) => {
  let hexMatch;
  if (!span.startsWith('String')) {
    throw new Error('invalid span');
  }
  if (!escape.startsWith('\\')) {
    throw new Error('string escape must start with \\');
  }
  if (hexMatch = /\\x([0-9a-f]{2})/iy.exec(escape)) {
    // continue
  } else if (hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape)) {
    //continue
  } else if (hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape)) {
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
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "String"], [Node, 2, "Punctuator"], [Node, 2, "Fragment"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *String() {
    let q = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements`, _t.ref`elements`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
              elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    if (!q) yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`fail`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`'`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`'`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
            }, {})
          }, {}), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`innerSpan`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`String:Single`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`"`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`"`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {}), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`innerSpan`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`String:Double`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Fragment`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`fragments`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
    yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`'`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`attributes`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`fragments`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`"`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Punctuator({
    props: {
      attrs,
      value
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_interpolateArray(value)],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    return {
      attrs
    };
  }
  *Fragment({
    state: {
      span
    }
  }) {
    let esc, lit;
    do {
      esc = span === 'String:Single' ? yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatchEscape`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements`, _t.ref`elements`], {
              elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.lit`/`], {}, {}), _t.node("Regex", "Character", [_t.lit`n`], {}, {}), _t.node("Regex", "Character", [_t.lit`r`], {}, {}), _t.node("Regex", "Character", [_t.lit`t`], {}, {}), _t.node("Regex", "Character", [_t.lit`0`], {}, {}), _t.node("Regex", "Character", [_t.lit`'`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {})]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatchEscape`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements`, _t.ref`elements`], {
              elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.lit`/`], {}, {}), _t.node("Regex", "Character", [_t.lit`n`], {}, {}), _t.node("Regex", "Character", [_t.lit`r`], {}, {}), _t.node("Regex", "Character", [_t.lit`t`], {}, {}), _t.node("Regex", "Character", [_t.lit`0`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {})]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      lit = span === 'String:Single' ? yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.lit`'`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})],
                value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
              }, {
                min: 1,
                max: Infinity
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`elements`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})],
                value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
              }, {
                min: 1,
                max: Infinity
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } while (esc || lit);
  }
};
