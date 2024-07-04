require(["dojo/_base/lang","dojo/on", "dojo/dom","dojo/aspect", "pvr/widget/editors/_FormattedDropDownEditor","dijit/Dialog","dijit/form/Button"], 
		function(lang, on,dom,aspect, formattedDropDownEditor,Dialog,Button) {

    /* This below code is for populating the props when we use OOTB Add document using entry template */
        aspect.after(pvr.widget.editors._DropDownEditor.prototype, "postCreate", function() {
		debugger;
			if(this.description == "Country names"  || this.description == "Phone Numbers"){
				//debugger;
				var containerNode=this.getParent().domNode;
					// Create a dialog box
				
				 
				// Create a button and place it beside the dropdown button
				var copyButton = new Button({
					
					label: "Copy",
					iconClass: "copy-button",
					showLabel: false,
					onClick: function() {
					console.log("Button Clicked");
					// label value
					var label = this.getParent().domNode.childNodes[1].innerText;
					// create a message dialog
                    var messageDialog = new ecm.widget.dialog.BaseDialog();
					messageDialog.setTitle("Value");
					messageDialog.setMessage(label,"info");
					messageDialog.show();


					}
				}, "copyButton");

					containerNode.appendChild(copyButton.domNode);
					if(containerNode.childNodes[2].childNodes[0] != undefined){
						containerNode.childNodes[2].childNodes[0].style="border:none;outline:none;background-color:transparent;";
					}
					else{
						containerNode.childNodes[2].style="border:none;outline:none;background-color:transparent;";
					}
					
			}
        });
	
	
    
});

