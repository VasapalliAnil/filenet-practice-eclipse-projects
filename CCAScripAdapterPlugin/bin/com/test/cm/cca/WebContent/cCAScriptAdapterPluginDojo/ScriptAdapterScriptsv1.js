require(
		[ "icm/pgwidget/inbasket/dijit/InbasketContentPane",
				"dojo/_base/sniff", "dojo/store/Memory",
				"dijit/form/FilteringSelect", "dojo/dom-construct",
				"dojo/_base/lang", "dojo/aspect", "ecm/model/SearchCriterion",
				"ecm/widget/listView/ContentList", "icm/base/Constants",
				"icm/model/properties/controller/ControllerManager",
				"ecm/model/Teamspace",
				"ecm/widget/dialog/AddContentItemDialog",
				"ecm/widget/AddContentItemPropertiesPane", "dojo/_base/array",
				"ecm/model/Request", "dojo/on", "dijit/form/SimpleTextarea",
				"icm/pgwidget/inbasket/Inbasket",
				"icm/pgwidget/inbasket/dijit/InbasketContentPane",
				"icm/pgwidget/caselist/dijit/modules/CaseListViewDetails",
				"icm/pgwidget/caselist/dijit/modules/CaseListViewMagazine",
				"idx/html", "pvr/widget/TabContainer",
				"icm/action/case/OpenSplitCasePage",
				"icm/action/case/AddCaseAndClosePage", "icm/util/Coordination",
				"ecm/widget/dialog/ConfirmationDialog",
				"icm/action/comment/AddWorkItemComment",
				"icm/action/comment/AddTaskComment",
				"icm/action/comment/AddCaseComment", "pvr/widget/PropertyTable" ],
		function(InbasketContentPane, has, Memory, FilteringSelect,
				domConstruct, lang, aspect, Criterion, contentList, Constants,
				ControllerManager, Teamspace, AddContentItemDialog,
				AddContentItemPropertiesPane, array, Request, on,
				SimpleTextarea, Inbasket, InbasketContentPane,
				CaseListViewDetails, CaseListViewMagazine, idxHtml,
				tabContainer, OpenSplitCasePage, AddCaseAndClosePage,
				Coordination, ConfirmationDialog, AddWorkItemComment,
				AddTaskComment, AddCaseComment, PropertyTable) {
			var creditCardTypeController;
			var tempabort;
			var tempComplete;
			var phoneNumberController;
			var genderController;
			var pancardController;
			var customerNameController;
			var initiateTaskController;
			var beforeCTC;
			var afterCTC;
			var textarea;
			var splitController;

			// Date logic for getting days difference

			/*
			 * 
			 * (new Date("Thu Mar 30 2023 00:00:00 GMT+0530 (India Standard
			 * Time)")-new Date("Tue Feb 28 2023 00:00:00 GMT+0530 (India
			 * Standard Time)" ))/(1000*60*60*24);
			 * 
			 * 
			 */
			aspect.before(PropertyTable.prototype, "_createGrid", function(
					response) {
				console.log("pvf widget create grid after load");
				this._hideToolbar = false;
			}, true);
			/*
			 * This below code is for populating the props when we use OOTB Add
			 * document using entry template
			 */
			// aspect.after(AddContentItemPropertiesPane.prototype,
			// "onCompleteRendering", function() {
			// var commonProperties = this._commonProperties;
			// var caseFolderId =
			// this._parentFolder.id.substring(this._parentFolder.id.lastIndexOf(",")
			// + 1);
			// var tempCallback = lang.hitch(this, function(contentItem) {
			// console.log(contentItem);
			// commonProperties.setPropertyValue("CCA_ApplicationNumber",
			// contentItem.attributes.CCA_ApplicationNumber);
			// //debugger;
			// });
			// this._parentFolder.repository.retrieveItem(caseFolderId,
			// tempCallback, null, null, null, null, null);
			// //debugger;
			// });
			// else if(splitController.get("value")== true ){
			//    		
			// }
			var splitaspect = aspect.after(OpenSplitCasePage.prototype,
					"isEnabled", function() {

						var role = ecm.model.desktop.currentRole.name;
						if (role != "Approver") {

							return false;
						} else if (!splitController.get("value") == true) {

							return false;
						}
					});

			// debugger;

			var self;
			aspect
					.after(
							InbasketContentPane.prototype,
							"createContentList",
							function() {
								console.log("testingsdfjksdfkl;");
								self = this;
								aspect
										.after(
												this.contentLists[this.selectedIndex],
												"_createGrid",
												function() {
													console
															.log("o0-00000000000000");
													var cl = self.contentLists[self.selectedIndex];
													var _grid = cl.grid;
													dojo
															.connect(
																	_grid.body,
																	"onAfterRow",
																	function(
																			row) {
																		console
																				.log("inside on After Row");
																		var r = row
																				.data();

																		var node = row
																				.node();

																		var rowtable = dojo
																				.query('.gridxRowTable');

																		for (var rownum = 0; rownum < rowtable.length; rownum++) {
																			var isgreenchannel1 = "";
																			var ccrow = rowtable[rownum].childNodes[0].childNodes[0];

																			if (ccrow.childNodes[4] != undefined) {
																				var isPriorityCustomer = ccrow.childNodes[4].textContent;

																				if (isPriorityCustomer == 'Male') {
																					ccrow.style.backgroundColor = "#AEEBBA";
																				}
																			}
																		}
																	});
													_grid.pagination
															.gotoPage(1);
												}, true);
							}, true);
			// aspect.after(contentList.prototype,"_createGrid",function(){
			// console.log("inside create grid");
			// var grid=this._grid;
			// aspect.after(grid.body,'onAfterRow',function(row){
			// debugger;
			// key = row.id;
			// if ('anulada' in row.grid.store.get(key)){
			// if(row.grid.store.get(key).anulada == true){
			// row.node().style.color = 'gray';
			// }
			// }
			// },true);
			// },true);
			// var cl;
			// aspect.after(Inbasket.prototype,"postCreate",function(){
			//    	
			//    	
			// aspect.after(this,"createContentList",function(){
			// console.log("inside create content list aspect");
			// cl=this.contentLists[this.selectedIndex];
			// aspect.before(cl,"_createGrid",function(){
			// console.log("befire inside create createGrid aspect");
			// },true);
			//    	    	
			// aspect.after(cl,"_createGrid",function(){
			//    	    		
			// console.log("after inside create createGrid aspect");
			// // var cl=this.contentLists[this.selectedIndex];
			// //var _grid=cl.grid;
			// // var handler=dojo.connect(this.grid.body,
			// "onAfterRow",function(row){
			// // debugger;
			// // var r=row.data();
			// // var node=r.node();
			// // var rowtable=dojo.query(".gridxRowTable");
			// // for( var rn=0;rn<rowtable.length;rn++){
			// // var ccrow=rowtable[r].childNodes[0].childNodes[0];
			// // }
			// // });
			// // this.grid.pagination.gotoPage(0);
			// this.gridHandler = dojo.connect(this.grid.contentList.grid.body,
			// "onAfterRow", function(row){
			// debugger;
			// var cl = this.contentLists[this.selectedIndex];
			// var index = cl.grid.model.idToIndex(row.id);
			// if (index === cl.getResultSet().items.length - 1) {
			// this.resize();
			//
			// }
			//
			// });
			// });
			// },true);
			//    	 
			//    	
			// },true);

			// aspect.after(Inbasket.prototype,"createContentList",function(){
			// console.log("inside create content list aspect");
			// cl=this.contentLists[this.selectedIndex];
			// aspect.before(cl,"_createGrid",function(){
			// console.log("befire inside create createGrid aspect");
			// },true);
			//    	
			// aspect.after(cl,"_createGrid",function(){
			// console.log("after inside create createGrid aspect");
			// // var cl=this.contentLists[this.selectedIndex];
			// var _grid=cl.grid;
			// var handler=dojo.connect(_grid.body, "onAfterRow",function(row){
			// debugger;
			// var r=row.data();
			// var node=r.node();
			// var rowtable=dojo.query(".gridxRowTable");
			// for( var rn=0;rn<rowtable.length;rn++){
			// var ccrow=rowtable[r].childNodes[0].childNodes[0];
			// }
			// });
			// _grid.pagination.gotoPage(0);
			// });
			// },true);
			// aspect.after(InbasketContentPane.prototype,"_createGrid",function(){
			// debugger;
			// },true);

			
			AddTaskComment
					.extend({
						isEnabled : function() {
							var role = ecm.model.desktop.currentRole.name;
							if (role != "Approver") {
								return false;
							}
							// Get context for the task
							var actionContext = this.getActionContext("Task");

							if (actionContext && actionContext.length === 1
									&& actionContext[0].id) {
								this._task = actionContext[0];

								return this
										.checkTaskCommentPermission(this._task);
							}

							// Get context for the work item
							actionContext = this.getActionContext("WorkItem");
							if (actionContext && actionContext.length === 1
									&& actionContext[0].id) {
								this._workItem = actionContext[0];

								// Disable the add comment if the workitem is
								// opened in view mode
								var uiState = this.getActionContext("UIState");
								if (uiState && uiState.length > 0) {
									this._readOnly = uiState[0]
											.get("workItemReadOnly");
								}

								// For cm8 integration, the comment permission
								// can not be determined at this moment. So
								// simply make it enabled.
								if (this.isCM8()) {
									return true;
								}
								return this
										.checkWorkItemCommentPermission(this._workItem);
							}
							return false;
						}
					})
			AddWorkItemComment.extend({
				isEnabled : function() {
					var role = ecm.model.desktop.currentRole.name;
					if (role != "Approver") {
						return false;
					}
					// Get context for the work item
					var actionContext = this.getActionContext("WorkItem");
					if (!actionContext || actionContext.length === 0
							|| !actionContext[0].id) {
						return false;
					}

					if (actionContext && actionContext.length === 1
							&& actionContext[0].id) {
						this._workItem = actionContext[0];

						// Disable the action if the workitem is opened in view
						// mode
						var uiState = this.getActionContext("UIState");
						if (uiState !== null && uiState.length > 0) {
							var readonly = uiState[0].get("workItemReadOnly");
							if (readonly === true) {
								return false;
							}
						}
					}

					// For cm8 integration, the comment permission can not be
					// determined at this moment. So simply make it enabled.
					if (this.isCM8()) {
						return true;
					}
					return this.checkWorkItemCommentPermission(this._workItem);
				}
			});

			AddCaseComment
					.extend({
						isEnabled : function() {
							var role = ecm.model.desktop.currentRole.name;
							if (role != "Approver") {
								return false;
							}
							var caseItems = this.getCaseItems();
							if (caseItems && caseItems.length === 1
									&& caseItems[0].id) {

								this._case = caseItems[0] instanceof icm.model.CaseEditable ? caseItems[0]
										.getCase()
										: caseItems[0];
								// console.debug(this._case);
								// For cm8 integration, the comment permission
								// can not be determined at this moment. So
								// simply make it enabled.
								if (this.isCM8()) {
									return true;
								}

								this._case
										.retrieveCaseFolder(lang
												.hitch(
														this,
														function() {
															var enable = this
																	.hasAddCommentRight(this._case);
															this
																	.setEnabled(enable);
														}));
							} else {
								return false;
							}
						}
					});
			OpenSplitCasePage
					.extend({
						// this is for checking whther how many split cases has
						// been created
						execute : function() {

							var self = this;

							// alert("Launch 'Add Case' wizard with case type =
							// '" + this.arguments['item'].id + "'")

							var item = this.arguments['item'];
							var Solution = this.getActionContext("Solution");
							if (Solution === null || Solution.length == 0) {
								return false;
							}
							var solution = Solution[0];

							var Case = this.getActionContext("Case");
							if (Case === null || Case.length == 0) {
								return false;
							}

							var caseInstance;

							if (Case[0] instanceof icm.model.CaseEditable) {
								caseInstance = Case[0].getCase();
							} else {
								caseInstance = Case[0];
							}
							var splitCount = 1;
							caseInstance
									.retrieveRelatedCases(
											"Split Source",
											null,
											function(response) {
												console.log(response);

												if (response.length < splitCount) {
													solution
															.retrieveCaseType(
																	item.id,
																	function(
																			caseType) {
																		caseInstance
																				.retrieveAttributes(lang
																						.hitch(
																								this,
																								function() {
																									caseInstance
																											.createNewSplitCaseEditable(
																													caseType,
																													function(
																															pendingSplitCaseEditable) {
																														console
																																.log("createNewSplitCaseEditable() completed");
																														self
																																.broadcastEvent(
																																		"icm.SplitCase",
																																		{
																																			"caseType" : caseType,
																																			"caseEditable" : pendingSplitCaseEditable,
																																			"coordination" : new Coordination()
																																		});

																													});
																								}));
																	});
												} else {
													var messageDialog = new ecm.widget.dialog.MessageDialog(
															{
																text : "You Can Split the Case only "
																		+ splitCount
																		+ " times"
															});
													messageDialog.show();
												}
											}, null);

						}
					});
			aspect
					.after(
							tabContainer.prototype,
							"load",
							function() {
								console.log("inside tab container load method "
										+ this);
								this._selectedChildHandler = this
										.watch(
												"selectedChildWidget",
												function(name, oldChild,
														newChild) {
													// Inside tab
													console.log("inside tab");
													var buttons = dojo
															.query(".dijitReset.dijitInline.dijitButtonText");
													for (var i = 0; i < buttons.length; i++) {
														if (buttons[i].innerHTML == "Save") {
															console
																	.log("save button found");
															var userId = ecm.model.desktop.userId;
															if (userId == "deadmin") { // please
																// change
																// it
																// accrodingly
																buttons[i].parentElement.parentElement
																		.click();
															}

															break;
														}
													}
												});
							});

			CaseListViewDetails
					.extend({
						getViewDecorator : function() {
							console.log("inside get view decorator");
							var viewDecorator = {};
							viewDecorator[this.CASE_HEALTH] = lang
									.hitch(
											this,
											function(data, storeData,
													cellWidget) {
												var row = cellWidget.cell.row;
												var item = row.item();
												var value = item
														.getValue(this.CASE_HEALTH);
												cellWidget.caseHealthDiv.title = this.resourceBundle.caseHealth
														+ ": "
														+ item
																.getDisplayValue(this.CASE_HEALTH);
												cellWidget.caseHealthDiv.innerHTML = Util
														.getCaseHealthIcon(value);
											});
							viewDecorator[this.CASE_TITLE] = lang
									.hitch(
											this,
											function(data, storeData,
													cellWidget) {
												var row = cellWidget.cell.row;
												var item = row.item();
												var title = item
														.getDisplayValue(this.CASE_TITLE);
												var self = this;
												var clickFunction = function(
														event) {
													self.stopEvent(event);
													if (self.firstClickTimer) {
														var nowDate = new Date();
														if (self.firstClickDate) {
															// console.log("cha
															// " + (nowDate -
															// self.firstClickDate));
														}
														if (self.firstClickDate
																&& (nowDate - self.firstClickDate) < self.doubleClickTiming) {
															// console.debug("this
															// is double
															// click");
															window
																	.clearTimeout(self.firstClickTimer);
															self.firstClickTimer = null;
															self.firstClickDate = null;
															cellWidget.caseTitleAnchor.onclick = null;
															openItemByLink();
														} else {
															self.firstClickDate = new Date();
															// console.debug("this
															// is single click1
															// " +
															// self.firstClickDate);
															cellWidget.caseTitleAnchor.onclick = null;
															self.firstClickTimer = setTimeout(
																	openItemByLink,
																	self.doubleClickTiming);
														}
													} else {
														self.firstClickDate = new Date();
														// console.debug("this
														// is single click2 " +
														// self.firstClickDate);
														cellWidget.caseTitleAnchor.onclick = null;
														self.firstClickTimer = setTimeout(
																openItemByLink,
																self.doubleClickTiming);
													}
												};
												var openItemByLink = lang
														.hitch(
																this,
																function() {
																	setTimeout(
																			function() {
																				cellWidget.caseTitleAnchor.onclick = clickFunction;
																			},
																			5000);
																	Action
																			.perform(
																					this.widgetPaneId,
																					"icm.action.case.OpenCasePage");
																});
												cellWidget.caseTitle.innerHTML = idxHtml
														.escapeHTML(title);
												cellWidget.caseTitleAnchor.onclick = lang
														.hitch(this,
																clickFunction);
												cellWidget.caseTitleAnchor.title = title;
												cellWidget.caseTitleAnchor.ondblclick = lang
														.hitch(
																this,
																function(event) {
																	// console.debug("this
																	// is
																	// ondbclick");
																	this
																			.stopEvent(event);
																});
											});
							viewDecorator["CCA_Priority"] = lang
									.hitch(
											this,
											function(data, storeData,
													cellWidget) {
												// Set the cell content
												if (data && data == "True") {
													console
															.log("inside priority decorator");
													return "<img src='plugin/CCAScriptAdapterPlugin/getResource/cCAScriptAdapterPluginDojo/priority.png' >";
												} else {
													return "";
												}
											});
							return viewDecorator;
						}
					});
			InbasketContentPane
					.extend({
						_createGrid : function() {
							console.log("inside create Grid extend");
							// Set autoHeight for grid
							var cl = this.contentLists[this.selectedIndex];
							cl.grid.autoHeight = this.autoHeight;

							var resultSet = cl.getResultSet();
							// Resize to the minimum height if result set is
							// empty
							var bEmpty = !resultSet || !resultSet.items
									|| resultSet.items.length === 0;
							if (bEmpty) {
								this.resize();
								return;
							}

							// Connect to grid body for resizing grid height
							// after rows are all filled
							if (this.gridHandler)
								dojo.disconnect(this.gridHandler);
							this.gridHandler = dojo
									.connect(
											cl.grid.body,
											"onAfterRow",
											this,
											dojo
													.hitch(
															this,
															function(row) {
																var cl = this.contentLists[this.selectedIndex];
																var index = cl.grid.model
																		.idToIndex(row.id);
																if (index === cl
																		.getResultSet().items.length - 1) {
																	this
																			.resize();

																}

															}));
						},
						setGridDecorator : function(resultSet) {
							var cellDeo = function() {
								var entry = '<a class="firstColumnLink" href="javascript:;" data-dojo-attach-point="firstColumnAnchor">'
										+ '<span data-dojo-attach-point="firstColumn"></span></a>';
								return entry;
							};
							if (resultSet && resultSet.structure
									&& resultSet.structure.cells
									&& dojo.isArray(resultSet.structure.cells)) {
								var cells = resultSet.structure.cells[0];
								var decorator = this.getColumnDecorator();
								if (decorator) {
									if (decorator.firstColumn) {
										cells[1].widgetsInCell = true;
										cells[1].decorator = cellDeo;
										cells[1].setCellValue = lang.hitch(
												this, decorator.firstColumn);
									}
									// remove the else block in order to
									// decorate both first column and
									// CCA_Priority
									for (var i = 2; i < cells.length; i++) {
										if (decorator[cells[i].field]) {
											cells[i].decorator = decorator[cells[i].field];
										}
									}
								}
								if (window.profilePlugin) {
									for (var i = 0; i < cells.length; i++) {
										if (cells[i].field == "multiStateIcon") {
											cells[i].decorator = this.cellDecorator;
											cells[i].widgetsInCell = true;
											cells[i].setCellValue = lang.hitch(
													this, this.iconCellValue);
										} else if (cells[i].field == "F_BoundUser") {
											cells[i].decorator = this.cellDecorator;
											cells[i].widgetsInCell = true;
											cells[i].setCellValue = lang.hitch(
													this,
													this.boundUserCellValue);
										} else if (cells[i].field == "F_LockUser") {
											cells[i].decorator = this.cellDecorator;
											cells[i].widgetsInCell = true;
											cells[i].setCellValue = lang.hitch(
													this,
													this.lockUserCellValue);
										}
									}
								}
							}
						}
					});
			Inbasket
					.extend({
						getColumnDecorator : function() {
							// Get the decorator from the original ICM In-basket
							// var deco = {};
							var deco = this.inherited(arguments);
							var priorityPropertyName = this.getSolution()
									.getPrefix()
									+ "_Priority";
							deco[priorityPropertyName] = lang
									.hitch(
											this,
											function(data, rowId, rowIndex) {
												var cl = this.contentLists[this.selectedIndex];
												var item = cl.grid.row(rowId)
														.item();
												// Get a property value
												var property = item
														.getValue(priorityPropertyName);
												// Set decorator for the
												// property
												if (!property) {
													return "";
												}
												// Set the cell content
												if (property == true) {
													console
															.log("inside priority decorator");
													return "<img src='plugin/CCAScriptAdapterPlugin/getResource/cCAScriptAdapterPluginDojo/priority.png' >";
												} else {
													return "";
												}
											});
							return deco;
						}
					});
			lang
					.setObject(
							"ccascriptadapter",
							{
								unlockWorkItem : function(self1) {
									var self = self1;
									var selectedWorkItems = self
											.getActionContext("WorkItemReference");
									var selectedWorkItemCount = selectedWorkItems.length;
									var doRefresh = false;
									var completed = 0;
									var updateInbasket = dojo
											.hitch(
													self,
													function() {
														if (completed === selectedWorkItemCount) {
															this
																	.broadcastEvent(
																			"icm.Refresh",
																			{});
														}
													});
									for (var i = 0; i < selectedWorkItemCount; i++) {
										var workItem = selectedWorkItems[i];
										if (workItem.lockedUser.length > 0) {
											workItem
													.overrideLockStep(dojo
															.hitch(
																	self,
																	function(wo) {
																		wo
																				.abortStep(dojo
																						.hitch(
																								self,
																								function(
																										newWo) {
																									completed = completed + 1;
																									updateInbasket();
																								}));
																	}));
										}
										;
									}
									;
								},
								enableUnlockWorkItem : function(self1) {
									var self = self1;
									var selectedWorkItems = self
											.getActionContext("WorkItemReference");
									var selectedWorkItemCount = selectedWorkItems.length;
									var lockedItemSelected = false;
									for (var i = 0; i < selectedWorkItemCount; i++) {
										if (selectedWorkItems[i].lockedUser.length > 0)
											lockedItemSelected = true;
									}
									;
									return lockedItemSelected;
								},
								caseTypeButtonHandling : function(payload) {
									// debugger;
									if (dijit.byId("caseTypeSelect")) {
										dijit.byId("caseTypeSelect")
												.destroyRecursive();
									}
									if (document
											.getElementById("selectCaseType")) {
										document.getElementById(
												"selectCaseType").remove();
									}
									;
									var userName = ecm.model.desktop.userDisplayName;
									var userId = ecm.model.desktop.userId;
									var role = ecm.model.desktop.currentRole.name;
									var quickSearch = dojo
											.query(".icmQuickSearchContent")[0];
									var tempdata = [ {
										name : "All",
										id : "All"
									} ];
									if (role == "Customer Representative") {
										tempdata
												.push({
													name : "New Credit Card Application",
													id : "CCA_NewCreditCardApplication"
												});
									} else {
										tempdata
												.push({
													name : "New Credit Card Application",
													id : "CCA_NewCreditCardApplication"
												});
										tempdata
												.push({
													name : "Multiple Credit Card Application",
													id : "CCA_MultipleCreditCardApplication"
												});
									}
									var stateStore = new Memory({
										data : tempdata
									});
									var filteringSelect = new FilteringSelect({
										id : "caseTypeSelect",
										name : "caseType",
										value : "All",
										store : stateStore,
										searchAttr : "name"
									});
									dojo.place(filteringSelect.domNode,
											quickSearch, "first");
									dojo
											.place(
													"<label id='selectCaseType' >Select Case Type</label>",
													quickSearch, "first");
									console.log("inside");
								},
								handleSearchCriteriaForSpecificRole : function(
										payload, caseType) {
									var finalClassArr = [];
									var finalContentClassArr = [];
									for (var i = 0; i < payload.searchTemplate.classes.length; i++) {
										console
												.log(payload.searchTemplate.classes[i].id);
										if (payload.searchTemplate.classes[i].id == caseType) {
											finalClassArr
													.push(payload.searchTemplate.classes[i]);
										}
									}
									for (var j = 0; j < payload.searchTemplate._searchContentClass.contentClasses.length; j++) {
										console
												.log(payload.searchTemplate._searchContentClass.contentClasses[j].id);
										if (payload.searchTemplate._searchContentClass.contentClasses[j].id == caseType) {
											finalContentClassArr
													.push(payload.searchTemplate._searchContentClass.contentClasses[j]);
										}
									}
									payload.searchTemplate.classes = finalClassArr;
									payload.searchTemplate._searchContentClass.contentClasses = finalContentClassArr;
									payload.searchTemplate.classDisplayName = caseType;
									payload.searchTemplate.className = caseType;
									return payload;
								},
								setDisplayPropsInCaseList : function(payload) {
									var displayHeaders;
									var types;
									var fields;
									var detailsViewProps = [];
									var magazineViewProps = [];
									displayHeaders = [ "Title",
											"Customer Name", "Gender", "DOB",
											"Email ID", "Phone Number",
											"Priority" ];
									types = [ "xs:string", "xs:string",
											"xs:string", "xs:timestamp",
											"xs:string", "xs:string",
											"xs:boolean" ];
									fields = [ "caseTitle", "CCA_CustomerName",
											"CCA_Gender", "CCA_DOB",
											"CCA_EmailID", "CCA_PhoneNumber",
											"CCA_Priority" ];
									for (index = 0; index < displayHeaders.length; index++) {
										var propObj = {
											displayName : displayHeaders[index],
											orderable : true,
											symbolicName : fields[index],
											type : types[index]
										};
										detailsViewProps.push(propObj);
										magazineViewProps.push(propObj);
									}
									payload.detailsViewProperties = detailsViewProps;
									// payload.magazineViewProperties=magazineViewProps;
								},
								addSearchCriteria : function(payload, solution,
										role, scriptAdaptor) {
									// var bool =
									// solution.getPrefix()+'_boolean';
									// var criterion = new Criterion({"id":
									// "CCA_PhoneNumber","anded":false, "name":
									// "Phone Number", "selectedOperator":
									// "EQUALS", "dataType":
									// "xs:string","defaultValue" :
									// "1001001000", "value": "1001001000",
									// "values": ["1001001000"]});
									// payload.searchTemplate.searchCriteria.push(criterion);
									var caseType;
									var payloadTemp = payload;
									if (dijit.byId("caseTypeSelect").getValue() != "All") {
										payloadTemp = ccascriptadapter
												.handleSearchCriteriaForSpecificRole(
														payload,
														dijit
																.byId(
																		"caseTypeSelect")
																.getValue());
									} else if (role.name == "Customer Representative") {
										payloadTemp = ccascriptadapter
												.handleSearchCriteriaForSpecificRole(
														payload,
														"CCA_NewCreditCardApplication");
									}
									// setting display props
									ccascriptadapter
											.setDisplayPropsInCaseList(payloadTemp);
									return payloadTemp;
								},
								caseinfoPayload : function(payload, caseinfo) {
									console.log("Case info Payload");
								},
								handlingPropsInCaseDetails : function(payload) {
									console
											.log("Handling Props in Case details"
													+ payload);
									var userName = ecm.model.desktop.userDisplayName;
									var userId = ecm.model.desktop.userId;
									var role = ecm.model.desktop.currentRole.name;
									// * Get the coordination and editable
									// objects from the event payload. */
									if (payload.eventName == "icm.SendCaseInfo") {
										var coordination = payload.coordination;
										var editable = payload.caseEditable;
										/*
										 * Use the LOADWIDGET coordination topic
										 * handler to obtain the controller
										 * binding
										 */
										/*
										 * for the editable and to update the
										 * properties.
										 */
										coordination
												.participate(
														Constants.CoordTopic.LOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Obtain the
															 * controller
															 * binding for the
															 * editable.
															 */
															console
																	.log("inside load widget");
															var collectionController = ControllerManager
																	.bind(editable);
															/*
															 * Start a batch of
															 * changes.
															 */
															collectionController
																	.beginChangeSet();
															/*
															 * Make the updates
															 * to the
															 * properties.
															 */
															console
																	.log(collectionController);
															console
																	.log("Current Role is :"
																			+ ecm.model.desktop.currentRole.name);
															if (ecm.model.desktop.currentRole.name == "Customer Representative") {
																console
																		.log("inside csr");
																ccascriptadapter
																		.handlingPropsForCSR_CD(collectionController);
															} else if (ecm.model.desktop.currentRole.name == "Approver") {
																ccascriptadapter
																		.handlingPropsForApprover(collectionController);
															}
															/*
															 * Complete a batch
															 * of changes. This
															 * tells all
															 * subscribed
															 * widgets to
															 * refresh.
															 */
															collectionController
																	.endChangeSet();
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															complete();
														});
										/*
										 * Use the AFTERLOADWIDGET coordination
										 * topic handler to release the
										 * controller binding for the editable.
										 */
										coordination
												.participate(
														Constants.CoordTopic.AFTERLOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Release the
															 * controller
															 * binding for the
															 * editable.
															 */
															ControllerManager
																	.unbind(editable);
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															// get the property
															// grids
															complete();
														});
									}
								},
								handlingPropsInWorkItem : function(payload) {
									require(
											[ "cCAScriptAdapterPluginDojo/onLoad" ],
											function(onLoad) {
												console.log("inside");
											});
									console
											.log("Handling Props in work item details"
													+ payload);
									var userName = ecm.model.desktop.userDisplayName;
									var userId = ecm.model.desktop.userId;
									var role = ecm.model.desktop.currentRole.name;
									var propertiesCollection = payload.workItemEditable.propertiesCollection;
									console
											.log("Case Folder id:"
													+ payload.workItemEditable.icmWorkItem.caseFolderId);
									var editable = payload.workItemEditable;
									var workItem = editable.icmWorkItem;
									// var newResponses =
									// workItem.responses.filter(function(response)
									// {
									// return (response !== "Send to Verifier"
									// && response !== "Complete") ; });
									// workItem.responses = newResponses;
									// * Get the coordination and editable
									// objects from the event payload. */
									if (payload.eventName == "icm.SendWorkItem") {
										var coordination = payload.coordination;
										var editable = payload.workItemEditable;
										workItemEditable = payload.workItemEditable;
										/*
										 * Use the LOADWIDGET coordination topic
										 * handler to obtain the controller
										 * binding
										 */
										/*
										 * for the editable and to update the
										 * properties.
										 */
										coordination
												.participate(
														Constants.CoordTopic.LOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Obtain the
															 * controller
															 * binding for the
															 * editable.
															 */
															console
																	.log("inside load widget");
															var collectionController = ControllerManager
																	.bind(editable);
															/*
															 * Start a batch of
															 * changes.
															 */
															collectionController
																	.beginChangeSet();
															/*
															 * Make the updates
															 * to the
															 * properties.
															 */
															console
																	.log(collectionController);
															collectionController
																	.getPropertyController(
																			"CCA_POC")
																	.set(
																			"readOnly",
																			true);
															console
																	.log("Current Role is :"
																			+ ecm.model.desktop.currentRole.name);
															customerNameController = collectionController
																	.getPropertyController("CCA_CustomerName");
															ctcPropController = collectionController
																	.getPropertyController("CCA_CTC");

															if (ecm.model.desktop.currentRole.name == "Customer Representative") {
																ccascriptadapter
																		.handlingPropsForCSR(
																				collectionController,
																				payload.workItemEditable);
															} else if (ecm.model.desktop.currentRole.name == "Application Verifier") {
																ccascriptadapter
																		.handlingPropsForApplicationVerifier(collectionController);
															} else if (ecm.model.desktop.currentRole.name == "CIBIL Verifier") {
																ccascriptadapter
																		.handlingPropsForCIBILVerifier(collectionController);
															} else if (ecm.model.desktop.currentRole.name == "Approver"
																	|| ecm.model.desktop.currentRole.name == "Error") {
																ccascriptadapter
																		.handlingPropsForApprover(collectionController);
															}
															beforeCTC = ctcPropController
																	.get("value");
															/*
															 * Complete a batch
															 * of changes. This
															 * tells all
															 * subscribed
															 * widgets to
															 * refresh.
															 */
															collectionController
																	.endChangeSet();
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															complete();
														});
										/*
										 * Use the AFTERLOADWIDGET coordination
										 * topic handler to release the
										 * controller binding for the editable.
										 */
										coordination
												.participate(
														Constants.CoordTopic.AFTERLOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Release the
															 * controller
															 * binding for the
															 * editable.
															 */
															ControllerManager
																	.unbind(editable);
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															console
																	.log(dojo
																			.query("div[dojo-attach-point='_gridNode']"));
															complete();
														});
										coordination
												.participate(
														Constants.CoordTopic.BEFORESAVE,
														function(context,
																complete, abort) {
															console
																	.log("inside before save");
															afterCTC = ctcPropController
																	.get("value");
															if (beforeCTC != afterCTC) {
																customerNameController
																		.set(
																				"value",
																				"Anil1");
																beforeCTC = afterCTC;
															}
															complete();
														});
										coordination
												.participate(
														Constants.CoordTopic.COMPLETE,
														function(context,
																complete, abort) {
															console
																	.log("inside before save");
															afterCTC = ctcPropController
																	.get("value");
															if (beforeCTC != afterCTC) {
																// customerNameController.set("value","Anil1");
															}
															complete();
														});
									}
									if (payload.eventName = "icm.FieldUpdated") {
										console.log("inside icm field Updated");
										ctcPropController.set("value",
												"5000000");
										ctcPropController.set("readOnly", true);
									}
								},
								preFillingNewCaseProps : function(payload) {
									// var getJSON = function(url, callback) {
									// var xhr = new XMLHttpRequest();
									// xhr.open('GET', url, true);
									// xhr.responseType = 'json';
									// xhr.onload = function() {
									// var status = xhr.status;
									// if (status === 200) {
									// callback(null, xhr.response);
									// } else {
									// callback(status, xhr.response);
									// }
									// };
									// xhr.send();
									// };
									// getJSON("http://10.254.8.22:9080/CustomerWebApplication/customer?name=ram",
									// function(err, data) {
									// if (err !== null) {
									// console.log("Something went wrong: " +
									// err);
									// } else {
									// Console.log("Your query count: " + data);
									// }
									// });
									console
											.log("Pre Filling New Case Props Script adapter loaded"
													+ payload);
									var eventname = payload.eventName;
									// * Get the coordination and editable
									// objects from the event payload. */
									var editable = payload.caseEditable;
									// get some props controllers for later
									// handling of those properties
									if (eventname == "icm.SendNewCaseInfo") {
										var coordination = payload.coordination;
										var solutionPrefix = payload.caseType
												.getSolution().getPrefix();
										/*
										 * Use the LOADWIDGET coordination topic
										 * handler to obtain the controller
										 * binding
										 */
										/*
										 * for the editable and to update the
										 * properties.
										 */
										coordination
												.participate(
														Constants.CoordTopic.LOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Obtain the
															 * controller
															 * binding for the
															 * editable.
															 */
															console
																	.log(context);
															var collectionController = ControllerManager
																	.bind(editable);
															/*
															 * Start a batch of
															 * changes.
															 */
															collectionController
																	.beginChangeSet();
															/*
															 * Make the updates
															 * to the
															 * properties.
															 */
															customerNameController = collectionController
																	.getPropertyController("CCA_CustomerName");
															customerNameController
																	.set(
																			"required",
																			true);
															genderController = collectionController
																	.getPropertyController("CCA_Gender");
															genderController
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_DOB")
																	.set(
																			"required",
																			true);
															phoneNumberController = collectionController
																	.getPropertyController("CCA_PhoneNumber");
															phoneNumberController
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_EmailID")
																	.set(
																			"value",
																			"Testing@gmail.com");
															collectionController
																	.getPropertyController(
																			"CCA_EmailID")
																	.set(
																			"required",
																			true);
															pancardController = collectionController
																	.getPropertyController("CCA_PANCard");
															pancardController
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_CurrentAddress")
																	.set(
																			"value",
																			"Hyderabad");
															// not allowing the
															// future dates
															collectionController
																	.getPropertyController(
																			"CCA_DOB")
																	.set(
																			"maxValue",
																			new Date()
																					.toISOString());
															collectionController
																	.getPropertyController(
																			"CCA_DOB")
																	.set(
																			"value",
																			new Date());
															// collectionController.getPropertyController("CCA_DOB").set("minValue",
															// new Date(new
															// Date().getTime()
															// -
															// 30*24*60*60*1000).toISOString());

															collectionController
																	.getPropertyController(
																			"CCA_CurrentAddress")
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_AadharCard")
																	.set(
																			"value",
																			"123400005678");
															collectionController
																	.getPropertyController(
																			"CCA_AadharCard")
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_CurrentWorkingCompany")
																	.set(
																			"value",
																			"Apple");
															collectionController
																	.getPropertyController(
																			"CCA_CurrentWorkingCompany")
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_CTC")
																	.set(
																			"value",
																			"336000");
															collectionController
																	.getPropertyController(
																			"CCA_CTC")
																	.set(
																			"required",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_CreditCardBank")
																	.set(
																			"required",
																			true);
															initiateTaskController = collectionController
																	.getPropertyController("CCA_initiateTask");
															creditCardTypeController = collectionController
																	.getPropertyController("CCA_CreditCardType");
															creditCardTypeController
																	.set(
																			"hidden",
																			true);
															collectionController
																	.getPropertyController(
																			"CCA_SalaryPerMonth")
																	.set(
																			"value",
																			"25000");
															collectionController
																	.getPropertyController(
																			"CCA_SalaryPerMonth")
																	.set(
																			"required",
																			true);
															// collectionController.getPropertyController("CCA_CreditCardBank").set("hidden",true);
															/*
															 * Complete a batch
															 * of changes. This
															 * tells all
															 * subscribed
															 * widgets to
															 * refresh.
															 */
															collectionController
																	.endChangeSet();
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															complete();
														});
										/*
										 * Use the AFTERLOADWIDGET coordination
										 * topic handler to release the
										 * controller binding for the editable.
										 */
										coordination
												.participate(
														Constants.CoordTopic.AFTERLOADWIDGET,
														function(context,
																complete, abort) {
															/*
															 * Release the
															 * controller
															 * binding for the
															 * editable.
															 */
															ControllerManager
																	.unbind(editable);
															/*
															 * Call the
															 * coordination
															 * completion
															 * method.
															 */
															complete();
														});
										coordination
												.participate(
														Constants.CoordTopic.AFTERSAVE,
														function(context,
																complete, abort) {
															/*
															 * Release the
															 * controller
															 * binding for the
															 * editable.
															 */
															console
																	.log("inside aftere savev");
															initiateTaskController
																	.set(
																			"value",
																			"New Credit Application");
															complete();
														});
									} else if (eventname == "icm.PropertyUpdated") {
										if (payload.property.controller.id == "CCA_CreditCardBank") {
											creditCardTypeController.set(
													"hidden", false);
											creditCardTypeController.set(
													"required", true);
										}
										if (payload.property.controller.id == "CCA_CustomerName") {
											if (payload.value.trim().length > 0) {
												ccascriptadapter
														.invokeWebservice(payload.value
																.trim());
											} else {
												genderController.set("value",
														"");
												phoneNumberController.set(
														"value", "");
												pancardController.set("value",
														"");
											}
										}
										// debugger;
									}
								},
								attachmentValidationHandler : function(payload) {
									console.log("inside stepResponseHandler");
									var coordination = payload.coordination;
									var editable = payload.workItemEditable;
									var caseInfo = editable.getCase();
									var self = this;
									// var solution = this.solution;
									// var prefix = solution.getPrefix();
									if (coordination) {
										coordination
												.participate(
														Constants.CoordTopic.VALIDATE,
														function(context,
																complete, abort) {
															console
																	.log("Context while validating is"
																			+ context[Constants.CoordContext.WKITEMRESPONSE]);
															if (context[Constants.CoordContext.WKITEMRESPONSE] === "Send to Verifier") {
																var caseFolderId = editable.icmWorkItem.caseFolderId;
																console
																		.log("CaseFolderId:"
																				+ caseFolderId);
																tempabort = abort;
																tempComplete = complete;
																var zeroAttachments = ccascriptadapter
																		.validateWItemAttachments(
																				caseFolderId,
																				editable);
															} else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Rejected"
																	|| context[Constants.CoordContext.WKITEMRESPONSE] === "Reject") {
																var dlg = new ecm.widget.dialog.BaseDialog();
																dlg
																		.setTitle("Please Enter the Rejected Comments");
																dlg.setSize(
																		600,
																		300);
																var okButton = dlg
																		.addButton(
																				"Ok",
																				null,
																				false,
																				false,
																				null);
																on(
																		okButton,
																		"click",
																		lang
																				.hitch(
																						this,
																						function() {
																							console
																									.log("ok button clicked");
																							caseInfo
																									.addCaseComment(
																											Constants.CommentContext.CASE,
																											textarea
																													.get("value"),
																											null,
																											null,
																											true);
																							dlg
																									.destroyRecursive();
																							complete();
																						}));
																on(
																		dlg.cancelButton,
																		"click",
																		lang
																				.hitch(
																						this,
																						function() {
																							console
																									.log("Cancel button clicked");
																							abort({
																								'silent' : true
																							});
																						}));
																dlg.show();
																textarea = new SimpleTextarea(
																		{
																			name : "myarea",
																			rows : "4",
																			cols : "50",
																			style : "width:auto;"
																		});
																domConstruct
																		.place(
																				textarea.domNode,
																				dlg.contentArea);
																// caseInfo.addCaseComment(Constants.CommentContext.CASE,
																// "testing",
																// null, null,
																// true);
																// complete();
															} else {
																complete();
															}
														});
									}
								},
								onAddCaseComment : function(caseInfo) {
									console.log("ok button clicked");
									textarea.get("value");
								},
								stepResponseHandler : function(payload) {
									console.log("inside stepResponseHandler");
									var coord = payload.coordination;
									var workitemEdit = payload.workItemEditable;
									// var solution = this.solution;
									// var prefix = solution.getPrefix();
									if (coord) {
										coord
												.participate(
														Constants.CoordTopic.VALIDATE,
														function(context,
																complete, abort) {
															/*
															 * Check the
															 * specific
															 * response, an
															 * empty string ("")
															 * stands for the
															 * Complete button
															 */
															if (context[Constants.CoordContext.WKITEMRESPONSE] === "Reject") {
																console
																		.log("Reject clicked");
																var propertyController = ControllerManager
																		.bind(workitemEdit);
																propertyController
																		.beginChangeSet();
																propertyController
																		.getPropertyController(
																				"CL_RejectedBy")
																		.set(
																				"value",
																				"Verifier");
																propertyController
																		.endChangeSet();
																complete();
															} else {
																console
																		.log("Response is "
																				+ context[Constants.CoordContext.WKITEMRESPONSE]);
																complete();
															}
														});
									}
								},
								handlingPropsForCSR : function(
										collectionController, editable) {
									// making the some properties hide
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CIBILScore").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_ApplicationStatus").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_ApproverComments").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"hidden", true);
									// making the some properties readonly
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CustomerName").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_DOB").set("required", true);
									collectionController.getPropertyController(
											"CCA_Gender").set("required", true);
									collectionController.getPropertyController(
											"CCA_PhoneNumber").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_EmailID")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_PANCard")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_AadharCard").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentAddress").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CurrentWorkingCompany").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CTC").set("required", true);
									collectionController.getPropertyController(
											"CCA_SalaryPerMonth").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set(
											"required", true);
								},
								handlingPropsForApplicationVerifier : function(
										collectionController) {
									// making the some properties hide
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CIBILScore").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_ApplicationStatus").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_ApproverComments").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"hidden", true);
									// making the some properties readonly
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CustomerName").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_DOB").set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_Gender").set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_Gender")
											.set("required", false);
									collectionController.getPropertyController(
											"CCA_PhoneNumber").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_EmailID")
											.set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_PANCard")
											.set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_AadharCard").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentAddress").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CurrentWorkingCompany").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CTC").set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_SalaryPerMonth").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set(
											"required", false);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set(
											"required", false);
								},
								handlingPropsForCIBILVerifier : function(
										collectionController) {
									// making the some properties hide
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CIBILScore").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_ApplicationStatus").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_ApproverComments").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"value", false);
									// making the some properties readonly
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CustomerName").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_DOB").set("hidden", true);
									collectionController.getPropertyController(
											"CCA_Gender").set("hidden", true);
									collectionController.getPropertyController(
											"CCA_PhoneNumber").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_EmailID").set("hidden", true);
									collectionController.getPropertyController(
											"CCA_PANCard")
											.set("readOnly", true);
									collectionController.getPropertyController(
											"CCA_AadharCard").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentAddress").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentWorkingCompany").set(
											"hidden", true);
									collectionController.getPropertyController(
											"CCA_CTC").set("hidden", true);
									collectionController.getPropertyController(
											"CCA_SalaryPerMonth").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set("hidden",
											true);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set("hidden",
											true);
								},
								handlingPropsForApprover : function(
										collectionController) {
									// making the some properties hide
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"required", false);
									collectionController.getPropertyController(
											"CCA_CIBILScore").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set(
											"required", false);
									collectionController.getPropertyController(
											"CCA_ApplicationStatus").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_ApproverComments").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"readOnly", true);
									// making the some properties readonly
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CustomerName").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_DOB").set("required", true);
									collectionController.getPropertyController(
											"CCA_Gender").set("required", true);
									collectionController.getPropertyController(
											"CCA_PhoneNumber").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_EmailID")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_PANCard")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_AadharCard").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentAddress").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CurrentWorkingCompany").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CTC").set("required", true);
									collectionController.getPropertyController(
											"CCA_SalaryPerMonth").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set(
											"required", true);
								},
								handlingPropsForCSR_CD : function(
										collectionController) {
									// making the some properties hide
									collectionController.getPropertyController(
											"CCA_DocumentVerified").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CIBILScore").set("readOnly",
											true);
									collectionController.getPropertyController(
											"CCA_ExistingLoans").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_ApplicationStatus").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_ApproverComments").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CIBILDeadlineReached1").set(
											"readOnly", true);
									// making the some properties readonly
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_ApplicationNumber").set(
											"readOnly", true);
									collectionController.getPropertyController(
											"CCA_CustomerName").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_DOB").set("required", true);
									collectionController.getPropertyController(
											"CCA_Gender").set("required", true);
									collectionController.getPropertyController(
											"CCA_PhoneNumber").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_EmailID")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_PANCard")
											.set("required", true);
									collectionController.getPropertyController(
											"CCA_AadharCard").set("required",
											true);
									collectionController.getPropertyController(
											"CCA_CurrentAddress").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CurrentWorkingCompany").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CTC").set("required", true);
									collectionController.getPropertyController(
											"CCA_SalaryPerMonth").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardBank").set(
											"required", true);
									collectionController.getPropertyController(
											"CCA_CreditCardType").set(
											"required", true);
								},
								validateWItemAttachments : function(folderId,
										workItemEditable) {
									var tempCallback = lang
											.hitch(
													this,
													function(contentItem) {
														// console.log(contentItem);
														contentItem
																.retrieveFolderContents(
																		false,
																		function(
																				resultSet) {
																			// console.log(resultSet.items);
																			var canProceed = false;
																			var items = resultSet.items;
																			console
																					.log(items.length);
																			if (items.length == 0) {
																				var messageDialog = new ecm.widget.dialog.MessageDialog(
																						{
																							text : "Attachment missing, please attach atleast One document to proceed further."
																						});
																				messageDialog
																						.show();
																				tempabort({
																					'silent' : true
																				});
																			} else {
																				console
																						.log("inside else");
																				tempComplete();
																			}
																		},
																		null,
																		null,
																		null,
																		null,
																		null,
																		null,
																		null);
													});
									workItemEditable.repository.retrieveItem(
											folderId, tempCallback, null, null,
											null, null, null);
								},
								executeScriptActionAddDoc : function(temp) {
									console.log("inside");
									var self = temp;
									var caseEdt = self.getActionContext("Case")[0];
									var parentFolder = self
											.getActionContext("CurrentFolder")[0]; /*
																					 * Create
																					 * the
																					 * add
																					 * document
																					 * dialog
																					 */
									var addContentItemDialog = new AddContentItemDialog();
									var _propagateCaseProps = function() {
										console.log("inside propagate");
										var contentItemPropertiesPane = addContentItemDialog.addContentItemPropertiesPane; /*
																															 * Fetch
																															 * the
																															 * properties
																															 * from
																															 * document
																															 * properties
																															 * pane
																															 */
										var allProps = contentItemPropertiesPane
												.getPropertiesJSON(); /*
																		 * Match
																		 * the
																		 * doc
																		 * propertis
																		 * with
																		 * case
																		 * properties,
																		 * and
																		 * set
																		 * value
																		 */
										var propsCtrl = ControllerManager
												.bind(caseEdt);
										array
												.forEach(
														allProps,
														function(entry, i) {
															var propName = entry.name;
															var propCtrl = propsCtrl
																	.getPropertyController(propName);
															if (propCtrl) {
																var casePropValue = propCtrl
																		.get("value");
																if (entry.dataType === "xs:boolean") {
																	/*
																	 * Convert
																	 * the case
																	 * property
																	 * control's
																	 * value to
																	 * case
																	 * document
																	 * property
																	 * control's
																	 * vaule
																	 */
																	casePropValue = (casePropValue == true) ? 1
																			: 0;
																} else if (entry.dataType === "xs:timestamp") {
																	casePropValue = casePropValue
																			.valueOf();
																}
																contentItemPropertiesPane
																		.setPropertyValue(
																				propName,
																				casePropValue);
															}
														});
										ControllerManager.unbind(caseEdt);
									};
									var widgetAttrs = null;
									var widget = self.getWidget();
									if (widget.parentWidget
											&& widget.parentWidget.getWidgetAttributes) {
										widgetAttrs = widget.parentWidget
												.getWidgetAttributes();
									} else {
										widgetAttrs = widget
												.getWidgetAttributes();
									} /*
										 * Check if the the solution document
										 * type filtering is on in the case
										 * information widget's configuration
										 */
									var filterOn = widgetAttrs
											.getItemValue("filterDocumentTypes");
									var entryTemplateId = "{60B5A086-0000-C218-ABCE-449EA3C81CFA}";
									if (entryTemplateId) {
										// var self = this;
										parentFolder.repository
												.retrieveItem(
														entryTemplateId,
														function(item) {
															var entryTemplate = parentFolder.repository
																	.getEntryTemplateById(
																			item.id,
																			item.name,
																			item.objectStore);
															var entryTemplateRetrievedHandler = lang
																	.hitch(
																			this,
																			function(
																					entryTemplate) {
																				if (entryTemplate) {
																					var cloneET = entryTemplate
																							.clone();
																					cloneET.folder = parentFolder;
																					cloneET.allowUserSelectFolder = false;
																					addContentItemDialog
																							.show(
																									parentFolder.repository,
																									parentFolder,
																									true,
																									false,
																									null,
																									null,
																									true,
																									cloneET);
																				} else {
																					// TODO:
																					// un-expected
																					// err.
																					// this.show(repository,
																					// parentFolder,
																					// typeDocument,
																					// false,
																					// callback,
																					// teamspace,
																					// true,
																					// entryTemplate);
																				}
																			});
															if (!entryTemplate.isRetrieved) {
																entryTemplate
																		.retrieveEntryTemplate(
																				entryTemplateRetrievedHandler,
																				false,
																				false);
															} else {
																entryTemplateRetrievedHandler(entryTemplate);
															}
														}, "EntryTemplate",
														"current",
														"{60B5A086-0000-C410-96AA-13ABFB3FA8AF}");
									} else {
										addContentItemDialog
												.showUsingTemplateItem(
														repository,
														parentFolder, true,
														false,
														this._getCallback(),
														null, null);
									}
									// var repository =
									// ecm.model.desktop.getRepository("icmtos");
									// parentFolder.repository.retrieveItem(entryTemplateId,
									// function(item) {
									// console.log("inside teting;" + item);
									// if (filterOn) {
									// var currSolution =
									// caseEdt.getCase().caseType.getSolution();
									// currSolution.retrieveDocumentTypes(function(docTypes)
									// {
									// var dcList = null;
									// if (docTypes && docTypes.length > 0) {
									// dcList = new Teamspace({
									// repository: parentFolder.repository,
									// name: parentFolder.repository.name,
									// type: Teamspace.RUNTIME,
									// addAllowAllClasses: false,
									// contentClasses: docTypes,
									// defaultClass: null
									// });
									// } /*Show the add document dialog*/
									// addContentItemDialog.show(parentFolder.repository,
									// parentFolder, true, false, null, dcList,
									// true, item, true);
									// });
									// } else {
									// /*Show the add document dialog*/
									// //addContentItemDialog.show(parentFolder.repository,
									// parentFolder, true, false, null, null,
									// true, item, true);
									// addContentItemDialog.showUsingTemplateItem(parentFolder.repository,
									// parentFolder, true, false, null, null,
									// item);
									// } /*Hook to the complete rendering
									// document properties*/
									// }, "EntryTemplate", "current",
									// "{60B5A086-0000-C410-96AA-13ABFB3FA8AF}");
									aspect
											.after(
													addContentItemDialog.addContentItemPropertiesPane,
													"onCompleteRendering",
													_propagateCaseProps);
								},
								rejectedDynamicInbasket : function(payload) {
									var myUser = ecm.model.desktop.userDisplayName;
									var data = {
										"queueName" : "CCA_CustomerRepresentative",
										"inbasketName" : "Rejected By Verifier",
										"hideFilterUI" : true,
										"queryFilter" : "(CCA_RejectedBy = :A)",
										"queryFields" : [ {
											"name" : "CCA_RejectedBy",
											"type" : "xs:string",
											"value" : "Verifier"
										} ],
										"hideLockedByOther" : "true"
									};
									var data1 = {
										"queueName" : "CCA_CustomerRepresentative",
										"inbasketName" : "Rejected By Approver",
										"hideFilterUI" : true,
										"queryFilter" : "(CCA_RejectedBy = :A)",
										"queryFields" : [ {
											"name" : "CCA_RejectedBy",
											"type" : "xs:string",
											"value" : "Approver"
										} ],
										"hideLockedByOther" : "true"
									};
									var data2 = {
										"queueName" : "CCA_CustomerRepresentative",
										"inbasketName" : "Customer Representative",
										"hideFilterUI" : true,
										"queryFilter" : "(CCA_RejectedBy = :A)",
										"queryFields" : [ {
											"name" : "CCA_RejectedBy",
											"type" : "xs:string",
											"value" : "none"
										} ],
										"hideLockedByOther" : "true"
									};
									var model = icm.model.InbasketDynamicFilter
											.fromJSON(data);
									var model1 = icm.model.InbasketDynamicFilter
											.fromJSON(data1);
									var model2 = icm.model.InbasketDynamicFilter
											.fromJSON(data2);
									console.log(model);
									var modelArray = [];
									modelArray.push(model);
									modelArray.push(model1);
									modelArray.push(model2);
									console.log(modelArray);
									return {
										"dynamicFilters" : modelArray
									};
								},
								handleOpenSelectedWIEventAction : function(
										payload, self) {
									console.log(payload);
									for ( var i in payload.WorkItem) {
										var w = payload.WorkItem[i];
										var h = new icm.util.WorkItemHandler(
												self, true);
										w.retrieveStep(function(workItem) {
											h.handleWorkItem(workItem);
										});
									}
								},
								propsWidgetEventHandlerWIDetails : function(
										payload, self) {
									if (payload.eventName == "icm.PropertyUpdated") {
										var caseEditable = payload.caseEditable;
										CollectionC
									}
								},
								invokeWebservice : function(name) {
									var serviceParams = {
										"name" : name
									};
									Request
											.invokePluginService(
													"CCAScriptAdapterPlugin",
													"CustomerWebApplicationService",
													{
														requestCompleteCallback : function(
																response) {
															console
																	.log("response from service: "
																			+ response.data);
															var outputArr = JSON
																	.parse(response.data);
															if (outputArr.length == 1) {
																var customerName = outputArr[0].customerName;
																var gender = outputArr[0].gender;
																var phoneNumber = outputArr[0].phoneNumber;
																var panCard = outputArr[0].panCard;
																genderController
																		.set(
																				"value",
																				gender);
																genderController
																		.set(
																				"readOnly",
																				true);
																phoneNumberController
																		.set(
																				"value",
																				phoneNumber);
																phoneNumberController
																		.set(
																				"readOnly",
																				true);
																pancardController
																		.set(
																				"value",
																				panCard);
																pancardController
																		.set(
																				"readOnly",
																				true);
																customerNameController
																		.set(
																				"value",
																				customerName);
															} else {
																genderController
																		.set(
																				"value",
																				"");
																phoneNumberController
																		.set(
																				"value",
																				"");
																pancardController
																		.set(
																				"value",
																				"");
																pancardController
																		.set(
																				"readOnly",
																				false);
																genderController
																		.set(
																				"readOnly",
																				false);
																phoneNumberController
																		.set(
																				"readOnly",
																				false);
															}
														},
														requestFailedCallback : function(
																err) {
															console.log(err);
														},
														requestParams : serviceParams
													});
								},
								splitCaseButtonHandling : function(payload) {

									var userName = ecm.model.desktop.userDisplayName;
									var userId = ecm.model.desktop.userId;
									var role = ecm.model.desktop.currentRole.name;
									if (payload.eventName == "icm.SendCaseInfo") {
										// * Get the coordination and editable
										// objects from the event payload. */
										var coordination = payload.coordination;
										var editable = payload.caseEditable;
										/*
										 * Use the LOADWIDGET coordination topic
										 * handler to obtain the controller
										 * binding
										 */
										/*
										 * for the editable and to update the
										 * properties.
										 */
										var collectionController = ControllerManager
												.bind(editable);
										splitController = collectionController
												.getPropertyController("CCA_CanBeSplit");
										// var
										// splitaspect=aspect.after(OpenSplitCasePage.prototype,"isEnabled",function(){
										//                	
										// var role =
										// ecm.model.desktop.currentRole.name;
										// if( role != "Approver"){
										// splitaspect.remove();
										// return false;
										// }
										// else
										// if(!splitController.get("value")==
										// true){
										// splitaspect.remove();
										// return false;
										// }
										// });

									} else {
										console.log("split case  tab");
										if (!splitController.get("value") == true
												|| role != "Approver") {
											var buttons = dojo
													.query(".dijitReset.dijitInline.dijitButtonText");
											for (var i = 0; i < buttons.length; i++) {
												if (buttons[i].innerHTML == "Split Case") {
													console
															.log("Split Case button found");
													// buttons[i].parentElement.parentElement.click();
													console.log(splitController
															.get("value"));

													buttons[i].parentElement.parentElement
															.remove();

													break;
												}
											}
										}
									}
								},
								completeResponseHandling : function(payload,
										self) {
									console
											.log("inside completeResponseHandlding");
								}
							});
		});