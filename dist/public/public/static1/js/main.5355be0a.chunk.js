(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{147:function(e,t,r){e.exports=r(297)},152:function(e,t,r){},292:function(e,t){},297:function(e,t,r){"use strict";r.r(t);var n,a,o,i,c,l,u,s,m,b,f,p,h,O,d,y,j,v,g,E,C,w,R,k=r(0),N=r.n(k),I=r(9),A=r.n(I),S=r(14),x=r(16),T=r(18),M=r(17),_=r(19),D=(r(152),r(29)),B=r(13),z=r(11),P=(r(155),r(10)),W=(n=function e(t,r,n,u,s){Object(S.a)(this,e),Object(B.a)(this,"name",a,this),Object(B.a)(this,"username",o,this),Object(B.a)(this,"socket",i,this),Object(B.a)(this,"status",c,this),Object(B.a)(this,"chessman",l,this),this.name=t,this.username=r,this.socket=n,this.status=u,this.chessman=s},a=Object(z.a)(n.prototype,"name",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),o=Object(z.a)(n.prototype,"username",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),i=Object(z.a)(n.prototype,"socket",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),c=Object(z.a)(n.prototype,"status",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),l=Object(z.a)(n.prototype,"chessman",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),n),L=(u=function e(t,r,n,a,o,i){Object(S.a)(this,e),Object(B.a)(this,"id",s,this),Object(B.a)(this,"playerWhite",m,this),Object(B.a)(this,"playerBlack",b,this),Object(B.a)(this,"status",f,this),Object(B.a)(this,"currentChessman",p,this),Object(B.a)(this,"board",h,this),this.id=t,this.playerWhite=r,this.playerBlack=n,this.status=a,this.board=o,this.chessman=i},s=Object(z.a)(u.prototype,"id",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),m=Object(z.a)(u.prototype,"playerWhite",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),b=Object(z.a)(u.prototype,"playerBlack",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),f=Object(z.a)(u.prototype,"status",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),p=Object(z.a)(u.prototype,"currentChessman",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),h=Object(z.a)(u.prototype,"board",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),u),V=new(O=function(){function e(){Object(S.a)(this,e),Object(B.a)(this,"visibleModalName",d,this),Object(B.a)(this,"userStore",y,this),Object(B.a)(this,"roomsStore",j,this),Object(B.a)(this,"currentRoomId",v,this),Object(B.a)(this,"status",g,this),Object(B.a)(this,"board",E,this),Object(B.a)(this,"submitModalName",C,this),Object(B.a)(this,"updateRoom",w,this),Object(B.a)(this,"setCurrentRoom",R,this)}return Object(x.a)(e,[{key:"getCurrentRoom",get:function(){var e=this;return this.roomsStore.filter(function(t){return t.id==e.currentRoomId})[0]}},{key:"yourTurn",get:function(){var e=this.getCurrentRoom;return this.player.chessman==e.currentChessman}},{key:"partner",get:function(){var e=this.getCurrentRoom;return e.playerBlack&&this.userStore.username==e.playerBlack.username?e.playerWhite:e.playerBlack}},{key:"player",get:function(){var e=this.getCurrentRoom;return e.playerWhite&&this.userStore.username==e.playerWhite.username?e.playerWhite:e.playerBlack}}]),e}(),d=Object(z.a)(O.prototype,"visibleModalName",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),y=Object(z.a)(O.prototype,"userStore",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),j=Object(z.a)(O.prototype,"roomsStore",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),v=Object(z.a)(O.prototype,"currentRoomId",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),g=Object(z.a)(O.prototype,"status",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"choose room"}}),E=Object(z.a)(O.prototype,"board",[P.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Array(8).fill(null).map(function(){return new Array(8).fill(null)})}}),C=Object(z.a)(O.prototype,"submitModalName",[P.d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.visibleModalName=!1;var r=t.user;e.userStore=new W(r.name,r.username,r.socket,r.status,r.chessman),t.rooms.forEach(function(t){e.roomsStore.push(new L(t.id,t.playerWhite,t.playerBlack,t.status,t.board,t.currentChessman))})}}}),w=Object(z.a)(O.prototype,"updateRoom",[P.d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){console.log(t),e.roomsStore=e.roomsStore.map(function(e){return e.id==t.id&&Object.keys(t).map(function(r){e[r]=t[r]}),e})}}}),R=Object(z.a)(O.prototype,"setCurrentRoom",[P.d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.status="playing",e.currentRoomId=t.id}}}),Object(z.a)(O.prototype,"getCurrentRoom",[P.e],Object.getOwnPropertyDescriptor(O.prototype,"getCurrentRoom"),O.prototype),Object(z.a)(O.prototype,"yourTurn",[P.e],Object.getOwnPropertyDescriptor(O.prototype,"yourTurn"),O.prototype),Object(z.a)(O.prototype,"partner",[P.e],Object.getOwnPropertyDescriptor(O.prototype,"partner"),O.prototype),Object(z.a)(O.prototype,"player",[P.e],Object.getOwnPropertyDescriptor(O.prototype,"player"),O.prototype),O),G=r(303),U=r(1),J=r.n(U),F=r(302),Y=function(e){function t(){var e,r;Object(S.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(T.a)(this,(e=Object(M.a)(t)).call.apply(e,[this].concat(a)))).handleSubmit=function(e){e.preventDefault(),r.props.form.validateFieldsAndScroll(function(e,t){e||r.props.onSubmit(t)})},r.getForm=function(){return r.props.form},r}return Object(_.a)(t,e),Object(x.a)(t,[{key:"getChildContext",value:function(){return{form:this.props.form}}},{key:"render",value:function(){return N.a.createElement(F.a,{onSubmit:this.handleSubmit},this.props.children)}}]),t}(k.Component);Y.childContextTypes={form:J.a.object.isRequired};var H=F.a.create()(Y),K=r(32),q=r(31);function X(e){return void 0==e||null==e||""==e}function $(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r={};return t?(Object.keys(Object(K.a)({},e)).forEach(function(n){n!==t&&(r[n]=e[n])}),r):e}var Q=function(){return function(e){var t=function(t){function r(e){return Object(S.a)(this,r),Object(T.a)(this,Object(M.a)(r).call(this,e))}return Object(_.a)(r,t),Object(x.a)(r,[{key:"render",value:function(){var t=this.context.form.getFieldDecorator,r=this.props,n=r.onChange,a=r.defaultValue,o=r.rules,i=r.name,c={};o&&(c.rules=o),n&&(c.onChange=n),a&&(c.initialValue=a);var l=$(this.props,"defaultValue");return N.a.createElement(F.a.Item,null,t(i,c)(N.a.createElement(e,l,this.props.children)))}}]),r}(k.Component);return t.contextTypes={form:J.a.object.isRequired},t}},Z=r(304),ee=Q()(Z.a),te=function(e){function t(){var e,r;Object(S.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(T.a)(this,(e=Object(M.a)(t)).call.apply(e,[this].concat(a)))).getValue=function(){return r.context.form.getFieldValue(r.props.name)},r.setValue=function(e){r.context.form.setFieldsValue(Object(q.a)({},r.props.name,e))},r.clear=function(){r.setValue("")},r.addSuffixClearValueToProps=function(e){var t=void 0===r.getValue()?e.defaultValue:r.getValue();return e=$(e,"suffixClear"),t?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return r&&n?(r=N.a.cloneElement(r,t),Object(K.a)({},e,Object(q.a)({},n,r))):e}(e,{onClick:function(){r.clear()}},r.props.suffix,"suffix"):$(e,"suffix")},r}return Object(_.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this.props,t=e.suffixClear,r=e.suffix,n=Object(K.a)({},this.props);return t&&r&&(n=this.addSuffixClearValueToProps(n)),N.a.createElement(ee,n)}}]),t}(k.Component);te.contextTypes={form:J.a.object.isRequired};var re,ne,ae,oe=r(93),ie=function(e){function t(){return Object(S.a)(this,t),Object(T.a)(this,Object(M.a)(t).apply(this,arguments))}return Object(_.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){return N.a.createElement(F.a.Item,null,N.a.createElement(oe.a,this.props,this.props.children))}}]),t}(k.Component),ce=r(136),le=r.n(ce)()("/"),ue={CONNECTION:"connection",LOG_IN:"LOGIN",LOG_OUT:"disconnect",JOIN_ROOM:"JOIN_ROOM",READY_TO_PLAY:"READY_TO_PLAY",TICK:"TICK"},se={LOG_IN_SUCCESS:"LOG_IN_SUCCESS",JOINED_ROOM:"JOINED_ROOM",OUT_ROOM:"OUT_ROOM",UPDATE_ROOM:"UPDATE_ROOM",JOINED_GAME:"JOINED_GAME",UPDATE_BOARD:"UPDATE_BOARD",FINISH:"FINISH"},me={Board:{ROW:8,COL:8,Cell:{EMPTY:null,WHITE:1,BLACK:2}},Status:{EMPTY:0,AVAILABLE:1,PLAYING:2}},be=se,fe=ue,pe=Object(D.a)(re=function(e){function t(){var e,r;Object(S.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(T.a)(this,(e=Object(M.a)(t)).call.apply(e,[this].concat(a)))).submitModalName=function(e){le.emit(fe.LOG_IN,e),le.on(be.LOG_IN_SUCCESS,function(e){V.submitModalName(e)})},r}return Object(_.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){return N.a.createElement(G.a,{title:"\u0110i\u1ec1n t\xean c\u1ee7a b\u1ea1n",visible:V.visibleModalName,footer:null,closable:!1},N.a.createElement(H,{onSubmit:this.submitModalName},N.a.createElement(te,{name:"name",suffixClear:!0,placeholder:"Nh\u1eadp t\xean c\u1ee7a b\u1ea1n",rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp t\xean c\u1ee7a b\u1ea1n!"}]}),N.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},N.a.createElement(ie,{type:"primary",htmlType:"submit"},"\u0110\u1ed3ng \xfd"))))}}]),t}(k.Component))||re,he=r(305),Oe=r(300),de=r(301),ye=r(298),je=r(299),ve=se,ge=ue,Ee=Object(D.a)(ne=function(e){function t(){var e,r;Object(S.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(T.a)(this,(e=Object(M.a)(t)).call.apply(e,[this].concat(a)))).joinRoom=function(e){console.log(e),le.emit(ge.JOIN_ROOM,{roomId:e.id})},r.countPlayer=function(e){var t=0;return X(e.playerWhite)||t++,X(e.playerBlack)||t++,t},r.renderRoom=function(e){var t=r.countPlayer(e);return N.a.createElement(ye.a,{span:4},N.a.createElement("div",{className:"room",onClick:function(){2!=e.status&&r.joinRoom(e)}},N.a.createElement("div",{className:"room-empty "+"room-".concat(e.status,"-user")},N.a.createElement("div",{className:"text"},t,"/2")),N.a.createElement("div",{className:"room-name"},"Ph\xf2ng ",e.id)))},r}return Object(_.a)(t,e),Object(x.a)(t,[{key:"componentWillMount",value:function(){le.on(ve.UPDATE_ROOM,function(e){V.updateRoom(e)}),le.on(ve.JOINED_ROOM,function(e){V.updateRoom(e),V.setCurrentRoom(e)})}},{key:"render",value:function(){var e=this;return N.a.createElement("div",null,N.a.createElement(je.a,{gutter:24},V.roomsStore.map(function(t,r){return e.renderRoom(t)})))}}]),t}(k.Component))||ne,Ce=r(144);function we(e){return void 0===e}function Re(e){return null==e}var ke=se,Ne=ue,Ie=me,Ae=[-1,-1,-1,1,1,1,0,0],Se=[-1,0,1,-1,0,1,-1,1];function xe(e,t,r,n,a,o,i){for(var c=0,l=n+o,u=a+i;;){if(!(0<=l&&l<8&&0<=u&&u<8))return!1;if(e[l][u]!=r){if(e[l][u]==t)break;return!1}c++,l+=o,u+=i}return c>0}var Te,Me=Object(D.a)(ae=function(e){function t(e){var r;return Object(S.a)(this,t),(r=Object(T.a)(this,Object(M.a)(t).call(this,e))).onClickCell=function(e,t,r){V.getCurrentRoom.board[e][t]=V.player.chessman,r.forEach(function(r){!function(e,t,r,n,a,o,i){console.log(o+",",i);for(var c=n+o,l=a+i;;){if(!(0<=c&&c<8&&0<=l&&l<8))return;if(e[c][l]!=r){if(e[c][l]==t)break;return}console.log(e),e[c][l]=t,c+=o,l+=i}}(V.getCurrentRoom.board,V.player.chessman,V.partner.chessman,e,t,r.xx,r.yy)}),le.emit(Ne.TICK,V.getCurrentRoom.board)},r.createFences=function(){var e=function e(t){if(!we(t))return Re(t)?null:t.slice&&Array.isArray(t.slice())?t.map(function(t){return e(t)}):"object"===typeof t?Object.entries(t).reduce(function(t,r){var n=Object(Ce.a)(r,2),a=n[0],o=n[1];return Object(K.a)({},t,Object(q.a)({},a,e(o)))},{}):t}(V.getCurrentRoom.board);console.log(e);for(var t=0;t<8;t++)for(var r=0;r<8;r++)if(1==e[t][r]||2==e[t][r])for(var n=0;n<8;n++)0<=t+Ae[n]&&t+Ae[n]<8&&0<=r+Se[n]&&r+Se[n]<8&&!e[t+Ae[n]][r+Se[n]]&&(e[t+Ae[n]][r+Se[n]]=-1);return e},r.isAvailableMove=function(e,t,r){var n,a=new Array(8).fill(null).map(function(){return new Array(8)});n=1==r?2:1;for(var o=0;o<8;o++)for(var i=0;i<8;i++)if(-1==e[o][i])for(var c=0;c<8;c++){xe(t,r,n,o,i,Ae[c],Se[c])&&(e[o][i]=-2,void 0==a[o][i]&&(a[o][i]=[]),a[o][i].push({xx:Ae[c],yy:Se[c]}))}return a},r.renderBoard=function(){var e=r.createFences(),t=r.isAvailableMove(e,V.getCurrentRoom.board,V.player.chessman);return console.log(V.player.chessman),N.a.createElement("div",{className:"board-game"},V.getCurrentRoom.board.map(function(e,n){return N.a.createElement("div",{className:"board-row",key:n},e.map(function(e,a){return N.a.createElement("div",{className:"cell-game",key:a,onClick:function(){t[n][a]&&V.yourTurn&&r.onClickCell(n,a,t[n][a])}},e==Ie.Board.Cell.BLACK?N.a.createElement("div",{className:"dot-black"}):e==Ie.Board.Cell.WHITE?N.a.createElement("div",{className:"dot-white"}):N.a.createElement("div",{className:t[n][a]&&V.yourTurn?V.player.chessman==Ie.Board.Cell.BLACK?"hover-black":"hover-white":"not-allowed"}))}))}))},r}return Object(_.a)(t,e),Object(x.a)(t,[{key:"componentWillMount",value:function(){le.on(ke.JOINED_GAME,function(e){V.updateRoom(e)}),le.on(ke.UPDATE_BOARD,function(e){V.updateRoom(e)})}},{key:"render",value:function(){return V.getCurrentRoom.status==Ie.Status.PLAYING?this.renderBoard():N.a.createElement("div",{className:"waiting-partner"},"\u0110ang \u0111\u1ee3i \u0111\u1ed1i th\u1ee7...")}}]),t}(k.Component))||ae,_e=he.a.Header,De=he.a.Sider,Be=he.a.Content,ze=Object(D.a)(Te=function(e){function t(){return Object(S.a)(this,t),Object(T.a)(this,Object(M.a)(t).apply(this,arguments))}return Object(_.a)(t,e),Object(x.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=V.userStore;return N.a.createElement("div",null,N.a.createElement(pe,null),N.a.createElement(he.a,{className:"layout"},N.a.createElement(_e,null,N.a.createElement("div",{style:{color:"#fff",fontSize:"22px",fontWeight:"bold",textAlign:"center"}},"Ch\u1ecdn ph\xf2ng")),N.a.createElement(he.a,null,N.a.createElement(De,{width:200,style:{background:"#fff"}},N.a.createElement("div",{style:{padding:20,display:"flex",alignItems:"center",flexDirection:"column"}},N.a.createElement(Oe.a,{size:100,icon:"user"}),N.a.createElement("div",{style:{marginTop:20}},"Xin ch\xe0o,"),N.a.createElement("div",{style:{fontWeight:"bold"}},e.name),N.a.createElement(de.a,null))),N.a.createElement(Be,{style:{background:"#e2e2e2",padding:24,margin:0,minWidth:"800px",minHeight:"calc(100vh - 64px)"}},N.a.createElement("div",{style:{background:"#fff",width:"100%",height:"100%",padding:24,borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center"}},"choose room"==V.status?N.a.createElement(Ee,null):N.a.createElement(Me,null))))))}}]),t}(k.Component))||Te;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));A.a.render(N.a.createElement(ze,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[147,2,1]]]);
//# sourceMappingURL=main.5355be0a.chunk.js.map