sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/MessageType",
	"sap/ui/core/routing/History"
], function(Controller,DateFormat,MessageType, History) {
	"use strict";

	return Controller.extend("app.SAPUI5Template.controller.BaseController", {

		/*
		Using this function you can manipulate router on any view.
		Just remember to call it first on view
		*/
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/*
		By calling this function in your view you can set translated texton view.
		Example: 'this.getResourceBundle().getText("Main.saveButton");'
		*/
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/*
		Use this when you set an action on Back button on any view.
		If you have history it will show you the previous view
		if not router wil redirect you to first view of your app
		*/
		onNavBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Main", {}, true /*no history*/ );
			}
		},

		/* 
		Getter and setter for model.
		*/
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		}
	});
});