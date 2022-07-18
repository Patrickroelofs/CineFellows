let data;

// List of functions to run while observing the page
const observeBody = new MutationObserver(async function (mutations, observer) {
  let isDetailedPage = checkIfDetailedPage();

	if(isDetailedPage) {
		let detailedPage = parseDetailedPage();

    if(!data) {
      data = await fetchData(detailedPage);
    }

    await displayDataOnDetailedPage(detailedPage);
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

function searchDataByName(key, inputArray) {
  for(let i = 0; i < inputArray.length; i++) {
    if(inputArray[i].netflixName === key) {
      console.log(inputArray[i]);
      return inputArray[i];
    }
  }
}

async function displayDataOnDetailedPage(detailedPage) {
  const singleton = searchDataByName(detailedPage.title, data);

  if(document.body.getElementsByClassName('TEST').length >= 1) {
    console.log("Yeppers")
  } else {
    // TODO: I was here
    console.log("Noppers")
    let container = document.querySelector(".previewModal--player-titleTreatmentWrapper");
    container.setAttribute("class", "previewModal--player-titleTreatmentWrapper TEST");
    container.setAttribute("style", "background-color: #000; color: #ff0000; font-size: 64px;");
    
    let newEl = document.createElement("div");
    newEl.appendChild(document.createTextNode(singleton.imdbRating));
    container.appendChild(newEl);
  }
}

async function fetchData(detailedPage) {
  console.log("Fetching data...");
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
