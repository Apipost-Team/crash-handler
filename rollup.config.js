import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "libs/index.js",
        format: "es",
        sourcemap: false,
      },
    ],
    plugins: [commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
  },
  {
    input: "src/index.ts",
    output: [{ file: "libs/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
