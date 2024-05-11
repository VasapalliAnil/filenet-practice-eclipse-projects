require(["dojo/_base/lang", "dojo/aspect", "ecm/model/SearchCriterion", "icm/pgwidget/viewer/Viewer", "ecm/widget/listView/ContentList", 
         "icm/base/Constants", "icm/model/properties/controller/ControllerManager", "ecm/model/Teamspace", "ecm/widget/dialog/AddContentItemDialog", 
         "ecm/widget/AddContentItemPropertiesPane", "dojo/_base/array","ecm/model/Request"], 
		function(lang, aspect, Criterion, viewer, contentList, Constants, ControllerManager, Teamspace, AddContentItemDialog, AddContentItemPropertiesPane, array,Request) {
    var creditCardTypeController;
    var tempabort;
    var tempComplete;
    /* This below code is for populating the props when we use OOTB Add document using entry template */
    //    aspect.after(AddContentItemPropertiesPane.prototype, "onCompleteRendering", function() {
    //        var commonProperties = this._commonProperties;
    //        var caseFolderId = this._parentFolder.id.substring(this._parentFolder.id.lastIndexOf(",") + 1);
    //        var tempCallback = lang.hitch(this, function(contentItem) {
    //            console.log(contentItem);
    //            commonProperties.setPropertyValue("CCA_ApplicationNumber", contentItem.attributes.CCA_ApplicationNumber);
    //            //debugger;
    //        });
    //        this._parentFolder.repository.retrieveItem(caseFolderId, tempCallback, null, null, null, null, null);
    //        //debugger;
    //    });
    lang.setObject("icmscripts", {
        "passthrough": function(payload, solution, role, scriptAdaptor) {
            return payload;
        },
        addSearchCriteria: function(payload, solution, role, scriptAdaptor) {
            console.log("inside addsearch criteria ");
        },
        caseinfoPayload: function(payload, caseinfo) {
            console.log("Case info Payload");
        },
        handlingPropsInCaseDetails: function(payload) {
            console.log("Handling Props in Case details" + payload);
            var userName = ecm.model.desktop.userDisplayName;
            var userId = ecm.model.desktop.userId;
            var role = ecm.model.desktop.currentRole.name;
            //* Get the coordination and editable objects from the event payload. */
            if (payload.eventName == "icm.SendCaseInfo") {
                var coordination = payload.coordination;
                var editable = payload.caseEditable;
                /* Use the LOADWIDGET coordination topic handler to obtain the controller binding */
                /* for the editable and to update the properties. */
                coordination.participate(Constants.CoordTopic.LOADWIDGET, function(context, complete, abort) {
                    /* Obtain the controller binding for the editable. */
                    console.log("inside load widget");
                    var collectionController = ControllerManager.bind(editable);
                    /* Start a batch of changes. */
                    collectionController.beginChangeSet();
                    /* Make the updates to the properties. */
                    console.log(collectionController);
                    console.log("Current Role is :" + ecm.model.desktop.currentRole.name);
                    if (ecm.model.desktop.currentRole.name == "Customer Representative") {
                        console.log("inside csr");
                        icmscripts.handlingPropsForCSR_CD(collectionController);
                    } else if (ecm.model.desktop.currentRole.name == "Approver") {
                        icmscripts.handlingPropsForApprover(collectionController);
                    }
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
            }
        },
        handlingPropsInWorkItem: function(payload) {
            console.log("Handling Props in work item details" + payload);
            var userName = ecm.model.desktop.userDisplayName;
            var userId = ecm.model.desktop.userId;
            var role = ecm.model.desktop.currentRole.name;
            var propertiesCollection = payload.workItemEditable.propertiesCollection;
            console.log("Case Folder id:" + payload.workItemEditable.icmWorkItem.caseFolderId);
            //* Get the coordination and editable objects from the event payload. */
            if (payload.eventName == "icm.SendWorkItem") {
                var coordination = payload.coordination;
                var editable = payload.workItemEditable;
                workItemEditable = payload.workItemEditable;
                /* Use the LOADWIDGET coordination topic handler to obtain the controller binding */
                /* for the editable and to update the properties. */
                coordination.participate(Constants.CoordTopic.LOADWIDGET, function(context, complete, abort) {
                    /* Obtain the controller binding for the editable. */
                    console.log("inside load widget");
                    var collectionController = ControllerManager.bind(editable);
                    /* Start a batch of changes. */
                    collectionController.beginChangeSet();
                    /* Make the updates to the properties. */
                    console.log(collectionController);
                    console.log("Current Role is :" + ecm.model.desktop.currentRole.name);
                    if (ecm.model.desktop.currentRole.name == "Customer Representative") {
                        ctcPropController = collectionController.getPropertyController("CCA_CTC");
                        icmscripts.handlingPropsForCSR(collectionController);
                    } else if (ecm.model.desktop.currentRole.name == "Application Verifier") {
                        ctcPropController = collectionController.getPropertyController("CCA_CTC");
                        icmscripts.handlingPropsForApplicationVerifier(collectionController);
                    } else if (ecm.model.desktop.currentRole.name == "CIBIL Verifier") {
                        icmscripts.handlingPropsForCIBILVerifier(collectionController);
                    } else if (ecm.model.desktop.currentRole.name == "Approver") {
                        icmscripts.handlingPropsForApprover(collectionController);
                    }
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
            }
            if (payload.eventName = "icm.FieldUpdated") {
                console.log("inside icm field Updated");
                ctcPropController.set("value", "5000000");
                ctcPropController.set("readOnly", true);
            }
        },
        preFillingNewCaseProps: function(payload) {
//            var getJSON = function(url, callback) {
//                var xhr = new XMLHttpRequest();
//                xhr.open('GET', url, true);
//                xhr.responseType = 'json';
//                xhr.onload = function() {
//                    var status = xhr.status;
//                    if (status === 200) {
//                        callback(null, xhr.response);
//                    } else {
//                        callback(status, xhr.response);
//                    }
//                };
//                xhr.send();
//            };
//            getJSON("http://10.254.8.22:9080/CustomerWebApplication/customer?name=ram", function(err, data) {
//                if (err !== null) {
//                    console.log("Something went wrong: " + err);
//                } else {
//                    Console.log("Your query count: " + data);
//                }
//            });
            
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
				if (payload.property.controller.id == "CCA_CustomerName") {
                    icmscripts.invokeWebservice("Anil");
                }
                //debugger;
            }
        },
        attachmentValidationHandler: function(payload) {
            console.log("inside stepResponseHandler");
            var coordination = payload.coordination;
            var editable = payload.workItemEditable;
            //var solution = this.solution;
            //var prefix = solution.getPrefix();
            if (coordination) {
                coordination.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort) {
                    console.log("Context while validating is" + context[Constants.CoordContext.WKITEMRESPONSE]);
                    if (context[Constants.CoordContext.WKITEMRESPONSE] === "Send to Verifier") {
                        var caseFolderId = editable.icmWorkItem.caseFolderId;
                        console.log("CaseFolderId:" + caseFolderId);
                        tempabort = abort;
                        tempComplete = complete;
                        var zeroAttachments = icmscripts.validateWItemAttachments(caseFolderId, editable);
                    } else {
                        complete();
                    }
                });
            }
        },
        stepResponseHandler: function(payload) {
            console.log("inside stepResponseHandler");
            var coord = payload.coordination;
            var workitemEdit = payload.workItemEditable;
            //var solution = this.solution;
            //var prefix = solution.getPrefix();
            if (coord) {
                coord.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort) {
                    /*Check the specific response, an empty string ("") stands for the Complete button*/
                    if (context[Constants.CoordContext.WKITEMRESPONSE] === "Reject") {
                        console.log("Reject clicked");
                        var propertyController = ControllerManager.bind(workitemEdit);
                        propertyController.beginChangeSet();
                        propertyController.getPropertyController("CL_RejectedBy").set("value", "Verifier");
                        propertyController.endChangeSet();
                        complete();
                    } else {
                        console.log("Response is " + context[Constants.CoordContext.WKITEMRESPONSE]);
                        complete();
                    }
                });
            }
        },
        handlingPropsForCSR: function(collectionController) {
            //making the some properties hide
            collectionController.getPropertyController("CCA_DocumentVerified").set("hidden", true);
            collectionController.getPropertyController("CCA_CIBILScore").set("hidden", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("hidden", true);
            collectionController.getPropertyController("CCA_ApplicationStatus").set("hidden", true);
            collectionController.getPropertyController("CCA_ApproverComments").set("hidden", true);
            //making the some properties readonly
            collectionController.getPropertyController("CCA_ApplicationNumber").set("required", true);
            collectionController.getPropertyController("CCA_ApplicationNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_CustomerName").set("required", true);
            collectionController.getPropertyController("CCA_DOB").set("required", true);
            collectionController.getPropertyController("CCA_Gender").set("required", true);
            collectionController.getPropertyController("CCA_PhoneNumber").set("required", true);
            collectionController.getPropertyController("CCA_EmailID").set("required", true);
            collectionController.getPropertyController("CCA_PANCard").set("required", true);
            collectionController.getPropertyController("CCA_AadharCard").set("required", true);
            collectionController.getPropertyController("CCA_CurrentAddress").set("required", true);
            collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("required", true);
            collectionController.getPropertyController("CCA_CTC").set("required", true);
            collectionController.getPropertyController("CCA_SalaryPerMonth").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardType").set("required", true);
        },
        handlingPropsForApplicationVerifier: function(collectionController) {
            //making the some properties hide
            collectionController.getPropertyController("CCA_DocumentVerified").set("required", true);
            collectionController.getPropertyController("CCA_CIBILScore").set("hidden", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("hidden", true);
            collectionController.getPropertyController("CCA_ApplicationStatus").set("hidden", true);
            collectionController.getPropertyController("CCA_ApproverComments").set("hidden", true);
            //making the some properties readonly
            collectionController.getPropertyController("CCA_ApplicationNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_CustomerName").set("readOnly", true);
            collectionController.getPropertyController("CCA_DOB").set("readOnly", true);
            collectionController.getPropertyController("CCA_Gender").set("readOnly", true);
            collectionController.getPropertyController("CCA_Gender").set("required", false);
            collectionController.getPropertyController("CCA_PhoneNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_EmailID").set("readOnly", true);
            collectionController.getPropertyController("CCA_PANCard").set("readOnly", true);
            collectionController.getPropertyController("CCA_AadharCard").set("readOnly", true);
            collectionController.getPropertyController("CCA_CurrentAddress").set("readOnly", true);
            collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("readOnly", true);
            collectionController.getPropertyController("CCA_CTC").set("readOnly", true);
            collectionController.getPropertyController("CCA_SalaryPerMonth").set("readOnly", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("readOnly", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("required", false);
            collectionController.getPropertyController("CCA_CreditCardType").set("readOnly", true);
            collectionController.getPropertyController("CCA_CreditCardType").set("required", false);
        },
        handlingPropsForCIBILVerifier: function(collectionController) {
            //making the some properties hide
            collectionController.getPropertyController("CCA_DocumentVerified").set("hidden", true);
            collectionController.getPropertyController("CCA_CIBILScore").set("required", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("required", true);
            collectionController.getPropertyController("CCA_ApplicationStatus").set("hidden", true);
            collectionController.getPropertyController("CCA_ApproverComments").set("hidden", true);
            //making the some properties readonly
            collectionController.getPropertyController("CCA_ApplicationNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_CustomerName").set("readOnly", true);
            collectionController.getPropertyController("CCA_DOB").set("hidden", true);
            collectionController.getPropertyController("CCA_Gender").set("hidden", true);
            collectionController.getPropertyController("CCA_PhoneNumber").set("hidden", true);
            collectionController.getPropertyController("CCA_EmailID").set("hidden", true);
            collectionController.getPropertyController("CCA_PANCard").set("readOnly", true);
            collectionController.getPropertyController("CCA_AadharCard").set("hidden", true);
            collectionController.getPropertyController("CCA_CurrentAddress").set("hidden", true);
            collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("hidden", true);
            collectionController.getPropertyController("CCA_CTC").set("hidden", true);
            collectionController.getPropertyController("CCA_SalaryPerMonth").set("hidden", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("hidden", true);
            collectionController.getPropertyController("CCA_CreditCardType").set("hidden", true);
        },
        handlingPropsForApprover: function(collectionController) {
            //making the some properties hide
            collectionController.getPropertyController("CCA_DocumentVerified").set("readOnly", true);
            collectionController.getPropertyController("CCA_DocumentVerified").set("required", false);
            collectionController.getPropertyController("CCA_CIBILScore").set("readOnly", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("readOnly", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("required", false);
            collectionController.getPropertyController("CCA_ApplicationStatus").set("required", true);
            collectionController.getPropertyController("CCA_ApproverComments").set("required", true);
            //making the some properties readonly
            collectionController.getPropertyController("CCA_ApplicationNumber").set("required", true);
            collectionController.getPropertyController("CCA_ApplicationNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_CustomerName").set("required", true);
            collectionController.getPropertyController("CCA_DOB").set("required", true);
            collectionController.getPropertyController("CCA_Gender").set("required", true);
            collectionController.getPropertyController("CCA_PhoneNumber").set("required", true);
            collectionController.getPropertyController("CCA_EmailID").set("required", true);
            collectionController.getPropertyController("CCA_PANCard").set("required", true);
            collectionController.getPropertyController("CCA_AadharCard").set("required", true);
            collectionController.getPropertyController("CCA_CurrentAddress").set("required", true);
            collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("required", true);
            collectionController.getPropertyController("CCA_CTC").set("required", true);
            collectionController.getPropertyController("CCA_SalaryPerMonth").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardType").set("required", true);
        },
        handlingPropsForCSR_CD: function(collectionController) {
            //making the some properties hide
            collectionController.getPropertyController("CCA_DocumentVerified").set("readOnly", true);
            collectionController.getPropertyController("CCA_CIBILScore").set("readOnly", true);
            collectionController.getPropertyController("CCA_ExistingLoans").set("readOnly", true);
            collectionController.getPropertyController("CCA_ApplicationStatus").set("readOnly", true);
            collectionController.getPropertyController("CCA_ApproverComments").set("readOnly", true);
            //making the some properties readonly
            collectionController.getPropertyController("CCA_ApplicationNumber").set("required", true);
            collectionController.getPropertyController("CCA_ApplicationNumber").set("readOnly", true);
            collectionController.getPropertyController("CCA_CustomerName").set("required", true);
            collectionController.getPropertyController("CCA_DOB").set("required", true);
            collectionController.getPropertyController("CCA_Gender").set("required", true);
            collectionController.getPropertyController("CCA_PhoneNumber").set("required", true);
            collectionController.getPropertyController("CCA_EmailID").set("required", true);
            collectionController.getPropertyController("CCA_PANCard").set("required", true);
            collectionController.getPropertyController("CCA_AadharCard").set("required", true);
            collectionController.getPropertyController("CCA_CurrentAddress").set("required", true);
            collectionController.getPropertyController("CCA_CurrentWorkingCompany").set("required", true);
            collectionController.getPropertyController("CCA_CTC").set("required", true);
            collectionController.getPropertyController("CCA_SalaryPerMonth").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardBank").set("required", true);
            collectionController.getPropertyController("CCA_CreditCardType").set("required", true);
        },
        validateWItemAttachments: function(folderId, workItemEditable) {
            var tempCallback = lang.hitch(this, function(contentItem) {
                //console.log(contentItem);
                contentItem.retrieveFolderContents(false, function(resultSet) {
                    //console.log(resultSet.items);
                    var canProceed = false;
                    var items = resultSet.items;
                    console.log(items.length);
                    if (items.length == 0) {
                        var messageDialog = new ecm.widget.dialog.MessageDialog({
                            text: "Attachment missing, please attach atleast One document to proceed further."
                        });
                        messageDialog.show();
                        tempabort({
                            'silent': true
                        });
                    } else {
                        console.log("inside else");
                        tempComplete();
                    }
                }, null, null, null, null, null, null, null);
            });
            workItemEditable.repository.retrieveItem(folderId, tempCallback, null, null, null, null, null);
        },
        executeScriptActionAddDoc: function(temp) {
            console.log("inside");
            var self = temp;
            var caseEdt = self.getActionContext("Case")[0];
            var parentFolder = self.getActionContext("CurrentFolder")[0]; /*Create the add document dialog*/
            var addContentItemDialog = new AddContentItemDialog();
            var _propagateCaseProps = function() {
                console.log("inside propagate");
                var contentItemPropertiesPane = addContentItemDialog.addContentItemPropertiesPane; /*Fetch the properties from document properties pane*/
                var allProps = contentItemPropertiesPane.getPropertiesJSON(); /*Match the doc propertis with case properties, and set value*/
                var propsCtrl = ControllerManager.bind(caseEdt);
                array.forEach(allProps, function(entry, i) {
                    var propName = entry.name;
                    var propCtrl = propsCtrl.getPropertyController(propName);
                    if (propCtrl) {
                        var casePropValue = propCtrl.get("value");
                        if (entry.dataType === "xs:boolean") {
                            /*Convert the case property control's value to case document property control's vaule*/
                            casePropValue = (casePropValue == true) ? 1 : 0;
                        } else if (entry.dataType === "xs:timestamp") {
                            casePropValue = casePropValue.valueOf();
                        }
                        contentItemPropertiesPane.setPropertyValue(propName, casePropValue);
                    }
                });
                ControllerManager.unbind(caseEdt);
            };
            var widgetAttrs = null;
            var widget = self.getWidget();
            if (widget.parentWidget && widget.parentWidget.getWidgetAttributes) {
                widgetAttrs = widget.parentWidget.getWidgetAttributes();
            } else {
                widgetAttrs = widget.getWidgetAttributes();
            } /*Check if the the solution document type filtering is on in the case information widget's configuration*/
            var filterOn = widgetAttrs.getItemValue("filterDocumentTypes");
            var entryTemplateId = "{60B5A086-0000-C218-ABCE-449EA3C81CFA}";
            if (entryTemplateId) {
                //var self = this;
                parentFolder.repository.retrieveItem(entryTemplateId, function(item) {
                    var entryTemplate = parentFolder.repository.getEntryTemplateById(item.id, item.name, item.objectStore);
                    var entryTemplateRetrievedHandler = lang.hitch(this, function(entryTemplate) {
                        if (entryTemplate) {
                            var cloneET = entryTemplate.clone();
                            cloneET.folder = parentFolder;
                            cloneET.allowUserSelectFolder = false;
                            addContentItemDialog.show(parentFolder.repository, parentFolder, true, false, null, null, true, cloneET);
                        } else {
                            // TODO: un-expected err.
                            //this.show(repository, parentFolder, typeDocument, false, callback, teamspace, true, entryTemplate);
                        }
                    });
                    if (!entryTemplate.isRetrieved) {
                        entryTemplate.retrieveEntryTemplate(entryTemplateRetrievedHandler, false, false);
                    } else {
                        entryTemplateRetrievedHandler(entryTemplate);
                    }
                }, "EntryTemplate", "current", "{60B5A086-0000-C410-96AA-13ABFB3FA8AF}");
            } else {
                addContentItemDialog.showUsingTemplateItem(repository, parentFolder, true, false, this._getCallback(), null, null);
            }
            //var repository = ecm.model.desktop.getRepository("icmtos");
            //            parentFolder.repository.retrieveItem(entryTemplateId, function(item) {
            //                console.log("inside teting;" + item);
            //                if (filterOn) {
            //                    var currSolution = caseEdt.getCase().caseType.getSolution();
            //                    currSolution.retrieveDocumentTypes(function(docTypes) {
            //                        var dcList = null;
            //                        if (docTypes && docTypes.length > 0) {
            //                            dcList = new Teamspace({
            //                                repository: parentFolder.repository,
            //                                name: parentFolder.repository.name,
            //                                type: Teamspace.RUNTIME,
            //                                addAllowAllClasses: false,
            //                                contentClasses: docTypes,
            //                                defaultClass: null
            //                            });
            //                        } /*Show the add document dialog*/
            //                        addContentItemDialog.show(parentFolder.repository, parentFolder, true, false, null, dcList, true, item, true);
            //                    });
            //                } else {
            //                    /*Show the add document dialog*/
            //                    //addContentItemDialog.show(parentFolder.repository, parentFolder, true, false, null, null, true, item, true);
            //                    addContentItemDialog.showUsingTemplateItem(parentFolder.repository, parentFolder, true, false, null, null, item);
            //                } /*Hook to the complete rendering document properties*/
            //            }, "EntryTemplate", "current", "{60B5A086-0000-C410-96AA-13ABFB3FA8AF}");
            aspect.after(addContentItemDialog.addContentItemPropertiesPane, "onCompleteRendering", _propagateCaseProps);
        },
        rejectedDynamicInbasket: function(payload) {
            var myUser = ecm.model.desktop.userDisplayName;
            var data = {
                "queueName": "CCA_CustomerRepresentative",
                "inbasketName": "Rejected By Verifier",
                "hideFilterUI": true,
                "queryFilter": "(CCA_RejectedBy = :A)",
                "queryFields": [{
                    "name": "CCA_RejectedBy",
                    "type": "xs:string",
                    "value": "Verifier"
                }],
                "hideLockedByOther": "true"
            };
            var data1 = {
                "queueName": "CCA_CustomerRepresentative",
                "inbasketName": "Rejected By Approver",
                "hideFilterUI": true,
                "queryFilter": "(CCA_RejectedBy = :A)",
                "queryFields": [{
                    "name": "CCA_RejectedBy",
                    "type": "xs:string",
                    "value": "Approver"
                }],
                "hideLockedByOther": "true"
            };
            var data2 = {
                "queueName": "CCA_CustomerRepresentative",
                "inbasketName": "Customer Representative",
                "hideFilterUI": true,
                "queryFilter": "(CCA_RejectedBy = :A)",
                "queryFields": [{
                    "name": "CCA_RejectedBy",
                    "type": "xs:string",
                    "value": "none"
                }],
                "hideLockedByOther": "true"
            };
            var model = icm.model.InbasketDynamicFilter.fromJSON(data);
            var model1 = icm.model.InbasketDynamicFilter.fromJSON(data1);
            var model2 = icm.model.InbasketDynamicFilter.fromJSON(data2);
            console.log(model);
            var modelArray = [];
            modelArray.push(model);
            modelArray.push(model1);
            modelArray.push(model2);
            console.log(modelArray);
            return {
                "dynamicFilters": modelArray
            };
        },
        handleOpenSelectedWIEventAction: function(payload, self) {
            console.log(payload);
            for (var i in payload.WorkItem) {
                var w = payload.WorkItem[i];
                var h = new icm.util.WorkItemHandler(self, true);
                w.retrieveStep(function(workItem) {
                    h.handleWorkItem(workItem);
                });
            }
        },
        propsWidgetEventHandlerWIDetails: function(payload, self) {
            console.log(self);
            self.style.color = "red";
        },
        invokeWebservice: function(name) {
            var serviceParams = {
                "name": name
            };
            Request.invokePluginService("CCAScripAdapterPlugin", "CustomerWebApplicationService", {
                requestCompleteCallback: function(response) {
                    console.log("response from service: " + response);
                },
                requestParams: serviceParams
            });
        }
    });
});