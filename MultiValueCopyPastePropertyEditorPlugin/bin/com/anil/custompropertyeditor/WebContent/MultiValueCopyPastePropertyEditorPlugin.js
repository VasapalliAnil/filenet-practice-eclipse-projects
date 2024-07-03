require([
    "dojo/_base/lang",
    "ecm/model/configuration/ControlRegistry",
    "pvd/widget/designer/settings/TextBoxSetting",
    "pvd/widget/designer/settings/CheckBoxSetting",
    "pvr/widget/editors/DropDownListEditor",
    "multiValueCopyPastePropertyEditorPluginDojo/editors/MultiValueCopyPasteEditor" // our custom editor widget
], function(
		lang, ControlRegistry, TextBoxSetting, CheckBoxSetting, DropDownListEditor,MultiValueCopyPasteEditor
) {
	console.log("inside Multi Value Copy Paste Property Editor plugin");
    var editorId = "multiValueCopyPasteEditor";
 
    ControlRegistry.editors.editorConfigs[editorId] = {
        label: "Multi Value Copy Paste Editor",
        editorClass: MultiValueCopyPasteEditor,
        settings: [ 
           
                   {
                       name: "enableCopy",
                       controlClass: CheckBoxSetting,
                       controlParams: {
                           label: "Copy",
                           help: "Select the check box to enable copy functionality"
                       }
                   },
                   {
                       name: "enablePaste",
                       controlClass: CheckBoxSetting,
                       controlParams: {
                           label: "Paste",
                           help: "Select the check box to enable paste functionality"
                       }
                   }
                   
                   
               
                   //add more settings if you need
               ]
        
    };
 
    //register our widget in list of widgets which return single string value (there are other types also)
    // see See ecm/model/configuration/ControlRegistry for other possible types
    ControlRegistry.editors.mappings.types["string"].multi.editorConfigs.push(editorId);
});