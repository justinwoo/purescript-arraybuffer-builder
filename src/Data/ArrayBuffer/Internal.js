exports.nullValue = null;

exports.createJSValue = function (x) {
  return x;
};

exports.foldBuilder = function (builderToJSValue) {
  return function (effectFnIntDataBuff) {
    return function (int) {
      return function (builder) {
        // effect int
        return function () {
          let values = [];
          let stack = [];
          let curr = builderToJSValue(builder);
          let prev = null;

          while (stack.length !== 0 || curr != null) {
            if (curr != null) {
              stack.push(curr);
              curr = builderToJSValue(curr.left);
            } else {
              prev = stack.pop();
              values.push(prev.dataBuff);
              curr = builderToJSValue(prev.right);
            }
          }

          let acc = int;
          for (let i = 0; i < values.length; i++) {
            let value = values[i];
            acc = effectFnIntDataBuff(i)(value)();
          }

          return acc;
        };
      };
    };
  };
};
