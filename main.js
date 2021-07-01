// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:
const validateCred = (card) => {
  // Implement Luhn's Algorithm
  // If you don't use .slice() here to make a copy, you will be mutating the original array (i.e. do not use let newArray = card)
  let cardArray = card.slice();
  let sum = 0;
  let checkDigit = cardArray.pop();

  // Step 1: Reverse the array
  cardArray = cardArray.reverse();

  // Step 2: Iterate through the array and double every other number.  If it is greater than 9, subtract 9
  for (let i = 0; i < cardArray.length; i++) {
    cardArray[i] *= 2;
    if (cardArray[i] > 9) {
      cardArray[i] -= 9;
    }
    i++;
  }

  // Step 3: Iterate through the new array and add each element to the sum
  cardArray.forEach((num) => {
    sum += num;
  });

  // Step 4: Add the check digit to the sum
  sum += checkDigit;

  // Step 5: If our sum is evenly divisible by 10, it is valid.  Otherwise, it is invalid
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

// This algorithm will find invalid cards and give you and array of the cards.
const findInvalidCards = (cards) => {
  let invalidCards = [];
  // loop through the array and add invalid cards to the invalid array
  cards.forEach((card) => {
    if (!validateCred(card)) {
      invalidCards.push(card);
    }
  });

  return invalidCards;
};

// Adds the name of the credit company that sent out an invalid card, without duplicates
const idInvalidCardCompanies = (cards) => {
  let companyArray = [];

  // iterate through the invalid array and check which card matches what company by matching the first digit.

  // concerning indexOf().  This function will return -1 if a value does not exist in the array.
  cards.forEach((card) => {
    switch (card[0]) {
      case 3:
        if (companyArray.indexOf("Amex (American Express)") === -1) {
          companyArray.push("Amex (American Express)");
        }
        break;
      case 4:
        if (companyArray.indexOf("Visa") === -1) {
          companyArray.push("Visa");
        }
        break;
      case 5:
        if (companyArray.indexOf("Mastercard") === -1) {
          companyArray.push("Mastercard");
        }
        break;
      case 6:
        if (companyArray.indexOf("Discover") === -1) {
          companyArray.push("Discover");
        }
        break;
      default:
        console.log("Company not found");
    }
  });

  return companyArray;
};

console.log(idInvalidCardCompanies(findInvalidCards(batch)));
