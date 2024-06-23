require(["dojo/_base/lang","dojo/on", "dojo/dom","dojo/aspect", "pvr/widget/editors/_FormattedDropDownEditor","dijit/Dialog","dijit/form/Button"], 
		function(lang, on,dom,aspect, formattedDropDownEditor,Dialog,Button) {

    /* This below code is for populating the props when we use OOTB Add document using entry template */
        aspect.after(pvr.widget.editors._DropDownEditor.prototype, "postCreate", function() {
		//debugger;
			if(this.description == "Country names"){
				//debugger;
				var containerNode=this.getParent().domNode;
					// Create a dialog box
				
				 
				// Create a button and place it beside the dropdown button
				var copyButton = new Button({
					
					label: "Copy",
					onClick: function() {
						this.domNode.style="background: url('plugin/MultiValueInDialog/getResource/images/view-eye.png') no-repeat;";
                    var label = this.getParent().domNode.childNodes[1].innerText;
                    
                    
                    var messageDialog = new ecm.widget.dialog.BaseDialog();
					messageDialog.setTitle("Value");
					messageDialog.setMessage(label,"info");
						messageDialog.show();


					}
				}, "copyButton");

				// set the style of Copy Button
				copyButton.domNode.style="margin-left:25px; width: 24px; height: 24px;background: url('plugin/MultiValueInDialog/getResource/images/hidden-eye.png') no-repeat;";
				containerNode.appendChild(copyButton.domNode);
			}
        });
	
	
    
});

