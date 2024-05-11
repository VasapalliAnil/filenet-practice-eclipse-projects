define(["dojo/_base/declare", "ecm/model/Action"], function(declare, Action) {
    return declare("downloadMenuItemsDojo.AsOriginal", [Action], {
        isEnabled: function(repository, listType, items, teamspace, resultSet) {
            if(repository.name == ""){
            	return false;
            }
            return true;
        },
        isVisible: function(repository, listType) {
            return this.inherited(arguments);
        },
        performAction: function(repository, itemList, callback, teamspace, resultSet, parameterMap) {
        	console.log("inside custom download as original ");
            ecm.widget.layout.CommonActionsHandler.prototype.actionDownloadAsOriginal(repository, itemList, callback, teamspace, resultSet, parameterMap);
        }
    });
});