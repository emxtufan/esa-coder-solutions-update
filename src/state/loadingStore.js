// Recovered from 2d25d158cb1e089d.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as React from "react";
const dependency8155 = getVendor(8155);
let t;
let r = (e) => {
    let t = (0, dependency8155.createStore)(e),
      r = (e) =>
        (function (e, t = (e) => e) {
          let i = React.default.useSyncExternalStore(
            e.subscribe,
            React.default.useCallback(() => t(e.getState()), [e, t]),
            React.default.useCallback(() => t(e.getInitialState()), [e, t]),
          );
          return (React.default.useDebugValue(i), i);
        })(t, e);
    return (Object.assign(r, t), r);
  },
  a = (t = (e) => ({
    isModelLoaded: !1,
    isHDRILoaded: !1,
    setModelLoaded: (t) =>
      e({
        isModelLoaded: t,
      }),
    setHDRILoaded: (t) =>
      e({
        isHDRILoaded: t,
      }),
  }))
    ? r(t)
    : r;
export const useLoadingStore = a;
