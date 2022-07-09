// List of functions to run while observing the page
const observeBody = new MutationObserver(function (mutations, observer) {
  let isDetailedPage = checkIfDetailedPage();

	if(isDetailedPage) {
		let detailedPage = parseDetailedPage();

		console.log(detailedPage);
	}
});

function checkIfDetailedPage() {
  let matched = window.location.href.match(/jbv=(\d+)/);

  return matched !== null ? matched[1] : false;
}

function parseDetailedPage() {
	let titleEle = document.querySelector("img.previewModal--player-titleTreatment-logo");
	let title = titleEle.getAttribute("alt").trim();

	return {
		title: title,
	}
}

// Start observing Netflix body content.
observeBody.observe(document.body, {
  childList: true,
  subtree: true,
});
