import { defineConfig } from "tsup";

export default defineConfig({
    entry: [ "src" ],
    dts: true,
    minify: true,
    format: [ "cjs", "esm" ]
})