define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "pvr/widget/editors/DropDownListEditor",
    "dojo/text!./templates/MultiValueWidgetTemplate.html"
    ], function (
    declare,
    lang,
    on,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    DropDownListEditor,
    template
) {
    return declare([DropDownListEditor,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
    ], {
        //templateString: template,
        //widgetsInTemplate: true,
 
        postCreate: function() {
        	debugger;
            this.inherited(arguments);
            
            // Handle button click
         // Create the button element
            var button = domConstruct.create("button", {
                innerHTML: "Click Me!",
                style: "margin-left: 10px;"
            }, this.domNode);
            
            this.own(
                on(this.customButton, 'click', this._onButtonClick.bind(this))
            );
        },

        _onButtonClick: function() {
            // Add your button click handling logic here
            console.log("Button clicked!");
        }
         
    });
});