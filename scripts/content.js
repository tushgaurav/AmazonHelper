function daysPassedSince(dateString) {
  // Parse the input date string
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

let release_date = document.querySelector(
  "#productDetails_detailBullets_sections1 > tbody > tr:nth-child(4) > td"
).innerHTML;

console.log(release_date);

let time_passed = daysPassedSince(release_date);
console.log(time_passed);

if (
  document.querySelector("#corePrice_desktop > div > table > tbody") == null
) {
  let release_div = document.querySelector(
    "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.aok-relative"
  );
  let copy_element = document
    .querySelector(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.aok-relative > span"
    )
    .cloneNode(true);
} else {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td class="a-color-secondary a-size-base a-text-right a-nowrap">Release date:</td><td class="a-span12 a-color-secondary a-size-base"> ${release_date}, ${time_passed}</td>`;
  document
    .querySelector("#corePrice_desktop > div > table > tbody")
    .appendChild(tr);
}
