function daysPassedSince(dateString) {
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) {
    return "Invalid";
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDate;

  // Calculate the number of days
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate the number of years and months
  const yearsPassed = Math.floor(daysPassed / 365);
  const monthsPassed = Math.floor((daysPassed % 365) / 30);

  // Construct the result string
  let result = "";
  if (yearsPassed > 0) {
    result += `${yearsPassed} ${yearsPassed === 1 ? "year" : "years"}`;
    if (monthsPassed > 0) {
      result += ` ${monthsPassed} ${monthsPassed === 1 ? "month" : "months"}`;
    }
  } else if (monthsPassed > 0) {
    result += `${monthsPassed} ${monthsPassed === 1 ? "month" : "months"}`;
  } else {
    result = `${daysPassed} ${daysPassed === 1 ? "day" : "days"}`;
  }

  return result;
}

// Get the release date from the product page in the "Additional Information" section
let release_date = document
  .querySelector(
    "#productDetails_detailBullets_sections1 > tbody > tr:nth-child(4) > td"
  )
  .innerHTML.trimEnd();

let time_passed = daysPassedSince(release_date);

if (time_passed === "Invalid") {
  // If no release date is available, try to find the "Date First Available" element
  const elements = document.querySelectorAll("span.a-text-bold");
  // Loop through the found elements and find the specific one
  elements.forEach((element) => {
    if (element.textContent.includes("Date First Available")) {
      // Navigate to the sibling span for the date
      const dateElement = element.nextElementSibling;

      if (dateElement) {
        const date = dateElement.textContent.trim();
        console.log("Date First Available:", date);
        release_date = date;
        // Further actions with the date content can be performed here
      }
    }
  });

  time_passed = daysPassedSince(release_date);
} else {
  release_date = release_date + ",";
  time_passed = time_passed + " ago.";
}
// Adding the release date to the product pages
const brElement = document.createElement("br");

const releaseDateSpan = document.createElement("span");
releaseDateSpan.classList.add("a-text-bold");

const releaseDateText = document.createTextNode("Release Date: ");

releaseDateSpan.appendChild(releaseDateText);

const actualDateSpan = document.createElement("span");
actualDateSpan.classList.add("a-size-small");
actualDateSpan.classList.add("a-color-secondary");

const actualDateText = document.createTextNode(
  `${release_date} ${time_passed}`
);
actualDateSpan.appendChild(actualDateText);

const container = document.querySelector("#averageCustomerReviews");
container.appendChild(brElement);
container.appendChild(releaseDateSpan);
container.appendChild(actualDateSpan);

//
