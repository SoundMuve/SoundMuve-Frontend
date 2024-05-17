
export const backendUrl = "http://localhost:5000";
export const apiEndpoint = `${backendUrl}/api/v1`;


export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Comprehensive email validation regex
  return emailRegex.test(email);
}

export function getPinDisplayButtons() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "delete", "space"];

  // Remove "space" and "delete" from the array
  const filteredArr = arr.filter((item) => item !== "space" && item !== "delete");

  // Shuffle the remaining elements randomly
  for (let i = filteredArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredArr[i], filteredArr[j]] = [filteredArr[j], filteredArr[i]];
  }

  // Insert "space" at index 9 and "delete" as the last item
  filteredArr.splice(9, 0, "space");
  filteredArr.push("delete");

  return filteredArr;
}



export function maskPhoneNumber(phoneNumber: string) {
  // Remove any non-digit characters from the input
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number has at least 4 digits
  if (cleanedNumber.length < 4) {
    return phoneNumber;
    // return 'Invalid phone number';
  }

  // Extract the last 4 digits
  const lastFourDigits = cleanedNumber.slice(-4);

  // Create a masked version with asterisks
  const maskedNumber = '*'.repeat(cleanedNumber.length - 4) + lastFourDigits;

  return maskedNumber;
}


export function maskEmailAddress(email: string) {
  // Split the email address into username and domain parts
  const [username, domain] = email.split('@');

  const lastThreeCharacters = username.slice(-3);
  const firstTwoCharacters = username.slice(0, 2);


  // Mask the username part
  const maskedUsername = firstTwoCharacters + '*'.repeat(username.length - 5) + lastThreeCharacters;

  // // Extract the last 3 characters before the @ symbol
  // const maskedDomain = domain.slice(0, domain.length - 3) + '*'.repeat(3);

  // Combine the masked parts to form the masked email
  const maskedEmail = `${maskedUsername}@${domain}`;

  return maskedEmail;
}


// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
  // Use a regular expression to match special characters and spaces
  const regex = /[^a-zA-Z0-9\s]/g;

  // Replace special characters with an empty string and spaces with hyphens
  const sanitizedString = text.replace(regex, "").replace(/\s+/g, "-");

  return sanitizedString;
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  // return {
  //   children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  // };
};

export const currencyDisplay = (amount: number) => {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return formattedAmount;
};

export function displayMessageCount(messageCount: number) {
  if (messageCount < 1000) {
    return messageCount.toString(); // No suffix needed for less than 1000
  } else if (messageCount < 1000000) {
    return (messageCount / 1000).toFixed(2) + "K"; // Suffix K for thousands
  } else if (messageCount < 1000000000) {
    return (messageCount / 1000000).toFixed(2) + "M"; // Suffix M for millions
  } else {
    return (messageCount / 1000000000).toFixed(2) + "B"; // Suffix B for billions
  }
}