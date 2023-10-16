import{d as x,r as p,q as a,s as u,C as o,v,D as H,E as N,F,_ as b,G as K,H as O,c as U,I as k,t as r,J as B,K as z,L,M as R,N as q,i as h,x as E,y as M,O as S,P as V,Q as G,R as D,m as J}from"./entry.688cb742.js";import{u as A,a as Q}from"./deleteMode.95945904.js";const j={class:"player-tab"},W=x({__name:"PlayerTab",props:{player:{}},setup(y){const e=p(!1),t=p(),c=()=>{e.value=!0,setTimeout(()=>{t.value.focus()},100)};return(s,l)=>(a(),u("div",j,[o(e)?H((a(),u("input",{key:1,ref_key:"input",ref:t,"onUpdate:modelValue":l[0]||(l[0]=i=>s.player.name=i),onFocusout:l[1]||(l[1]=()=>e.value=!1),onKeydown:l[2]||(l[2]=F(()=>e.value=!1,["enter"]))},null,544)),[[N,s.player.name]]):(a(),u("div",{key:0,class:"label",onClick:c},v(s.player.name),1))]))}});const X=b(W,[["__scopeId","data-v-08fe81e0"]]),Y=["onClick"],Z=["onClick"],ee=["onKeydown"],te={class:"value"},ne=x({__name:"CounterItem",props:{counterItem:{},counterItemIndex:{}},setup(y){const e=y,{getNextColor:t}=L(),{editCounterItem:c}=K(),s=O(),l=A(),i=p(!1),I=p(0),f=U(()=>s.value.includes(e.counterItemIndex)),T=p(),_=()=>{if(l.value)if(!f.value)s.value.push(e.counterItemIndex);else{const n=s.value.indexOf(e.counterItemIndex);s.value.splice(n,1),s.value.length==0&&(l.value=!1)}else e.counterItem.color=t(e.counterItem.color)},g=()=>{I.value=new Date().getTime()},w=()=>{new Date().getTime()-I.value>500&&d()},P=()=>{i.value=!0,setTimeout(()=>{T.value.focus()},100)},C=()=>{i.value=!1,c(e.counterItem,e.counterItemIndex)},d=()=>{l.value||(l.value=!0,s.value.push(e.counterItemIndex))};return(n,m)=>(a(),u("div",{class:B(["counter-item",{selected:o(f)&&o(l)}]),style:z({backgroundColor:n.counterItem.color}),onClick:k(_,["stop"]),onPointerdown:g,onPointerup:w},[o(i)?H((a(),u("input",{key:1,ref_key:"input",ref:T,"onUpdate:modelValue":m[0]||(m[0]=$=>n.counterItem.name=$),onFocusout:C,onKeydown:F(C,["enter"])},null,40,ee)),[[N,n.counterItem.name]]):(a(),u("div",{key:0,class:"title",onClick:k(P,["stop"])},v(n.counterItem.name),9,Z)),r("div",{class:"minus",onClick:m[1]||(m[1]=k($=>n.counterItem.value--,["stop"]))}," - "),r("div",te,v(n.counterItem.value),1),r("div",{class:"add",onClick:m[2]||(m[2]=k($=>n.counterItem.value++,["stop"]))}," + ")],46,Y))}});const oe=b(ne,[["__scopeId","data-v-e818efd9"]]),se={class:"counter-container"},le={class:"player-selector"},ae={class:"players-container"},ue={class:"counter-items-container"},re=x({__name:"CounterContainer",setup(y){const e=R(),t=q(),c=A(),{addCounterItem:s,selectedPlayer:l,deleteCounterItems:i}=K(),I=()=>{t.value>0&&t.value--},f=()=>{t.value<e.value.players.length-1&&t.value++};return(T,_)=>{const g=X,w=h("Slide"),P=h("Carousel"),C=oe;return a(),u("div",se,[r("div",le,[E(P,{itemsToShow:1,wrapAround:!1,transition:500,modelValue:o(t),"onUpdate:modelValue":_[0]||(_[0]=d=>G(t)?t.value=d:null)},{default:M(()=>[(a(!0),u(S,null,V(o(e).players,(d,n)=>(a(),D(w,{key:"slide_player_"+n},{default:M(()=>[r("div",ae,[r("div",{class:"prev",onClick:I},v(o(t)>0?"<":""),1),(a(),D(g,{player:d,key:"player_"+n},null,8,["player"])),r("div",{class:"next",onClick:f},v(o(t)<o(e).players.length-1?">":""),1)])]),_:2},1024))),128))]),_:1},8,["modelValue"])]),r("div",ue,[(a(!0),u(S,null,V(o(l).counterItems,(d,n)=>(a(),D(C,{counterItem:d,key:"counterItem_"+n,counterItemIndex:n},null,8,["counterItem","counterItemIndex"]))),128))]),r("div",{class:B(["add-counter",{delete:o(c)}]),onClick:_[1]||(_[1]=()=>{o(c)?o(i)():o(s)()})},null,2)])}}});const ce=b(re,[["__scopeId","data-v-a1780c4b"]]),ie={class:"content"},me=x({__name:"index",setup(y){J({title:"Custom Counter"});const{disableDeleteMode:e}=Q();return(t,c)=>{const s=ce;return a(),u("div",ie,[E(s,{onClick:o(e)},null,8,["onClick"])])}}});export{me as default};
