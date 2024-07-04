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
 
      
    });
});