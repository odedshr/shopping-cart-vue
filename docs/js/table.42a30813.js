(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["table"],{6444:function(t,e,c){},7840:function(t,e,c){"use strict";c("6444")},a928:function(t,e,c){"use strict";c.r(e);c("b0c0");var a=c("7a23"),n=Object(a["G"])("data-v-626173f9");Object(a["t"])("data-v-626173f9");var r={class:"tableView",cellspacing:"0"},o={colspan:"2"};Object(a["r"])();var b=n((function(t,e,c,n,b,s){var O=Object(a["y"])("CaloriesIcon"),j=Object(a["y"])("SugarIcon"),i=Object(a["y"])("HeartIcon"),u=Object(a["y"])("GlutenIcon"),l=Object(a["y"])("NutIcon"),d=Object(a["y"])("KosherIcon"),p=Object(a["y"])("VegetarianIcon"),h=Object(a["y"])("VeganIcon"),g=Object(a["y"])("TableViewItem");return Object(a["q"])(),Object(a["d"])("table",r,[Object(a["h"])("thead",null,[Object(a["h"])("th",o,Object(a["A"])(n.strings.name),1),Object(a["h"])("th",null,Object(a["A"])(n.strings.price),1),Object(a["h"])("th",null,Object(a["A"])(n.strings.servings),1),Object(a["h"])("th",{title:n.strings.kCal},[Object(a["h"])(O)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.lowSugar},[Object(a["h"])(j)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.lowFat},[Object(a["h"])(i)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.glutenFree},[Object(a["h"])(u)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.nutFree},[Object(a["h"])(l)],8,["title"]),Object(a["h"])("th",{title:n.strings.kosherParve},[Object(a["h"])(d)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.vegetarian},[Object(a["h"])(p)],8,["title"]),Object(a["h"])("th",{class:"boolCol",title:n.strings.vegan},[Object(a["h"])(h)],8,["title"])]),Object(a["h"])("tbody",null,[(Object(a["q"])(!0),Object(a["d"])(a["a"],null,Object(a["w"])(n.products,(function(t){return Object(a["q"])(),Object(a["d"])(g,{key:t.id,product:t},null,8,["product"])})),128))])])})),s=c("5502"),O=c("55b6"),j=Object(a["G"])("data-v-3f16201a");Object(a["t"])("data-v-3f16201a");var i={class:"product"},u={class:"product_image_col"},l={class:"product_image"},d={class:"product_actions"},p=Object(a["h"])("span",null,"Add to basket",-1),h={class:"product_qty"},g={class:"product_name"},I={class:"product_cost"},v={class:"product_servings"},y={class:"product_kCalPerServing"},f={class:"product_lowSugar"},_=Object(a["g"])(" "),k={class:"product_lowFat"},w=Object(a["g"])(" "),m={class:"product_glutenFree"},C=Object(a["g"])(" "),V={class:"product_nutFree"},q=Object(a["g"])(" "),A={class:"product_kosher"},F={class:"product_vegetarian"},S=Object(a["g"])(" "),G={class:"product_vegan"},H=Object(a["g"])(" ");Object(a["r"])();var N=j((function(t,e,c,n,r,o){var b=Object(a["y"])("BasketIcon"),s=Object(a["y"])("SugarIcon"),O=Object(a["y"])("HeartIcon"),j=Object(a["y"])("GlutenIcon"),N=Object(a["y"])("NutIcon"),T=Object(a["y"])("VegetarianIcon"),B=Object(a["y"])("VeganIcon");return Object(a["q"])(),Object(a["d"])("tr",i,[Object(a["h"])("td",u,[Object(a["h"])("figure",l,[Object(a["h"])("img",{src:t.product.images[0].src,alt:t.product.images[0].alt},null,8,["src","alt"])]),Object(a["h"])("div",d,[Object(a["h"])("button",{class:"product_action product_addBasket",onClick:e[1]||(e[1]=function(e){return t.addToCart(t.product)})},[Object(a["h"])(b),p]),Object(a["h"])("div",h,Object(a["A"])(t.count),1)])]),Object(a["h"])("td",g,Object(a["A"])(t.product.name),1),Object(a["h"])("td",I,Object(a["A"])(t.product.price),1),Object(a["h"])("td",v,Object(a["A"])(t.product.servings),1),Object(a["h"])("td",y,Object(a["A"])(t.product.nutrition.kCalPerServing),1),Object(a["h"])("td",f,[t.product.lowSugar?(Object(a["q"])(),Object(a["d"])(s,{key:0})):Object(a["e"])("",!0),_]),Object(a["h"])("td",k,[t.product.nutrition.lowFat?(Object(a["q"])(),Object(a["d"])(O,{key:0})):Object(a["e"])("",!0),w]),Object(a["h"])("td",m,[t.product.dietaryOptions.glutenFree?(Object(a["q"])(),Object(a["d"])(j,{key:0})):Object(a["e"])("",!0),C]),Object(a["h"])("td",V,[t.product.dietaryOptions.nutFree?(Object(a["q"])(),Object(a["d"])(N,{key:0})):Object(a["e"])("",!0),q]),Object(a["h"])("td",A,Object(a["A"])(t.product.dietaryOptions.kosher),1),Object(a["h"])("td",F,[t.product.dietaryOptions.vegetarian?(Object(a["q"])(),Object(a["d"])(T,{key:0})):Object(a["e"])("",!0),S]),Object(a["h"])("td",G,[t.product.dietaryOptions.vegan?(Object(a["q"])(),Object(a["d"])(B,{key:0})):Object(a["e"])("",!0),H])])})),T=c("5e66"),B=c("6f67"),P=c("9dac"),J=c("b9a2"),K=c("4a57"),L=c("78b4"),x=c("0aae"),z=Object(a["i"])({name:"ListViewItem",props:["product"],components:{BasketIcon:T["a"],SugarIcon:B["a"],HeartIcon:P["a"],GlutenIcon:J["a"],NutIcon:K["a"],VegetarianIcon:L["a"],VeganIcon:x["a"]},setup:function(t){var e=O["a"].strings,c=Object(s["b"])(),n=Object(a["b"])((function(){var e;return(null===(e=c.state.cart[t.product.id])||void 0===e?void 0:e.quantity)||"+"}));function r(t){c.dispatch("cart/addItem",t)}return{count:n,addToCart:r,strings:e}}});c("f7c1");z.render=N,z.__scopeId="data-v-3f16201a";var D=z,E=c("7b26"),M=c("3389"),Q={name:"ListView",components:{TableViewItem:D,SugarIcon:B["a"],HeartIcon:P["a"],GlutenIcon:J["a"],NutIcon:K["a"],KosherIcon:E["a"],VegetarianIcon:L["a"],VeganIcon:x["a"],CaloriesIcon:M["a"]},setup:function(){var t=Object(s["b"])(),e=Object(a["b"])((function(){return t.state.products.items}));return{strings:O["a"].strings,products:e,store:t}}};c("7840");Q.render=b,Q.__scopeId="data-v-626173f9";e["default"]=Q},bd9f:function(t,e,c){},f7c1:function(t,e,c){"use strict";c("bd9f")}}]);
//# sourceMappingURL=table.42a30813.js.map