import { terser } from "rollup-plugin-terser";

export default {
    input: "src/gui/main.js", // Entry point
    output: {
        file: "dist/bundle.js", // Output bundled file
        format: "iife", // Immediately Invoked Function Expression for browsers
        name: "CircuitDesigner", // Global name for the bundle
    },
    plugins: [terser()], // Minify the output for a smaller bundle
};
