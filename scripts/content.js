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
let release_date_td = document.querySelector(
  "#productDetails_detailBullets_sections1 > tbody > tr:nth-child(4) > td"
);

let release_date = null;
let time_passed = "Invalid";

if (release_date_td) {
  release_date = release_date_td.innerHTML.trimEnd();
  time_passed = daysPassedSince(release_date);
}

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
}

release_date = release_date + ",";
time_passed = time_passed + " ago.";

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

if (container) {
  container.appendChild(brElement);
  container.appendChild(releaseDateSpan);
  container.appendChild(actualDateSpan);
} else {
  console.log("No container found");
  console.log(actualDateText);
}

// Removing the EMI Pricing
const emiPricing = document.querySelector("#inemi_feature_div");

if (emiPricing) {
  const emiPricingDiv = emiPricing.querySelector("div");
  // Apply display: none to the element
  emiPricingDiv.style.display = "none";

  // Extract information from the first two children
  const inemiAmountElement = emiPricingDiv.querySelector(
    ".a-size-extra-large.inemi-amount"
  );
  const inemiTenureElement = emiPricingDiv.querySelector(
    ".a-size-medium.inemi-tenure"
  );

  if (inemiAmountElement && inemiTenureElement) {
    const emiAmount = inemiAmountElement.textContent.trim();
    const emiTenure = inemiTenureElement.textContent.trim();

    console.log("EMI Amount:", emiAmount);
    console.log("EMI Tenure:", emiTenure);

    // Further actions with the extracted information can be performed here
    const emiDetailsDiv = document.createElement("div");
    emiDetailsDiv.classList.add(
      "a-section",
      "a-spacing-small",
      "aok-align-center",
      "customEMIDetails"
    );

    const emiAmountSpan = document.createElement("span");
    emiAmountSpan.textContent = `EMI Amount: ${emiAmount}`;
    emiAmountSpan.classList.add(
      "a-size-medium",
      "a-color-price",
      "aok-align-center",
      "customEMIAmount"
    );

    const emiTenureSpan = document.createElement("span");
    emiTenureSpan.textContent = ` @ ${getFormattedTenure(emiTenure)}`;
    emiTenureSpan.classList.add(
      "a-size-medium",
      "a-color-price",
      "aok-align-center",
      "customEMITenure"
    );

    // Function to format tenure text to display "X months"
    function getFormattedTenure(rawTenure) {
      const regex = /\/month \((\d+) months?\)/; // Regular expression to extract the number of months
      const match = rawTenure.match(regex);
      if (match) {
        const months = match[1];
        return `${months} months`;
      }
      return rawTenure; // Return original text if pattern doesn't match
    }

    // Append the EMI details to the new div
    emiDetailsDiv.appendChild(emiAmountSpan);
    emiDetailsDiv.appendChild(emiTenureSpan);

    // Get the target div to inject EMI details into
    const targetDiv = document.getElementById(
      "corePriceDisplay_desktop_feature_div"
    );

    // Check if the target div exists and inject the EMI details
    if (targetDiv) {
      targetDiv.appendChild(emiDetailsDiv);
    }
  }
}

// Making the pricing section look better

// Price make it bigger
const price = document.querySelector(
  "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
);

if (price) {
  price.style.fontSize = "30px";
}
// Rupee symbol make it bigger
const rupee = document.querySelector(
  "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-symbol"
);

if (rupee) {
  rupee.style.top = "-0.75em";
  rupee.style.fontSize = "14px";
}
