/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"app/SAPUI5Template/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});