(function(){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var curry = function curry(fn) {
  var totalArgs = fn.length;

  function partial(previousArgs) {
    return function curried() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var currentArgs = previousArgs.concat(args);
      if (currentArgs.length >= totalArgs) {
        return fn.apply(undefined, _toConsumableArray(currentArgs));
      }

      return partial(currentArgs);
    };
  }

  return partial([]);
};

var compose = function compose() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (subject) {
    if (args.length > 1) {
      return compose.apply(undefined, _toConsumableArray(args.slice(0, -1)))(tail(args)(subject));
    }

    return args[0](subject);
  };
};

var not = curry(function (subject) {
  return !subject;
});

var id = function id(subject) {
  return subject;
};

var includesIn = curry(function (subject, what) {
  return subject.includes(what);
});

var reduce = curry(function (fn, seed, subject) {
  return subject.reduce(fn, seed);
});

var head = curry(function (subject) {
  return subject[0];
});

var tail = curry(function (subject) {
  return subject[subject.length - 1];
});

var replace = curry(function (regex, substitute, subject) {
  return subject.replace(regex, substitute);
});

var prop = curry(function (property, subject) {
  return subject[property];
});

var propOf = curry(function (subject, property) {
  return subject[property];
});

var keys = curry(function (subject) {
  return Object.keys(subject);
});

var eq = curry(function (what, subject) {
  return what === subject;
});

var neq = curry(function (what, subject) {
  return what !== subject;
});

var fp = {
  compose: compose, curry: curry, not: not, id: id, prop: prop, propOf: propOf, keys: keys,
  eq: eq, neq: neq, includesIn: includesIn, reduce: reduce, head: head, tail: tail, replace: replace
};

['filter', 'map', 'includes', 'find', 'findIndex', 'some', 'every', 'concat', 'sort', 'match', 'split', 'join'].forEach(function (fn) {
  fp[fn] = curry(function (b, a) {
    return a[fn](b);
  });
});

var values = curry(function (subject) {
  return compose(fp.map(propOf(subject)), keys)(subject);
});

fp.values = values;

if (typeof module !== 'undefined' && module.exports) {
  // window.fp = fp;
  module.exports = fp;
} else {
  window.fp = fp;
}

})();
