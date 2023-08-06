interface Position {
    line: number;
    col: number;
}
interface Span {
    start: Position;
    end: Position;
}
interface Highlight {
    span: Span;
    message: string;
}
interface ErrorContext {
    source: string;
    filename: string;
    errorName: string;
    errorMessage: string;
    position: Position;
}
declare function formatError(ctx: ErrorContext, highlights: Highlight[]): string;

export { ErrorContext, Highlight, Position, Span, formatError as default };
