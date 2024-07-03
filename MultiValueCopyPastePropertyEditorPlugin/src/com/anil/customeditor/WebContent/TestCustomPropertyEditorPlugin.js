require([
    "dojo/_base/lang",
    "ecm/model/configuration/ControlRegistry",
    "pvd/widget/designer/settings/TextBoxSetting",
    "pvd/widget/designer/settings/CheckBoxSetting",
    "pvr/widget/editors/TextBoxEditor",
    "testCustomPropertyEditorPluginDojo/editors/TestCustomEditor" // our custom editor widget
], function(
		lang, ControlRegistry, TextBoxSetting, CheckBoxSetting, TextBoxEditor,TestCustomEditor
) {
	console.log("inside Test Custom Property Editor plugin");
    var editorId = "testCustomEditor";
 
    ControlRegistry.editors.editorConfigs[editorId] = {
        label: "Test Custom Editor",
        editorClass: TestCustomEditor,
        settings: [ 
           
                   {
                       name: "NameofLookup",
                       controlClass: TextBoxSetting,
                       controlParams: {
                           label: "Type of Lookup",
                           help: "Which Lookup it is"
                       }
                   },
                   {
                       name: "IsitLookup",
                       controlClass: CheckBoxSetting,
                       controlParams: {
                           label: "Lookup",
                           help: "Select the check box if it is for lookup"
                       }
                   }
                   
                   
               
                   //add more settings if you need
               ]
        
    };
 
    //register our widget in list of widgets which return single string value (there are other types also)
    // see See ecm/model/configuration/ControlRegistry for other possible types
    ControlRegistry.editors.mappings.types["string"].single.editorConfigs.push(editorId);
});