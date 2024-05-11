define(["dojo/_base/declare","dojo/_base/connect", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "ecm/widget/admin/PluginConfigurationPane", "ecm/widget/PropertyEditors", "ecm/widget/dialog/BaseDialog", "dojo/data/ObjectStore", "dojox/layout/TableContainer", "dojox/grid/enhanced/plugins/IndirectSelection", "dojox/json/query", "dojo/dom-style", "dojo/_base/lang", "dijit/form/TextBox", "dojo/data/ItemFileWriteStore", "dijit/form/Button", "dojo/_base/array", "dijit/form/FilteringSelect", "ecm/widget/dialog/MessageDialog", "dijit/form/DateTextBox", "dojo/store/Memory", "dojo/json", "dojox/grid/enhanced/plugins/Pagination", "dojox/grid/EnhancedGrid", "dijit/registry", "dijit/_WidgetBase", "ecm/model/Request", "dojo/text!./templates/LookupDialogTemplate.html", "dojox/grid/DataGrid", "dojo/data/ObjectStore", "dojo/dom-construct", "dojo/data/ItemFileWriteStore"], function(declare,connect, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, PropertyEditors, BaseDialog, ObjectStore, TableContainer, indirectSelection, query, domStyle, lang, TextBox, ItemFileWriteStore, Button, array, FilteringSelect, MessageDialog, DateTextBox, Memory, JSON, Pagination, EnhancedGrid, registry, _WidgetBase, Request, template, DataGrid, ObjectStore, domConstruct, WriteStore) {
    var customWidgetRef;
    var entryTemplatePropControllers;
    return declare("testCustomPropertyEditorPluginDojo.widgets.LookupDialog", [_TemplatedMixin, _WidgetsInTemplateMixin, BaseDialog], {
        contentString: template,
        widgetsInTemplate: true,
        constructor: function() {
            //customWidgetRef=self;
            this.inherited(arguments);
            console.log("in constructor this", this);
        },
        postCreate: function() {
            console.log("postCreate function ", this);
            this.inherited(arguments);
            this.setSize(700, 450);
            dojo.query(".searchButtonClass").query(".dijitButtonNode")[0].style = "padding: 10px;";
           this.populateButton= this.addButton("Populate","populateRow",true,false,"populateButton");
        },
        show: function(propControllers) {
        	 entryTemplatePropControllers=propControllers;
            this.inherited(arguments);
            console.log("< ----- inside Show --->  ");
        },
        populateRow:function(){
        	console.log("populate button clicked")
        	 var selectedItem=this.grid.selection.getSelected();
            var dataStore=this.grid.store;
            var docProperties=dojo.query(".ecmCommonPropertiesPane");
            this.populateEntryTemplateProps(selectedItem[0],dataStore,docProperties[docProperties.length-1]);
            this.hide();
            this.destroyRecursive();
        },
        populatePropsUsingControllers:function(selectedItem,dataStore){
        	console.log("populate Props Using Controllers"+entryTemplatePropControllers);
        	entryTemplatePropControllers.CCA_CustomerName.set("value",dataStore.getValue(selectedItem,"customerName"));
        	entryTemplatePropControllers.CCA_PhoneNumber.set("value",dataStore.getValue(selectedItem,"phoneNumber"));
        	entryTemplatePropControllers.CCA_PANCard.set("value",dataStore.getValue(selectedItem,"panCard"));
        	
        	
        },
        populateEntryTemplateProps:function(selectedItem,dataStore,propertiesDiv){
        	console.log("populate entry template props");
        	for(var i=0;i<propertiesDiv.ownerDocument.all.length;i++){
        		if(propertiesDiv.ownerDocument.all[i].id &&
        			dijit.byId(propertiesDiv.ownerDocument.all[i].id)&&
        			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller &&
        			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id &&
        			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id == "CCA_CustomerName"
        				){
        			dijit.byId(propertiesDiv.ownerDocument.all[i].id).set("value",dataStore.getValue(selectedItem,"customerName"));
        		}
        		else if(propertiesDiv.ownerDocument.all[i].id &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id)&&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id == "CCA_PhoneNumber"
            				){
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).set("value",dataStore.getValue(selectedItem,"phoneNumber"));
            		}
        		else if(propertiesDiv.ownerDocument.all[i].id &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id)&&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id &&
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).controller.id == "CCA_PANCard"
            				){
            			dijit.byId(propertiesDiv.ownerDocument.all[i].id).set("value",dataStore.getValue(selectedItem,"panCard"));
            		}
        	}
        },
       
        
        onRowDoubleClicked:function(evt){
        	console.log("Row Double Clicked"+evt);
        	var index=evt.rowIndex;
        	var selectedItem=this.grid.getItem(index);
        	var dataStore=this.grid.store;
            var docProperties=dojo.query(".ecmCommonPropertiesPane");
            //this.populateEntryTemplateProps(selectedItem,dataStore,docProperties[docProperties.length-1]);
            this.populatePropsUsingControllers(selectedItem,dataStore);
            this.hide();
            this.destroyRecursive();
        	
        },
        onSearchClick: function() {
        	this.populateButton.set("disabled",true);
            console.log("search button clicked");
            var name = this.customerTextNode.get('value');
            console.log("customer name enter is : " + name);
            var self = this;
            var serviceParams = {
                "name": name
            };
            Request.invokePluginService("CCAScriptAdapterPlugin", "CustomerWebApplicationService", {
                requestCompleteCallback: function(response) {
                    self.populateResults(self, response);
                },
                requestParams: serviceParams
            });
        },
        populateResults: function(self,response) {
            console.log("response from service: " + response);
            if (dijit.byId("lookupgrid")) {
                dijit.byId("lookupgrid").destroyRecursive();
            }
            var data = {
                items: []
            };
//            var tempArr = [];
//            if (!response.data == "") {
//                tempArr.push(JSON.parse(response.data));
//            }
            data.items = JSON.parse(response.data);
            var layout = {
                cells: [{
                    'name': 'Customer Name',
                    'field': 'customerName',
                    'width': '200px'
                }, {
                    'name': 'Gender',
                    'field': 'gender',
                    'width': '100px'
                }, {
                    'name': 'Phone Number',
                    'field': 'phoneNumber',
                    'width': '150px'
                }, {
                    'name': 'Pancard',
                    'field': 'panCard',
                    'width': '100px'
                }]
            };
            var store = new WriteStore({
                data: data
            });
            this.grid = new DataGrid({
                id: 'lookupgrid',
                store: store,
                structure: layout,
                noDataMessage: 'No results found',
                  onRowDblClick: lang.hitch(this,"onRowDoubleClicked")
                  
            }); // make sure you have a target HTML element with this id
            domConstruct.place(this.grid.domNode, this.customerResultsgrid);
            connect.connect(this.grid,"onSelected", this,function(index){
            	this.populateButton.set("disabled",false);
            })
            connect.connect(this.grid,"onDeselected", this,function(index){
            	this.populateButton.set("disabled",true);
            })
            this.grid.startup();
        }
    });
});