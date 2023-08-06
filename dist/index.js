var d=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var h=(e,t)=>{for(var n in t)d(e,n,{get:t[n],enumerable:!0})},u=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of f(t))!m.call(e,s)&&s!==n&&d(e,s,{get:()=>t[s],enumerable:!(i=$(t,s))||i.enumerable});return e};var S=e=>u(d({},"__esModule",{value:!0}),e);var P={};h(P,{default:()=>c});module.exports=S(P);function c(e,t){let n="",i=Math.max(...t.map(p=>p.span.start.line+1)).toString().length,s=e.source.split(`
`);for(let p=0;p<s.length;p++){let l=t.filter(o=>o.span.start.line===p);if(l.length===0)continue;n+=` ${" ".repeat(i)} \u2502
`,n+=` ${(p+1).toString().padStart(i)} \u2502 ${s[p]}
`;let x=0;for(;l.length>0;){if(x===0){let o=l.reduce((a,r)=>({text:a.text+" ".repeat(r.span.start.col-a.index)+"\u2500".repeat(r.span.end.col-r.span.start.col-1)+"\u252C",index:r.span.end.col}),{text:"",index:0}).text;n+=` ${" ".repeat(i)} \u2502 ${o}
`}else if(x===1){let o=l.reduce((a,r)=>({text:a.text+" ".repeat(r.span.end.col-a.index-1)+"\u2502",index:r.span.end.col}),{text:"",index:0}).text;n+=` ${" ".repeat(i)} . ${o}
`}else{let o=l.pop();if(!o)break;let a=l.reduce((r,g)=>({text:r.text+" ".repeat(g.span.end.col-r.index-1)+"\u2502",index:g.span.end.col}),{text:"",index:0});a.text+=" ".repeat(o.span.end.col-a.index-1)+"\u2570\u2500\u2500 "+o.message,n+=` ${" ".repeat(i)} . ${a.text}
`}x++}}return` ${" ".repeat(i)}\u2500\u2500> ${e.errorName} in ${e.filename}:${e.position.line+1}:${e.position.col+1}
`+n+` ${" ".repeat(i)} |
 ${" ".repeat(i)}\u2500\u2500> ${e.errorMessage}`}
