function daysPassedSince(dateString) {
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) {
    return "Invalid date format";
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

let release_date = document
  .querySelector(
    "#productDetails_detailBullets_sections1 > tbody > tr:nth-child(4) > td"
  )
  .innerHTML.trimEnd();

let time_passed = daysPassedSince(release_date);

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
  `${release_date}, ${time_passed} ago.`
);
actualDateSpan.appendChild(actualDateText);

const container = document.querySelector("#averageCustomerReviews");
container.appendChild(brElement);
container.appendChild(releaseDateSpan);
container.appendChild(actualDateSpan);

//
