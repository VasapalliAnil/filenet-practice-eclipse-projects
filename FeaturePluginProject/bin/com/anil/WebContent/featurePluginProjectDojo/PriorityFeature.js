displayValue = '0';
operator = '';
firstOperand = '';
waitingForSecondOperand = false;
console.log("Calculator loaded ")
define([
	"dojo/_base/declare",
	"ecm/widget/layout/_LaunchBarPane",
	"dojo/text!./templates/PriorityFeature.html"
	//"dojo/text!./templates/Calculator.html"
],
function(declare,
		_LaunchBarPane,
		template) {
	/**
	 * @name featurePluginProjectDojo.PriorityFeature
	 * @class 
	 * @augments ecm.widget.layout._LaunchBarPane
	 */
	return declare("featurePluginProjectDojo.PriorityFeature", [
		_LaunchBarPane
	], {
		/** @lends featurePluginProjectDojo.PriorityFeature.prototype */

		templateString: template,
		
		// Set to true if widget template contains DOJO widgets.
		widgetsInTemplate: false,

		postCreate: function() {
			this.logEntry("postCreate");
			this.inherited(arguments);
			
			/**
			 * Add custom logic (if any) that should be necessary after the feature pane is created. For example,
			 * you might need to connect events to trigger the pane to update based on specific user actions.
			 */
			
			this.logExit("postCreate");
		},
		
		/**
		 * Optional method that sets additional parameters when the user clicks on the launch button associated with 
		 * this feature.
		 */
		setParams: function(params) {
			this.logEntry("setParams", params);
			
			if (params) {
				
				if (!this.isLoaded && this.selected) {
					this.loadContent();
				}
			}
			
			this.logExit("setParams");
		},

		/**
		 * Loads the content of the pane. This is a required method to insert a pane into the LaunchBarContainer.
		 */
		loadContent: function() {
			this.logEntry("loadContent");
			
			if (!this.isLoaded) {
				/**
				 * Add custom load logic here. The LaunchBarContainer widget will call this method when the user
				 * clicks on the launch button associated with this feature.
				 */
				this.isLoaded = true;
				this.needReset = false;
			}
			
			this.logExit("loadContent");
		},

		/**
		 * Resets the content of this pane.
		 */
		reset: function() {
			this.logEntry("reset");
			
			/**
			 * This is an option method that allows you to force the LaunchBarContainer to reset when the user
			 * clicks on the launch button associated with this feature.
			 */
			this.needReset = false;
			
			this.logExit("reset");
		},
		clearDisplay: function() {
            this.display.innerHTML = '0';
        },

        appendNumber: function(evt) {
            var number = evt.target.innerHTML;
            if (this.display.innerHTML === '0' || this.waitingForSecondOperand) {
                this.display.innerHTML = number;
                this.waitingForSecondOperand = false;
            } else {
                this.display.innerHTML += number;
            }
        },

        appendOperator: function(evt) {
            this.operator = evt.target.innerHTML;
            this.firstOperand = this.display.innerHTML;
            this.waitingForSecondOperand = true;
        },

        appendDecimal: function() {
            if (!this.display.innerHTML.includes('.')) {
                this.display.innerHTML += '.';
            }
        },

        calculate: function() {
            var result = '';
            var firstOperand = parseFloat(this.firstOperand);
            var secondOperand = parseFloat(this.display.innerHTML);

            switch (this.operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                default:
                    return;
            }

            this.display.innerHTML = result.toString();
            this.operator = '';
            this.firstOperand = '';
        }
		
	
	});
});
