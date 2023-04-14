export const apiKey = "529bf848d14b9fc7da265edcae678a08";
export const moviePlaceHolder = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4fjH8U2A1V9n4EoRKv9EviHss4M.jpg";

export const pathToImageUrl = (path) => {
  return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${path}`;
};

export const convertToHoursAndMinutes = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  return (
    hours.toString() +
    " Hours " +
    remainingMinutes.toString().padStart(2, "0") +
    " Minutes of "
  );
};

export const compareArrays = (arr1, arr2) => {
  let matchCount = 0;
  
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        matchCount++;
        if (matchCount >= 2) {
          return true;
        }
      }
    }
  }
  
  return false;
};
