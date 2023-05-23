"use strict";(self.webpackChunk_202305_webworker_in_angular_cli_with_comlink=self.webpackChunk_202305_webworker_in_angular_cli_with_comlink||[]).push([[586],{8586:(T,c,n)=>{n.r(c),n.d(c,{default:()=>v});var f=n(5926),p=n(7746),h=n(3359),e=n(2223),l=n(4755),M=n(1667),o=n(9401),m=n(6012),u=n(1728),g=n(9114),d=n(8097),O=n(1135),i=n(5085);function P(t,_){if(1&t&&(e.TgZ(0,"span",13),e._uU(1),e.qZA()),2&t){const a=e.oxw().$implicit;e.xp6(1),e.AsE("",a.reply.create," | ",a.reply.msg,"")}}function E(t,_){if(1&t&&(e.TgZ(0,"mat-list-item",10)(1,"span",11),e._uU(2),e.qZA(),e.YNc(3,P,2,2,"span",12),e.qZA()),2&t){const a=_.$implicit;e.xp6(2),e.AsE("",a.to.create," | ",a.to.msg,""),e.xp6(1),e.Q6J("ngIf",void 0!==a.reply)}}function C(t,_){if(1&t&&(e.TgZ(0,"mat-card",7)(1,"mat-card-header")(2,"mat-card-title"),e._uU(3,"Messages"),e.qZA()(),e.TgZ(4,"mat-card-content")(5,"mat-list",8),e.YNc(6,E,4,3,"mat-list-item",9),e.qZA()()()),2&t){const a=e.oxw().ngIf;e.xp6(6),e.Q6J("ngForOf",a)}}function D(t,_){if(1&t&&(e.ynx(0),e.YNc(1,C,7,1,"mat-card",6),e.BQk()),2&t){const a=_.ngIf;e.xp6(1),e.Q6J("ngIf",a.length>0)}}const v=(()=>{var t=new WeakMap;class _{constructor(){(0,f.Z)(this,t,{writable:!0,value:void 0}),this.form=new o.cw({msg:new o.NI("",{nonNullable:!0,validators:o.kI.required})}),this.messages$=new O.X([]),(0,h.Z)(this,t,(0,e.f3M)(M.gz).snapshot.data.worker)}ngOnInit(){(0,p.Z)(this,t).onmessage=({data:s})=>{const r=this.messages$.getValue();r[r.length-1].reply={msg:s,create:this.nowString()},this.messages$.next([...r]),this.form.enable(),this.form.reset()}}sendTestMessage(s){(0,p.Z)(this,t).postMessage(s)}onSubmit(){if(this.form.valid){const s=this.form.value.msg;this.form.disable(),this.messages$.next(this.messages$.getValue().concat({to:{msg:s,create:this.nowString()}})),this.sendTestMessage(s)}}nowString(){return(new Date).toString()}}return _.\u0275fac=function(s){return new(s||_)},_.\u0275cmp=e.Xpm({type:_,selectors:[["app-simple-web-worker"]],standalone:!0,features:[e.jDz],decls:16,vars:4,consts:[[1,"center-center","wrapper"],[3,"formGroup","ngSubmit"],["matInput","","formControlName","msg","rows","5"],["align","end"],["type","submit","mat-button",""],[4,"ngIf"],["class","messages",4,"ngIf"],[1,"messages"],["role","list"],["role","listitem",4,"ngFor","ngForOf"],["role","listitem"],["matListItemTitle",""],["matListItemLine","",4,"ngIf"],["matListItemLine",""]],template:function(s,r){1&s&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(2,"mat-card")(3,"mat-card-header")(4,"mat-card-title"),e._uU(5,"Send message to worker"),e.qZA()(),e.TgZ(6,"mat-card-content")(7,"mat-form-field")(8,"mat-label"),e._uU(9,"Message"),e.qZA(),e._UZ(10,"textarea",2),e.qZA()(),e.TgZ(11,"mat-card-actions",3)(12,"button",4),e._uU(13,"Send"),e.qZA()()()(),e.YNc(14,D,2,1,"ng-container",5),e.ALo(15,"async"),e.qZA()),2&s&&(e.xp6(1),e.Q6J("formGroup",r.form),e.xp6(13),e.Q6J("ngIf",e.lcZ(15,2,r.messages$)))},dependencies:[l.ez,l.sg,l.O5,l.Ov,o.UX,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,m.QW,m.a8,m.hq,m.dn,m.dk,m.n5,u.ot,u.lW,g.lN,g.KE,g.hX,d.c,d.Nt,i.ie,i.i$,i.Tg,i.WW,i.sL],styles:["[_nghost-%COMP%]   .wrapper[_ngcontent-%COMP%]{display:inline-flex;gap:2rem}[_nghost-%COMP%]   .wrapper[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;width:600px}[_nghost-%COMP%]   .wrapper[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .wrapper[_ngcontent-%COMP%]   .messages[_ngcontent-%COMP%]{height:274px}[_nghost-%COMP%]   .wrapper[_ngcontent-%COMP%]   .messages[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{overflow:auto;margin-bottom:1rem}"]}),_})()}}]);