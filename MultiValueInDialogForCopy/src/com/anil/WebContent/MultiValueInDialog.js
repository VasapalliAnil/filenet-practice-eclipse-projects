require(
    ["dojo/_base/lang", "dojo/on", "dojo/dom", "dojo/aspect", "pvr/widget/editors/_FormattedDropDownEditor", "dijit/Dialog", "dijit/form/Button", "dojo/dom-construct", "dojo/on"],
    function(lang, on, dom, aspect, formattedDropDownEditor, Dialog, Button, domConstruct, on) {
        /*
         * This below code is for populating the props when we use OOTB Add
         * document using entry template
         */
        var i = 0;
        aspect.after(pvr.widget.editors._DropDownEditor.prototype, "postCreate", function() {
            debugger;
            var editor = this; // Store a reference to _DropDownEditor instance
            var uniqueIdentifier = this.id.split("_")[4];
            console.log("inside multi value plugin");
            // Create buttons with unique IDs
            var copyButtonId = "copyButton_" + uniqueIdentifier;
            var pasteButtonId = "pasteButton_" + uniqueIdentifier;
            if (this.property.controller.id == "MobileNumbers" || this.property.controller.id == "LandLineNumbers") {
                // debugger;
                var containerNode = this.getParent().domNode;
                // Create a dialog box
                // Create a button and place it beside the
                // dropdown button
                var copyButton = new Button({
                    id: copyButtonId,
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
                    id: pasteButtonId,
                    label: "Paste",
                    iconClass: "paste-button",
                    showLabel: false,
                    onClick: function() {
                        var myDialog = new Dialog({
                            id: "myDialog_" + uniqueIdentifier,
                            title: "Add Content",
                            content: '<div><textarea id="userTextArea_' + uniqueIdentifier + '" rows="10" cols="30"></textarea><br><button id="okButton_' + uniqueIdentifier + '">OK</button></div>',
                            style: "width: 300px;"
                        });
                        // Attach event handler to OK button inside the dialog
                        var okButton = document.getElementById("okButton_" + uniqueIdentifier);
                        var userTextArea = document.getElementById("userTextArea_" + uniqueIdentifier);
                        on(okButton, "click", function() {
                            var userInput = userTextArea.value;
                            console.log("User input: " + userInput);
                            // Logic to handle user input
                            myDialog.hide();
                        });
                        // Clear textarea content when dialog is hidden
                        on(myDialog, "hide", function() {
                            userTextArea.value = "";
                        });
                        myDialog.show();
                    }
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