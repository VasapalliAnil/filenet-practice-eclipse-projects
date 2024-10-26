define(["dojo/_base/declare",

        "dojo/_base/lang",

        "gridx/modules/NestedSort", //Include the nested sort module

        "ecm/widget/listView/ContentList",

        "gridx/modules/select/Row",

        "gridx/modules/extendedSelect/Row",

        "ecm/widget/listView/gridModules/Body",],

        function(declare, lang, NestedSort, ContentList, SelectRow, ExtendedSelectRow, Body){

    

    return declare("icm.custom.pgwidget.custominbasket.ContentList", [ContentList], {//Inherited from the ecm/widget/listView/ContentList

 

        //Override the _getModules function, add NestedSort to supported modules

        _getModules: function(){

            //Start - copy from the ecm/widget/listView/ContentList._getModules()

            var gridModules = [];

            for ( var i in this.coreModules) {

                gridModules.push(this.coreModules[i]);

            }

            if (this.multiSelect) {

                gridModules.push(SelectRow);

                gridModules.push(ExtendedSelectRow);

            } else {

                gridModules.push({

                    moduleClass: SelectRow,

                    multiple: false,

                    triggerOnCell: true

                });

            }

            if (this.emptyMessage && this.emptyMessage != "") {

                gridModules.push({

                    moduleClass: Body,

                    emptyInfo: this.emptyMessage

                });

            } else {

                gridModules.push(Body);

            }

            for ( var i in this._gridExtensionModules) {

                gridModules.push(this._gridExtensionModules[i]);

            }

            //End - copy from the ecm/widget/listView/ContentList._getModules()

 

            // Add the nested sort with the model's specified sortIndex & sortDirection

            if (this._resultSet.sortIndex != undefined && this._resultSet.sortIndex != -1) {

            

                    gridModules.push(NestedSort);

                

            }

            return gridModules;         

        },

        

        _eoc_: null

    });

});