webpackJsonp([1],{"4wfy":function(t,e){},"6i1M":function(t,e){},"9M+g":function(t,e){},"9gnk":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),i=s("Tqaz"),a=(s("Jmt5"),s("9M+g"),s("ao2D"),s("rk6y"),s("6i1M"),s("4wfy"),{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-nav",{staticClass:"mb-3",attrs:{pills:"",align:"center"}},[e("b-nav-item",{attrs:{to:"/app",active:""}},[this._v("File-Upload")]),this._v(" "),e("b-nav-item",{attrs:{to:"/accounts/logout"}},[this._v("logout")])],1)],1)},staticRenderFns:[]}),r=s("VU/8")(null,a,!1,null,null,null).exports,o=s("//Fk"),l=s.n(o),c=s("Xxa5"),u=s.n(c),h=s("exGp"),d=s.n(h),p=s("mtWM"),f=s.n(p);f.a.defaults.xsrfCookieName="csrftoken",f.a.defaults.xsrfHeaderName="X-CSRFTOKEN";var v={name:"fileChooser",mounted:function(){var t=this,e=document.createElement("script");e.setAttribute("src","https://www.dropbox.com/static/api/2/dropins.js"),e.setAttribute("id","dropboxjs"),e.setAttribute("data-app-key","55ipjhikd0zgi9c"),document.head.appendChild(e),f.a.get("http://127.0.0.1:8000/dropbox_links").then(function(e){t.attachments=e.data}),f.a.get("http://127.0.0.1:8000/accounts").then(function(e){t.user=e.data[0].username})},data:function(){return{tempAttachments:[],attachments:[],showAlert:!1,showErrAlert:!1,user:""}},methods:{dropboxIconClicked:function(){var t,e=this,s={success:(t=d()(u.a.mark(function t(s){var n,i,a;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(n=[],i=0;i<s.length;i++)(a={})._id=s[i].id,a.title=s[i].name,a.size=s[i].bytes,a.iconURL=s[i].icon,a.link=s[i].link,a.extension=". "+s[i].name.split(".")[1],n.push(a);e.tempAttachments=n,console.log(e.tempAttachments);case 4:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}),cancel:function(){},linkType:"preview",multiselect:!0,extensions:[".pdf",".doc",".docx"],folderselect:!1,sizeLimit:1024e5};Dropbox.choose(s)},saveButtonClicked:function(){var t=[],e=this;this.tempAttachments.forEach(function(s){t.push(f.a.post("http://127.0.0.1:8000/dropbox_links",{title:s.title,user:e.user,link:s.link,used:!1}))}),l.a.all(t).then(function(t){t.forEach(function(t){console.log(t)}),e.showAlert=!0},function(t){e.showErrAlert=!0})}}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-container",[s("b-row",[s("b-col",[s("b-jumbotron",{attrs:{header:"File-Upload",lead:"Teile deine MedAT-Materialien mit DropBox."}},[s("p",[t._v("Für diesen Schritt benötigst du einen "),s("a",{attrs:{href:"https://www.dropbox.com/",alt:"DropBox Account Anlegen",target:"_BLANK"}},[t._v("DropBox-Account")]),t._v(".")]),t._v(" "),s("b-button",{attrs:{id:"tooltip-target-1",variant:"primary",href:"#"},on:{click:function(e){return t.dropboxIconClicked()}}},[t._v("DropBox-Dateien Wählen")]),t._v(" "),s("b-tooltip",{attrs:{target:"tooltip-target-1",triggers:"hover"}},[t._v('\n        Auswählbar sind ".pdf",  ".doc", ".docx" Dateien.\n    ')]),t._v(" "),s("ul",{staticClass:"list-group space"},[t._l(t.tempAttachments,function(e){return s("li",{staticClass:"list-group-item disabled"},[t._v(t._s(e.title)+" "),s("span",{staticClass:"small_print"},[t._v(t._s(e.link))])])}),t._v(" "),t.tempAttachments.length?s("b-button",{staticClass:"space",attrs:{id:"",variant:"primary",href:"#"},on:{click:function(e){return t.saveButtonClicked()}}},[t._v("Auswahl Speichern")]):t._e()],2)],1),t._v(" "),s("b-alert",{attrs:{show:""}},[t._v("Bitte per DropBox Materialien auswählen und speichern")]),t._v(" "),s("b-alert",{attrs:{variant:"success"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v("Auswahl gespeichert! Bitte Profil hinzufügen nicht vergessen, wenn Du in der Tafelrunde gefeaturest werden möchtest")]),t._v(" "),s("b-alert",{attrs:{variant:"warning"},model:{value:t.showErrAlert,callback:function(e){t.showErrAlert=e},expression:"showErrAlert"}},[t._v("Auswahl nicht gespeichert! Bitte überprüfe, dass du keine Eingaben doppelt gemacht hast. Gegebenenfalls Seite neu laden")])],1)],1),t._v(" "),s("b-row",[s("b-col",[t.attachments.length?s("ul",{staticClass:"list-group space"},[s("h2",{staticClass:"space"},[t._v("Bereits Gespeicherte Links")]),t._v(" "),t._l(t.attachments,function(e){return s("li",{staticClass:"list-group-item disabled"},[t._v(t._s(e.title)+" "),s("span",{staticClass:"small_print"},[t._v(t._s(e.link))])])})],2):t._e()]),t._v(" "),s("b-col")],1)],1)],1)},staticRenderFns:[]},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-container",[s("b-row",[s("b-col",[s("h2",[s("i",{staticClass:"fas fa-chess-knight"}),t._v(" "),s("b",[t._v("Deine Vereinbarungen mit MedCastle")])])])],1),t._v(" "),s("b-row",[s("b-col",[s("b-list-group",[s("b-list-group-item",{attrs:{active:""}},[t._v("Mit dem Bereitstellen des Links gibst du den Inhalt zur Benutzung durch MedCastle frei. ")]),t._v(" "),s("b-list-group-item",{attrs:{active:""}},[s("b",[t._v("Du bist der Eigentümer des Inhalts.")])]),t._v(" "),s("b-list-group-item",[t._v("Der Inhalt darf durch MedCastle oder Dritte nicht verkauft werden.")]),t._v(" "),s("b-list-group-item",[t._v("Der Inhalt darf Online gestellt werden. Damit lässt sich die Weiterverbreitung durch Dritte nicht ausschließen.")]),t._v(" "),s("b-list-group-item",[t._v("Es gelten ")])],1)],1),t._v(" "),s("b-col",[s("p",[t._v("Es geht hier nur um die Basics, aber es ist wichtig sie abzudecken, damit sich niemand misversteht. Der blau unterlegte Punkt ist am wichtigsten.")])])],1)],1)],1)},staticRenderFns:[]};var b={name:"App",components:{Header:r,fileChooser:s("VU/8")(v,m,!1,null,null,null).exports,infoSection:s("VU/8")({name:"infoSection"},_,!1,function(t){s("sMk/")},"data-v-486952be",null).exports}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this._m(0),this._v(" "),e("Header"),this._v(" "),e("fileChooser"),this._v(" "),e("infoSection")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{attrs:{id:"header"}},[e("div",{staticClass:"inner"},[e("a",{staticClass:"med_knights",attrs:{href:"/"}},[e("span",[this._v("med"),e("strong",[this._v("Knights "),e("i",{staticClass:"fas fa-chess-knight"})])])]),this._v(" "),e("a",{staticClass:"logo",attrs:{href:"/"}},[e("span",[this._v("by med"),e("strong",[this._v("Castle "),e("i",{staticClass:"fab fa-fort-awesome magnify"})])])]),this._v(" "),e("a",{staticClass:"facebook_link",attrs:{href:"https://www.facebook.com/groups/252411336109045/"}},[e("span",[e("strong",[e("i",{staticClass:"fab fa-facebook magnify"}),this._v("-Gruppe!")])])])])])}]};var w=s("VU/8")(b,g,!1,function(t){s("9gnk")},null,null).exports;n.default.use(i.a),n.default.use(i.b),n.default.config.productionTip=!1,new n.default({el:"#app",components:{App:w},template:"<App/>"})},ao2D:function(t,e){},"sMk/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.0d56f577473311b89279.js.map