(self.webpackChunkExcalidraw=self.webpackChunkExcalidraw||[]).push([[9],{8527:(e,r,n)=>{"use strict";n.r(r),n.d(r,{decodePngMetadata:()=>m,decodeSvgMetadata:()=>L,encodePngMetadata:()=>A,encodeSvgMetadata:()=>k,getTEXtChunk:()=>E});var t=n(6086),a=n(2983),o=n.n(a),c=n(1194),i=n(3434),u=n.n(i),s=n(2744),l=function(e,r){var n,t,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,t&&(a=2&o[0]?t.return:o[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,o[1])).done)return a;switch(t=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,t=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=c.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=r.call(e,c)}catch(e){o=[6,e],t=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},f=function(e){return new Promise((function(r,n){var t="string"==typeof e?new Blob([(new TextEncoder).encode(e)]):new Blob([e]),a=new FileReader;a.onload=function(e){if(!e.target||"string"!=typeof e.target.result)return n(new Error("couldn't convert to byte string"));r(e.target.result)},a.readAsBinaryString(t)}))},d=function(e){for(var r=new ArrayBuffer(e.length),n=new Uint8Array(r),t=0,a=e.length;t<a;t++)n[t]=e.charCodeAt(t);return r},p=function(e){return new TextDecoder("utf-8").decode(d(e))},y=function(){var e=(0,t.Z)((function(e,r){var n,t;return void 0===r&&(r=!1),l(this,(function(a){switch(a.label){case 0:return r?(n=btoa(e),[3,3]):[3,1];case 1:return t=btoa,[4,f(e)];case 2:n=t.apply(void 0,[a.sent()]),a.label=3;case 3:return[2,n]}}))}));return function(r){return e.apply(this,arguments)}}(),h=function(){var e=(0,t.Z)((function(e,r){return void 0===r&&(r=!1),l(this,(function(n){return[2,r?atob(e):p(atob(e))]}))}));return function(r){return e.apply(this,arguments)}}(),w=function(){var e=(0,t.Z)((function(e){var r,n,t,a,o=e.text,c=e.compress;return l(this,(function(e){switch(e.label){case 0:if(!1===c)return[3,4];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,f((0,s.deflate)(o))];case 2:return r=e.sent(),[3,4];case 3:return n=e.sent(),console.error("encode: cannot deflate",n),[3,4];case 4:return t={version:"1",encoding:"bstring",compressed:!!r},(a=r)?[3,6]:[4,f(o)];case 5:a=e.sent(),e.label=6;case 6:return[2,(t.encoded=a,t)]}}))}));return function(r){return e.apply(this,arguments)}}(),b=function(){var e=(0,t.Z)((function(e){var r,n;return l(this,(function(t){switch(t.label){case 0:switch(e.encoding){case"bstring":return[3,1]}return[3,5];case 1:return e.compressed?(n=e.encoded,[3,4]):[3,2];case 2:return[4,p(e.encoded)];case 3:n=t.sent(),t.label=4;case 4:return r=n,[3,6];case 5:throw new Error('decode: unknown encoding "'.concat(e.encoding,'"'));case 6:return e.compressed?[2,(0,s.inflate)(new Uint8Array(d(r)),{to:"string"})]:[2,r]}}))}));return function(r){return e.apply(this,arguments)}}(),v=n(8288),g=function(e,r){var n,t,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,t&&(a=2&o[0]?t.return:o[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,o[1])).done)return a;switch(t=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,t=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=c.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=r.call(e,c)}catch(e){o=[6,e],t=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},x=function(e){return"arrayBuffer"in e?e.arrayBuffer():new Promise((function(r,n){var t=new FileReader;t.onload=function(e){var t;if(null===(t=e.target)||void 0===t||!t.result)return n(new Error("couldn't convert blob to ArrayBuffer"));r(e.target.result)},t.readAsArrayBuffer(e)}))},E=function(){var e=(0,t.Z)((function(e){var r,n,t,a;return g(this,(function(i){switch(i.label){case 0:return n=o(),t=Uint8Array.bind,[4,x(e)];case 1:return r=n.apply(void 0,[new(t.apply(Uint8Array,[void 0,i.sent()]))]),(a=r.find((function(e){return"tEXt"===e.name})))?[2,c.decode(a.data)]:[2,null]}}))}));return function(r){return e.apply(this,arguments)}}(),A=function(){var e=(0,t.Z)((function(e){var r,n,t,a,i,s,l,f,d,p=e.blob,y=e.metadata;return g(this,(function(e){switch(e.label){case 0:return n=o(),t=Uint8Array.bind,[4,x(p)];case 1:return r=n.apply(void 0,[new(t.apply(Uint8Array,[void 0,e.sent()]))]),s=(i=c).encode,l=[v.LO.excalidraw],d=(f=JSON).stringify,[4,w({text:y,compress:!0})];case 2:return a=s.apply(i,l.concat([d.apply(f,[e.sent()])])),r.splice(-1,0,a),[2,new Blob([u()(r)],{type:"image/png"})]}}))}));return function(r){return e.apply(this,arguments)}}(),m=function(){var e=(0,t.Z)((function(e){var r,n,t;return g(this,(function(a){switch(a.label){case 0:return[4,E(e)];case 1:if((null==(r=a.sent())?void 0:r.keyword)!==v.LO.excalidraw)return[3,5];a.label=2;case 2:if(a.trys.push([2,4,,5]),!("encoded"in(n=JSON.parse(r.text)))){if("type"in n&&n.type===v.r8.excalidraw)return[2,r.text];throw new Error("FAILED")}return[4,b(n)];case 3:return[2,a.sent()];case 4:throw t=a.sent(),console.error(t),new Error("FAILED");case 5:throw new Error("INVALID")}}))}));return function(r){return e.apply(this,arguments)}}(),k=function(){var e=(0,t.Z)((function(e){var r,n,t,a,o,c=e.text;return g(this,(function(e){switch(e.label){case 0:return n=y,a=(t=JSON).stringify,[4,w({text:c})];case 1:return[4,n.apply(void 0,[a.apply(t,[e.sent()]),!0])];case 2:return r=e.sent(),o="",o+="\x3c!-- payload-type:".concat(v.LO.excalidraw," --\x3e"),o+="\x3c!-- payload-version:2 --\x3e",o+="\x3c!-- payload-start --\x3e",o+=r,[2,o+="\x3c!-- payload-end --\x3e"]}}))}));return function(r){return e.apply(this,arguments)}}(),L=function(){var e=(0,t.Z)((function(e){var r,n,t,a,o,c,i,u=e.svg;return g(this,(function(e){switch(e.label){case 0:if(!u.includes("payload-type:".concat(v.LO.excalidraw)))return[3,5];if(!(r=u.match(/<!-- payload-start -->(.+?)<!-- payload-end -->/)))throw new Error("INVALID");n=u.match(/<!-- payload-version:(\d+) -->/),t=(null==n?void 0:n[1])||"1",a="1"!==t,e.label=1;case 1:return e.trys.push([1,4,,5]),[4,h(r[1],a)];case 2:if(o=e.sent(),!("encoded"in(c=JSON.parse(o)))){if("type"in c&&c.type===v.r8.excalidraw)return[2,o];throw new Error("FAILED")}return[4,b(c)];case 3:return[2,e.sent()];case 4:throw i=e.sent(),console.error(i),new Error("FAILED");case 5:throw new Error("INVALID")}}))}));return function(r){return e.apply(this,arguments)}}()}}]);