function countSignificantDigits(value) {
  // remove sign
  value = value.replace("-", "");

  // remove leading zeros before decimal
  value = value.replace(/^0+(?=\.)/, "");

  // remove decimal point
  value = value.replace(".", "");

  // remove leading zeros again (e.g. "000123")
  value = value.replace(/^0+/, "");

  return value.length;
}

export default function characterCounts(value) {
  const SOFT_COUNT = countSignificantDigits(value);

  const HARD_COUNT = value.replace(/[^0-9]/g, "").length;

  return {
    SOFT_COUNT,
    HARD_COUNT,
  };
}
