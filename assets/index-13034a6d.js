var z=Object.defineProperty;var j=(s,t,e)=>t in s?z(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var c=(s,t,e)=>(j(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();class H{constructor(t){c(this,"boardPiece");this.boardPiece=t}}const O=10**9+7,T=-O;function J(s,t,e){return(s.x-t)*(s.x-t)<=e*e}function F(s){for(let t=0;t<a.COLUMNS;t++)if(J(s,3*a.PIECE_RADIUS*t+a.MASK_X_BEGIN+2*a.PIECE_RADIUS,a.PIECE_RADIUS))return t;return-1}function L(s){return s[Math.floor(Math.random()*s.length)]}function B(s){const t=[];for(let e=0;e<s.length;e++)t[e]=s[e].slice();return t}function U(s,t,e){const o=B(s);if(o[0][e]!==u.EMPTY||e<0||e>=a.COLUMNS)return{success:!1,map:o};let i=!1,n=0;for(let r=0;r<a.ROWS-1;r++)if(o[r+1][e]!==u.EMPTY){i=!0,n=r;break}return i||(n=a.ROWS-1),o[n][e]=t,{success:!0,map:o}}var u=(s=>(s[s.EMPTY=0]="EMPTY",s[s.PLAYER_1=1]="PLAYER_1",s[s.PLAYER_2=2]="PLAYER_2",s[s.DRAW=3]="DRAW",s))(u||{});const h=class{constructor(){c(this,"map");c(this,"winnerBoardPiece");this.map=[],this.winnerBoardPiece=0,this.initConstants(),this.reset()}reset(){this.map=[];for(let t=0;t<h.ROWS;t++){this.map.push([]);for(let e=0;e<h.COLUMNS;e++)this.map[t].push(0)}this.winnerBoardPiece=0}initConstants(){h.CANVAS_HEIGHT=h.SCALE*480,h.CANVAS_WIDTH=h.SCALE*640,h.PIECE_RADIUS=h.SCALE*25,h.MASK_X_BEGIN=Math.max(0,h.CANVAS_WIDTH-(3*h.COLUMNS+1)*h.PIECE_RADIUS)/2,h.MASK_Y_BEGIN=Math.max(0,h.CANVAS_HEIGHT-(3*h.ROWS+1)*h.PIECE_RADIUS)/2,h.MESSAGE_WIDTH=h.SCALE*400,h.MESSAGE_X_BEGIN=(h.CANVAS_WIDTH-h.MESSAGE_WIDTH)/2,h.MESSAGE_Y_BEGIN=h.SCALE*20}async applyPlayerAction(t,e){const{success:o,map:i}=U(this.map,t.boardPiece,e);return this.map=i,o}debug(){console.log(this.map.map(t=>t.join(" ")).join(`
`))}getWinner(){if(this.winnerBoardPiece!==0)return this.winnerBoardPiece;const t=[[0,-1],[0,1],[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1]],e=(i,n,r,l,d)=>d>=4?!0:i<0||n<0||i>=h.ROWS||n>=h.COLUMNS||this.map[i][n]!==r?!1:e(i+l[0],n+l[1],r,l,d+1);let o=0;for(let i=0;i<h.ROWS;i++)for(let n=0;n<h.COLUMNS;n++){const r=this.map[i][n];if(r!==0){for(let l=0;l<t.length;l++)if(e(i+t[l][0],n+t[l][1],r,t[l],1))return this.winnerBoardPiece=r}else o++}return o===0?this.winnerBoardPiece=3:0}getPlayerColor(t){switch(t){case 1:return h.PLAYER_1_COLOR;case 2:return h.PLAYER_2_COLOR;default:return"transparent"}}};let a=h;c(a,"ROWS",6),c(a,"COLUMNS",7),c(a,"PLAYER_1_COLOR","#ef453b"),c(a,"PLAYER_2_COLOR","#0059ff"),c(a,"PIECE_STROKE_STYLE","black"),c(a,"MASK_COLOR","#d8d8d8"),c(a,"CANVAS_HEIGHT"),c(a,"CANVAS_WIDTH"),c(a,"PIECE_RADIUS"),c(a,"MASK_X_BEGIN"),c(a,"MASK_Y_BEGIN"),c(a,"MESSAGE_WIDTH"),c(a,"MESSAGE_X_BEGIN"),c(a,"MESSAGE_Y_BEGIN"),c(a,"SCALE");const V=class extends H{constructor(e){super(e);c(this,"ownBoardPieceValue");c(this,"enemyBoardPiece");this.ownBoardPieceValue=this.getBoardPieceValue(e),this.enemyBoardPiece=e===u.PLAYER_1?u.PLAYER_2:u.PLAYER_1}getBoardPieceValue(e){return e===u.EMPTY?0:e===this.boardPiece?1:-1}getStateValue(e){let o=u.EMPTY,i=0;for(let n=0;n<a.ROWS;n++)for(let r=0;r<a.COLUMNS;r++){let l=0,d=0,m=0,C=0;for(let f=0;f<=3;f++)r+f<a.COLUMNS&&(l+=this.getBoardPieceValue(e[n][r+f])),n+f<a.ROWS&&(d+=this.getBoardPieceValue(e[n+f][r])),n+f<a.ROWS&&r+f<a.COLUMNS&&(m+=this.getBoardPieceValue(e[n+f][r+f])),n-f>=0&&r+f<7&&(C+=this.getBoardPieceValue(e[n-f][r+f]));i+=l*l*l,i+=d*d*d,i+=m*m*m,i+=C*C*C,Math.abs(l)===4?o=l>0?this.boardPiece:this.enemyBoardPiece:Math.abs(d)===4?o=d>0?this.boardPiece:this.enemyBoardPiece:Math.abs(m)===4?o=m>0?this.boardPiece:this.enemyBoardPiece:Math.abs(C)===4&&(o=C>0?this.boardPiece:this.enemyBoardPiece)}return{winnerBoardPiece:o,chain:i}}transformValues(e,o,i){const n=o===this.boardPiece,r=o===this.enemyBoardPiece;return e-=i*i,n?e=O-100-i*i:r&&(e=T+100+i*i),e}getMove(e,o,i,n){const r=this.getStateValue(e),l=r.winnerBoardPiece===this.boardPiece,d=r.winnerBoardPiece===this.enemyBoardPiece;return o>=V.MAX_DEPTH||l||d?{value:this.transformValues(r.chain,r.winnerBoardPiece,o)*this.ownBoardPieceValue,move:-1}:o%2===0?this.minState(e,o+1,i,n):this.maxState(e,o+1,i,n)}maxState(e,o,i,n){let r=T,l=[];for(let d=0;d<a.COLUMNS;d++){const{success:m,map:C}=U(e,this.boardPiece,d);if(!m)continue;const{value:f}=this.getMove(C,o,i,n);if(f>r?(r=f,l=[d]):f===r&&l.push(d),r>n)return{value:r,move:L(l)};i=Math.max(i,r)}return{value:r,move:L(l)}}minState(e,o,i,n){let r=O,l=[];for(let d=0;d<a.COLUMNS;d++){const{success:m,map:C}=U(e,this.enemyBoardPiece,d);if(!m)continue;const{value:f}=this.getMove(C,o,i,n);if(f<r?(r=f,l=[d]):f===r&&l.push(d),r<i)return{value:r,move:L(l)};n=Math.min(n,r)}return{value:r,move:L(l)}}async getAction(e){const o=B(e.map),i=this.maxState(o,0,T,O);return console.log(`AI ${this.boardPiece} choose column ${i.move} with value of ${i.value}`),i.move}};let N=V;c(N,"MAX_DEPTH",4);class w extends H{constructor(e){super(e);c(this,"clickPromiseResolver");this.clickPromiseResolver=null}doAction(e){this.clickPromiseResolver&&0<=e&&e<a.COLUMNS&&this.clickPromiseResolver(e)}getAction(e){return new Promise(o=>this.clickPromiseResolver=o)}}class k extends H{constructor(e){super(e);c(this,"actionPromiseResolver");this.actionPromiseResolver=null}doAction(e){this.actionPromiseResolver&&0<=e&&e<a.COLUMNS&&this.actionPromiseResolver(e)}getAction(e){return new Promise(o=>this.actionPromiseResolver=o)}}class X{constructor(t,e){c(this,"board");c(this,"players");c(this,"currentPlayerId");c(this,"isMoveAllowed",!1);c(this,"isGameWon",!1);c(this,"isGameEnded",!1);this.board=e,this.players=t,this.currentPlayerId=0,this.reset()}reset(){this.isMoveAllowed=!1,this.isGameWon=!1,this.board.reset()}end(){this.reset(),this.isGameEnded=!0}async start(){for(this.isMoveAllowed=!0;!this.isGameWon;){if(this.isGameEnded)return;await this.move();const t=this.board.getWinner();if(t!==u.EMPTY){console.log("[GameBase] Game over: winner is player ",t),this.isGameWon=!0,this.isMoveAllowed=!1,this.announceWinner(t);break}}}async move(){if(this.isGameEnded||!this.isMoveAllowed)return;const t=this.players[this.currentPlayerId];let e=!1;for(;!e;){if(this.isGameEnded)return;this.waitingForMove();const o=await t.getAction(this.board);this.isMoveAllowed=!1,this.beforeMoveApplied(o),e=await this.board.applyPlayerAction(t,o),this.isMoveAllowed=!0,e?this.afterMove(o):console.log("Move not allowed! Try again.")}this.currentPlayerId=this.getNextPlayer()}announceWinner(t){const e={[u.DRAW]:"draw",[u.PLAYER_1]:"Player 1",[u.PLAYER_2]:"Player 2",[u.EMPTY]:"none"}[t];console.log("[GameBase] Game over: winner is ",e,t)}getNextPlayer(){return this.currentPlayerId===0?1:0}}var A=(s=>(s.NEW_PLAYER_CONNECTION_REQUEST="NEW_PLAYER_CONNECTION_REQUEST",s.NEW_PLAYER_CONNECTION_OK="NEW_PLAYER_CONNECTION_OK",s.NEW_MATCH_REQUEST="NEW_MATCH_REQUEST",s.NEW_MATCH_OK="NEW_MATCH_OK",s.GAME_READY="GAME_READY",s.GAME_ENDED="GAME_ENDED",s.GAME_RESET="GAME_RESET",s.CONNECT_MATCH_REQUEST="CONNECT_MATCH_REQUEST",s.CONNECT_MATCH_OK="CONNECT_MATCH_OK",s.CONNECT_MATCH_FAIL="CONNECT_MATCH_FAIL",s.HUNG_UP="HUNG_UP",s.OTHER_PLAYER_HUNGUP="OTHER_PLAYER_HUNGUP",s.MOVE_MAIN="MOVE_MAIN",s.MOVE_SHADOW="MOVE_SHADOW",s))(A||{});function g(s,t){return console.log("[ws] send: ",s,t),JSON.stringify({type:s,payload:t||{}})}function Z(s){const t=JSON.parse(s);return console.log("[ws] receive: ",t),t}function ee(){const s=[];let t=!1;function e(){t||(t=!0,window.requestAnimationFrame?window.requestAnimationFrame(o):setTimeout(o,66))}function o(){s.forEach(n=>{n()}),t=!1}function i(n){n&&s.push(n)}return{add:n=>{s.length||window.addEventListener("resize",e),i(n)}}}function K(s,{x:t=0,y:e=0,r:o=0,fillStyle:i="",strokeStyle:n=""}){s.save(),s.fillStyle=i,s.strokeStyle=n,s.beginPath(),s.arc(t,e,o,0,2*Math.PI,!1),s.fill(),s.restore()}function te(s){const t=s.context;t.save(),t.fillStyle=E.MASK_COLOR,t.beginPath();const e=2*E.PIECE_RADIUS,o=3*E.PIECE_RADIUS;for(let i=0;i<E.ROWS;i++)for(let n=0;n<E.COLUMNS;n++)t.arc(o*n+E.MASK_X_BEGIN+e,o*i+E.MASK_Y_BEGIN+e,E.PIECE_RADIUS,0,2*Math.PI),t.rect(o*n+E.MASK_X_BEGIN+2*e,o*i+E.MASK_Y_BEGIN,-2*e,2*e);t.fill(),t.restore()}function W(s){s.context.clearRect(0,0,E.CANVAS_WIDTH,E.CANVAS_HEIGHT)}function b(){let s=null;const t=new Promise(e=>s=e);return s&&window.requestAnimationFrame(s),t}class E extends a{constructor(e){super();c(this,"canvas");c(this,"context");this.canvas=e,this.context=e.getContext("2d"),this.getBoardScale(),this.initConstants(),this.reset(),this.onresize()}getBoardScale(){return window.innerWidth<640?a.SCALE=.5:a.SCALE=1}onresize(){let e=a.SCALE;ee().add(()=>{this.getBoardScale(),e!==a.SCALE&&(e=a.SCALE,this.initConstants(),W(this),this.render())})}reset(){super.reset(),this.canvas&&(W(this),this.render())}initConstants(){if(super.initConstants(),this.canvas){const e=self.devicePixelRatio||1;this.canvas.width=E.CANVAS_WIDTH*e,this.canvas.height=E.CANVAS_HEIGHT*e,this.context.scale(e,e),this.canvas.style.width=E.CANVAS_WIDTH+"px",this.canvas.style.height=E.CANVAS_HEIGHT+"px"}}async animateAction(e,o,i){const n=this.getPlayerColor(i);let r=0;const l=async()=>{W(this),K(this.context,{x:3*a.PIECE_RADIUS*o+a.MASK_X_BEGIN+2*a.PIECE_RADIUS,y:r+a.MASK_Y_BEGIN+2*a.PIECE_RADIUS,r:a.PIECE_RADIUS,fillStyle:n,strokeStyle:a.PIECE_STROKE_STYLE}),this.render(),r+=a.PIECE_RADIUS};for(;e*3*a.PIECE_RADIUS>=r;)await b(),l()}render(){te(this);for(let e=0;e<a.ROWS;e++)for(let o=0;o<a.COLUMNS;o++)K(this.context,{x:3*a.PIECE_RADIUS*o+a.MASK_X_BEGIN+2*a.PIECE_RADIUS,y:3*a.PIECE_RADIUS*e+a.MASK_Y_BEGIN+2*a.PIECE_RADIUS,r:a.PIECE_RADIUS,fillStyle:this.getPlayerColor(this.map[e][o]),strokeStyle:a.PIECE_STROKE_STYLE})}async applyPlayerAction(e,o){if(this.map[0][o]!==u.EMPTY||o<0||o>=a.COLUMNS)return!1;let i=!1,n=0;for(let r=0;r<a.ROWS-1;r++)if(this.map[r+1][o]!==u.EMPTY){i=!0,n=r;break}return i||(n=a.ROWS-1),await this.animateAction(n,o,e.boardPiece),this.map[n][o]=e.boardPiece,this.debug(),await b(),this.render(),!0}}function v(s=""){const t=document.querySelector(".message-body");if(!t){console.error(".message-body not found");return}const e=document.querySelector(".message-body-content");if(!e){console.error(".message-body-content not found");return}t.hasAttribute("open")&&t.close(),e.innerHTML=s,t.showModal()}const _=document.querySelector(".statusbox"),I=document.querySelector(".statusbox-body-game"),D=document.querySelector(".statusbox-body-connection"),p=document.querySelector(".statusbox-body-player");class Y extends X{constructor(t,e){super(t,e)}beforeMoveApplied(){I&&(I.textContent=`Dropping ${this.currentPlayerId===0?"🔴":"🔵"} disc`)}waitingForMove(){!this.isMoveAllowed||this.isGameWon||(I&&(I.textContent="Wating for move"),p&&(p.textContent=this.currentPlayerId===0?"Player 1 🔴":"Player 2 🔵"))}afterMove(){}announceWinner(t){if(super.announceWinner(t),t===u.EMPTY)return;let e="<h1>Thank you for playing.</h1>";t===u.DRAW?e+="It's a draw":e+=`Player ${t} wins`,e+=".<br />After dismissing this message, click the board to reset game.",v(e),I&&(I.textContent="Game over"),p&&(p.textContent=t===u.DRAW?"It's a draw":`Player ${t===u.PLAYER_1?"1 🔴":"2 🔵"} wins`)}}function Q(s,t){const e=document.querySelector("canvas");if(!e){console.error("Canvas DOM is null");return}const o=new E(e),i=new w(u.PLAYER_1),n=new s([i,t],o);_==null||_.classList.remove("hidden"),D==null||D.classList.add("hidden"),n.start(),I&&(I.textContent="Wating for move"),p&&(p.textContent="Player 1 🔴");async function r(l){if(n.isGameWon)n.reset(),await b(),n.start();else{if(!e)return;const d=e.getBoundingClientRect(),m=l.clientX-d.left,C=l.clientY-d.top,f=F({x:m,y:C});n.currentPlayerId===0?i.doAction(f):n.currentPlayerId===1&&t instanceof w&&t.doAction(f)}}return e.addEventListener("click",r),{end:()=>{n.end(),e.removeEventListener("click",r),_==null||_.classList.add("hidden")}}}class ne extends Y{}function se(){return Q(ne,new w(u.PLAYER_2))}class ie extends Y{}function oe(){return Q(ie,new N(u.PLAYER_2))}const x=document.querySelector(".statusbox");document.querySelector(".statusbox-body-game");const G=document.querySelector(".statusbox-body-connection");document.querySelector(".statusbox-body-player");class re extends Y{constructor(t,e){super(t,e)}announceWinner(t){super.announceWinner(t)}}function ae(){const s=document.querySelector("canvas");if(!s){console.error("Canvas DOM is null");return}const t=new E(s),e=new N(u.PLAYER_1),o=new N(u.PLAYER_2),i=new re([e,o],t);x==null||x.classList.remove("hidden"),G==null||G.classList.add("hidden"),i.start();async function n(r){i.isGameWon&&(i.reset(),await b(),i.start())}return s.addEventListener("click",n),{end:()=>{i.end(),s.removeEventListener("click",n)}}}var R=(s=>(s[s.FIRST=u.PLAYER_1]="FIRST",s[s.SECOND=u.PLAYER_2]="SECOND",s))(R||{});const M=document.querySelector(".statusbox"),y=document.querySelector(".statusbox-body-game"),S=document.querySelector(".statusbox-body-connection"),P=document.querySelector(".statusbox-body-player"),ce={}.C4_SERVER_ENDPOINT?{}.C4_SERVER_ENDPOINT:"wss://c4-server.fly.dev/";class le extends X{constructor(e,o,{gameMode:i}){super(e,o);c(this,"connectionPlayerId",null);c(this,"connectionMatchId",null);c(this,"ws",null);c(this,"gameMode");c(this,"playerMain");c(this,"playerShadow");c(this,"initMatch",()=>{this.ws&&this.ws.send(g(A.NEW_MATCH_REQUEST,{playerId:this.connectionPlayerId}))});c(this,"connectToMatch",e=>{this.ws&&this.ws.send(g(A.CONNECT_MATCH_REQUEST,{playerId:this.connectionPlayerId,matchId:e}))});c(this,"messageActionHandler",e=>{var o;switch(e.type){case A.NEW_PLAYER_CONNECTION_OK:if(this.connectionPlayerId=e.payload.playerId,this.gameMode===R.FIRST)this.initMatch();else if(this.gameMode===R.SECOND){const n=new URLSearchParams(location.search).get("matchId");if(!n)return;this.connectToMatch(n)}break;case A.NEW_MATCH_OK:{this.connectionMatchId=e.payload.matchId;const i=`${location.href}?matchId=${this.connectionMatchId}`;console.log("[url] Share this",i),v(`<h1>Share this URL</h1><p>Please share this URL to your friend to start the game: <input type="text" id="copy-box" class="copy-box" readonly value="${i}" /><button type="button" id="copy-button">Copy</button></p>`);const n=document.getElementById("copy-box");n.focus(),n.select(),(o=document.getElementById("copy-button"))==null||o.addEventListener("click",async()=>{let r=!1;if(navigator.clipboard)try{await navigator.clipboard.writeText(i),console.log("Using Clipboard API to write share url into clipboard"),r=!0}catch{}r||(n==null||n.select(),n==null||n.setSelectionRange(0,99999),document.execCommand("copy"),console.log("Using fallback method to write share url into clipboard"))})}break;case A.CONNECT_MATCH_OK:this.connectionMatchId=e.payload.matchId;break;case A.CONNECT_MATCH_FAIL:v("<h1>Error</h1> Failed to connect to match."),S&&(S.textContent="Connection error");break;case A.GAME_READY:v(`<h1>Game started</h1> The first piece should be dropped by ${this.isCurrentMoveByCurrentPlayer()?"you":"the other player"}`),y&&(y.textContent="Wating for move"),P&&(P.textContent=(this.currentPlayerId===0?"Player 1 🔴":"Player 2 🔵")+" "+(this.isCurrentMoveByCurrentPlayer()?"(you)":"(the other player)")),this.start();break;case A.MOVE_SHADOW:this.playerShadow.doAction(e.payload.column);break;case A.GAME_ENDED:{const{winnerBoardPiece:i}=e.payload,n=i===u.DRAW?"It's a draw":`Player ${i===u.PLAYER_1?"1 🔴":"2 🔵"} wins`;v("<h1>Thank you for playing</h1>"+n+"<br />Next game will be started in 10 seconds."),y&&(y.textContent="Game over"),P&&(P.textContent=n)}break;case A.GAME_RESET:this.reset();break;case A.OTHER_PLAYER_HUNGUP:v("<h1>Other player disconnected</h1> Please reload the page to start a new match");break}});c(this,"beforeMoveApplied",()=>{y&&(y.textContent=`Dropping ${this.currentPlayerId===0?"🔴":"🔵"} disc`)});c(this,"waitingForMove",()=>{y&&(y.textContent="Wating for move"),P&&(P.textContent=(this.currentPlayerId===0?"Player 1 🔴":"Player 2 🔵")+" "+(this.isCurrentMoveByCurrentPlayer()?"(you)":"(the other player)"))});c(this,"afterMove",e=>{this.ws&&this.isCurrentMoveByCurrentPlayer()&&this.ws.send(g(A.MOVE_MAIN,{playerId:this.connectionPlayerId,matchId:this.connectionMatchId,column:e}))});this.gameMode=i,i===R.FIRST?(this.playerMain=e[0],this.playerShadow=e[1]):(this.playerMain=e[1],this.playerShadow=e[0]),this.initConnection()}end(){super.end(),this.endConnection()}endConnection(){this.ws&&this.ws.close()}initConnection(){this.connectionPlayerId=null,this.connectionMatchId=null,this.ws&&this.ws.close();const e=()=>{this.isMoveAllowed=!1,S&&(S.textContent="Disconnected from server"),y&&(y.textContent="Game over"),P&&(P.textContent="Disconnected from match")};this.ws=new WebSocket(ce),this.ws.addEventListener("message",o=>{this.messageActionHandler(Z(o.data))}),this.ws.addEventListener("open",()=>{this.ws&&this.ws.send(g(A.NEW_PLAYER_CONNECTION_REQUEST)),S&&(S.textContent="Connected to server"),y&&(y.textContent=""),P&&(P.textContent="")}),this.ws.addEventListener("close",o=>{console.log("[ws] close event",o),e()}),this.ws.addEventListener("error",o=>{console.log("[ws] error event",o),e()})}isCurrentMoveByCurrentPlayer(){return this.currentPlayerId+1===this.gameMode}announceWinner(e){super.announceWinner(e)}}function q(){const s=document.querySelector("canvas");if(!s){console.error("Canvas DOM is null");return}const o=new URLSearchParams(location.search).get("matchId")?R.SECOND:R.FIRST,i=new E(s),n=o===R.FIRST?[new w(u.PLAYER_1),new k(u.PLAYER_2)]:[new k(u.PLAYER_1),new w(u.PLAYER_2)],r=new le(n,i,{gameMode:o});M==null||M.classList.remove("hidden"),S==null||S.classList.remove("hidden");async function l(d){if(!r.isGameWon){if(!s)return;const m=s.getBoundingClientRect(),C=d.clientX-m.left,f=d.clientY-m.top,$=F({x:C,y:f});r.playerMain.doAction($)}}return s.addEventListener("click",l),{end:()=>{r.end(),s.removeEventListener("click",l),M==null||M.classList.add("hidden")}}}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".section-canvas");if(!s){console.error("Canvas element not found");return}const t=document.querySelector(".mode-chooser");if(!t){console.error("Mode element not found ");return}new E(s).render();const i=new URLSearchParams(location.search).get("matchId"),n=document.querySelector(".statusbox-button-back");let r=null;if(i){r=q();return}n==null||n.classList.add("hidden"),t.showModal();const l=document.querySelector(".mode-chooser-form");if(!l){console.error(".mode-chooser-form not found ");return}n==null||n.addEventListener("click",()=>{r&&r.end&&r.end(),n==null||n.classList.add("hidden"),t.showModal()}),t.addEventListener("cancel",m=>{m.preventDefault()}),t.addEventListener("close",m=>{const C=new FormData(l);d(C.get("mode"))});function d(m){console.log("initGame chosenMode:",m),n==null||n.classList.remove("hidden"),m==="offline-human"?r=se():m==="offline-ai"?r=oe():m==="online-human"?r=q():m==="ai-vs-ai"?r=ae():console.error("Invalid game mode received",m)}});