const storedWords = JSON.parse(localStorage.getItem("words"));
const synth = window.speechSynthesis;
let random = [
  Math.floor(Math.random() * storedWords.length),
  Math.floor(Math.random() * storedWords.length),
  Math.floor(Math.random() * storedWords.length),
  Math.floor(Math.random() * storedWords.length),
];

function cevapla(cevap) {
  cevapSafe = cevap.innerText.slice(3, cevap.length);
  if (cevapSafe.trim() == storedWords[random[0]][1].trim()) {
    document.getElementsByClassName("counter")[0].innerHTML =
      Number(document.getElementsByClassName("counter")[0].innerHTML) + 1;
    random = _arrayRandom(4, 0, storedWords.length, true);
    soruGetir();
  } else {
    cevap.classList.add("fail");
  }
}

function seslendir() {
  let utterThis = new SpeechSynthesisUtterance(storedWords[random[0]][0]);
  utterThis.lang = "en-US";
  utterThis.rate = 0.9;
  utterThis.volume = 1;
  utterThis.pitch = 1;
  synth.speak(utterThis);
}

function soruGetir() {
  const questions = document.getElementsByClassName("questions")[0];
  if (storedWords.length < 4) {
    questions.innerHTML = `Test için en az 4 kelime kaydetmelisin.`;
    return false;
  }
  let randomNumbers = makeRandoms();
  questions.innerHTML = `<div class="question"><div onClick="seslendir()" class="seslendir">${
    storedWords[random[0]][0]
  }<img src="voice.svg" width="20px" height="20px"/></div> kelimesinin anlamı nedir?
  <br></br>
<div>
    <div class="answers" onclick="cevapla(this)">A) ${
      storedWords[random[randomNumbers.r1]][1]
    }</div>
    <div class="answers" onclick="cevapla(this)">B) ${
      storedWords[random[randomNumbers.r2]][1]
    }</div>
    <div class="answers" onclick="cevapla(this)">C) ${
      storedWords[random[randomNumbers.r3]][1]
    }</div>
    <div class="answers" onclick="cevapla(this)">D) ${
      storedWords[random[randomNumbers.r4]][1]
    }</div>
</div>
</div>`;

  function makeRandoms() {
    let arr = _arrayRandom(4, 0, 4, true);

    return {
      r1: arr[0],
      r2: arr[1],
      r3: arr[2],
      r4: arr[3],
    };
  }
}

function _arrayRandom(len, min, max, unique) {
  var len = len ? len : 10,
    min = min !== undefined ? min : 1,
    max = max !== undefined ? max : 100,
    unique = unique ? unique : false,
    toReturn = [],
    tempObj = {},
    i = 0;
  if (unique === true) {
    for (; i < len; i++) {
      var randomInt = Math.floor(Math.random() * (max - min + min));
      if (tempObj["key_" + randomInt] === undefined) {
        tempObj["key_" + randomInt] = randomInt;
        toReturn.push(randomInt);
      } else {
        i--;
      }
    }
  } else {
    for (; i < len; i++) {
      toReturn.push(Math.floor(Math.random() * (max - min + min)));
    }
  }
  return toReturn;
}

soruGetir();
