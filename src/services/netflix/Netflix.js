let data;

// List of functions to run while observing the page
const observeBody = new MutationObserver(function (mutations, observer) {
  let isDetailedPage = checkIfDetailedPage();

	if(isDetailedPage) {

		let detailedPage = parseDetailedPage();

    if(!data) {
      data = fetchData(detailedPage);
    }
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

async function fetchData(detailedPage) {
  const URL = "http://localhost:3000/netflix/" + detailedPage.title;

  const response = await fetch(URL, { mode: "cors" });
  const parsedJSON = await response.json();

  return parsedJSON;
}

// Start observing Netflix body content.
observeBody.observe(document.body, {
  childList: true,
  subtree: true,
});
