/*
 Highcharts JS v8.0.4 (2020-03-19)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/modules/broken-axis",["highcharts"],function(l){d(l);d.Highcharts=l;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function l(d,g,l,m){d.hasOwnProperty(g)||(d[g]=m.apply(null,l))}d=d?d._modules:{};l(d,"modules/broken-axis.src.js",[d["parts/Globals.js"],d["parts/Utilities.js"],d["parts/Stacking.js"]],function(d,g,l){var m=g.addEvent,
u=g.extend,v=g.find,r=g.fireEvent,w=g.isArray,q=g.pick,p=d.Axis;g=d.Series;var t=function(b,c){return v(c,function(c){return c.from<b&&b<c.to})};u(p.prototype,{isInBreak:function(b,c){var k=b.repeat||Infinity,f=b.from,a=b.to-b.from;c=c>=f?(c-f)%k:k-(f-c)%k;return b.inclusive?c<=a:c<a&&0!==c},isInAnyBreak:function(b,c){var k=this.options.breaks,f=k&&k.length,a;if(f){for(;f--;)if(this.isInBreak(k[f],b)){var e=!0;a||(a=q(k[f].showPoints,!this.isXAxis))}var h=e&&c?e&&!a:e}return h}});m(p,"afterInit",
function(){"function"===typeof this.setBreaks&&this.setBreaks(this.options.breaks,!1)});m(p,"afterSetTickPositions",function(){if(this.isBroken){var b=this.tickPositions,c=this.tickPositions.info,k=[],f;for(f=0;f<b.length;f++)this.isInAnyBreak(b[f])||k.push(b[f]);this.tickPositions=k;this.tickPositions.info=c}});m(p,"afterSetOptions",function(){this.isBroken&&(this.options.ordinal=!1)});p.prototype.setBreaks=function(b,c){function k(b){var e=b,c;for(c=0;c<a.breakArray.length;c++){var h=a.breakArray[c];
if(h.to<=b)e-=h.len;else if(h.from>=b)break;else if(a.isInBreak(h,b)){e-=b-h.from;break}}return e}function f(b){var e;for(e=0;e<a.breakArray.length;e++){var c=a.breakArray[e];if(c.from>=b)break;else c.to<b?b+=c.len:a.isInBreak(c,b)&&(b+=c.len)}return b}var a=this,e=w(b)&&!!b.length;a.isDirty=a.isBroken!==e;a.isBroken=e;a.options.breaks=a.userOptions.breaks=b;a.forceRedraw=!0;a.series.forEach(function(a){a.isDirty=!0});e||a.val2lin!==k||(delete a.val2lin,delete a.lin2val);e&&(a.userOptions.ordinal=
!1,a.val2lin=k,a.lin2val=f,a.setExtremes=function(a,b,c,e,f){if(this.isBroken){for(var k,d=this.options.breaks;k=t(a,d);)a=k.to;for(;k=t(b,d);)b=k.from;b<a&&(b=a)}p.prototype.setExtremes.call(this,a,b,c,e,f)},a.setAxisTranslation=function(b){p.prototype.setAxisTranslation.call(this,b);this.unitLength=null;if(this.isBroken){b=a.options.breaks;var c=[],e=[],k=0,f,d=a.userMin||a.min,h=a.userMax||a.max,g=q(a.pointRangePadding,0),l;b.forEach(function(b){f=b.repeat||Infinity;a.isInBreak(b,d)&&(d+=b.to%
f-d%f);a.isInBreak(b,h)&&(h-=h%f-b.from%f)});b.forEach(function(a){n=a.from;for(f=a.repeat||Infinity;n-f>d;)n-=f;for(;n<d;)n+=f;for(l=n;l<h;l+=f)c.push({value:l,move:"in"}),c.push({value:l+(a.to-a.from),move:"out",size:a.breakSize})});c.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});var m=0;var n=d;c.forEach(function(a){m+="in"===a.move?1:-1;1===m&&"in"===a.move&&(n=a.value);0===m&&(e.push({from:n,to:a.value,len:a.value-n-(a.size||0)}),k+=a.value-
n-(a.size||0))});a.breakArray=e;a.unitLength=h-d-k+g;r(a,"afterBreaks");a.staticScale?a.transA=a.staticScale:a.unitLength&&(a.transA*=(h-a.min+g)/a.unitLength);g&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=d;a.max=h}});q(c,!0)&&this.chart.redraw()};m(g,"afterGeneratePoints",function(){var b=this.options.connectNulls,c=this.points,d=this.xAxis,f=this.yAxis;if(this.isDirty)for(var a=c.length;a--;){var e=c[a],h=!(null===e.y&&!1===b)&&(d&&d.isInAnyBreak(e.x,!0)||f&&f.isInAnyBreak(e.y,!0));e.visible=
h?!1:!1!==e.options.visible}});m(g,"afterRender",function(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,q(this.pointArrayMap,["y"]))});d.Series.prototype.drawBreaks=function(b,c){var d=this,f=d.points,a,e,h,g;b&&c.forEach(function(c){a=b.breakArray||[];e=b.isXAxis?b.min:q(d.options.threshold,b.min);f.forEach(function(d){g=q(d["stack"+c.toUpperCase()],d[c]);a.forEach(function(a){h=!1;if(e<a.from&&g>a.to||e>a.from&&g<a.from)h="pointBreak";else if(e<a.from&&g>a.from&&g<a.to||e>a.from&&
g>a.to&&g<a.from)h="pointInBreak";h&&r(b,h,{point:d,brk:a})})})})};d.Series.prototype.gappedPath=function(){var b=this.currentDataGrouping,c=b&&b.gapSize;b=this.options.gapSize;var d=this.points.slice(),f=d.length-1,a=this.yAxis,e;if(b&&0<f)for("value"!==this.options.gapUnit&&(b*=this.basePointRange),c&&c>b&&c>=this.basePointRange&&(b=c),e=void 0;f--;)e&&!1!==e.visible||(e=d[f+1]),c=d[f],!1!==e.visible&&!1!==c.visible&&(e.x-c.x>b&&(e=(c.x+e.x)/2,d.splice(f+1,0,{isNull:!0,x:e}),this.options.stacking&&
(e=a.stacks[this.stackKey][e]=new l(a,a.options.stackLabels,!1,e,this.stack),e.total=0)),e=c);return this.getGraphPath(d)}});l(d,"masters/modules/broken-axis.src.js",[],function(){})});
//# sourceMappingURL=broken-axis.js.map