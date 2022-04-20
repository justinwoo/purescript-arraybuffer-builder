exports.nullValue = null;

exports.createJSValue = function (x) {
  return x;
};

exports.foldBuilder = function (builderToJSValue) {
  return function (effectFnUint8ArrayIntDataBuff) {
    return function (builder) {
      // effect arrayBuffer
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

        let buffer = new ArrayBuffer(values.length);
        // let view = new DataView(buffer);
        // need to use the correct view constructor based on some criteria?
        let view = new Uint8Array(buffer);

        let acc = 0;
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          let result = effectFnUint8ArrayIntDataBuff(view)(acc)(value)();
          acc = result;
        }

        return buffer;
      };
    };
  };
};
