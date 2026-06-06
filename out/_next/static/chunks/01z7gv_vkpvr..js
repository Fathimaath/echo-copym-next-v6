(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,63431,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(22016),l=e.i(18566),o=e.i(92199);function s({title:e="Disclaimer",children:a}){return(0,t.jsx)("div",{className:"my-8 bg-gray-50 rounded-xl p-6 border border-gray-200",children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsx)("div",{className:"flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center",children:(0,t.jsx)(o.FiAlertCircle,{className:"w-4 h-4 text-gray-600"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h4",{className:"font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide",style:{fontFamily:"Palanquin, sans-serif"},children:e}),(0,t.jsx)("div",{className:"text-xs sm:text-sm text-gray-600 leading-relaxed",style:{fontFamily:"Palanquin, sans-serif"},children:a})]})]})})}function n({posts:e=[],title:a="Related Articles"}){return e&&0!==e.length?(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{className:"text-2xl font-bold text-gray-900 mb-6",style:{fontFamily:"Palanquin, sans-serif"},children:a}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:e.map((e,a)=>(0,t.jsx)("article",{className:"group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#15a36e] hover:shadow-lg transition-all duration-300",children:(0,t.jsxs)(r.default,{href:`/blog/${e.category?.toLowerCase().replace(/\s+/g,"-")}/${e.slug}`,className:"block",children:[e.image&&(0,t.jsx)("div",{className:"aspect-video overflow-hidden",children:(0,t.jsx)("img",{src:e.image,alt:e.title,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"})}),(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-[#15a36e]",style:{fontFamily:"Palanquin, sans-serif"},children:e.category}),(0,t.jsx)("h4",{className:"text-sm font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-[#15a36e] transition-colors",style:{fontFamily:"Palanquin, sans-serif"},children:e.title}),e.excerpt&&(0,t.jsx)("p",{className:"text-xs text-gray-600 line-clamp-2 mb-3",style:{fontFamily:"Palanquin, sans-serif"},children:e.excerpt}),(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs text-gray-500",children:[(0,t.jsx)("span",{children:e.date}),(0,t.jsxs)("span",{className:"flex items-center gap-1 text-[#15a36e] font-semibold group-hover:gap-2 transition-all",children:["Read",(0,t.jsx)(o.FiArrowRight,{className:"w-3 h-3"})]})]})]})]})},e.id||a))})]}):(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{className:"text-2xl font-bold text-gray-900 mb-6",style:{fontFamily:"Palanquin, sans-serif"},children:a}),(0,t.jsx)("p",{className:"text-gray-500 italic",style:{fontFamily:"Palanquin, sans-serif"},children:"More articles coming soon..."})]})}var i=e.i(21041),m=e.i(98108);function c({block:e}){let{type:a,content:r}=e,l=r?.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").trim();return"h1"===a?(0,t.jsx)("h1",{id:l,children:r}):"h2"===a?(0,t.jsx)("h2",{id:l,children:r}):"h3"===a?(0,t.jsx)("h3",{id:l,children:r}):null}function d({block:e}){return(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:e.content||""}})}function p({block:e}){let a=e.content||"";a=a.replace(/<ul([^>]*)>([\s\S]*?)<\/ul>/gi,(e,t,a)=>{let r=a.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,(e,t)=>{let a=t.replace(/<\/?p[^>]*>/gi,"");return`<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${a}</span></li>`});return`<ul class="space-y-2"${t}>${r}</ul>`});let r=0;return a=a.replace(/<ol([^>]*)>([\s\S]*?)<\/ol>/gi,(e,t,a)=>{r=0;let l=a.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,(e,t)=>{r++;let a=t.replace(/<\/?p[^>]*>/gi,"");return`<li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs flex items-center justify-center mt-0.5 flex-shrink-0 font-medium">${r}</span><span class="text-sm sm:text-base text-gray-700" style="font-family: 'Palanquin', sans-serif;">${a}</span></li>`});return`<ol class="space-y-2"${t}>${l}</ol>`}),(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:a}})}function x({block:e}){return(0,t.jsxs)("div",{className:"blog-block blog-cta",children:[e.title&&(0,t.jsx)("h3",{className:"blog-cta__title",children:e.title}),e.content&&(0,t.jsx)("p",{className:"blog-cta__text",children:e.content}),e.caption&&(0,t.jsxs)(r.default,{href:"/tokenization",className:"blog-cta__btn",children:[e.caption,(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7l5 5m0 0l-5 5m5-5H6"})})]})]})}function g({block:e}){return(0,t.jsxs)("div",{className:"blog-block blog-fast-fact",children:[(0,t.jsx)("div",{className:"blog-fast-fact__label",children:"Fast Fact"}),(0,t.jsx)("p",{className:"blog-fast-fact__value",children:e.content})]})}function f({block:e}){return(0,t.jsxs)("div",{className:"blog-block blog-quote",children:[(0,t.jsx)("p",{className:"blog-quote__text",children:e.content}),e.title&&(0,t.jsxs)("div",{className:"blog-quote__author",children:[(0,t.jsx)("div",{className:"blog-quote__avatar",children:e.title.charAt(0)}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"blog-quote__name",children:e.title}),(0,t.jsx)("div",{className:"blog-quote__role",children:e.role||""})]})]})]})}function h({block:e}){let a=e.variant||"info",r=a.charAt(0).toUpperCase()+a.slice(1);return(0,t.jsx)("div",{className:`blog-block blog-callout blog-callout--${a}`,children:(0,t.jsxs)("div",{className:"blog-callout__content",children:[(e.title||r)&&(0,t.jsx)("div",{className:"blog-callout__title",children:e.title||r}),(0,t.jsx)("p",{className:"blog-callout__text",children:e.content})]})})}function b({block:e}){let a=e.headers||[],r=e.rows||[];return(0,t.jsx)("div",{className:"blog-block blog-table",children:(0,t.jsxs)("table",{children:[e.caption&&(0,t.jsx)("caption",{children:e.caption}),a.length>0&&(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:a.map((e,a)=>(0,t.jsx)("th",{children:e},a))})}),(0,t.jsx)("tbody",{children:r.map((e,a)=>(0,t.jsx)("tr",{children:e.map((e,a)=>(0,t.jsx)("td",{children:e},a))},a))})]})})}function u({block:e}){return(0,t.jsxs)("div",{className:"blog-block blog-image",children:[e.imageUrl?(0,t.jsx)(m.default,{src:e.imageUrl,alt:e.caption||""}):null,e.caption&&(0,t.jsx)("div",{className:"blog-image__caption",children:e.caption})]})}function y({block:e}){let a=e.sources||[];return 0===a.length?null:(0,t.jsxs)("div",{className:"blog-block blog-source",children:[(0,t.jsx)("div",{className:"blog-source__title",children:"Sources"}),(0,t.jsx)("ul",{children:a.map((e,a)=>(0,t.jsx)("li",{children:e.url?(0,t.jsx)("a",{href:e.url,className:"blog-source__link",target:"_blank",rel:"noopener noreferrer",children:e.title||e.url}):(0,t.jsx)("span",{children:e.title})},a))})]})}let j=({contentBlocks:e})=>e&&0!==e.length?(0,t.jsx)("div",{className:"blog-content",children:e.map((e,a)=>((e,a)=>{let r=e.id||`block-${a}`;switch(e.type){case"h1":case"h2":case"h3":return(0,t.jsx)(c,{block:e},r);case"paragraph":return(0,t.jsx)(d,{block:e},r);case"text":return(0,t.jsx)(p,{block:e},r);case"cta":return(0,t.jsx)(x,{block:e},r);case"fastfact":return(0,t.jsx)(g,{block:e},r);case"quote":return(0,t.jsx)(f,{block:e},r);case"callout":return(0,t.jsx)(h,{block:e},r);case"table":return(0,t.jsx)(b,{block:e},r);case"image":return(0,t.jsx)(u,{block:e},r);case"source":return(0,t.jsx)(y,{block:e},r);default:return console.warn(`Unknown block type: ${e.type}`),null}})(e,a))}):null;var v=e.i(7408),w=e.i(65645);e.s(["default",0,function({slug:e,initialArticle:m,initialRelatedPosts:c}){let d=(0,l.useRouter)(),[p,x]=(0,a.useState)(m||null),[g,f]=(0,a.useState)(!m),[h,b]=(0,a.useState)(c||[]),[u,y]=(0,a.useState)([]),[N,k]=(0,a.useState)(""),[_,q]=(0,a.useState)(!0),[C,F]=(0,a.useState)(!0),[P,z]=(0,a.useState)([]),B=(0,a.useRef)(null),L=(0,a.useRef)(null),S=(0,a.useRef)(null),R=p?p.authorData||{name:"string"==typeof p.author?p.author:"CopyM Team",role:"",bio:""}:null;(0,a.useEffect)(()=>{let t=async()=>{if(m&&m.slug===e){if(c)b(c);else{let t=[...w.blogPosts];t.some(e=>e.slug===m.slug)||t.push(m),b([...t.filter(t=>t.category===m.category&&t.slug!==e),...t.filter(e=>e.category!==m.category)].slice(0,3))}let t=new Set((c||[]).map(e=>e.slug));t.add(e),y([...w.blogPosts].filter(e=>!t.has(e.slug)).slice(0,3));return}if(!p||p.slug!==e){f(!0);try{let t=await (0,v.fetchBlogPostBySlug)(e),a=(0,v.transformApiPost)(t);x(a);let r=[a,...w.blogPosts.filter(e=>e.slug!==a.slug)],l=r.filter(t=>t.category===a.category&&t.slug!==e),o=r.filter(e=>e.category!==a.category),s=[...l,...o].slice(0,3);b(s);let n=new Set(s.map(e=>e.slug));n.add(e);let i=r.filter(e=>!n.has(e.slug)).slice(0,3);y(i)}catch(a){let t=w.blogPosts.find(t=>t.slug===e);if(t){x(t);let a=w.blogPosts.filter(t=>t.slug!==e),r=[...a.filter(e=>e.category===t.category),...a.filter(e=>e.category!==t.category)].slice(0,3);b(r);let l=new Set(r.map(e=>e.slug));l.add(e),y(a.filter(e=>!l.has(e.slug)).slice(0,3))}else console.error("Failed to fetch post:",a),d.push("/blog")}finally{f(!1)}}};e&&t()},[e,m,d]),(0,a.useEffect)(()=>{let e=()=>{if(B.current){let e=B.current.getBoundingClientRect(),t=window.innerHeight,a=e.bottom<t;q(!a),F(!a)}};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,a.useEffect)(()=>{let e=L.current?.querySelector("div");if(e&&_){let t=e=>{e.stopPropagation()};return e.addEventListener("wheel",t,{passive:!0}),()=>e.removeEventListener("wheel",t)}},[_]),(0,a.useEffect)(()=>{if(!p)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&k(e.target.id)})},{rootMargin:"-100px 0px -80% 0px"});return p.headings?.forEach(({id:t})=>{let a=document.getElementById(t);a&&e.observe(a)}),()=>e.disconnect()},[p]);let $=e=>{let t=window.location.href,a={twitter:`https://twitter.com/intent/tweet?url=${encodeURIComponent(t)}&text=${encodeURIComponent(p.title)}`,linkedin:`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(t)}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t)}`,email:`mailto:?subject=${encodeURIComponent(p.title)}&body=${encodeURIComponent(t)}`};"copy"===e?navigator.clipboard.writeText(t):window.open(a[e],"_blank","noopener,noreferrer")};return p?(0,t.jsxs)("div",{className:"bg-white text-gray-900 min-h-screen",children:[(0,t.jsx)("div",{className:"hidden lg:block fixed top-0 left-0 right-0 bg-gray-50 z-40 pt-28",children:(0,t.jsx)("div",{className:"px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pb-8",children:(0,t.jsx)(i.default,{items:[{label:"Home",path:"/"},{label:"Blog",path:"/blog"},{label:p.category,path:`/blog?category=${p.category.toLowerCase()}`},{label:p.title}]})})}),(0,t.jsx)("div",{className:"lg:hidden pt-28 sm:pt-32 pb-4",children:(0,t.jsx)("div",{className:"px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32",children:(0,t.jsx)(i.default,{items:[{label:"Home",path:"/"},{label:"Blog",path:"/blog"},{label:p.category,path:`/blog?category=${p.category.toLowerCase()}`},{label:p.title}]})})}),(0,t.jsx)("div",{className:"hidden lg:block h-28"}),(0,t.jsx)("div",{className:"max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-8",children:(0,t.jsxs)("div",{className:"flex flex-col lg:flex-row gap-8 lg:gap-12",children:[(0,t.jsx)("aside",{ref:L,className:"hidden lg:block w-[200px] flex-shrink-0",children:(0,t.jsxs)("div",{className:_?"fixed left-[24px] sm:left-[48px] md:left-[64px] lg:left-[96px] xl:left-[128px] top-[220px] w-[200px] max-h-[calc(100vh-240px)] overflow-y-auto touch-auto":"max-h-[calc(100vh-240px)] overflow-y-auto touch-auto",style:_?{WebkitOverflowScrolling:"touch"}:{},children:[(0,t.jsxs)("div",{className:"space-y-8 pb-8",children:[(0,t.jsx)("h3",{className:"text-sm font-bold mb-6 uppercase tracking-wide",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Table of Contents"}),(0,t.jsx)("nav",{className:"space-y-5",children:p.headings?.map((e,a)=>{if(3===e.level)return null;let r=[];for(let e=a+1;e<p.headings.length;e++)if(3===p.headings[e].level)r.push(p.headings[e]);else if(2===p.headings[e].level)break;let l=r.length>0,o=P.includes(e.id);return(0,t.jsxs)("div",{children:[(0,t.jsx)("button",{onClick:()=>{var t=e.id;let a=document.getElementById(t);if(a){let e=a.getBoundingClientRect().top+window.pageYOffset+-120;window.scrollTo({top:e,behavior:"smooth"})}k(e.id),l?z(t=>t.includes(e.id)?[]:[e.id]):z([])},className:`w-full text-left block text-sm transition-colors ${N===e.id?"text-[#15a36e] font-semibold":"text-gray-500 hover:text-gray-900"}`,style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.title}),l&&o&&(0,t.jsx)("ul",{className:"mt-2 space-y-1.5 ml-3 border-l-2 border-gray-200 pl-3",children:r.map(e=>(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:`#${e.id}`,onClick:t=>{t.preventDefault();let a=document.getElementById(e.id);if(a){let e=a.getBoundingClientRect().top+window.pageYOffset+-120;window.scrollTo({top:e,behavior:"smooth"})}k(e.id)},className:"block text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:[(0,t.jsx)("span",{className:"w-1 h-1 bg-gray-400 rounded-full"}),e.title]})},e.id))})]},e.id)})})]}),(0,t.jsx)("hr",{className:"border-gray-200 my-8"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Share"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("button",{onClick:()=>$("twitter"),className:"w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all","aria-label":"Share on Twitter",children:(0,t.jsx)(o.FiTwitter,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>$("linkedin"),className:"w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all","aria-label":"Share on LinkedIn",children:(0,t.jsx)(o.FiLinkedin,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>$("facebook"),className:"w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all","aria-label":"Share on Facebook",children:(0,t.jsx)(o.FiFacebook,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>$("email"),className:"w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all","aria-label":"Share via Email",children:(0,t.jsx)(o.FiMail,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>$("copy"),className:"w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all","aria-label":"Copy Link",children:(0,t.jsx)(o.FiLink,{className:"w-4 h-4"})})]})]})]})}),(0,t.jsx)("main",{ref:B,className:"flex-1 min-w-0",children:(0,t.jsxs)("article",{children:[(0,t.jsxs)("header",{className:"mb-8 sm:mb-10 lg:mb-12 pt-8 lg:pt-0",children:[(0,t.jsx)("h1",{className:"text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 uppercase tracking-tight text-gray-900",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:p.title}),p.subtitle&&(0,t.jsx)("p",{className:"text-base sm:text-lg text-gray-600 mb-8 leading-relaxed !mb-8",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:p.subtitle}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3 py-5 border-y border-gray-100 mb-7",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-full bg-[#15a36e]/20 flex items-center justify-center flex-shrink-0",children:R?.avatar?(0,t.jsx)("img",{src:R.avatar,alt:R.name,className:"w-full h-full rounded-full object-cover"}):(0,t.jsx)("span",{className:"text-xs font-bold text-[#15a36e]",children:R?.name?.charAt(0)||"C"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-gray-900 !mb-0",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:R?.name||"CopyM Team"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 !mb-0",children:R?.role||"Research Team"})]})]}),(0,t.jsx)("div",{className:"h-5 w-px bg-gray-200 hidden sm:block"}),(0,t.jsx)("span",{className:"bg-[#15a36e]/10 text-[#15a36e] px-3.5 py-1.5 text-xs font-semibold rounded",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:p.category}),(0,t.jsxs)("div",{className:"flex items-center gap-3.5 text-xs text-gray-500",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(o.FiCalendar,{className:"w-3.5 h-3.5"}),p.date]}),(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(o.FiClock,{className:"w-3.5 h-3.5"}),p.readTime]})]})]}),p.image&&(0,t.jsx)("div",{className:"rounded-xl overflow-hidden mb-10",children:(0,t.jsx)("img",{src:p.image,alt:p.title,className:"w-full h-40 sm:h-56 md:h-72 lg:h-96 object-cover"})})]}),(0,t.jsx)("div",{className:"prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:p.contentBlocks&&p.contentBlocks.length>0?(0,t.jsx)(j,{contentBlocks:p.contentBlocks}):(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:p.content}})}),(0,t.jsx)("style",{children:`
              .prose h2 {
                color: #111827 !important;
                font-weight: 700 !important;
                font-size: 1.25rem !important;
                margin-top: 2rem !important;
                margin-bottom: 1rem !important;
                padding-bottom: 0.5rem !important;
                border-bottom: 2px solid #e5e7eb !important;
                letter-spacing: -0.025em !important;
                text-transform: uppercase !important;
              }
              @media (min-width: 640px) {
                .prose h2 {
                  font-size: 1.5rem !important;
                }
              }
              @media (min-width: 1024px) {
                .prose h2 {
                  font-size: 1.75rem !important;
                }
              }
              .prose h3 {
                color: #15a36e !important;
                font-weight: 600 !important;
                font-size: 1.1rem !important;
                margin-top: 1.5rem !important;
                margin-bottom: 0.75rem !important;
                padding-left: 0.75rem !important;
                border-left: 3px solid #15a36e !important;
                letter-spacing: -0.01em !important;
              }
              @media (min-width: 640px) {
                .prose h3 {
                  font-size: 1.25rem !important;
                }
              }
              .prose p {
                color: #374151 !important;
                line-height: 1.75 !important;
                margin-bottom: 1.25rem !important;
                font-size: 0.9rem !important;
              }
              @media (min-width: 640px) {
                .prose p {
                  font-size: 1rem !important;
                }
              }
              @media (min-width: 1024px) {
                .prose p {
                  font-size: 1.1rem !important;
                }
              }
              .prose ul {
                margin-top: 0.75rem !important;
                margin-bottom: 1.25rem !important;
                padding-left: 0 !important;
              }
              .prose li {
                color: #4b5563 !important;
                margin-bottom: 0.625rem !important;
                line-height: 1.6 !important;
              }
              .prose strong {
                color: #1f2937 !important;
                font-weight: 600 !important;
              }
              /* Custom scrollbar for left sidebar */
              .overflow-y-auto::-webkit-scrollbar {
                width: 4px;
              }
              .overflow-y-auto::-webkit-scrollbar-track {
                background: transparent;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 2px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }

              /* ============================================
                 INSERTABLE CONTENT BLOCKS
                 ============================================ */

              /* --- Base block style --- */
              .blog-block {
                margin: 2.5rem 0 !important;
                border-radius: 1rem !important;
                overflow: hidden !important;
                font-family: var(--font-palanquin), 'Palanquin', sans-serif !important;
              }

              /* --- CTA Block --- */
              .blog-cta {
                background: #ffffff !important;
                border: 2px solid #e5e7eb !important;
                border-left: 2px solid #e5e7eb !important;
                border-radius: 1rem !important;
                padding: 2rem 1.5rem !important;
                position: relative !important;
                overflow: hidden !important;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06) !important;
                text-align: center !important;
              }
              .blog-cta h3,
              .blog-cta__title {
                color: #000000 !important;
                border-left: none !important;
                padding-left: 0 !important;
                font-size: 1.25rem !important;
                font-weight: 700 !important;
                margin: 0 0 0.5rem !important;
                line-height: 1.3 !important;
              }
              .blog-cta__text {
                color: #6b7280 !important;
                font-size: 0.9rem !important;
                line-height: 1.6 !important;
                margin: 0 0 1.25rem !important;
              }
              .blog-cta__btn {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.5rem !important;
                background: #15a36e !important;
                color: #fff !important;
                font-weight: 600 !important;
                font-size: 0.875rem !important;
                padding: 0.625rem 1.5rem !important;
                border-radius: 9999px !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
                border: none !important;
                box-shadow: 0 4px 12px rgba(21, 163, 110, 0.3) !important;
              }
              .blog-cta__btn:hover {
                background: #12a062 !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 20px rgba(21, 163, 110, 0.4) !important;
              }

              /* --- Fast Fact / Key Fact Block --- */
              .blog-fast-fact {
                background: #f0fdf7 !important;
                border-left: 4px solid #15a36e !important;
                padding: 1.25rem 1.5rem !important;
              }
              .blog-fast-fact__label {
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #15a36e !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-fast-fact__value {
                color: #111827 !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                line-height: 1.5 !important;
                margin: 0 !important;
              }
              @media (min-width: 640px) {
                .blog-fast-fact__value {
                  font-size: 1.125rem !important;
                }
              }

              /* --- Quote Block --- */
              .blog-quote {
                background: #fafafa !important;
                border-left: 4px solid #15a36e !important;
                padding: 1.5rem 2rem !important;
                position: relative !important;
              }
              .blog-quote::before {
                content: '\\201C' !important;
                position: absolute !important;
                top: 0.5rem !important;
                left: 1rem !important;
                font-size: 4rem !important;
                color: rgba(21, 163, 110, 0.1) !important;
                line-height: 1 !important;
              }
              .blog-quote__text {
                color: #1f2937 !important;
                font-size: 0.95rem !important;
                font-style: italic !important;
                line-height: 1.7 !important;
                margin: 0 0 1rem !important;
                position: relative;
                z-index: 1;
              }
              @media (min-width: 640px) {
                .blog-quote__text {
                  font-size: 1.05rem !important;
                }
              }
              .blog-quote__author {
                display: flex !important;
                align-items: center !important;
                gap: 0.75rem !important;
              }
              .blog-quote__avatar {
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                background: rgba(21, 163, 110, 0.15) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                color: #15a36e !important;
                font-weight: 700 !important;
                font-size: 1rem !important;
                flex-shrink: 0 !important;
              }
              .blog-quote__avatar img {
                width: 100% !important;
                height: 100% !important;
                border-radius: 50% !important;
                object-fit: cover !important;
              }
              .blog-quote__name {
                font-weight: 600 !important;
                font-size: 0.875rem !important;
                color: #111827 !important;
              }
              .blog-quote__role {
                font-size: 0.75rem !important;
                color: #6b7280 !important;
              }

              /* --- Callout Block --- */
              .blog-callout {
                padding: 1.25rem 1.5rem !important;
              }
              .blog-callout__content {
                width: 100% !important;
              }
              .blog-callout__title {
                font-weight: 700 !important;
                font-size: 0.875rem !important;
                margin: 0 0 0.25rem !important;
              }
              .blog-callout__text {
                font-size: 0.875rem !important;
                line-height: 1.6 !important;
                margin: 0 !important;
              }

              /* Callout variants */
              .blog-callout--info {
                background: #eff6ff !important;
                border-left: 4px solid #3b82f6 !important;
              }
              .blog-callout--info .blog-callout__title { color: #1e40af !important; }
              .blog-callout--info .blog-callout__text { color: #1e3a5f !important; }

              .blog-callout--warning {
                background: #fefce8 !important;
                border-left: 4px solid #eab308 !important;
              }
              .blog-callout--warning .blog-callout__title { color: #854d0e !important; }
              .blog-callout--warning .blog-callout__text { color: #713f12 !important; }

              .blog-callout--note {
                background: #f5f3ff !important;
                border-left: 4px solid #8b5cf6 !important;
              }
              .blog-callout--note .blog-callout__title { color: #5b21b6 !important; }
              .blog-callout--note .blog-callout__text { color: #4c1d95 !important; }

              .blog-callout--success {
                background: #f0fdf7 !important;
                border-left: 4px solid #15a36e !important;
              }
              .blog-callout--success .blog-callout__title { color: #065f46 !important; }
              .blog-callout--success .blog-callout__text { color: #064e3b !important; }

              /* --- Table Block --- */
              .blog-table {
                border: 1px solid #e5e7eb !important;
                border-radius: 0.75rem !important;
                overflow: hidden !important;
              }
              @media (max-width: 1023px) {
                .blog-table {
                  overflow-x: auto !important;
                  -webkit-overflow-scrolling: touch !important;
                  /* Hide scrollbar visually */
                  -ms-overflow-style: none !important;
                  scrollbar-width: none !important;
                }
                .blog-table::-webkit-scrollbar {
                  display: none !important;
                }
                .blog-table table {
                  min-width: 600px !important;
                }
              }
              .blog-table table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 0 !important;
                font-size: 0.875rem !important;
              }
              .blog-table thead {
                background: #f9fafb !important;
              }
              .blog-table th {
                color: #111827 !important;
                font-weight: 600 !important;
                text-align: left !important;
                padding: 0.875rem 1rem !important;
                border-bottom: 2px solid #e5e7eb !important;
              }
              .blog-table td {
                color: #4b5563 !important;
                padding: 0.75rem 1rem !important;
                border-bottom: 1px solid #f3f4f6 !important;
              }
              .blog-table tbody tr:last-child td {
                border-bottom: none !important;
              }
              .blog-table tbody tr:hover {
                background: #f9fafb !important;
              }

              /* --- Image + Caption Block --- */
              .blog-image {
                margin: 2rem 0 !important;
                border-radius: 0.75rem !important;
                overflow: hidden !important;
                background: #f9fafb !important;
              }
              .blog-image img {
                width: 100% !important;
                height: auto !important;
                display: block !important;
              }
              .blog-image__caption {
                padding: 0.75rem 1rem !important;
                font-size: 0.8rem !important;
                color: #6b7280 !important;
                text-align: center !important;
                font-style: italic !important;
                border-top: 1px solid #e5e7eb !important;
              }

              /* --- Source / Reference Block --- */
              .blog-source {
                background: #f9fafb !important;
                border-left: 4px solid #d1d5db !important;
                padding: 1rem 1.25rem !important;
                margin: 2rem 0 !important;
              }
              .blog-source__title {
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #6b7280 !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-source__link {
                color: #15a36e !important;
                font-size: 0.85rem !important;
                text-decoration: underline !important;
                word-break: break-all !important;
                transition: color 0.2s !important;
              }
              .blog-source__link:hover {
                color: #0e7a4f !important;
              }

              /* --- Related Article Inline Block --- */
              .blog-related-article {
                background: linear-gradient(135deg, #f0fdf7 0%, #ffffff 100%) !important;
                border: 1px solid rgba(21, 163, 110, 0.2) !important;
                border-radius: 0.75rem !important;
                padding: 1.25rem 1.5rem !important;
                transition: all 0.3s ease !important;
              }
              .blog-related-article:hover {
                border-color: rgba(21, 163, 110, 0.4) !important;
                box-shadow: 0 4px 24px rgba(21, 163, 110, 0.08) !important;
              }
              .blog-related-article__label {
                display: inline-flex !important;
                align-items: center !important;
                gap: 0.375rem !important;
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                color: #15a36e !important;
                margin-bottom: 0.5rem !important;
              }
              .blog-related-article__title {
                color: #111827 !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                margin: 0 0 0.25rem !important;
                text-decoration: none !important;
                transition: color 0.2s !important;
              }
              .blog-related-article__title:hover {
                color: #15a36e !important;
              }
              .blog-related-article__meta {
                font-size: 0.75rem !important;
                color: #9ca3af !important;
              }

              /* --- Responsive --- */
              @media (max-width: 768px) {
                .blog-cta { padding: 1.5rem 1rem !important; }
                .blog-cta__title { font-size: 1.1rem !important; }
                .blog-quote { padding: 1.25rem 1rem !important; }
                .blog-quote::before { font-size: 3rem !important; }
                .blog-fast-fact { padding: 1rem 1.25rem !important; }
                .blog-table table { font-size: 0.8rem !important; }
              }
            `}),(0,t.jsx)("section",{className:"my-8 sm:my-12",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 sm:gap-6",children:[(0,t.jsxs)("div",{className:"bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col",style:{boxShadow:"0px 4px 48.9px 0px #BDE3D5"},children:[(0,t.jsx)("div",{className:"p-4 sm:p-6 flex-1",children:(0,t.jsxs)("div",{className:"flex items-start gap-3 sm:gap-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300",children:R?.avatar?(0,t.jsx)("img",{src:R.avatar,alt:R.name,className:"w-full h-full rounded-lg object-cover"}):(0,t.jsx)("span",{className:"text-xl font-bold text-[#15a36e]",children:R?.name?.charAt(0)||"C"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("span",{className:"text-xs font-bold uppercase tracking-wider text-[#15a36e] block mb-1",children:"Written By"}),(0,t.jsx)("h4",{className:"text-base sm:text-lg font-bold text-gray-900 mb-1",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:R?.name||"CopyM Team"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 mb-3 !mb-3",children:R?.role||"Research Team"}),(0,t.jsx)("p",{className:"text-sm text-gray-600 leading-relaxed !mb-0",children:R?.bio||"Our research team analyzes market trends and emerging technologies in blockchain and tokenization."})]})]})}),(0,t.jsx)("div",{className:"h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"})]}),p.reviewer&&(0,t.jsxs)("div",{className:"bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-[#15a36e]/30 transition-all duration-300 group flex flex-col",style:{boxShadow:"0px 4px 48.9px 0px #BDE3D5"},children:[(0,t.jsx)("div",{className:"p-4 sm:p-6 flex-1",children:(0,t.jsxs)("div",{className:"flex items-start gap-3 sm:gap-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#15a36e]/20 to-[#15a36e]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300",children:p.reviewer.avatar?(0,t.jsx)("img",{src:p.reviewer.avatar,alt:p.reviewer.name,className:"w-full h-full rounded-lg object-cover"}):(0,t.jsx)("span",{className:"text-xl font-bold text-[#15a36e]",children:p.reviewer.name.charAt(0)})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("span",{className:"text-xs font-bold uppercase tracking-wider text-[#15a36e] block mb-1",children:"Reviewed By"}),(0,t.jsx)("h4",{className:"text-base sm:text-lg font-bold text-gray-900 mb-1",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:p.reviewer.name}),(0,t.jsx)("p",{className:"text-xs text-gray-500 mb-3 !mb-3",children:p.reviewer.role}),(0,t.jsx)("p",{className:"text-sm text-gray-600 leading-relaxed !mb-0",children:p.reviewer.bio})]})]})}),(0,t.jsx)("div",{className:"h-1 bg-gradient-to-r from-[#15a36e] to-emerald-400"})]})]})}),p.faqs&&p.faqs.length>0&&(0,t.jsxs)("section",{className:"my-8 sm:my-12",children:[(0,t.jsx)("h3",{className:"text-xl sm:text-2xl font-bold mb-6 sm:mb-8 uppercase",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Frequently Asked Questions"}),(0,t.jsx)("div",{className:"space-y-4 sm:space-y-6",children:p.faqs.map((e,a)=>(0,t.jsxs)("div",{className:"border-b border-gray-100 pb-4 sm:pb-6 last:border-0 last:pb-0",children:[(0,t.jsx)("h4",{className:"text-sm sm:text-base font-bold text-gray-900 mb-3",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.question}),(0,t.jsx)("p",{className:"text-sm text-gray-600 leading-relaxed !mb-0",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.answer})]},a))})]}),(0,t.jsx)("section",{className:"mt-12",children:(0,t.jsxs)("div",{className:"bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-8 md:p-10 text-white relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 w-64 h-64 opacity-10",children:(0,t.jsx)("svg",{viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{fill:"#15a36e",d:"M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,34.3C59,45.5,47.1,54.2,35.1,61.8C23.1,69.4,11,75.9,-0.6,77.2C-12.2,78.5,-24.7,74.6,-36.4,68.5C-48.1,62.4,-59,54.1,-67.6,43.5C-76.2,32.9,-82.5,20,-83.1,6.8C-83.7,-6.4,-78.6,-19.9,-70.4,-31.4C-62.2,-42.9,-50.9,-52.4,-39.3,-59.3C-27.7,-66.2,-15.8,-70.5,-2.6,-69.5C10.6,-68.5,23.6,-62.2,30.5,-83.6L44.7,-76.4Z",transform:"translate(100 100)"})})}),(0,t.jsx)("div",{className:"relative z-10",children:(0,t.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-between gap-6",children:[(0,t.jsxs)("div",{className:"text-left max-w-2xl",children:[(0,t.jsx)("h3",{className:"text-xl sm:text-2xl font-bold mb-3",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Start Your Tokenization Journey"}),(0,t.jsxs)("p",{className:"text-gray-300 text-sm sm:text-base leading-relaxed !mb-0",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:["Join leading institutions using our platform ",(0,t.jsx)("br",{className:"hidden sm:block"}),"for digital asset issuance."]})]}),(0,t.jsxs)(r.default,{href:"/tokenization",className:"group inline-flex items-center justify-between min-w-[140px] sm:min-w-[160px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#12a062] rounded-full p-1 transition-all duration-300",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:[(0,t.jsx)("span",{className:"pl-3 pr-2 text-white font-semibold text-xs sm:text-sm",children:"Know More"}),(0,t.jsx)("div",{className:"w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1",children:(0,t.jsx)("svg",{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15a36e]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",strokeWidth:"3",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"})})})]})]})})]})}),(0,t.jsxs)("div",{className:"lg:hidden mt-12 space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"You May Also Like"}),(0,t.jsx)("div",{className:"space-y-3",children:u.map(e=>(0,t.jsxs)(r.default,{href:`/blog/${e.category?.toLowerCase().replace(/\s+/g,"-")}/${e.slug}`,className:"group block py-2 border-b border-gray-100 hover:border-[#15a36e] transition-colors last:border-0",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-[#15a36e]",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.category}),(0,t.jsx)("h5",{className:"text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-[#15a36e] transition-colors",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.title}),(0,t.jsx)("p",{className:"text-xs text-gray-500 mt-0.5 !mb-0",children:e.date})]},e.id||e.slug))})]}),(0,t.jsxs)("div",{className:"relative overflow-hidden bg-gradient-to-br from-[#0E0C15] to-[#1a1a1a] p-5 rounded-2xl border border-[#15a36e]/30",children:[(0,t.jsx)("div",{className:"absolute -top-10 -right-10 w-32 h-32 bg-[#15a36e]/20 rounded-full blur-3xl"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-gradient-to-br from-[#15a36e] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#15a36e]/30",children:(0,t.jsx)("svg",{className:"w-6 h-6 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-base font-bold text-white",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Subscribe to Newsletter"}),(0,t.jsx)("p",{className:"text-xs text-gray-400 !mb-0",children:"Get latest updates & insights"})]})]}),(0,t.jsxs)("button",{className:"w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group",children:["Subscribe Now",(0,t.jsx)("svg",{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7l5 5m0 0l-5 5m5-5H6"})})]})]})]})]}),(0,t.jsx)(s,{children:p.disclaimer})]})}),(0,t.jsx)("aside",{ref:S,className:"hidden lg:block w-[280px] flex-shrink-0",children:(0,t.jsxs)("div",{className:C?"fixed right-[24px] sm:right-[48px] md:right-[64px] lg:right-[96px] xl:right-[128px] top-[220px] w-[280px]":"",children:[(0,t.jsxs)("div",{className:"space-y-4 pb-8",children:[(0,t.jsx)("h4",{className:"text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"You May Also Like"}),(0,t.jsx)("div",{className:"space-y-2",children:u.map(e=>(0,t.jsxs)(r.default,{href:`/blog/${e.category?.toLowerCase().replace(/\s+/g,"-")}/${e.slug}`,className:"group block py-2 border-b border-gray-100 hover:border-[#15a36e] transition-colors last:border-0",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-[#15a36e]",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.category}),(0,t.jsx)("h5",{className:"text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-[#15a36e] transition-colors",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:e.title}),(0,t.jsx)("p",{className:"text-xs text-gray-500 mt-0.5 !mb-0",children:e.date})]},e.id||e.slug))})]}),(0,t.jsxs)("div",{className:"relative overflow-hidden bg-gradient-to-br from-[#0E0C15] to-[#1a1a1a] p-5 rounded-2xl border border-[#15a36e]/30",children:[(0,t.jsx)("div",{className:"absolute -top-10 -right-10 w-32 h-32 bg-[#15a36e]/20 rounded-full blur-3xl"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-gradient-to-br from-[#15a36e] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#15a36e]/30",children:(0,t.jsx)("svg",{className:"w-6 h-6 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-base font-bold text-white",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Subscribe to Newsletter"}),(0,t.jsx)("p",{className:"text-xs text-gray-400 !mb-0",children:"Get latest updates & insights"})]})]}),(0,t.jsxs)("button",{className:"w-full bg-gradient-to-r from-[#15a36e] to-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#15a36e]/40 transition-all duration-300 flex items-center justify-center gap-2 group",children:["Subscribe Now",(0,t.jsx)("svg",{className:"w-4 h-4 group-hover:translate-x-1 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 7l5 5m0 0l-5 5m5-5H6"})})]})]})]})]})})]})}),(0,t.jsx)("section",{className:"bg-gray-50 py-6 sm:py-8",children:(0,t.jsx)("div",{className:"max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32",children:(0,t.jsx)(n,{posts:h,title:"Related Articles"})})})]}):(0,t.jsx)("div",{className:"min-h-screen bg-white flex items-center justify-center",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-[#15a36e] mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-600 !mb-0",style:{fontFamily:"var(--font-palanquin), Palanquin, sans-serif"},children:"Loading article..."})]})})}],63431)}]);