define(["dojo/_base/lang"],function(lang){
	lang.setObject("priorityDecorator",function(data,rowId,rowIndex){
		if(data  && data == "True"){
			console.log("inside priority decorator");
			return "<img src='plugin/CCAScriptAdapterPlugin/getResource/cCAScriptAdapterPluginDojo/priority.png' >";
		}
	});
});