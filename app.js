const MAX_VALUE = 9_999_999;

const elements = {
  language: document.getElementById("language"),
  taskCount: document.getElementById("taskCount"),
  minNumber: document.getElementById("minNumber"),
  maxNumber: document.getElementById("maxNumber"),
  startButton: document.getElementById("startButton"),
  restartButton: document.getElementById("restartButton"),
  submitButton: document.getElementById("submitButton"),
  skipButton: document.getElementById("skipButton"),
  playAgainButton: document.getElementById("playAgainButton"),
  answerInput: document.getElementById("answerInput"),
  currentNumber: document.getElementById("currentNumber"),
  progressText: document.getElementById("progressText"),
  correctText: document.getElementById("correctText"),
  incorrectText: document.getElementById("incorrectText"),
  configError: document.getElementById("configError"),
  feedback: document.getElementById("feedback"),
  sessionIdle: document.getElementById("sessionIdle"),
  sessionActive: document.getElementById("sessionActive"),
  sessionFinished: document.getElementById("sessionFinished"),
  summaryText: document.getElementById("summaryText"),
  totalResult: document.getElementById("totalResult"),
  correctResult: document.getElementById("correctResult"),
  incorrectResult: document.getElementById("incorrectResult"),
  presetRow: document.getElementById("presetRow"),
};

const session = {
  isRunning: false,
  language: "en",
  totalTasks: 10,
  min: 0,
  max: 100,
  currentTaskIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentNumber: null,
  lastConfig: null,
  isLocked: false,
};

const EN_UNDER_20 = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const EN_TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const DE_UNDER_20 = {
  0: "null",
  1: "eins",
  2: "zwei",
  3: "drei",
  4: "vier",
  5: "fuenf",
  6: "sechs",
  7: "sieben",
  8: "acht",
  9: "neun",
  10: "zehn",
  11: "elf",
  12: "zwoelf",
  13: "dreizehn",
  14: "vierzehn",
  15: "fuenfzehn",
  16: "sechzehn",
  17: "siebzehn",
  18: "achtzehn",
  19: "neunzehn",
};

const DE_TENS = {
  20: "zwanzig",
  30: "dreissig",
  40: "vierzig",
  50: "fuenfzig",
  60: "sechzig",
  70: "siebzig",
  80: "achtzig",
  90: "neunzig",
};

function numberToEnglish(number) {
  if (number < 20) {
    return EN_UNDER_20[number];
  }

  if (number < 100) {
    const tens = Math.floor(number / 10);
    const units = number % 10;
    return units === 0
      ? EN_TENS[tens]
      : `${EN_TENS[tens]}-${EN_UNDER_20[units]}`;
  }

  if (number < 1000) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    return remainder === 0
      ? `${EN_UNDER_20[hundreds]} hundred`
      : `${EN_UNDER_20[hundreds]} hundred ${numberToEnglish(remainder)}`;
  }

  if (number < 1_000_000) {
    const thousands = Math.floor(number / 1000);
    const remainder = number % 1000;
    return remainder === 0
      ? `${numberToEnglish(thousands)} thousand`
      : `${numberToEnglish(thousands)} thousand ${numberToEnglish(remainder)}`;
  }

  const millions = Math.floor(number / 1_000_000);
  const remainder = number % 1_000_000;
  return remainder === 0
    ? `${numberToEnglish(millions)} million`
    : `${numberToEnglish(millions)} million ${numberToEnglish(remainder)}`;
}

function germanUnitForCompound(number) {
  if (number === 1) {
    return "ein";
  }

  return DE_UNDER_20[number];
}

function germanUnder100(number) {
  if (number < 20) {
    return DE_UNDER_20[number];
  }

  const tens = Math.floor(number / 10) * 10;
  const units = number % 10;
  return units === 0
    ? DE_TENS[tens]
    : `${germanUnitForCompound(units)}und${DE_TENS[tens]}`;
}

