/*
 Highmaps JS v8.0.4 (2020-03-19)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/heatmap",["highcharts"],function(q){a(q);a.Highcharts=q;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function q(a,r,e,u){a.hasOwnProperty(r)||(a[r]=u.apply(null,e))}a=a?a._modules:{};q(a,"parts-map/ColorSeriesMixin.js",[a["parts/Globals.js"]],function(a){a.colorPointMixin={setVisible:function(a){var e=this,p=a?"show":
"hide";e.visible=e.options.visible=!!a;["graphic","dataLabel"].forEach(function(a){if(e[a])e[a][p]()})}};a.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var a=this,p=this.options.nullColor,u=this.colorAxis,q=this.colorKey;(this.data.length?this.data:this.points).forEach(function(k){var e=k.getNestedProperty(q);if(e=k.options.color||(k.isNull||null===k.value?p:u&&"undefined"!==typeof e?u.toColor(e,k):k.color||a.color))k.color=e})}}});q(a,"parts-map/ColorAxis.js",
[a["parts/Globals.js"],a["parts/Color.js"],a["parts/Point.js"],a["parts/Legend.js"],a["mixins/legend-symbol.js"],a["parts/Utilities.js"]],function(a,r,e,u,q,k){"";var p=r.parse;r=k.addEvent;var x=k.erase,v=k.extend,t=k.Fx,w=k.isNumber,b=k.merge,h=k.pick,C=k.splat,l=a.Axis;k=a.Chart;var m=a.Series,d=a.colorPointMixin,f=a.noop;v(m.prototype,a.colorSeriesMixin);v(e.prototype,d);k.prototype.collectionsWithUpdate.push("colorAxis");k.prototype.collectionsWithInit.colorAxis=[k.prototype.addColorAxis];var A=
a.ColorAxis=function(){this.init.apply(this,arguments)};v(A.prototype,l.prototype);v(A.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(l.prototype.keepProps),
init:function(c,g){this.coll="colorAxis";var b=this.buildOptions.call(c,this.defaultColorAxisOptions,g);l.prototype.init.call(this,c,b);g.dataClasses&&this.initDataClasses(g);this.initStops();this.horiz=!b.opposite;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(c){var g=this.chart,y,n=0,B=g.options.chart.colorCount,a=this.options,h=c.dataClasses.length;this.dataClasses=y=[];this.legendItems=[];c.dataClasses.forEach(function(c,d){c=b(c);y.push(c);if(g.styledMode||!c.color)"category"===
a.dataClassColor?(g.styledMode||(d=g.options.colors,B=d.length,c.color=d[n]),c.colorIndex=n,n++,n===B&&(n=0)):c.color=p(a.minColor).tweenTo(p(a.maxColor),2>h?.5:d/(h-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},setTickPositions:function(){if(!this.dataClasses)return l.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(c){c.color=p(c[1])})},
buildOptions:function(c,g){var y=this.options.legend,n=g.layout?"vertical"!==g.layout:"vertical"!==y.layout;return b(c,{side:n?2:1,reversed:!n},g,{opposite:!n,showEmpty:!1,title:null,visible:y.enabled&&(g?!1!==g.visible:!0)})},setOptions:function(c){l.prototype.setOptions.call(this,c);this.options.crosshair=this.options.marker},setAxisSize:function(){var c=this.legendSymbol,g=this.chart,b=g.options.legend||{},n,a;c?(this.left=b=c.attr("x"),this.top=n=c.attr("y"),this.width=a=c.attr("width"),this.height=
c=c.attr("height"),this.right=g.chartWidth-b-a,this.bottom=g.chartHeight-n-c,this.len=this.horiz?a:c,this.pos=this.horiz?b:n):this.len=(this.horiz?b.symbolWidth:b.symbolHeight)||this.defaultLegendLength},normalizedValue:function(c){this.isLog&&(c=this.val2lin(c));return 1-(this.max-c)/(this.max-this.min||1)},toColor:function(c,g){var b=this.stops,n=this.dataClasses,a;if(n)for(a=n.length;a--;){var h=n[a];var d=h.from;b=h.to;if(("undefined"===typeof d||c>=d)&&("undefined"===typeof b||c<=b)){var f=h.color;
g&&(g.dataClass=a,g.colorIndex=h.colorIndex);break}}else{c=this.normalizedValue(c);for(a=b.length;a--&&!(c>b[a][0]););d=b[a]||b[a+1];b=b[a+1]||d;c=1-(b[0]-c)/(b[0]-d[0]||1);f=d.color.tweenTo(b.color,c)}return f},getOffset:function(){var c=this.legendGroup,g=this.chart.axisOffset[this.side];c&&(this.axisParent=c,l.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=g)},setLegendColor:function(){var c=this.reversed;
var g=c?1:0;c=c?0:1;g=this.horiz?[g,0,c,0]:[0,c,0,g];this.legendColor={linearGradient:{x1:g[0],y1:g[1],x2:g[2],y2:g[3]},stops:this.stops}},drawLegendSymbol:function(c,g){var b=c.padding,n=c.options,a=this.horiz,d=h(n.symbolWidth,a?this.defaultLegendLength:12),f=h(n.symbolHeight,a?12:this.defaultLegendLength),m=h(n.labelPadding,a?16:30);n=h(n.itemDistance,10);this.setLegendColor();g.legendSymbol=this.chart.renderer.rect(0,c.baseline-11,d,f).attr({zIndex:1}).add(g.legendGroup);this.legendItemWidth=
d+b+(a?n:m);this.legendItemHeight=f+b+(a?m:0)},setState:function(c){this.series.forEach(function(g){g.setState(c)})},visible:!0,setVisible:f,getSeriesExtremes:function(){var c=this.series,g=c.length,b;this.dataMin=Infinity;for(this.dataMax=-Infinity;g--;){var a=c[g];var d=a.colorKey=h(a.options.colorKey,a.colorKey,a.pointValKey,a.zoneAxis,"y");var f=a.pointArrayMap;var k=a[d+"Min"]&&a[d+"Max"];if(a[d+"Data"])var e=a[d+"Data"];else if(f){e=[];f=f.indexOf(d);var l=a.yData;if(0<=f&&l)for(b=0;b<l.length;b++)e.push(h(l[b][f],
l[b]))}else e=a.yData;k?(a.minColorValue=a[d+"Min"],a.maxColorValue=a[d+"Max"]):(m.prototype.getExtremes.call(a,e),a.minColorValue=a.dataMin,a.maxColorValue=a.dataMax);"undefined"!==typeof a.minColorValue&&(this.dataMin=Math.min(this.dataMin,a.minColorValue),this.dataMax=Math.max(this.dataMax,a.maxColorValue));k||m.prototype.getExtremes.call(a)}},drawCrosshair:function(c,a){var b=a&&a.plotX,g=a&&a.plotY,d=this.pos,h=this.len;if(a){var f=this.toPixels(a.getNestedProperty(a.series.colorKey));f<d?f=
d-2:f>d+h&&(f=d+h+2);a.plotX=f;a.plotY=this.len-f;l.prototype.drawCrosshair.call(this,c,a);a.plotX=b;a.plotY=g;this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},getPlotLinePath:function(c){var a=c.translatedValue;return w(a)?this.horiz?["M",a-4,this.top-6,"L",a+4,this.top-6,a,this.top,"Z"]:["M",this.left,a,"L",this.left-
6,a+6,this.left-6,a-6,"Z"]:l.prototype.getPlotLinePath.apply(this,arguments)},update:function(c,a){var g=this.chart,d=g.legend,h=this.buildOptions.call(g,{},c);this.series.forEach(function(a){a.isDirtyData=!0});(c.dataClasses&&d.allItems||this.dataClasses)&&this.destroyItems();g.options[this.coll]=b(this.userOptions,h);l.prototype.update.call(this,h,a);this.legendItem&&(this.setLegendColor(),d.colorizeItem(this,!0))},destroyItems:function(){var a=this.chart;this.legendItem?a.legend.destroyItem(this):
this.legendItems&&this.legendItems.forEach(function(c){a.legend.destroyItem(c)});a.isDirtyLegend=!0},remove:function(a){this.destroyItems();l.prototype.remove.call(this,a)},getDataClassLegendSymbols:function(){var a=this,b=this.chart,d=this.legendItems,h=b.options.legend,m=h.valueDecimals,k=h.valueSuffix||"",e;d.length||this.dataClasses.forEach(function(c,h){var g=!0,n=c.from,l=c.to,p=b.numberFormatter;e="";"undefined"===typeof n?e="< ":"undefined"===typeof l&&(e="> ");"undefined"!==typeof n&&(e+=
p(n,m)+k);"undefined"!==typeof n&&"undefined"!==typeof l&&(e+=" - ");"undefined"!==typeof l&&(e+=p(l,m)+k);d.push(v({chart:b,name:e,options:{},drawLegendSymbol:q.drawRectangle,visible:!0,setState:f,isDataClass:!0,setVisible:function(){g=this.visible=!g;a.series.forEach(function(a){a.points.forEach(function(a){a.dataClass===h&&a.setVisible(g)})});b.legend.colorizeItem(this,g)}},c))});return d},beforePadding:!1,name:""});["fill","stroke"].forEach(function(a){t.prototype[a+"Setter"]=function(){this.elem.attr(a,
p(this.start).tweenTo(p(this.end),this.pos),null,!0)}});r(k,"afterGetAxes",function(){var a=this,b=a.options;this.colorAxis=[];b.colorAxis&&(b.colorAxis=C(b.colorAxis),b.colorAxis.forEach(function(c,b){c.index=b;new A(a,c)}))});r(m,"bindAxes",function(){var a=this.axisTypes;a?-1===a.indexOf("colorAxis")&&a.push("colorAxis"):this.axisTypes=["colorAxis"]});r(u,"afterGetAllItems",function(a){var c=[],b,d;(this.chart.colorAxis||[]).forEach(function(d){(b=d.options)&&b.showInLegend&&(b.dataClasses&&b.visible?
c=c.concat(d.getDataClassLegendSymbols()):b.visible&&c.push(d),d.series.forEach(function(c){if(!c.options.showInLegend||b.dataClasses)"point"===c.options.legendType?c.points.forEach(function(c){x(a.allItems,c)}):x(a.allItems,c)}))});for(d=c.length;d--;)a.allItems.unshift(c[d])});r(u,"afterColorizeItem",function(a){a.visible&&a.item.legendColor&&a.item.legendSymbol.attr({fill:a.item.legendColor})});r(u,"afterUpdate",function(){var a=this.chart.colorAxis;a&&a.forEach(function(a,c,b){a.update({},b)})});
r(m,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});q(a,"parts-map/ColorMapSeriesMixin.js",[a["parts/Globals.js"],a["parts/Point.js"],a["parts/Utilities.js"]],function(a,r,e){var p=e.defined;e=a.noop;var q=a.seriesTypes;a.colorMapPointMixin={dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(a){r.prototype.setState.call(this,a);this.graphic&&
this.graphic.attr({zIndex:"hover"===a?1:0})}};a.colorMapSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:e,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:q.column.prototype.pointAttribs,colorAttribs:function(a){var e={};p(a.color)&&(e[this.colorProp||"fill"]=a.color);return e}}});q(a,"parts-map/HeatmapSeries.js",[a["parts/Globals.js"],a["mixins/legend-symbol.js"],a["parts/Utilities.js"]],
function(a,r,e){var q=e.clamp,p=e.extend,k=e.fireEvent,z=e.merge,x=e.pick;e=e.seriesType;var v=a.colorMapPointMixin,t=a.Series,w=a.SVGRenderer.prototype.symbols;e("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:{symbol:"rect",radius:0,lineColor:void 0,states:{hover:{lineWidthPlus:0},select:{}}},clip:!0,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},
states:{hover:{halo:!1,brightness:.2}}},z(a.colorMapSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){t.prototype.init.apply(this,arguments);var a=this.options;a.pointRange=x(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1;p(w,{ellipse:w.circle,rect:w.square})},getSymbol:t.prototype.getSymbol,setClip:function(a){var b=this.chart;t.prototype.setClip.apply(this,arguments);(!1!==this.options.clip||a)&&this.markerGroup.clip((a||
this.clipBox)&&this.sharedClipKey?b[this.sharedClipKey]:b.clipRect)},translate:function(){var a=this.options,h=a.marker&&a.marker.symbol||"",e=w[h]?h:"rect";a=this.options;var l=-1!==["circle","square"].indexOf(e);this.generatePoints();this.points.forEach(function(a){var b=a.getCellAttributes(),f={x:Math.min(b.x1,b.x2),y:Math.min(b.y1,b.y2),width:Math.max(Math.abs(b.x2-b.x1),0),height:Math.max(Math.abs(b.y2-b.y1),0)};var m=a.hasImage=0===(a.marker&&a.marker.symbol||h||"").indexOf("url");if(l){var c=
Math.abs(f.width-f.height);f.x=Math.min(b.x1,b.x2)+(f.width<f.height?0:c/2);f.y=Math.min(b.y1,b.y2)+(f.width<f.height?c/2:0);f.width=f.height=Math.min(f.width,f.height)}c={plotX:(b.x1+b.x2)/2,plotY:(b.y1+b.y2)/2,clientX:(b.x1+b.x2)/2,shapeType:"path",shapeArgs:z(!0,f,{d:w[e](f.x,f.y,f.width,f.height)})};m&&(a.marker={width:f.width,height:f.height});p(a,c)});k(this,"afterTranslate")},pointAttribs:function(b,h){var e=t.prototype.pointAttribs.call(this,b,h),l=this.options||{},m=this.chart.options.plotOptions||
{},d=m.series||{},f=m.heatmap||{};m=l.borderColor||f.borderColor||d.borderColor;d=l.borderWidth||f.borderWidth||d.borderWidth||e["stroke-width"];e.stroke=b&&b.marker&&b.marker.lineColor||l.marker&&l.marker.lineColor||m||this.color;e["stroke-width"]=d;h&&(b=z(l.states[h],l.marker&&l.marker.states[h],b.options.states&&b.options.states[h]||{}),h=b.brightness,e.fill=b.color||a.color(e.fill).brighten(h||0).get(),e.stroke=b.lineColor);return e},markerAttribs:function(a,h){var b=a.marker||{},e=this.options.marker||
{},m=a.shapeArgs||{},d={};if(a.hasImage)return{x:a.plotX,y:a.plotY};if(h){var f=e.states[h]||{};var k=b.states&&b.states[h]||{};[["width","x"],["height","y"]].forEach(function(a){d[a[0]]=(k[a[0]]||f[a[0]]||m[a[0]])+(k[a[0]+"Plus"]||f[a[0]+"Plus"]||0);d[a[1]]=m[a[1]]+(m[a[0]]-d[a[0]])/2})}return h?d:m},drawPoints:function(){var a=this;if((this.options.marker||{}).enabled||this._hasPointMarkers)t.prototype.drawPoints.call(this),this.points.forEach(function(b){b.graphic&&b.graphic[a.chart.styledMode?
"css":"animate"](a.colorAttribs(b))})},hasData:function(){return!!this.processedXData.length},getValidPoints:function(a,h){return t.prototype.getValidPoints.call(this,a,h,!0)},getBox:a.noop,drawLegendSymbol:r.drawRectangle,alignDataLabel:a.seriesTypes.column.prototype.alignDataLabel,getExtremes:function(){t.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;t.prototype.getExtremes.call(this)}}),z(v,{applyOptions:function(b,h){b=a.Point.prototype.applyOptions.call(this,
b,h);b.formatPrefix=b.isNull||null===b.value?"null":"point";return b},isValid:function(){return Infinity!==this.value&&-Infinity!==this.value},haloPath:function(a){if(!a)return[];var b=this.shapeArgs;return["M",b.x-a,b.y-a,"L",b.x-a,b.y+b.height+a,b.x+b.width+a,b.y+b.height+a,b.x+b.width+a,b.y-a,"Z"]},getCellAttributes:function(){var a=this.series,e=a.options,k=(e.colsize||1)/2,l=(e.rowsize||1)/2,m=a.xAxis,d=a.yAxis,f=this.options.marker||a.options.marker;a=a.pointPlacementToXValue();var p=x(this.pointPadding,
e.pointPadding,0),c={x1:q(Math.round(m.len-(m.translate(this.x-k,!1,!0,!1,!0,-a)||0)),-m.len,2*m.len),x2:q(Math.round(m.len-(m.translate(this.x+k,!1,!0,!1,!0,-a)||0)),-m.len,2*m.len),y1:q(Math.round(d.translate(this.y-l,!1,!0,!1,!0)||0),-d.len,2*d.len),y2:q(Math.round(d.translate(this.y+l,!1,!0,!1,!0)||0),-d.len,2*d.len)};[["width","x"],["height","y"]].forEach(function(a){var b=a[0];a=a[1];var d=a+"1",e=a+"2",g=Math.abs(c[d]-c[e]),h=f&&f.lineWidth||0,k=Math.abs(c[d]+c[e])/2;f[b]&&f[b]<g&&(c[d]=k-
f[b]/2-h/2,c[e]=k+f[b]/2+h/2);p&&("y"===a&&(d=e,e=a+"1"),c[d]+=p,c[e]-=p)});return c}}));""});q(a,"masters/modules/heatmap.src.js",[],function(){})});
//# sourceMappingURL=heatmap.js.map