// //enables transpilation into CommonJS (CJS) format
import commonjs from "@rollup/plugin-commonjs";

import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

// transpiled our TypeScript code into JavaScript. This plugin will use all the settings we have set in tsconfig.json.
import typescript from "@rollup/plugin-typescript";

//This plugin prevents packages listed in peerDependencies from being bundled with our component library
import peerDepsExternal from "rollup-plugin-peer-deps-external";

//efficiently bundles third party dependencies we've installed and use in node_modules
import resolve from "@rollup/plugin-node-resolve";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
    ],
    external: ["react", "react-dom", "app", "shared"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