function germanUnder1000(number) {
  if (number < 100) {
    return germanUnder100(number);
  }

  const hundreds = Math.floor(number / 100);
  const remainder = number % 100;
  const hundredsText = `${hundreds === 1 ? "ein" : DE_UNDER_20[hundreds]}hundert`;
  return remainder === 0 ? hundredsText : `${hundredsText}${germanUnder100(remainder)}`;
}

function germanBelowMillion(number) {
  if (number < 1000) {
    return germanUnder1000(number);
  }

  const thousands = Math.floor(number / 1000);
  const remainder = number % 1000;
  const thousandsText =
    thousands === 1 ? "eintausend" : `${germanUnder1000(thousands)}tausend`;

  return remainder === 0 ? thousandsText : `${thousandsText}${germanUnder1000(remainder)}`;
}

function numberToGerman(number) {
  if (number < 1_000_000) {
    return germanBelowMillion(number);
  }

  const millions = Math.floor(number / 1_000_000);
  const remainder = number % 1_000_000;
  const millionsText =
    millions === 1 ? "eine Million" : `${germanBelowMillion(millions)} Millionen`;

  return remainder === 0 ? millionsText : `${millionsText} ${germanBelowMillion(remainder)}`;
}

function numberToWords(number, language) {
  return language === "de" ? numberToGerman(number) : numberToEnglish(number);
}

function normalizeEnglishInput(value) {
  return value
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeGermanInput(value) {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, "")
    .trim();
}

function normalizeAnswer(value, language) {
  return language === "de" ? normalizeGermanInput(value) : normalizeEnglishInput(value);
}

function updateAnswerPlaceholder() {
  elements.answerInput.placeholder =
    elements.language.value === "de" ? "Например: zweiundvierzig" : "Например: forty-two";
}

function setMessage(element, text, type) {
  element.hidden = false;
  element.textContent = text;
  element.classList.remove("success", "error");
  if (type) {
    element.classList.add(type);
  }
}

function hideMessage(element) {
  element.hidden = true;
  element.textContent = "";
  element.classList.remove("success", "error");
}

function updatePresetButtons() {
  const min = Number(elements.minNumber.value);
  const max = Number(elements.maxNumber.value);
  const buttons = elements.presetRow.querySelectorAll(".preset-btn");

  buttons.forEach((button) => {
    const isActive = Number(button.dataset.min) === min && Number(button.dataset.max) === max;
    button.classList.toggle("active", isActive);
  });
}

function readConfig() {
  const min = Number(elements.minNumber.value);
  const max = Number(elements.maxNumber.value);
  const totalTasks = Number(elements.taskCount.value);
  const language = elements.language.value;

  if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(totalTasks)) {
    throw new Error("Все настройки должны быть целыми числами.");
  }

  if (min < 0 || max < 0) {
    throw new Error("Диапазон не может быть отрицательным.");
  }

  if (min > max) {
    throw new Error("Левая граница диапазона должна быть меньше или равна правой.");
  }

  if (max > MAX_VALUE) {
    throw new Error(`Максимальное число не должно превышать ${MAX_VALUE}.`);
  }

  if (totalTasks < 1 || totalTasks > 500) {
    throw new Error("Количество заданий должно быть от 1 до 500.");
  }

  return { min, max, totalTasks, language };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetTrainingView() {
  session.isRunning = false;
  session.isLocked = false;
  hideMessage(elements.feedback);
  elements.sessionIdle.hidden = false;
  elements.sessionActive.hidden = true;
  elements.sessionFinished.hidden = true;
  elements.answerInput.value = "";
}

function startTraining() {
  try {
    const config = readConfig();
    hideMessage(elements.configError);

    session.isRunning = true;
    session.language = config.language;
    session.totalTasks = config.totalTasks;
    session.min = config.min;
    session.max = config.max;
    session.currentTaskIndex = 0;
    session.correctAnswers = 0;
    session.incorrectAnswers = 0;
    session.currentNumber = null;
    session.lastConfig = config;
    session.isLocked = false;

    elements.sessionIdle.hidden = true;
    elements.sessionFinished.hidden = true;
    elements.sessionActive.hidden = false;
    hideMessage(elements.feedback);

    nextTask();
  } catch (error) {
    setMessage(elements.configError, error.message, "error");
  }
}

