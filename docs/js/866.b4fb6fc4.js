"use strict";(globalThis["webpackChunkroster_builder"]=globalThis["webpackChunkroster_builder"]||[]).push([[866],{6866:(t,e,s)=>{s.r(e),s.d(e,{default:()=>X});var i=s(9835),o=s(6970);const n={class:"schedule track"},l={class:"time-slots track full-track"},a={key:0,class:"line"},r={class:"title text-h5 q-pt-sm"},d={class:"tracks"},u={class:"slot-header flex row justify-end"},c={class:"slot-content"};function m(t,e,s,m,h,p){const w=(0,i.up)("q-btn"),v=(0,i.up)("q-page");return(0,i.wg)(),(0,i.j4)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(w,{icon:"add",onClick:t.onAdd,class:"q-mt-sm print-hide",round:"",color:"primary"},null,8,["onClick"]),(0,i._)("div",n,[(0,i._)("div",l,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.timeBlocks,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t.toKey(),class:"time-slot",style:(0,o.j5)({"grid-row":"time-"+t.toKey()})},[0===t.minute?((0,i.wg)(),(0,i.iD)("div",a)):(0,i.kq)("",!0),(0,i.Uk)(" "+(0,o.zw)(t),1)],4)))),128))]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.schedule.days,(e=>((0,i.wg)(),(0,i.iD)("div",{class:"day-track full-track",key:e.name},[(0,i._)("div",r,(0,o.zw)(e.name),1),(0,i._)("div",d,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.getTracks(),(s=>((0,i.wg)(),(0,i.iD)("div",{class:"track",key:s.id},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.getSlots(),(n=>((0,i.wg)(),(0,i.iD)("div",{key:n.id,class:"slot",style:(0,o.j5)({"grid-row":`time-${n.start.toKey()} / time-${n.end.toKey()}`})},[(0,i._)("div",u,[(0,i.Wm)(w,{icon:"delete",size:"sm",round:"",flat:"",onClick:()=>t.removeSlot(e,s,n)},null,8,["onClick"])]),(0,i._)("div",c,[(0,i._)("div",null,(0,o.zw)(n.eventName),1),(0,i._)("div",null,(0,o.zw)(n.persons),1)])],4)))),128))])))),128))])])))),128))])])),_:1})}var h=s(1809),p=s(499),w=s(4308);class v{constructor(t,e={}){this.slotsIntersect=(t,e)=>!(!t.start.isBefore(e.start)||!t.end.isAfter(e.end))||(!(!t.start.isAfter(e.start)||!t.end.isBefore(e.end))||(!(!t.start.isBefore(e.start)||!t.end.isAfter(e.start))||!(!t.start.isBefore(e.end)||!t.end.isAfter(e.start)))),this.slotFits=(t,e)=>void 0===Object.values(e.slots).find((e=>this.slotsIntersect(e,t))),this.findTrackForSlot=t=>this.getTracks().find((e=>this.slotFits(t,e))),this.findTrackOrCreate=t=>this.findTrackForSlot(t)||this.addTrack(),this.addSlot=t=>{const e=this.findTrackOrCreate(t);e.slots[t.id]=t},this.name=t,this.tracks=e}addTrack(){const t=(0,w.Z)(),e=new g(t);return this.tracks[t]=e,e}getTracks(){return Object.values(this.tracks)}}class g{constructor(t,e={}){this.id=t,this.slots=e}getSlots(){return Object.values(this.slots)}}class k{constructor(t,e,s,i,o){this.id=t,this.eventName=e,this.persons=s,this.start=i,this.end=o}}class f{constructor(t=0,e=0){this.minute=0,this.hour=0,this.addMinutes=t=>{this.hour+=Math.floor((this.minute+t)/60),this.minute=(this.minute+t)%60},this.toString=()=>`${this.hour}:${this.minute.toString().padStart(2,"0")}`,this.toKey=()=>`${this.hour.toString().padStart(2,"0")}${this.minute.toString().padStart(2,"0")}`,this.isBefore=t=>this.hour<t.hour||this.hour===t.hour&&this.minute<t.minute,this.isAfter=t=>this.hour>t.hour||this.hour===t.hour&&this.minute>t.minute,this.equals=t=>this.hour===t.hour&&this.minute===t.minute,this.hour=null!==t&&void 0!==t?t:8,this.minute=null!==e&&void 0!==e?e:30}static parse(t){const e=t.split(":"),s=Number(e[0]),i=Number(e[1]);return new f(s,i)}}const y=(0,h.Q_)("schedule",(()=>{const t=(0,p.iH)([new v("Maandag"),new v("Dinsdag"),new v("Woensdag"),new v("Donderdag"),new v("Vrijdag")]),e=(t,e,s,i)=>new k((0,w.Z)(),t,e,s,i),s=(e,s)=>{const i=t.value[e].findTrackForSlot(s);return void 0!==i?i:t.value[e].addTrack()},i=(e,s,i)=>{const o=t.value[e].tracks[s];o.slots[i.id]=i};return{days:t,createSlot:e,getTrack:s,addSlot:i}}),{persist:{afterRestore:t=>{const e=t.store.days,s=e.map((t=>{const e={};return Object.values(t.tracks).forEach((t=>{const s={};Object.values(t.slots).forEach((t=>{const e=new k(t.id,t.eventName,t.persons,new f(t.start.hour,t.start.minute),new f(t.end.hour,t.end.minute));s[e.id]=e}));const i=new g(t.id,s);e[i.id]=i})),new v(t.name,e)}));t.store.days=s}}});var _=s(1957);const S=t=>((0,i.dD)("data-v-1ee8bd0e"),t=t(),(0,i.Cn)(),t),b=S((()=>(0,i._)("div",{class:"text-h4",style:{overflow:"hidden"}},"Nieuw event",-1))),W={class:"row items-center justify-between"},q={class:"cursor-pointer"},Z={class:"row items-center"},V=S((()=>(0,i._)("span",null,"Begintijd",-1))),C={class:"cursor-pointer"},T={class:"row items-center"},j=S((()=>(0,i._)("span",null,"Eindtijd",-1)));function D(t,e,s,n,l,a){const r=(0,i.up)("q-card-section"),d=(0,i.up)("q-input"),u=(0,i.up)("q-select"),c=(0,i.up)("q-icon"),m=(0,i.up)("q-space"),h=(0,i.up)("q-btn"),p=(0,i.up)("q-time"),w=(0,i.up)("q-popup-proxy"),v=(0,i.up)("q-form"),g=(0,i.up)("q-card"),k=(0,i.up)("q-dialog"),f=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.j4)(k,{id:"dialog",ref:"dialog",onHide:e[5]||(e[5]=()=>t.$emit("hide")),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(g,{style:{width:"50%","min-width":"500px","max-width":"unset"}},{default:(0,i.w5)((()=>[(0,i.Wm)(r,{id:"title-section"},{default:(0,i.w5)((()=>[b])),_:1}),(0,i.Wm)(v,{onSubmit:(0,_.iM)(t.onSave,["prevent"])},{default:(0,i.w5)((()=>[(0,i.Wm)(r,{class:"q-gutter-y-sm"},{default:(0,i.w5)((()=>[(0,i.Wm)(d,{filled:"",modelValue:t.eventName,"onUpdate:modelValue":e[0]||(e[0]=e=>t.eventName=e),label:"Wat *","lazy-rules":"",rules:[t=>t&&t.length>0||"Veld is verplicht"]},null,8,["modelValue","rules"]),(0,i.Wm)(d,{filled:"",modelValue:t.name,"onUpdate:modelValue":e[1]||(e[1]=e=>t.name=e),label:"Door wie *","lazy-rules":"",rules:[t=>t&&t.length>0||"Veld is verplicht"]},null,8,["modelValue","rules"]),(0,i.Wm)(u,{modelValue:t.day,"onUpdate:modelValue":e[2]||(e[2]=e=>t.day=e),options:t.schedule.days.map(((t,e)=>e)),"option-label":e=>null===e?"":t.schedule.days[e].name,filled:""},null,8,["modelValue","options","option-label"]),(0,i._)("div",W,[(0,i._)("div",q,[(0,i.Uk)(" Begint om "+(0,o.zw)(t.timeStart)+" ",1),(0,i.Wm)(c,{name:"access_time"}),(0,i.Wm)(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{modelValue:t.timeStart,"onUpdate:modelValue":e[3]||(e[3]=e=>t.timeStart=e),"hour-options":[8,9,10,11,12,13,14,15,16,17],"minute-options":[0,30]},{default:(0,i.w5)((()=>[(0,i._)("div",Z,[V,(0,i.Wm)(m),(0,i.wy)((0,i.Wm)(h,{label:"Ok",color:"primary",flat:""},null,512),[[f]])])])),_:1},8,["modelValue"])])),_:1})]),(0,i._)("div",C,[(0,i.Uk)(" Eindigt om "+(0,o.zw)(t.timeEnd)+" ",1),(0,i.Wm)(c,{name:"access_time"}),(0,i.Wm)(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{modelValue:t.timeEnd,"onUpdate:modelValue":e[4]||(e[4]=e=>t.timeEnd=e),"hour-options":[8,9,10,11,12,13,14,15,16,17],"minute-options":[0,30]},{default:(0,i.w5)((()=>[(0,i._)("div",T,[j,(0,i.Wm)(m),(0,i.wy)((0,i.Wm)(h,{label:"Ok",color:"primary",flat:""},null,512),[[f]])])])),_:1},8,["modelValue"])])),_:1})])])])),_:1}),(0,i.Wm)(r,{id:"action-section",class:"row q-gutter-x-sm q-pt-xl"},{default:(0,i.w5)((()=>[(0,i.Wm)(h,{outline:"",icon:"close",label:"Sluiten",onClick:t.hide},null,8,["onClick"]),(0,i.Wm)(m),(0,i.Wm)(h,{icon:"add",color:"primary",label:"Toevoegen",type:"submit"})])),_:1})])),_:1},8,["onSubmit"])])),_:1})])),_:1},512)}const Q=(0,i.aZ)({name:"AddSlotDialog",emits:["ok","hide"],setup(){const t=y();return{schedule:t,name:(0,p.iH)(""),eventName:(0,p.iH)(""),timeStart:(0,p.iH)("08:00"),timeEnd:(0,p.iH)("17:00"),day:(0,p.iH)(0)}},methods:{show(){this.dialogComponent.show()},hide(){this.dialogComponent.hide()},onSave(){const t=this.schedule.createSlot(this.eventName.trim(),this.name.trim(),f.parse(this.timeStart),f.parse(this.timeEnd)),e=this.schedule.getTrack(this.day,t);this.schedule.addSlot(this.day,e.id,t),this.$emit("ok",t),this.hide()}},computed:{dialogComponent(){return this.$refs["dialog"]}}});var B=s(1639),H=s(7743),x=s(4458),N=s(3190),O=s(8326),$=s(6611),z=s(4199),E=s(2857),K=s(2765),A=s(3326),U=s(136),I=s(4455),F=s(2146),M=s(9984),P=s.n(M);const Y=(0,B.Z)(Q,[["render",D],["__scopeId","data-v-1ee8bd0e"]]),R=Y;P()(Q,"components",{QDialog:H.Z,QCard:x.Z,QCardSection:N.Z,QForm:O.Z,QInput:$.Z,QSelect:z.Z,QIcon:E.Z,QPopupProxy:K.Z,QTime:A.Z,QSpace:U.Z,QBtn:I.Z}),P()(Q,"directives",{ClosePopup:F.Z});const G=(0,i.aZ)({name:"IndexPage",setup(){const t=y();return{schedule:t}},methods:{onAdd(){this.$q.dialog({component:R})},removeSlot(t,e,s){delete e.slots[s.id],0===Object.values(e.slots).length&&delete t.tracks[e.id]}},computed:{timeBlocks(){const t=30,e=new f(8,0),s=[];while(e.hour<=17)s.push(new f(e.hour,e.minute)),e.addMinutes(t);return s}}});var J=s(9885);const L=(0,B.Z)(G,[["render",m],["__scopeId","data-v-b5ce4b8c"]]),X=L;P()(G,"components",{QPage:J.Z,QBtn:I.Z})}}]);