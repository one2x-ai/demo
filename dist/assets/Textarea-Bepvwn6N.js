import{B as a,x as e,Q as p,c as s,g as d}from"./Button-CSUjAzpC.js";function u({value:r,placeholder:n},{createElement:o,createStateFromRef:l}){const t=l(p);return o("div",{as:"root",style:()=>({borderRadius:8,background:s.inputBg,padding:d.small,outline:t()?`1px solid ${s.primaryBlue}`:"none",display:"flex",flexDirection:"column"})},o("div",{as:"header"}),o("textarea",{as:"input",value:r,onInput:i=>r(i.target.value),style:{border:0,outline:0,background:"transparent",display:"block",grow:1,color:"#fff"},ref:[t.ref],placeholder:n,spellcheck:!1}),o("div",{as:"footer"}))}u.propTypes={value:a.string.default(()=>e("")),placeholder:a.string.default(()=>e(""))};export{u as T};