function updateScoreboard() {
  elements.progressText.textContent = `${session.currentTaskIndex + 1} / ${session.totalTasks}`;
  elements.correctText.textContent = String(session.correctAnswers);
  elements.incorrectText.textContent = String(session.incorrectAnswers);
}

function nextTask() {
  if (session.currentTaskIndex >= session.totalTasks) {
    finishTraining();
    return;
  }

  session.currentNumber = randomInt(session.min, session.max);
  session.isLocked = false;
  elements.currentNumber.textContent = String(session.currentNumber);
  elements.answerInput.value = "";
  hideMessage(elements.feedback);
  updateScoreboard();
  elements.answerInput.focus();
}

function finishTraining() {
  session.isRunning = false;
  session.isLocked = true;
  elements.sessionActive.hidden = true;
  elements.sessionFinished.hidden = false;

  elements.totalResult.textContent = String(session.totalTasks);
  elements.correctResult.textContent = String(session.correctAnswers);
  elements.incorrectResult.textContent = String(session.incorrectAnswers);

  const accuracy = Math.round((session.correctAnswers / session.totalTasks) * 100);
  elements.summaryText.textContent =
    accuracy === 100
      ? "Без ошибок. Отличная серия."
      : `Тренировка завершена. Точность: ${accuracy}%. Если хочешь, можно сразу пройти еще один раунд.`;
}

function submitAnswer() {
  if (!session.isRunning || session.isLocked) {
    return;
  }

  const userValue = elements.answerInput.value.trim();
  if (!userValue) {
    setMessage(elements.feedback, "Сначала введи ответ.", "error");
    return;
  }

  const correctText = numberToWords(session.currentNumber, session.language);
  const normalizedUser = normalizeAnswer(userValue, session.language);
  const normalizedCorrect = normalizeAnswer(correctText, session.language);

  if (normalizedUser === normalizedCorrect) {
    session.correctAnswers += 1;
    setMessage(elements.feedback, "Верно. Следующее число...", "success");
    updateScoreboard();
  } else {
    session.incorrectAnswers += 1;
    setMessage(
      elements.feedback,
      `Неверно. Правильный ответ: ${correctText}`,
      "error",
    );
    updateScoreboard();
  }

  session.isLocked = true;
  session.currentTaskIndex += 1;
  window.setTimeout(nextTask, 1100);
}

function skipTask() {
  if (!session.isRunning || session.isLocked) {
    return;
  }

  const correctText = numberToWords(session.currentNumber, session.language);
  session.incorrectAnswers += 1;
  setMessage(
    elements.feedback,
    `Правильный ответ: ${correctText}`,
    "error",
  );
  updateScoreboard();
  session.isLocked = true;
  session.currentTaskIndex += 1;
  window.setTimeout(nextTask, 1100);
}

elements.startButton.addEventListener("click", startTraining);
elements.playAgainButton.addEventListener("click", startTraining);
elements.restartButton.addEventListener("click", () => {
  hideMessage(elements.configError);
  resetTrainingView();
});
elements.submitButton.addEventListener("click", submitAnswer);
elements.skipButton.addEventListener("click", skipTask);
elements.answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitAnswer();
  }
});

elements.presetRow.addEventListener("click", (event) => {
  const button = event.target.closest(".preset-btn");
  if (!button) {
    return;
  }

  elements.minNumber.value = button.dataset.min;
  elements.maxNumber.value = button.dataset.max;
  updatePresetButtons();
});

elements.minNumber.addEventListener("input", updatePresetButtons);
elements.maxNumber.addEventListener("input", updatePresetButtons);
elements.language.addEventListener("change", updateAnswerPlaceholder);

updatePresetButtons();
updateAnswerPlaceholder();
resetTrainingView();
