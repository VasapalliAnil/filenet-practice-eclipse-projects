define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-style",
    "multiValueCopyPastePropertyEditorPluginDojo/widgets/MultiValueCustomWidget",
    "pvr/widget/editors/mixins/_EditorMixin"
], function(
    declare, lang, domStyle, MultiValueCustomWidget, _EditorMixin
) {
    return declare([
        MultiValueCustomWidget,
        _EditorMixin
    ], {
 
        editorClass: "pvrDropDownEditor", // the css class applied to the main div of your widget
                                         // if not set your node will also have a undefined css class
                                         // not a big deal but that's better to use predefined class or yours
         
        // The _EditorMixin is calling this and is using this.oneuiBaseNode in it,
        // so you have to either have a oneuiBaseNode attach-point in your template, or 
        // overwrite these functions (adjustWidth and resetWidth) or it will fail
        adjustWidth: function(widthSettings) {
            domStyle.set(this.inputField, "width", this.computeAdjustedWidth(widthSettings.computed, widthSettings) + "px");
        },
        resetWidth: function() {
            domStyle.set(this.inputField, "width", "");
        },
         
        // The _EditorMixin is expecting the widget to implement the validate interface
        // So either extend a widget already implementing it (like ValidationTextBox)
        // or implement the validate and isValid functions or it will fail
        //
        validate: function(/*Boolean*/ isFocused){},
 
        isValid: function () {
            return true;
        }
    });
});