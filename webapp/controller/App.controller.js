sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (BaseController, JSONModel, History) {
	"use strict";

	return BaseController.extend("app.SAPUI5Template.controller.App", {
		onInit: function() {
			
			// declare controller variable
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			/* 
			Create the model for your view. 
			This model can set/reset all specific view paramaters.
			In this case we want to set busy and delay values
			*/
			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});

			/*
			set model to our view which actually will be set in BaseController.
			This is simple example of resuing our code. You can always refer to
			function in BaseController from any view in your app
			*/
			this.setModel(oViewModel, "appView");

			// function remove busy indicator
			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			/* 
			use promise to check if metadata from our service is loaded.
			If so run function fnSetAppNotBusy which set busy to false.
			It will run only once just on start of the application.
			The user wont be able to do anything unless service is avilable 
			*/ 
			this.getOwnerComponent().getModel().metadataLoaded().
			then(fnSetAppNotBusy);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});
});