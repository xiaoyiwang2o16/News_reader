chrome.browserAction.onClicked.addListener(function (tab) {
	// console.log('hi');
	// $("body").append("Test");
	chrome.tabs.executeScript({
		file: "jquery.min.js"
	});
	chrome.tabs.executeScript(null, {file: "news.js"});
})