// Recovered from 9e48e928d7bd48d8.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
const scrollRig = getVendor(8429);
export default () => (
  <jsxRuntime.Fragment>
    <scrollRig.SmoothScrollbar
      config={{
        anchors: !0,
      }}
    />
    <scrollRig.GlobalCanvas
      style={{
        pointerEvents: "none",
        zIndex: 2,
      }}
      flat={!0}
      scaleMultiplier={0.05}
      gl={{
        alpha: !0,
        antialias: !0,
      }}
    />
  </jsxRuntime.Fragment>
);
