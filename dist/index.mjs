function g(o,l){let a="",i=Math.max(...l.map(r=>r.span.start.line+1)).toString().length,x=o.source.split(`
`);for(let r=0;r<x.length;r++){let s=l.filter(t=>t.span.start.line===r);if(s.length===0)continue;a+=` ${" ".repeat(i)} \u2502
`,a+=` ${(r+1).toString().padStart(i)} \u2502 ${x[r]}
`;let p=0;for(;s.length>0;){if(p===0){let t=s.reduce((n,e)=>({text:n.text+" ".repeat(e.span.start.col-n.index)+"\u2500".repeat(e.span.end.col-e.span.start.col-1)+"\u252C",index:e.span.end.col}),{text:"",index:0}).text;a+=` ${" ".repeat(i)} \u2502 ${t}
`}else if(p===1){let t=s.reduce((n,e)=>({text:n.text+" ".repeat(e.span.end.col-n.index-1)+"\u2502",index:e.span.end.col}),{text:"",index:0}).text;a+=` ${" ".repeat(i)} . ${t}
`}else{let t=s.pop();if(!t)break;let n=s.reduce((e,d)=>({text:e.text+" ".repeat(d.span.end.col-e.index-1)+"\u2502",index:d.span.end.col}),{text:"",index:0});n.text+=" ".repeat(t.span.end.col-n.index-1)+"\u2570\u2500\u2500 "+t.message,a+=` ${" ".repeat(i)} . ${n.text}
`}p++}}return` ${" ".repeat(i)}\u2500\u2500> ${o.errorName} in ${o.filename}:${o.position.line+1}:${o.position.col+1}
`+a+` ${" ".repeat(i)} |
 ${" ".repeat(i)}\u2500\u2500> ${o.errorMessage}`}export{g as default};
