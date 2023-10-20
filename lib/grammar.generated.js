import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
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
export const cookEscape = (escape, span) => {
  let hexMatch;
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
export default class CSTMLStringGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "String"], [Node, 2, "Literal"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *String() {
    let q = yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`match`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`[`], {}),
            elements: [_t.node("Character", [_t.str`'`], {}), _t.node("Character", [_t.str`'`], {})],
            close: _t.node("Punctuator", [_t.str`]`], {})
          })]
        })],
        close: _t.node("Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
    if (!q) yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`fail`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
    yield q === "'" ? _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eat`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`<|`], {}),
        type: _t.node("Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`"`], {}),
          value: _t.node("Literal", [_t.str`'`], {}),
          close: _t.node("Punctuator", [_t.str`"`], {})
        }),
        attrs: [_t.node("StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Literal", [_t.str`startSpan`], {}),
          mapOperator: _t.node("Punctuator", [_t.str`=`], {}),
          value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`'`], {}),
            value: _t.node("Literal", [_t.str`String`], {}),
            close: _t.node("Punctuator", [_t.str`'`], {})
          })
        }), _t.node("StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Literal", [_t.str`startSpan`], {}),
          mapOperator: _t.node("Punctuator", [_t.str`=`], {}),
          value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`'`], {}),
            value: _t.node("Literal", [_t.str`String`], {}),
            close: _t.node("Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    }) : _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eat`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`<|`], {}),
        type: _t.node("Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`'`], {}),
          value: _t.node("Literal", [_t.str`"`], {}),
          close: _t.node("Punctuator", [_t.str`'`], {})
        }),
        attrs: [_t.node("StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Literal", [_t.str`startSpan`], {}),
          mapOperator: _t.node("Punctuator", [_t.str`=`], {}),
          value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`'`], {}),
            value: _t.node("Literal", [_t.str`String`], {}),
            close: _t.node("Punctuator", [_t.str`'`], {})
          })
        }), _t.node("StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Literal", [_t.str`startSpan`], {}),
          mapOperator: _t.node("Punctuator", [_t.str`=`], {}),
          value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`'`], {}),
            value: _t.node("Literal", [_t.str`String`], {}),
            close: _t.node("Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
    while (yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`<`], {}),
        type: _t.node("Identifier", [_t.str`Any`], {}),
        props: _t.node("MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`{[`], {}),
          values: [_t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`<|`], {}),
            type: _t.node("Identifier", [_t.str`Literal`], {}),
            close: _t.node("Punctuator", [_t.str`|>`], {})
          }), _t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Punctuator", [_t.str`<|`], {}),
            type: _t.node("Identifier", [_t.str`Literal`], {}),
            close: _t.node("Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    }));
    yield q === "'" ? _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eat`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`<|`], {}),
        type: _t.node("Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`"`], {}),
          value: _t.node("Literal", [_t.str`'`], {}),
          close: _t.node("Punctuator", [_t.str`"`], {})
        }),
        attrs: [_t.node("BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    }) : _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eat`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attrs]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`<|`], {}),
        type: _t.node("Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`'`], {}),
          value: _t.node("Literal", [_t.str`"`], {}),
          close: _t.node("Punctuator", [_t.str`'`], {})
        }),
        attrs: [_t.node("BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
  }
  *Escape() {
    yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eatMatchEscape`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: _t.node("Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
          elements: [_t.node("Character", [_t.esc()], {}), _t.node("Character", [_t.esc()], {})]
        })],
        close: _t.node("Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
  }
  *Literal({
    state: {
      span
    }
  }) {
    if (span === 'String') {
      yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Identifier", [_t.str`eat`], {}),
        open: _t.node("Punctuator", [_t.str`(`], {}),
        argument: _t.node("Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Punctuator", [_t.str`/`], {}),
          alternatives: [_t.node("Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("CapturingGroup", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`], {
                open: _t.node("Punctuator", [_t.str`(`], {}),
                alternatives: [_t.node("Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                  elements: [_t.node("Character", [_t.esc()], {}), _t.node("Character", [_t.esc()], {})]
                }), _t.node("Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                  elements: [_t.node("Character", [_t.esc()], {}), _t.node("Character", [_t.esc()], {})]
                })],
                separators: [_t.node("Punctuator", [_t.str`|`], {})],
                close: _t.node("Punctuator", [_t.str`)`], {})
              }),
              value: _t.node("Keyword", [_t.str`+`], {})
            })]
          })],
          close: _t.node("Punctuator", [_t.str`/`], {})
        }),
        close: _t.node("Punctuator", [_t.str`)`], {})
      });
    } else {
      throw new Error('invalid literal');
    }
  }
}
