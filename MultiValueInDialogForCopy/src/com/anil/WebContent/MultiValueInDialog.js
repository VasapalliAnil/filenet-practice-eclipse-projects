require(
    ["dojo/_base/lang", "dojo/on", "dojo/dom", "dojo/aspect", "pvr/widget/editors/_FormattedDropDownEditor", "dijit/Dialog", "dijit/form/Button", "dojo/dom-construct", "dojo/on"],
    function(lang, on, dom, aspect, formattedDropDownEditor, Dialog, Button, domConstruct, on) {
        /*
         * This below code is for populating the props when we use OOTB Add
         * document using entry template
         */
        aspect.after(pvr.widget.editors._DropDownEditor.prototype, "postCreate", function() {
            debugger;
            var editor = this; // Store a reference to _DropDownEditor instance
            console.log("inside multi value plugin");
            // if(this.description == "Country names" ||
            // this.description == "Phone Numbers"){
            if (this.property.controller.id == "MobileNumbers" || this.property.controller.id == "LandLineNumbers") {
                // debugger;
                var containerNode = this.getParent().domNode;
                // Create a dialog box
                // Create a button and place it beside the
                // dropdown button
                var copyButton = new Button({
                    label: "Copy",
                    iconClass: "copy-button",
                    showLabel: false,
                    onClick: function() {
                        console.log(" Copy Button Clicked");
                        // label value
                        var label = this.getParent().domNode.childNodes[1].innerText;
                        // create a message dialog
                        var messageDialog = new ecm.widget.dialog.BaseDialog();
                        messageDialog.setTitle("Value");
                        messageDialog.setMessage(label, "info");
                        messageDialog.show();
                    }
                }, "copyButton");
                // Create a button and place it beside the
                // dropdown button
                var pasteButton = new Button({
                    label: "Paste",
                    iconClass: "paste-button",
                    showLabel: false,
                    onClick: function() {
                        console.log("Paste Button Clicked");
                        myDialog.show();
                    }
                }, "pasteButton");
                // Create the Dialog
                var myDialog = new Dialog({
                    title: "Add Content",
                    content: ' <div><textarea id="userTextArea" rows="10" cols="30"></textarea><br> <button id="okButton">OK</button> </div>',
                    style: "width: 300px;"
                });
                
             
                // Attach event handler to the OK button inside the Dialog
                on(myDialog, "show", function() {
                    var okButton = document.getElementById("okButton");
                    var userTextArea = document.getElementById("userTextArea");
                    on(okButton, "click", function() {
                        var userInput = userTextArea.value;
                        console.log("User input: " + userInput);
                     // Split the user input by commas and trim whitespace
                        var userInputArray = userInput.split(',').map(item = item.trim());
                        // Merge the arrays
                        var existingValues=editor._getValueAttr(); 
                        editor._setValueAttr(existingValues.concat(userInputArray));
                        
                        myDialog.hide();
                        
                    });
                });
                
             // Clear the textarea content when the dialog is hidden
                on(myDialog, "hide", function() {
                    var userTextArea = document.getElementById("userTextArea");
                    userTextArea.value = "";
                });
                
                // add the copy and paste button beside the
                // DropDownListEditor
                containerNode.appendChild(copyButton.domNode);
                containerNode.appendChild(pasteButton.domNode);
                
   
                
                
                // adjust the styles
                if (containerNode.childNodes[2].childNodes[0] != undefined) {
                    containerNode.childNodes[2].childNodes[0].style = "border:none;outline:none;background-color:transparent;";
                } else {
                    containerNode.childNodes[2].style = "border:none;outline:none;background-color:transparent;";
                }
                if (containerNode.childNodes[3].childNodes[0] != undefined) {
                    containerNode.childNodes[3].childNodes[0].style = "border:none;outline:none;background-color:transparent;";
                } else {
                    containerNode.childNodes[3].style = "border:none;outline:none;background-color:transparent;";
                }
            }
        });
    });