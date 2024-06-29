(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5728:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(934)}])},7527:function(e,t,s){"use strict";s.d(t,{W:function(){return a}});var l=s(5893),n=s(6010);function a(e){let{className:t,children:s,...a}=e;return(0,l.jsx)("div",{className:(0,n.Z)("lg:px-8",t),...a,children:(0,l.jsx)("div",{className:"lg:max-w-4xl",children:(0,l.jsx)("div",{className:"mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0",children:s})})})}},3428:function(e,t,s){"use strict";s.d(t,{J:function(){return a}});var l=s(5893);let n=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"});function a(e){let{date:t,...s}=e;return(0,l.jsx)("time",{dateTime:t.toISOString(),...s,children:n.format(t)})}},934:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return h},default:function(){return p}});var l=s(5893),n=s(7294),a=s(9008),i=s.n(a),r=s(1664),d=s.n(r),c=s(8282),o=s(7527),x=s(3428);function u(e){let{playing:t,...s}=e;return(0,l.jsx)("svg",{"aria-hidden":"true",viewBox:"0 0 10 10",fill:"none",...s,children:t?(0,l.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"}):(0,l.jsx)("path",{d:"M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z"})})}function m(e){let{episode:t}=e,s=new Date(t.published),a=(0,n.useMemo)(()=>({title:t.title,audio:{src:t.audio.src,type:t.audio.type},link:`/${t.published}`}),[t]),i=(0,c.x)(a);return(0,l.jsx)("article",{"aria-labelledby":`episode-${t.title}-title`,className:"py-10 sm:py-12",children:(0,l.jsx)(o.W,{children:(0,l.jsxs)("div",{className:"flex flex-col items-start",children:[(0,l.jsx)("h2",{id:`episode-${t.title}-title`,className:"mt-2 text-lg font-bold text-[#662B33] hover:underline",children:(0,l.jsx)(d(),{href:`/${t.published}`,children:t.title})}),(0,l.jsx)(x.J,{date:s,className:"order-first font-mono text-sm leading-7 text-slate-500"}),(0,l.jsx)("p",{className:"mt-1 text-base leading-7 text-slate-700",dangerouslySetInnerHTML:{__html:t.description.substring(0,350)+" ..."}}),(0,l.jsxs)("div",{className:"mt-4 flex items-center gap-4",children:[(0,l.jsxs)("button",{type:"button",onClick:()=>i.toggle(),className:"flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900","aria-label":`${i.playing?"Pause":"Play"} episode ${t.title}`,children:[(0,l.jsx)(u,{playing:i.playing,className:"h-2.5 w-2.5 fill-current"}),(0,l.jsx)("span",{className:"ml-3 ","aria-hidden":"true",children:"Listen"})]}),(0,l.jsx)("span",{"aria-hidden":"true",className:"text-sm font-bold text-slate-400",children:"/"}),(0,l.jsx)(d(),{href:`${t.published}`,className:"flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900","aria-label":`Show notes for episode ${t.title}`,children:"Show notes"}),(0,l.jsx)("span",{"aria-hidden":"true",className:"text-sm font-bold text-slate-400",children:"/"}),(0,l.jsx)(d(),{href:`${t.audio.src}`,legacyBehavior:!0,"aria-label":"Download this episode",children:(0,l.jsx)("a",{target:"_blank",className:"flex items-center text-sm font-bold leading-6 text-black hover:text-[#662B33] active:text-red-900",download:!0,children:"Download"})})]})]})})})}var h=!0;function p(e){let{episodes:t}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(i(),{children:[(0,l.jsx)("title",{children:"NPI Tech Guys | Podcasts"}),(0,l.jsx)("meta",{name:"description",content:"Stay up to date with our latest podcast episodes!"})]}),(0,l.jsxs)("div",{className:"pt-16 pb-12 sm:pb-4 lg:pt-12",children:[(0,l.jsx)(o.W,{children:(0,l.jsx)("h1",{className:"text-2xl font-bold leading-7 text-slate-900",children:"Podcast Episodes"})}),(0,l.jsx)("div",{className:"divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100",children:t.map(e=>(0,l.jsx)(m,{episode:e},e.title))})]})]})}},9008:function(e,t,s){e.exports=s(3121)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5728)}),_N_E=e.O()}]);