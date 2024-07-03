define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/TestCustomWidgetTemplate.html",
    "testCustomPropertyEditorPluginDojo/widgets/LookupDialog"], function (
    declare,
    lang,
    on,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,LookupDialog
) {
    return declare([
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
    ], {
        templateString: template,
        widgetsInTemplate: true,
 
        postCreate: function () {
        	if(!this.IsitLookup){
        		dojo.style(this.lookupButtonNode.domNode,'display','none');
        	}
        	else{
        		dojo.query(".lookupButtonClass").query(".dijitButtonNode")[0].style = "padding: 0; border: none;background-color: transparent;outline: none;border-radius: 15px;";
        	}
        	
            // We are listening to our input field for updates, then emit an event
            // by calling our onChange method. In our case, this will notify the 
            // _EditorMixin that it should update the property's value, but that good
            // practice anyway
            on(this.inputField, "change", lang.hitch(this, function (value) {
                this.onChange(value);
            }));
        },
        // _EditorMixin is listening to this, so call it when your widget changes
        onChange: function (value) {},
 
        // Setter and Getter for the value member should be
        // connected to our input field's value, and can
        // become more complex if we add other inner widgets
        // to our widget
        _getValueAttr: function () {
            return this.inputField.get("value");
        },
        _setValueAttr: function (value) {
            this.inputField.set("value", value);
        },
        openLookupDailog: function(){
        	console.log("Lookup button clicked");
        	var propControllers=this.property.collectionController.collections.Properties.propertyControllers;
        	var dlg=new LookupDialog();
        	dlg.show(propControllers);
        	
        }
         
    });
});