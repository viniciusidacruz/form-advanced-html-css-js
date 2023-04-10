IMask(document.querySelector("#cc-cvv"), {
  mask: "0000",
});

IMask(document.querySelector("#cc-number"), {
  mask: "0000 0000 0000 0000",
});

IMask(document.querySelector("#cc-validity"), {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
});

// Logic for name holder
IMask(document.querySelector("#cc-holder"), {
  mask: /^[a-zA-Z\s]*$/,
  pattern: /^[a-zA-Z\s]*$/,
});

const input = document.querySelector("#cc-holder");
input.addEventListener("input", function () {
  this.value = this.value.toUpperCase();
});

// Logic for fields and values card
function handleChangeField(contentHTML, fieldInput) {
  var content = document.getElementById(contentHTML);
  var field = document.getElementById(fieldInput);

  return {
    content,
    field,
  };
}

var { content: nameHold, field: fieldNameCard } = handleChangeField(
  "name-card",
  "cc-holder"
);

var { content: validityCard, field: fieldValidityCard } = handleChangeField(
  "validity-card",
  "cc-validity"
);

var { content: cvvCard, field: fieldCvvCard } = handleChangeField(
  "cvv-card",
  "cc-cvv"
);

var { content: numberCard, field: fieldNumberCard } = handleChangeField(
  "number-card",
  "cc-number"
);

var backCard = document.querySelector(".back");
var frontCard = document.querySelector(".front");
var fieldCvvCard = document.getElementById("cc-cvv");

fieldCvvCard.addEventListener("focus", function () {
  backCard.style.transform = "rotateY(0deg)";
  frontCard.style.transform = "rotateY(180deg)";
});

fieldCvvCard.addEventListener("blur", function () {
  backCard.style.transform = "";
  frontCard.style.transform = "";
});

fieldNameCard.addEventListener("input", function () {
  nameHold.innerHTML = fieldNameCard.value || "Seu nome aqui";
});

fieldValidityCard.addEventListener("input", function () {
  validityCard.innerHTML = fieldValidityCard.value || "**/**";
});

fieldCvvCard.addEventListener("input", function () {
  cvvCard.innerHTML = fieldCvvCard.value || "***";
});

fieldNumberCard.addEventListener("input", function () {
  numberCard.innerHTML = fieldNumberCard.value || "**** **** **** ****";
});

function detectCardBrand() {
  const cardNumber = document.getElementById("cc-number").value;
  let cardBrand;

  if (cardNumber.startsWith("4")) {
    cardBrand = "visa";
  } else if (cardNumber.startsWith("5") && parseInt(cardNumber[1]) >= 1 && parseInt(cardNumber[1]) <= 5) {
    cardBrand = "master";
  } else if (cardNumber.startsWith("3") && (cardNumber[1] === "4" || cardNumber[1] === "7")) {
    cardBrand = "amex";
  }

  if (cardBrand) {
    const cardImage = document.getElementById("flags");
    cardImage.src = `assets/svg/flag-${cardBrand}.svg`;
    cardImage.alt = `Bandeira ${cardBrand}`
  } else {
    const cardImage = document.getElementById("flags");
    cardImage.src = `assets/svg/question.svg`;
    cardImage.alt = 'Ícone de interrogação'
  }
}