define([
    "dojo/_base/declare",
    "dojo/json",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/data/util/sorter",
    //"ecm/widget/listView/ContentList",
    "./ContentList",
    "icm/pgwidget/inbasket/Inbasket",
    "gridx/modules/Pagination",
    "gridx/modules/pagination/PaginationBar"
], function(declare, json, lang, aspect, sorter,ContentList, Inbasket, Pagination, PaginationBar) {
    return declare("icmsample.pgwidget.custominbasket.CustomInbasket", [Inbasket], {

        buildRendering: function() {
            console.log(this.templateString);
            this.inherited(arguments);
        },
        //Override the createInbasketTab function, using the custom content list

        createInbasketTab: function(tabs) {         

            for(var i = 0; i < tabs.length; i++) {

                var cl = new ContentList(tabs[i]);//Create contentlist

                cl.setContentListModules(this._getContentListModules());

                this.tabContainer.addChild(cl);

                this.contentLists.push(cl);

            }

        },

        

        //Override the _processResultSet function, add hook to the doSort() function on resultSet, make it do client side sort when there are secondary sort.

        _processResultSet:function(resultSet){

            //Custom sort function

            var doSort = function(p, afterSort, store){

                //The p is a list of user choosed sort columns in the UI, if its length is bigger than 1, we try it as secondary sort
            	// add the first column as a server side sortint
            	var sort=[];
                 sort.push({
                	 "colId": "5",
                	 "descending": true,
                	 "attribute": "BAO_FirstName"
                 });
                 sort.push(p[0]);
                 p=sort;
                if (store && this.items && p.length > 1){

                    var sortStore = {

                        comparatorMap: store.comparatorMap,

                        getValue: function(item, attribute) {

                            var value = null;

                            if (item && item.getValue) {

                                value = item.getValue(attribute);
// change the string prperoty to consider it as integer while sorting which
                                // fixe the wid string prop sorting issue
                                if(attribute == "BAO_LastName"){
                                    value=parseInt(value);
                                }
                            }

                            return value;

                        }

                    };

                    this.items.sort(sorter.createSortFunction(p, sortStore));

                    if (afterSort) {

                        afterSort(this);

                    }                   

                }else{

                    //Do the default sort provide by original resultSet, it's server sort if client doesn't retrieve all items back, otherwise it also do client sort

                    this.orig_doSort(p, afterSort, store);

                }

            };

            resultSet.orig_doSort = lang.hitch(resultSet, resultSet.doSort);            

            resultSet.doSort = lang.hitch(resultSet, doSort);//replace the original sort with the custom sort

            

            this.inherited(arguments);

        },

        postCreate: function() {
            console.log("inside custom inbasket");
            this.inherited(arguments);
            //aspect.after(this, "createContentList", lang.hitch(this, "ColorNdPagination"), true);
        },

        ColorNdPagination: function() {
            console.log("inside ColorNdPagination! method");

            var cl = this.contentLists[this.selectedIndex];
            console.log("now calling DMPagination!");
            aspect.before(cl, "_createGrid", lang.hitch(this, "DMPagination"), true);
            console.log("now calling DMColour!");
            aspect.after(cl, "_createGrid", lang.hitch(this, "DMColour"), true);
        },
        DMPagination: function() {
            console.log("inside DM Pagination");
            console.log("this.selectedIndex11 -- " + this.selectedIndex);
            var cl = this.contentLists[this.selectedIndex];
            dojo.query(".topContainer", this.tabContainer.domNode).forEach(function(node) {

            });
            dojo.query(".dijitTabContainerTop-spacer", this.tabContainer.domNode).forEach(function(node) {

            });
            dojo.query(".dijitTabPaneWrapper", this.tabContainer.domNode).forEach(function(node) {

            });
            cl.coreModules.push({
                moduleClass: Pagination,
                initialPageSize: 500,
                initialPage: 1
            });
            /* cl.coreModules.push({
             *  *                 moduleClass: PaginationBar,
             *   *                 				pageSizes: [50, 100, 200, 300, 0],
             *    *                 								maxVisiblePageCount: 6,
             *     *                 												pageSizeSeparator: '|',				
             *      *                 																position: 'bottom'
             *       *                 																            });*/
        },
        DMColour: function() {

            var role = ecm.model.desktop.currentRole.name;
            var solution = this.solution.id;
            console.log("solution::::--", solution);
            console.log("this::::--", this);
            console.log("caseTypes[0].id:---", this.caseTypes[0].id);
            /*console.log("caseTypes[1].id:---",this.caseTypes[1].id);*/
            console.log("caseTypes[0].id:---", this.caseTypes[0].id);
            if (solution == "BOE") {
                console.log("inside DM Colour and Needed DM Pagination");
                var cl = this.contentLists[this.selectedIndex];
                var _grid = cl.grid;
                dojo.connect(_grid.body, 'onAfterRow', function(row) {
                    var r = row.data();
                    console.log("Row : " + r);
                    var node = row.node();
                    console.log("Node : " + node);

                    var rowtable = dojo.query('.gridxRowTable');
                    console.log("Row Table Length : " + rowtable.length);
                    for (var rownum = 0; rownum < rowtable.length; rownum++) {
                        var isgreenchannel1 = "";
                        var ccrow = rowtable[rownum].childNodes[0].childNodes[0];

                        console.log("RowTable ccrow :" + ccrow);
                        console.log("Total Columns in row :" + ccrow.childNodes.length);


                        if (ccrow.childNodes[9] != undefined) {
                            var recordStatus = ccrow.childNodes[9].textContent;
                            console.log("recordStatus :" + recordStatus);

                            if (recordStatus == 'Single Bill Single BOE') {
                                ccrow.style.backgroundColor = "#99d6ff";
                            }

                        }


                    }

                });
                _grid.pagination.gotoPage(0);


            }
            if (solution == "IB") {

                console.log("inside DM Colour and Needed DM Pagination");
                var cl = this.contentLists[this.selectedIndex];
                var _grid = cl.grid;
                dojo.connect(_grid.body, 'onAfterRow', function(row) {
                    var r = row.data();
                    console.log("Row : " + r);
                    var node = row.node();
                    console.log("Node : " + node);

                    var rowtable = dojo.query('.gridxRowTable');
                    console.log("Row Table Length : " + rowtable.length);
                    for (var rownum = 0; rownum < rowtable.length; rownum++) {
                        var isgreenchannel1 = "";
                        var ccrow = rowtable[rownum].childNodes[0].childNodes[0];

                        console.log("RowTable ccrow :" + ccrow);
                        console.log("Total Columns in row :" + ccrow.childNodes.length);


                        if (ccrow.childNodes[17] != undefined) {
                            var recordStatus = ccrow.childNodes[17].textContent;
                            console.log("recordStatus :" + recordStatus);

                            if (recordStatus == 'Success' && role == 'FIDB SOL CHECKER') {
                                ccrow.style.backgroundColor = "#90EE90";
                            } else if (recordStatus == 'Failed') {
                                ccrow.style.backgroundColor = "#ff0000";
                            } else if (recordStatus == 'Working' && role == 'FIDB SOL MAKER') {
                                ccrow.style.backgroundColor = "#ff0000";
                            } else if (recordStatus == 'NEW' && role == 'FIDB SOL CHECKER') {
                                ccrow.style.backgroundColor = "#FFBF00";
                            }

                        }
                        /*Trade API code start*/
                        if (role == 'FIBC & FIBLC SOL CHECKER') {
                            if (ccrow.childNodes[24] != undefined) {
                                var source = ccrow.childNodes[24].textContent;
                                if (source == 'Trade API') {
                                    ccrow.style.backgroundColor = "#D195BB";
                                }
                            }
                        } else if (role == 'FIBC & FIBLC PENDING REALISATION') {
                            if (ccrow.childNodes[20] != undefined) {
                                var source = ccrow.childNodes[20].textContent;
                                if (source == 'Trade API') {
                                    ccrow.style.backgroundColor = "#D195BB";
                                }
                            }
                        }
                        /*Trade API code end*/


                    }

                });
                _grid.pagination.gotoPage(0);
            }

            if (solution == "EXPORT BILL" || true) {


                var cl = this.contentLists[this.selectedIndex];
                var _grid = cl.grid;
                dojo.connect(_grid.body, 'onAfterRow', function(row) {
                    var r = row.data();

                    var node = row.node();

                    var rowtable = dojo.query('.gridxRowTable');

                    for (var rownum = 0; rownum < rowtable.length; rownum++) {
                        var isgreenchannel1 = "";
                        var ccrow = rowtable[rownum].childNodes[0].childNodes[0];



                        if (ccrow.childNodes[15] != undefined) {
                            var isPriorityCustomer = ccrow.childNodes[15].textContent;


                            if (isPriorityCustomer == 'True') {
                                ccrow.style.backgroundColor = "#00FFFF";
                            }
                        }

                        if (ccrow.childNodes[12] != undefined) {
                            var isPriorityCustomer = ccrow.childNodes[12].textContent;


                            if (isPriorityCustomer == 'True') {
                                ccrow.style.backgroundColor = "#00FFFF";
                            }
                        }

                        if (ccrow.childNodes[13] != undefined) {
                            var isPriorityCustomer = ccrow.childNodes[13].textContent;


                            if (isPriorityCustomer == 'True') {
                                ccrow.style.backgroundColor = "#00FFFF";
                            }
                        }

                        if (ccrow.childNodes[16] != undefined && ccrow.childNodes[17] != undefined) {
                            var recordStatus = ccrow.childNodes[16].textContent;
                            var sso_nonsso = ccrow.childNodes[17].textContent;

                            if (sso_nonsso == 'SSO') {
                                if (recordStatus == 'Success') {
                                    ccrow.style.backgroundColor = "#90EE90";
                                } else if (recordStatus == 'Failed') {
                                    ccrow.style.backgroundColor = "#ffffff";
                                } else if (recordStatus == 'Waiting') {
                                    ccrow.style.backgroundColor = "#FFBF00";
                                }
                            }
                        }


                    }

                });
                _grid.pagination.gotoPage(0);
            }

            
            if (solution == "OBC") {
                var cl = this.contentLists[this.selectedIndex];
                var _grid = cl.grid;
                dojo.connect(_grid.body, 'onAfterRow', function(row) {
                    var r = row.data();

                    var node = row.node();


                    var rowtable = dojo.query('.gridxRowTable');

                    for (var rownum = 0; rownum < rowtable.length; rownum++) {
                        var isgreenchannel1 = "";
                        var ccrow = rowtable[rownum].childNodes[0].childNodes[0];



                        if (ccrow.childNodes[3] != undefined) {
                            var ownBankDiscounting = ccrow.childNodes[3].textContent;
                            console.log("ownBankDiscounting : Nithin" + ownBankDiscounting);
                            ccrow.outerHTML = ccrow.outerHTML.split('Overdue').join('SLA Breached');
                            /*ccrow.outerHTML.replace(">Overdue<", ">SLA Breached<");
                            console.log(ccrow.outerHTML);
                            ccrow.outerHTML=ccrow.outerHTML.replace(">Overdue<", ">SLA Breached<");
                            console.log(ccrow.outerHTML);*/
                        }

                    }

                });
                _grid.pagination.gotoPage(0);

            }
            
            if (solution == "IBC") {


                var cl = this.contentLists[this.selectedIndex];
                var _grid = cl.grid;
                dojo.connect(_grid.body, 'onAfterRow', function(row) {
                    var r = row.data();

                    var node = row.node();


                    var rowtable = dojo.query('.gridxRowTable');

                    for (var rownum = 0; rownum < rowtable.length; rownum++) {
                        var isgreenchannel1 = "";
                        var ccrow = rowtable[rownum].childNodes[0].childNodes[0];



                        if (ccrow.childNodes[3] != undefined) {
                            var ownBankDiscounting = ccrow.childNodes[3].textContent;
                            console.log("ownBankDiscounting : Nithin" + ownBankDiscounting);

                            if (ownBankDiscounting == 'Yes') {
                                /*var cc = ccrow.outerHTML;
                                cc = cc.split('Overdue').join('Nithin');
                                ccrow.outerHTML=cc;Nithin*/
                                ccrow.style.backgroundColor = "#00FFFF";
                            }
                        }

                    }

                });
                _grid.pagination.gotoPage(0);
            } else {
                if (solution != "IMPORT BILL") {
                    console.log("inside DM Colour and Needed DM Pagination");
                    var cl = this.contentLists[this.selectedIndex];
                    var _grid = cl.grid;
                    dojo.connect(_grid.body, 'onAfterRow', function(row) {
                        var r = row.data();
                        console.log("Row : " + r);
                        var node = row.node();
                        console.log("Node : " + node);

                        var rowtable = dojo.query('.gridxRowTable');
                        console.log("Row Table Length : " + rowtable.length);
                        for (var rownum = 0; rownum < rowtable.length; rownum++) {
                            var isgreenchannel1 = "";
                            var ccrow = rowtable[rownum].childNodes[0].childNodes[0];

                            console.log("RowTable ccrow :" + ccrow);
                            console.log("Total Columns in row :" + ccrow.childNodes.length);

                            var curingRequired = ccrow.childNodes[10].textContent;
                            console.log("curingRequired :" + curingRequired);

                            if (curingRequired == 'Yes') {
                                ccrow.style.backgroundColor = "#f48b8b";
                            }
                        }

                    });
                    _grid.pagination.gotoPage(0);
                }
            }




        },
        _eoc_: null
    });
});
