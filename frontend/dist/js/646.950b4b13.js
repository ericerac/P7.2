"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[646],{13646:function(e,o,l){l.r(o),l.d(o,{default:function(){return L}});var t=l(66252),s=l(49963),r=l(78199);const a=e=>((0,t.dD)("data-v-6feffa8c"),e=e(),(0,t.Cn)(),e),n={class:"wrapper"},i={class:"container"},u={class:"updateProfil-form"},c=a((()=>(0,t._)("img",{class:"logo",src:r,alt:"logo",width:"200",height:"160"},null,-1))),p=a((()=>(0,t._)("div",{class:"line-logo"},null,-1))),d={class:"fond-form"},m=a((()=>(0,t._)("span",{class:"form-title"}," Modifiez votre profil",-1))),f=a((()=>(0,t._)("div",{class:"form-group"},null,-1))),h={class:"form-group"},g=a((()=>(0,t._)("label",{for:"image"},"Choisissez une photo de profil",-1))),E={class:"form-group"},U=a((()=>(0,t._)("label",null,"Nom",-1))),b={class:"form-group"},_=a((()=>(0,t._)("label",null,"Prénom",-1))),v={class:"form-group"},R=a((()=>(0,t._)("label",null,"Email",-1))),D={class:"form-group"},P=a((()=>(0,t._)("label",{class:"btn-action",for:"submit"},"Modifier",-1))),T=a((()=>(0,t._)("label",{class:"btn-action",for:"retour"},"Retour",-1)));function N(e,o,l,r,a,N){return(0,t.wg)(),(0,t.iD)("div",n,[(0,t._)("div",i,[(0,t._)("form",u,[c,p,(0,t._)("div",d,[m,f,(0,t._)("div",h,[g,(0,t._)("input",{type:"file",name:"image",id:"PhotoPerfilChange",ref:"file",onChange:o[0]||(o[0]=(...e)=>N.FileUpload&&N.FileUpload(...e)),accept:"image/png, image/jpeg"},null,544)]),(0,t._)("div",E,[U,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":o[1]||(o[1]=o=>e.user.firstName=o),type:"text",name:"nom",class:"form-control",placeholder:"Nom",required:""},null,512),[[s.nr,e.user.firstName]])]),(0,t._)("div",b,[_,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":o[2]||(o[2]=o=>e.user.lastName=o),type:"text",name:"prenom",class:"form-control",placeholder:"Prénom",required:""},null,512),[[s.nr,e.user.lastName]])]),(0,t._)("div",v,[R,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":o[3]||(o[3]=o=>e.user.email=o),type:"email",name:"email",class:"form-control",placeholder:"Email",required:""},null,512),[[s.nr,e.user.email]])]),(0,t._)("div",D,[P,(0,t._)("input",{name:"submit",class:"btn btn-primary mt-1 btn-lg btn-block",keyUp:"enter",value:"Modifier",onClick:o[4]||(o[4]=o=>N.updateUser(e.userId))}),T,(0,t._)("input",{name:"retour",class:"btn btn-primary mt-1 btn-lg btn-block",keyUp:"enter",value:"Retour",onClick:o[5]||(o[5]=(...e)=>N.goToProfil&&N.goToProfil(...e))})])])])])])}var S=l(33907),I=(l(43653),l(30381)),O=l.n(I);const k=l(6230);let A=$cookies.get("user");console.log("USER COOKIES",A);let w=A.userId,y=A.token;console.log(w,y);var C={name:"profil",beforeMount:function(){console.log("BEFORE MOUNT")},onMounted:function(){console.log("ON MOUNTED"),console.log("USER-DATA--\x3e",user)},beforeCreate:function(){console.log("BEFORE CREATED")},mounted:function(){this.getUserData(w)},data:()=>({mode:"updateProfil",fileSelected:null,name:"",url:"http://localhost:3000",userId:w,token:y}),computed:{...(0,S.mapState)({user:"userData"})},methods:{goToProfil:function(){this.$router.push("/profil")},FileUpload(e){console.log("EVENT",e),this.fileSelected=e.target.files[0],console.log("fichier Image",this.fileSelected)},dateTime(e){return O()(e).format("DD-MM-YYYY")},getUserData(e){this.$store.dispatch("getUserData",e).then((function(e){console.log("reponse Get USER DATA Profil",e)})).catch((e=>{console.log(e)}))},updateUser(){var e=new k;this.fileSelected?(e.append("media",this.fileSelected,this.fileSelected.name),e.append("firstName",this.user.firstName),e.append("lastName",this.user.lastName),e.append("email",this.user.email),e.append("userId",this.user.id)):(e.append("firstName",this.user.firstName),e.append("lastName",this.user.lastName),e.append("email",this.user.email),e.append("userId",this.user.id)),console.log(" USER-ID UPDATE-USER UPDATE-PROFIL ----\x3e ",this.user.id),console.table("FORMDATA UPDATE-USER UPDATE-PROFIL ------\x3e",...e.entries()),this.$store.dispatch("updateUser",e).then((e=>{alert("Votre profil a bien été modifié"),this.$router.push("/profil"),console.log(e)})).catch((e=>{console.log(e)}))},deleteUser(e){const o=window.confirm("Voulez-vous vraiment supprimer votre compte ?");o&&(console.log("USER-ID PROFIL DELETE",e),this.$store.dispatch("deleteUser",e).then((e=>{e&&(console.log("RESOLVE PROFIL PAGE DELETE ------\x3e",e.data.message),alert("votre compte a été supprimé"),this.$router.push("/"))})).catch((e=>{console.log("ERREUR REQUETE PROFIL DELETE USER------\x3e",e)})))}}},F=l(83744);const M=(0,F.Z)(C,[["render",N],["__scopeId","data-v-6feffa8c"]]);var L=M}}]);
//# sourceMappingURL=646.950b4b13.js.map