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
