sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("app.SAPUI5Template.controller.Object", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf app.SAPUI5Template.view.Object
		 */
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.setModel(oViewModel, "objectView");
			var oRouter = this.getRouter();
			oRouter.getRoute("Object").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oParameter = oEvent.getParameter("arguments");
			for (var value in oParameter) {
				oParameter[value] = decodeURIComponent(oParameter[value]);
			}
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("Employees", oParameter);
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},
		_bindView: function (sObjectPath) {
			// Remove confirmation Content
			// var oPage = this.getView().byId("cont");

			// oPage.removeAllContent();

			// Set busy indicator during view binding
			//this.getView().byId("conf_list").destroyItems();
			var oViewModel = this.getModel("objectView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					// change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf app.SAPUI5Template.view.Object
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf app.SAPUI5Template.view.Object
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf app.SAPUI5Template.view.Object
		 */
		//	onExit: function() {
		//
		//	}

	});

});