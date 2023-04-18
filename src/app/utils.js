export const apiKey = "529bf848d14b9fc7da265edcae678a08";
export const moviePlaceHolder =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
export const tmdbBaseUrl = "https://api.themoviedb.org/3/";
export const ytsBaseUrl = "https://yts.mx/api/v2/";

export const pathToImageUrl = (path) => {
  return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${path}`;
};

export const convertToHoursAndMinutes = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  return (
    "Duration: " +
    hours.toString() +
    " Hours " +
    remainingMinutes.toString().padStart(2, "0") +
    " Minutes"
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

const darkTheme = {
  background: {
    default: "#13161d",
  },
  primary: {
    main: "#13161d",
  },
  secondary: {
    main: "#4cd44c",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#13161d",
  }
};

const lightTheme = {
  background: {
    default: "#FFFFFF",
  },
  primary: {
    main: "#4cd44c",
  },
  secondary: {
    main: "#4cd44c",
  },
  text: {
    primary: "#13161d",
    secondary: "#FFFFFF",
  }
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? lightTheme : darkTheme),
  },
});
