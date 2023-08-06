
export interface Position {
    line: number;
    col: number;
}

export interface Span {
    start: Position;
    end: Position;
}

export interface Highlight {
    span: Span;
    message: string;
}

export interface ErrorContext {
    source: string;
    filename: string;
    errorName: string;
    errorMessage: string;
    position: Position;
}

/*
  ──> TypeError at unknown:1:4
   │
 1 │ let a = 10;
   │         ─┬
   .          |
   .          ╰── lhs declared here
   │
 2 │ let b = "a string";
   │         ─────────┬
   .                  │
   .                  ╰── rhs declared here
   │
 4 │ print(a + b);
   │       ┬ ┬ ┬
   .       │ │ │
   .       │ │ ╰── type 'string'
   .       │ ╰── mismatched types
   .       ╰── type 'i32'
   |
  ──> Cannot add types 'i32' and 'string'
*/

export default function formatError(
    ctx: ErrorContext,
    highlights: Highlight[]
): string {
    let result = "";

    const maxLength = Math.max(
        ...highlights.map(hl => hl.span.start.line + 1)
    ).toString().length;
    const lines = ctx.source.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const valid = highlights.filter(x => x.span.start.line === i)
        if (valid.length === 0) continue;

        result += ` ${" ".repeat(maxLength)} │\n`;
        result += ` ${(i + 1).toString().padStart(maxLength)} │ ${lines[i]}\n`;
        
        let j = 0;
        while (valid.length > 0) {
            if (j === 0) {
                const line = valid.reduce(
                    (last, curr) => ({
                        text: last.text +
                            " ".repeat(curr.span.start.col - last.index) +
                            "─".repeat(curr.span.end.col - curr.span.start.col - 1) +
                            "┬",
                        index: curr.span.end.col 
                    }), { text: "", index: 0 }
                ).text;
                result += ` ${" ".repeat(maxLength)} │ ${line}\n`;
            }
            else if (j === 1) {
                const line = valid.reduce(
                    (last, curr) => ({
                        text: last.text +
                            " ".repeat(curr.span.end.col - last.index - 1) +
                            "│",
                        index: curr.span.end.col 
                    }), { text: "", index: 0 }
                ).text;
                result += ` ${" ".repeat(maxLength)} . ${line}\n`;
            } else {
                const last = valid.pop();
                if (!last) break;

                let line = valid.reduce(
                    (last, curr) => ({
                        text: last.text +
                            " ".repeat(curr.span.end.col - last.index - 1) +
                            "│",
                        index: curr.span.end.col 
                    }), { text: "", index: 0 }
                );

                line.text += " ".repeat(last.span.end.col - line.index - 1) +
                            "╰── " + last.message;
                            
                result += ` ${" ".repeat(maxLength)} . ${line.text}\n`;
            }

            j++;
        }
    }

    return ` ${" ".repeat(maxLength)}──> ${ctx.errorName} in ${ctx.filename}:${ctx.position.line + 1}:${ctx.position.col + 1}\n` +
            result +
           ` ${" ".repeat(maxLength)} |\n` +
           ` ${" ".repeat(maxLength)}──> ${ctx.errorMessage}`;
}








