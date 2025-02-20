import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default {
    input: "src/gui/main.js", // Entry point
    output: {
        file: "dist/bundle.js", // Output bundled file
        format: "iife", // Immediately Invoked Function Expression for browsers
        name: "CircuitDesigner", // Global name for the bundle
    },
    plugins: [
        terser(), // Minify the output
        copy({
            targets: [
                { src: "assets/*", dest: "dist/assets" } // Copy assets folder to dist
            ]
        })
    ]
};
