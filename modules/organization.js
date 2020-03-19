/*
 Highcharts JS v8.0.4 (2020-03-19)
 Organization chart series type

 (c) 2019-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/organization",["highcharts","highcharts/modules/sankey"],function(f){b(f);b.Highcharts=f;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function f(b,k,f,t){b.hasOwnProperty(k)||(b[k]=t.apply(null,f))}b=b?b._modules:{};f(b,"modules/organization.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,f){var k=
f.css,t=f.pick,u=f.seriesType,v=f.wrap,r=b.seriesTypes.sankey.prototype;u("organization","sankey",{borderColor:"#666666",borderRadius:3,linkRadius:10,borderWidth:1,dataLabels:{nodeFormatter:function(){function a(a){return Object.keys(a).reduce(function(c,d){return c+d+":"+a[d]+";"},'style="')+'"'}var c={width:"100%",height:"100%",display:"flex","flex-direction":"row","align-items":"center","justify-content":"center"},e={"max-height":"100%","border-radius":"50%"},d={width:"100%",padding:0,"text-align":"center",
"white-space":"normal"},q={margin:0},b={margin:0},h={opacity:.75,margin:"5px"};this.point.image&&(e["max-width"]="30%",d.width="70%");this.series.chart.renderer.forExport&&(c.display="block",d.position="absolute",d.left=this.point.image?"30%":0,d.top=0);c="<div "+a(c)+">";this.point.image&&(c+='<img src="'+this.point.image+'" '+a(e)+">");c+="<div "+a(d)+">";this.point.name&&(c+="<h4 "+a(q)+">"+this.point.name+"</h4>");this.point.title&&(c+="<p "+a(b)+">"+(this.point.title||"")+"</p>");this.point.description&&
(c+="<p "+a(h)+">"+this.point.description+"</p>");return c+"</div></div>"},style:{fontWeight:"normal",fontSize:"13px"},useHTML:!0},hangingIndent:20,linkColor:"#666666",linkLineWidth:1,nodeWidth:50,tooltip:{nodeFormat:"{point.name}<br>{point.title}<br>{point.description}"}},{pointAttribs:function(a,c){var e=this,d=r.pointAttribs.call(e,a,c),q=e.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},b=a.options,h=q.states&&q.states[c]||{};c=["borderRadius","linkColor","linkLineWidth"].reduce(function(a,
c){a[c]=t(h[c],b[c],q[c],e.options[c]);return a},{});a.isNode?c.borderRadius&&(d.r=c.borderRadius):(d.stroke=c.linkColor,d["stroke-width"]=c.linkLineWidth,delete d.fill);return d},createNode:function(a){a=r.createNode.call(this,a);a.getSum=function(){return 1};return a},createNodeColumn:function(){var a=r.createNodeColumn.call(this);v(a,"offset",function(a,e,d){a=a.call(this,e,d);return e.hangsFrom?{absoluteTop:e.hangsFrom.nodeY}:a});return a},translateNode:function(a,c){r.translateNode.call(this,
a,c);a.hangsFrom&&(a.shapeArgs.height-=this.options.hangingIndent,this.chart.inverted||(a.shapeArgs.y+=this.options.hangingIndent));a.nodeHeight=this.chart.inverted?a.shapeArgs.width:a.shapeArgs.height},curvedPath:function(a,c){var e=[],d;for(d=0;d<a.length;d++){var b=a[d][0];var g=a[d][1];if(0===d)e.push("M",b,g);else if(d===a.length-1)e.push("L",b,g);else if(c){var h=a[d-1][0];var f=a[d-1][1];var n=a[d+1][0];var l=a[d+1][1];if(h!==n&&f!==l){var m=h<n?1:-1;var p=f<l?1:-1;e.push("L",b-m*Math.min(Math.abs(b-
h),c),g-p*Math.min(Math.abs(g-f),c),"C",b,g,b,g,b+m*Math.min(Math.abs(b-n),c),g+p*Math.min(Math.abs(g-l),c))}}else e.push("L",b,g)}return e},translateLink:function(a){var c=a.fromNode,b=a.toNode,d=Math.round(this.options.linkLineWidth)%2/2,f=Math.floor(c.shapeArgs.x+c.shapeArgs.width)+d,g=Math.floor(c.shapeArgs.y+c.shapeArgs.height/2)+d,h=Math.floor(b.shapeArgs.x)+d,k=Math.floor(b.shapeArgs.y+b.shapeArgs.height/2)+d,n=this.options.hangingIndent;var l=b.options.offset;var m=/%$/.test(l)&&parseInt(l,
10),p=this.chart.inverted;p&&(f-=c.shapeArgs.width,h+=b.shapeArgs.width);l=Math.floor(h+(p?1:-1)*(this.colDistance-this.nodeWidth)/2)+d;m&&(50<=m||-50>=m)&&(l=h=Math.floor(h+(p?-.5:.5)*b.shapeArgs.width)+d,k=b.shapeArgs.y,0<m&&(k+=b.shapeArgs.height));b.hangsFrom===c&&(this.chart.inverted?(g=Math.floor(c.shapeArgs.y+c.shapeArgs.height-n/2)+d,k=b.shapeArgs.y+b.shapeArgs.height):g=Math.floor(c.shapeArgs.y+n/2)+d,l=h=Math.floor(b.shapeArgs.x+b.shapeArgs.width/2)+d);a.plotY=1;a.shapeType="path";a.shapeArgs=
{d:this.curvedPath([[f,g],[l,g],[l,k],[h,k]],this.options.linkRadius)}},alignDataLabel:function(a,c,f){if(f.useHTML){var d=a.shapeArgs.width,e=a.shapeArgs.height,g=this.options.borderWidth+2*this.options.dataLabels.padding;this.chart.inverted&&(d=e,e=a.shapeArgs.width);e-=g;d-=g;k(c.text.element.parentNode,{width:d+"px",height:e+"px"});k(c.text.element,{left:0,top:0,width:"100%",height:"100%",overflow:"hidden"});c.getBBox=function(){return{width:d,height:e}}}b.seriesTypes.column.prototype.alignDataLabel.apply(this,
arguments)}});""});f(b,"masters/modules/organization.src.js",[],function(){})});
//# sourceMappingURL=organization.js.map