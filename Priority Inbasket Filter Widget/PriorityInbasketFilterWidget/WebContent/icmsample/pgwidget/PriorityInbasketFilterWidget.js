var buttonClicked = false;
var currentInbasketInfo;
var queuename;
var inbasketname = "";
var pageTitle;
define(
    ["dojo/_base/declare", "dojo/json", "icm/base/BasePageWidget", "icm/base/_BaseWidget", "dojo/text!./templates/PriorityInbasketFilterWidget.html", "dijit/form/Button"],
    function(declare, json, BasePageWidget, _BaseWidget, template) {
        return declare("icmsample.pgwidget.PriorityInbasketFilterWidget",
            [_BaseWidget, BasePageWidget], {
                templateString: template,
                // summary:
                // Handler for receiving the event ReceiveInbasketInfo.
                // payload:
                // The received payload.
                handle_ReceiveInbasketInfo: function(payload) {
                    currentInbasketInfo = payload;
                    queuename = currentInbasketInfo.selectInbasket.queueName;
                    if ( inbasketname != currentInbasketInfo.selectInbasket.inbasketName) {
                        inbasketname = currentInbasketInfo.selectInbasket.inbasketName;
                        pageTitle= this.page.currentPageTitle
                        dojo.query(".priorityButtonNotActivated").query(".dijitButtonNode")[0].style = "padding: 0; border: none;background-color: transparent;outline: none;border-radius: 15px;";
                        dojo.query(".priorityButtonNotActivated")[0].style = "float: right;   padding-right: 60px;";
                        buttonClicked = false;
                    }
                    console.log("Inbasket Info payload: ", payload);
                },
                // summary:
                // A method for sending the event icm.ApplyFilter.
                publish_icmApplyFilter: function() {
                	require(["icmsample/pgwidget/Scriptadapters/onLoad"],function(onLoad){
                		console.log("inside");
                	});
                    buttonClicked = !buttonClicked;
                    var filter;
                    if (buttonClicked) {
                        dojo.query(".priorityButtonNotActivated").query(".dijitButtonNode")[0].style = "padding: 0; border: 3px solid #355E3B;background-color: transparent;outline: none;border-radius: 15px;";
                        if (inbasketname == "Customer Representative") {
                            filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A) AND (CCA_Priority = :A )",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "none"
                                }, {
                                    "name": "CCA_Priority",
                                    "type": "xs:boolean",
                                    "value": true
                                }],
                                "hideLockedByOther":false
                            };
                        } else if (inbasketname == "Rejected By Verifier") {
                            filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A) AND (CCA_Priority = :A)",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "Verifier"
                                }, {
                                    "name": "CCA_Priority",
                                    "type": "xs:boolean",
                                    "value": true
                                }],
                                "hideLockedByOther":false
                            };
                        } else if (inbasketname == "Rejected By Approver") {
                            filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A) AND (CCA_Priority = :A)",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "Approver"
                                }, {
                                    "name": "CCA_Priority",
                                    "type": "xs:boolean",
                                    "value": true
                                }],
                                "hideLockedByOther":false
                            };
                        } else {
                            filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_Priority = :A)",
                                "queryFields": [{
                                    "name": "CCA_Priority",
                                    "type": "xs:boolean",
                                    "value": true
                                }],
                                "hideLockedByOther":false
                            };
                        }
                    } else {
                        dojo.query(".priorityButtonNotActivated").query(".dijitButtonNode")[0].style = "padding: 0; border: none;background-color: transparent;outline: none;border-radius: 15px;";
                        if (inbasketname == "Customer Representative") {
                            filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A)",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "none"
                                }],
                                "hideLockedByOther":false
                            };
                        } else if (inbasketname == "Rejected By Verifier") {
                            var filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A)",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "Verifier"
                                }],
                                "hideLockedByOther":false 
                            };
                        } else if (inbasketname == "Rejected By Approver") {
                            var filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(CCA_RejectedBy = :A)",
                                "queryFields": [{
                                    "name": "CCA_RejectedBy",
                                    "type": "xs:string",
                                    "value": "Approver"
                                }],
                                "hideLockedByOther":false
                            };
                        } else {
                            var queryFieldValue;
                            if (inbasketname == "Application Verifier") {
                                queryFieldValue = "Application Verifier Step";
                            } else if (inbasketname == "Approver") {
                                queryFieldValue = "Approver";
                            } else if (inbasketname == "CIBIL Verifier") {
                                queryFieldValue = "CIBIL Verifier";
                            } else if (inbasketname == "PROCESSED") {
                                queryFieldValue = "PROCESSED";
                            }
                            var filter = {
                                "queueName": queuename,
                                "inbasketName": inbasketname,
                                "hideFilterUI": true,
                                "queryFilter": "(F_StepName = :A)",
                                "queryFields": [{
                                    "name": "F_StepName",
                                    "type": "xs:string",
                                    "value": queryFieldValue
                                }],
                                "hideLockedByOther":false
                            };
                        }
                    }
                    var model = icm.model.InbasketDynamicFilter.fromJSON(filter);
                    var dynamicFilters = [];
                    dynamicFilters.push(model);
                    var applyFilterPayload = {
                        "dynamicFilters": dynamicFilters
                    };
                    console.log("Filter payload is :" + applyFilterPayload);
                    this.onPublishEvent("icm.ApplyFilter", applyFilterPayload);
                },
                postCreate: function() {
                    this.inherited(arguments);
                    dojo.query(".priorityButtonNotActivated").query(".dijitButtonNode")[0];
                },
            });
    });