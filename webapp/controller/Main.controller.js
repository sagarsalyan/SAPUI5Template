sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("app.SAPUI5Template.controller.Main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf app.SAPUI5Template.view.Main
		 */
		/*
		This function will run only once at the first call of the view
		*/
		onInit: function() {
			//put your logic here

			// As always, create view model here
			var oViewModel = new JSONModel({
				calSelectedDate: new Date(),
				isDateModified: false
			});
			
			// and set it for this view
			this.setModel(this.oViewModel, "mainView");

			// call instance of the router and check is it correct
			var oRouter = this.getRouter();
			oRouter.getRoute("Main").attachMatched(this._onRouteMatched, this);
		},

		// checking if declared route is matched
		_onRouteMatched: function(oEvent) {
			/*
			Put you logic here.
			Note that this will be call by every enter into this view.
			Once again if you want something to run only once add that code to onInit function.
			*/
		},
		onNotificationSelect:function(oEvent){
			debugger
			var notObj = oEvent.getParameter('listItem').getBindingContext().getObject();
			var Notificationno = notObj.Notificationno;
			this.getRouter().navTo("Object", {Notificationno}, true  );
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf app.SAPUI5Template.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf app.SAPUI5Template.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf app.SAPUI5Template.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});