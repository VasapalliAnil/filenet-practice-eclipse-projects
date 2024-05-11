require(["dojo/_base/lang", "dojo/aspect", "ecm/model/SearchCriterion","icm/pgwidget/viewer/Viewer",
         "ecm/widget/listView/ContentList","icm/base/Constants","icm/model/properties/controller/ControllerManager"], 
         function(lang, aspect, Criterion, viewer, contentList, Constants, ControllerManager) {
	var creditCardTypeController;
    lang.setObject("icmscripts", {        
    	preFillingNewCaseProps: function(payload) {
            console.log("Pre Filling New Case Props Script adapter loaded" + payload);
            var eventname = payload.eventName;
            //* Get the coordination and editable objects from the event payload. */
            var editable = payload.caseEditable;
            //get some props controllers for later handling of those properties
            if (eventname == "icm.SendNewCaseInfo") {
                var coordination = payload.coordination;
                var solutionPrefix = payload.caseType.getSolution().getPrefix();
                /* Use the LOADWIDGET coordination topic handler to obtain the controller binding */
                /* for the editable and to update the properties. */
                coordination.participate(Constants.CoordTopic.LOADWIDGET, function(context, complete, abort) {
                    /* Obtain the controller binding for the editable. */
                    console.log(context);
                    var collectionController = ControllerManager.bind(editable);
                    /* Start a batch of changes. */
                    collectionController.beginChangeSet();
                    /* Make the updates to the properties. */
                    collectionController.getPropertyController("CCA_Gender").set("value", "Male");
                    collectionController.getPropertyController("CCA_PhoneNumber").set("value", "7070701234");
                    collectionController.getPropertyController("CCA_EmailID").set("value", "Testing@gmail.com");
                    collectionController.getPropertyController("CCA_PANCard").set("value", "ABCED1234F");
                    collectionController.getPropertyController("CCA_CurrentAddress").set("value", "Hyderabad");
                    collectionController.getPropertyController("CCA_AadharCard").set("value", "123400005678");
                    collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("value", "Apple");
                    collectionController.getPropertyController("CCA_CTC").set("value", "336000");
                    creditCardTypeController = collectionController.getPropertyController("CCA_CreditCardType");
                    creditCardTypeController.set("hidden", true);
                    collectionController.getPropertyController("CCA_SalaryPerMonth").set("value", "25000");
                    //collectionController.getPropertyController("CCA_CreditCardBank").set("hidden",true);
                    /* Complete a batch of changes. This tells all subscribed widgets to refresh. */
                    collectionController.endChangeSet();
                    /* Call the coordination completion method. */
                    complete();
                });
                /* Use the AFTERLOADWIDGET coordination topic handler to release the controller binding for the editable. */
                coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
                    /* Release the controller binding for the editable. */
                    ControllerManager.unbind(editable);
                    /* Call the coordination completion method. */
                    complete();
                });
            } else if (eventname == "icm.PropertyUpdated") {
                if (payload.property.controller.id == "CCA_CreditCardBank") {
                    creditCardTypeController.set("hidden", false);
                }
                //debugger;
            }
        }
    });
});