define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dijit/_Widget",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"pvr/widget/editors/DropDownListEditor", "dojo/dom-construct",
		"dojo/text!./templates/MultiValueWidgetTemplate.html" ], function(
		declare, lang, on, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin,
		DropDownListEditor, domConstruct, template) {
	return declare([ DropDownListEditor, _Widget, _TemplatedMixin,
			_WidgetsInTemplateMixin, ], {
		// templateString: template,
		// widgetsInTemplate: true,

		postCreate : function() {
			debugger;
			this.inherited(arguments);

			// Set up the buttons.
			this._okButton.set("label", resources.common.ok);
			this._cancelButton.set("label",
					this.readOnly ? resources.common.close
							: resources.common.cancel);
			domStyle.set(this._okButton.domNode, "display",
					this.readOnly ? "none" : "");

			// Initialize some styling.
			domClass.add(this.domNode, "pvrEditor pvrDropDownEditor");
			domClass.toggle(this.domNode, "pvrDropDownEditorButton",
					this.dropDownStyle !== "link"); // Could be "default" or
													// "button".
			domClass.toggle(this.domNode, "pvrDropDownEditorLink",
					this.dropDownStyle === "link");
			domAttr.set(this._dialog.domNode, "dijitPopupParent", this.id);
			domAttr.set(this._dropDownButton.focusNode, "tabIndex", "-1");

			// The following members are required for resizing logic.
			this._isLink = this.dropDownStyle === "link";
			this._dropDownNode = this._dropDownButton.domNode;
			this._buttonNode = this._dropDownButton._buttonNode;
			this._valueNode = this._isLink ? this._dropDownButton.linkNode
					: this._dropDownButton.containerNode;

			this._dropDownButton.autoWidth = false;
			// Handle button click
			// Create the button element
			var button = domConstruct.create("button", {
				innerHTML : "Click Me!",
				style : "margin-left: 10px;"
			}, this.domNode);

			this.own(on(this.customButton, 'click', this._onButtonClick
					.bind(this)));
		},

		_onButtonClick : function() {
			// Add your button click handling logic here
			console.log("Button clicked!");
		}

	});
});