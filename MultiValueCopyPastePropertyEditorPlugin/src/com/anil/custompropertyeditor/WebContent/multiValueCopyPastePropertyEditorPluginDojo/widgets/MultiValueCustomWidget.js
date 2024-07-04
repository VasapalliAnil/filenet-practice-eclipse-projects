define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dijit/_Widget",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"pvr/widget/editors/DropDownListEditor", "dojo/dom-construct","dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-attr","dojo/i18n!pvr/nls/common",
		"dojo/text!./templates/MultiValueWidgetTemplate.html" ], function(
		declare, lang, on, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin,
		DropDownListEditor, domConstruct,domClass, domStyle, domAttr,resources, template) {
	return declare([ DropDownListEditor, _Widget, _TemplatedMixin,
			_WidgetsInTemplateMixin, ], {
		// templateString: template,
		// widgetsInTemplate: true,

		postCreate : function() {
			debugger;
			this.inherited(arguments);

				// Handle button click
			// Create the button element
			var button = domConstruct.create("button", {
				innerHTML : "Click Me!",
				style : "margin-left: 10px;"
			}, this.domNode);

			
		},

		_onButtonClick : function() {
			// Add your button click handling logic here
			console.log("Button clicked!");
		}

	});
});