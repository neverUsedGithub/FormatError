import formatError from "../src";

console.error(
    formatError({
        source: `
let a = 10;
let b = "a string";

print(a + b);`,
        errorMessage: "Cannot add 'i32' and 'string'",
        errorName: "TypeError",
        filename: "<main>",
        position: { line: 4, col: 8 }
    }, [
        {
            span: {
                start: { line: 1, col: 8 },
                end: { line: 1, col: 10 }
            },
            message: "lhs declared here"
        },
        {
            span: {
                start: { line: 2, col: 8 },
                end: { line: 2, col: 18 }
            },
            message: "rhs declared here"
        },
        {
            span: {
                start: { line: 4, col: 6 },
                end: { line: 4, col: 7 }
            },
            message: "type 'i32'"
        },
        {
            span: {
                start: { line: 4, col: 8 },
                end: { line: 4, col: 9 }
            },
            message: "mismatched types"
        },
        {
            span: {
                start: { line: 4, col: 10 },
                end: { line: 4, col: 11 }
            },
            message: "type 'string'"
        },
    ])
)