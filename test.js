const wordDict = ["karaoke", "seek", "red", "dad"];

const doit = () => {
  if match()
};

const doitHelper = (wordArray) => {
  if (match(wordArray)) {
    return true;
  }
};

// check if the array passes the test
const match = (wordArray) => {
  var lastWord = "";
  var tempArr = [];
  wordArray.forEach((word) => {
    if (lastWord == "") {
      tempArr.push(word);
    } else {
      if (lastWord[lastWord.length - 1] == word[0]) {
      } else return false;
    }
  });
  return true;
};
