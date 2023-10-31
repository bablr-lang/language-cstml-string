import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
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
    [_initProto] = _applyDecs(this, [[Node, 2, "String"], [Node, 2, "Literal"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *String() {
    let q = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.str`[`], {}, {}),
              elements: [_t.node("Regex", "Character", [_t.str`'`], {}, {}), _t.node("Regex", "Character", [_t.str`"`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.str`]`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {});
    if (!q) yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`fail`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {});
    yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}, {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {}),
            value: _t.node("Spamex", "Literal", [_t.str`'`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}, {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {}),
              value: _t.node("Spamex", "Literal", [_t.str`'`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}, {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {}),
            value: _t.node("Spamex", "Literal", [_t.str`"`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}, {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {}),
              value: _t.node("Spamex", "Literal", [_t.str`"`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.trivia` `, _t.ref`1`, _t.ref`close`], {
        0: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {}, {})
        }, {}),
        1: _t.node("Instruction", "Array", [_t.ref`open`, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.str`[`], {}, {}),
          elements: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.str`Literal`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {}, {})
          }, {}), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.str`Escape`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.str`]`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 2
      })
    }, {}));
    yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}, {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {}),
            value: _t.node("Spamex", "Literal", [_t.str`'`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`"`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.str`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}, {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {}),
            value: _t.node("Spamex", "Literal", [_t.str`"`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.str`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {});
  }
  *Escape() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatchEscape`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
        0: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
            elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.str`[`], {}, {}),
              elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.str`/`], {}, {}), _t.node("Regex", "Character", [_t.str`n`], {}, {}), _t.node("Regex", "Character", [_t.str`r`], {}, {}), _t.node("Regex", "Character", [_t.str`t`], {}, {}), _t.node("Regex", "Character", [_t.str`0`], {}, {}), _t.node("Regex", "Character", [_t.str`'`], {}, {}), _t.node("Regex", "Character", [_t.str`"`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.str`]`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {})
        }, {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
      }, {
        length: 1
      })
    }, {});
  }
  *Literal({
    state: {
      span
    }
  }) {
    if (span === 'String') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`0`, _t.ref`close`], {
          0: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node("Regex", "CapturingGroup", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.str`(`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.str`[`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.str`/`], {}, {}), _t.node("Regex", "Character", [_t.str`n`], {}, {}), _t.node("Regex", "Character", [_t.str`r`], {}, {}), _t.node("Regex", "Character", [_t.str`t`], {}, {}), _t.node("Regex", "Character", [_t.str`0`], {}, {}), _t.node("Regex", "Character", [_t.str`'`], {}, {}), _t.node("Regex", "Character", [_t.str`"`], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.str`]`], {}, {})
                    }, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.str`[`], {}, {}),
                      negate: _t.node("Regex", "Keyword", [_t.str`^`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.str`]`], {}, {})
                    }, {})]
                  }, {})],
                  separators: [_t.node("Regex", "Punctuator", [_t.str`|`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.str`)`], {}, {})
                }, {}),
                value: _t.node("Regex", "Keyword", [_t.str`+`], {}, {})
              }, {
                min: 1,
                max: Infinity
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.str`/`], {}, {})
          }, {}),
          open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}, {}),
          close: _t.node("Instruction", "Punctuator", [_t.str`)`], {}, {})
        }, {
          length: 1
        })
      }, {});
    } else {
      throw new Error('invalid literal');
    }
  }
};
