webpackJsonp([1],{"4wfy":function(t,e){},"6i1M":function(t,e){},"9M+g":function(t,e){},"9gnk":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),a=n("Tqaz"),i=(n("Jmt5"),n("9M+g"),n("ao2D"),n("rk6y"),n("6i1M"),n("4wfy"),{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-nav",{staticClass:"mb-3",attrs:{pills:"",align:"center"}},[e("b-nav-item",{attrs:{to:"/app",active:""}},[this._v("file_chooser")]),this._v(" "),e("b-nav-item",{attrs:{to:"/accounts/logout"}},[this._v("logout")])],1)],1)},staticRenderFns:[]}),r=n("VU/8")(null,i,!1,null,null,null).exports,o=n("//Fk"),c=n.n(o),l=n("Xxa5"),u=n.n(l),d=n("exGp"),h=n.n(d),p=n("mtWM"),f=n.n(p);f.a.defaults.xsrfCookieName="csrftoken",f.a.defaults.xsrfHeaderName="X-CSRFTOKEN";var v={name:"fileChooser",mounted:function(){var t=this,e=document.createElement("script");e.setAttribute("src","https://www.dropbox.com/static/api/2/dropins.js"),e.setAttribute("id","dropboxjs"),e.setAttribute("data-app-key","55ipjhikd0zgi9c"),document.head.appendChild(e),f.a.get("https://medknights.herokuapp.com/dropbox_links").then(function(e){t.attachments=e.data}),f.a.get("https://medknights.herokuapp.com/accounts").then(function(e){t.user=e.data[0].username})},data:function(){return{tempAttachments:[],attachments:[],showAlert:!1,showErrAlert:!1,user:""}},methods:{dropboxIconClicked:function(){var t,e=this,n={success:(t=h()(u.a.mark(function t(n){var s,a,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(s=[],a=0;a<n.length;a++)(i={})._id=n[a].id,i.title=n[a].name,i.size=n[a].bytes,i.iconURL=n[a].icon,i.link=n[a].link,i.extension=". "+n[a].name.split(".")[1],s.push(i);e.tempAttachments=s,console.log(e.tempAttachments);case 4:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}),cancel:function(){},linkType:"preview",multiselect:!0,extensions:[".pdf",".doc",".docx"],folderselect:!1,sizeLimit:1024e5};Dropbox.choose(n)},saveButtonClicked:function(){var t=[],e=this;this.tempAttachments.forEach(function(n){t.push(f.a.post("https://medknights.herokuapp.com/dropbox_links",{title:n.title,user:e.user,link:n.link,used:!1}))}),c.a.all(t).then(function(t){t.forEach(function(t){console.log(t)}),e.showAlert=!0},function(t){e.showErrAlert=!0})}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-container",[n("b-row",[n("b-col",[n("b-jumbotron",{attrs:{header:"file_chooser",lead:"Teile deine MedAT-Materialien mit DropBox."}},[n("p",[t._v("Für diesen Schritt benötigst du einen "),n("a",{attrs:{href:"https://www.dropbox.com/",alt:"DropBox Account Anlegen",target:"_BLANK"}},[t._v("DropBox-Account")]),t._v(".")]),t._v(" "),n("b-button",{attrs:{id:"tooltip-target-1",variant:"primary",href:"#"},on:{click:function(e){return t.dropboxIconClicked()}}},[t._v("DropBox-Dateien Wählen")]),t._v(" "),n("p",{staticClass:"mt-3"},[n("i",[t._v("Mit dem Upload willigst du den unten angeführten "),n("a",{attrs:{href:"#contract",alt:"Vereinbarungen"}},[n("b",[t._v("Vereinbarungen")])]),t._v(" ein. ")])]),t._v(" "),n("b-tooltip",{attrs:{target:"tooltip-target-1",triggers:"hover"}},[t._v('\n        Auswählbar sind ".pdf",  ".doc", ".docx" Dateien.\n    ')]),t._v(" "),n("ul",{staticClass:"list-group space"},[t._l(t.tempAttachments,function(e){return n("li",{staticClass:"list-group-item disabled"},[t._v(t._s(e.title)+" "),n("span",{staticClass:"small_print"},[t._v(t._s(e.link))])])}),t._v(" "),t.tempAttachments.length?n("b-button",{staticClass:"space",attrs:{id:"",variant:"primary",href:"#"},on:{click:function(e){return t.saveButtonClicked()}}},[t._v("Auswahl Speichern")]):t._e()],2)],1),t._v(" "),n("b-alert",{staticClass:"alert alert-dark",attrs:{show:""}},[t._v("Nachdem deine Materialien von der Redaktion geprüft wurden und bereit zur Veröffentlichung sind, erhältst du eine Einladung in die "),n("b",[t._v("Tafelrunde")]),t._v(", an deine Anmeldungs-Emailadresse zugeschickt.")]),t._v(" "),n("b-alert",{attrs:{show:""}},[t._v("Bitte per DropBox Materialien auswählen und speichern")]),t._v(" "),n("b-alert",{attrs:{variant:"success"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v("Auswahl gespeichert! Bitte Profil hinzufügen nicht vergessen, wenn Du in der Tafelrunde gefeaturest werden möchtest")]),t._v(" "),n("b-alert",{attrs:{variant:"warning"},model:{value:t.showErrAlert,callback:function(e){t.showErrAlert=e},expression:"showErrAlert"}},[t._v("Auswahl nicht gespeichert! Bitte überprüfe, dass du keine Eingaben doppelt gemacht hast. Gegebenenfalls Seite neu laden")])],1)],1),t._v(" "),n("b-row",[n("b-col",[t.attachments.length?n("ul",{staticClass:"list-group space"},[n("h2",{staticClass:"space"},[t._v("Gespeicherte Links")]),t._v(" "),t._l(t.attachments,function(e){return n("li",{staticClass:"list-group-item disabled"},[t._v(t._s(e.title)+" "),n("span",{staticClass:"small_print"},[t._v(t._s(e.link))])])})],2):t._e()]),t._v(" "),n("b-col",[n("img",{attrs:{src:"/static/img/filechooser_logo-01.png",alt:"medKnights file_chooser"}})])],1)],1)],1)},staticRenderFns:[]};var m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-container",{staticClass:"card",attrs:{id:"contract"}},[n("b-row",[n("b-col",[n("h4",[n("i",{staticClass:"fas fa-file-contract"}),t._v(" Deine Vereinbarungen mit MedCastle")])])],1),t._v(" "),n("div",{staticClass:"card-body"},[n("p",[n("b",[t._v("Du bist der Eigentümer des Inhalts.")])]),t._v(" "),n("p",[t._v("Mit dem Bereitstellen des Links gibst du den Inhalt zur Benutzung durch MedCastle frei. MedCastle teilt diese Inhalte nicht vorsätzlich mit Dritte.")]),t._v(" "),n("p",[t._v("Der Inhalt darf durch MedCastle oder Dritte nicht verkauft werden.")]),t._v(" "),n("p",[t._v("Der Inhalt darf Online gestellt werden: Damit lässt sich die Weiterverbreitung durch Dritte nicht ausschließen.")]),t._v(" "),n("p",[t._v("Es gelten die MedCastle Datenschutzrichtlinie und die AGB.")]),t._v(" "),n("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Datenschutz")]),t._v(" "),n("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("AGB")])])],1)],1)},staticRenderFns:[]};var g={name:"App",components:{Header:r,fileChooser:n("VU/8")(v,_,!1,function(t){n("qLk8")},"data-v-2b4c737c",null).exports,infoSection:n("VU/8")({name:"infoSection"},m,!1,function(t){n("nDB8")},"data-v-3216efc3",null).exports}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this._m(0),this._v(" "),e("Header"),this._v(" "),e("fileChooser"),this._v(" "),e("infoSection")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{attrs:{id:"header"}},[e("div",{staticClass:"inner"},[e("a",{staticClass:"med_knights",attrs:{href:"/"}},[e("span",[this._v("med"),e("strong",[this._v("Knights "),e("i",{staticClass:"fas fa-chess-knight"})])])]),this._v(" "),e("a",{staticClass:"logo",attrs:{href:"/"}},[e("span",[this._v("by med"),e("strong",[this._v("Castle "),e("i",{staticClass:"fab fa-fort-awesome magnify"})])])]),this._v(" "),e("a",{staticClass:"facebook_link",attrs:{href:"https://www.facebook.com/groups/252411336109045/"}},[e("span",[e("strong",[e("i",{staticClass:"fab fa-facebook magnify"}),this._v("-Gruppe!")])])])])])}]};var k=n("VU/8")(g,b,!1,function(t){n("9gnk")},null,null).exports;s.default.use(a.a),s.default.use(a.b),s.default.config.productionTip=!1,new s.default({el:"#app",components:{App:k},template:"<App/>"})},ao2D:function(t,e){},nDB8:function(t,e){},qLk8:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c23a633a98211454ef41.js.map