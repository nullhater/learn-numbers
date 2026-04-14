const MAX_VALUE = 9_999_999;

const elements = {
  uiLanguage: document.getElementById("uiLanguage"),
  language: document.getElementById("language"),
  taskCount: document.getElementById("taskCount"),
  useCustomNumbers: document.getElementById("useCustomNumbers"),
  customNumbersSection: document.getElementById("customNumbersSection"),
  customNumbersInput: document.getElementById("customNumbersInput"),
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
  mistakesSection: document.getElementById("mistakesSection"),
  mistakesList: document.getElementById("mistakesList"),
  presetRow: document.getElementById("presetRow"),
};

const session = {
  isRunning: false,
  uiLanguage: "ru",
  language: "en",
  totalTasks: 10,
  min: 0,
  max: 100,
  useCustomNumbers: false,
  customNumbers: [],
  currentTaskIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentNumber: null,
  lastConfig: null,
  isLocked: false,
  mistakes: [],
  taskQueue: [],
};

const UI_TEXT = {
  ru: {
    documentTitle: "Learn Numbers",
    eyebrow: "Числа словами",
    heroTitle: "Тренировка чисел на английском и немецком",
    heroLead:
      "Приложение показывает число цифрами, а ты вводишь его словами. Можно настроить язык, диапазон и количество заданий.",
    settingsTitle: "Настройки",
    uiLanguageLabel: "Язык интерфейса",
    uiLangRu: "Русский",
    uiLangEn: "Английский",
    uiLangDe: "Немецкий",
    languageLabel: "Язык ответа",
    answerLangEn: "Английский",
    answerLangDe: "Немецкий",
    taskCountLabel: "Количество заданий",
    customNumbersToggle: "Свой набор чисел",
    customNumbersLabel: "Числа через запятую или пробел",
    customNumbersHint: "В этом режиме будут использоваться только указанные числа.",
    customNumbersPlaceholder: "Например: 7, 12, 45 100 999",
    rangeLabel: "Диапазон чисел",
    minLabel: "От",
    maxLabel: "До",
    startButton: "Начать тренировку",
    resetButton: "Сбросить",
    trainingTitle: "Тренировка",
    idleText: "Нажми «Начать тренировку», чтобы получить первое число.",
    taskStat: "Задание",
    correctStat: "Правильно",
    incorrectStat: "Ошибок",
    promptLabel: "Напиши это число словами",
    answerLabel: "Твой ответ",
    submitButton: "Проверить",
    skipButton: "Показать ответ",
    resultsTitle: "Результат",
    totalCard: "Всего",
    correctCard: "Правильно",
    incorrectCard: "Неправильно",
    mistakesTitle: "Ошибки",
    playAgainButton: "Сыграть еще раз",
    yourAnswerLabel: "Твой ответ",
    correctAnswerLabel: "Правильный ответ",
    numberLabel: "Число",
    skippedAnswer: "пропущено",
    placeholderEn: "Например: forty-two",
    placeholderDe: "Например: zweiundvierzig",
    errorIntegers: "Все настройки должны быть целыми числами.",
    errorNegative: "Диапазон не может быть отрицательным.",
    errorBounds: "Левая граница диапазона должна быть меньше или равна правой.",
    errorMaxValue: `Максимальное число не должно превышать ${MAX_VALUE}.`,
    errorTaskCount: "Количество заданий должно быть от 1 до 500.",
    errorCustomNumbersRequired: "Добавь хотя бы одно число для собственного режима.",
    errorCustomNumbersInvalid: `Можно использовать только целые числа от 0 до ${MAX_VALUE}.`,
    emptyAnswer: "Сначала введи ответ.",
    successNext: "Верно. Следующее число...",
    incorrectWithAnswer: "Неверно. Правильный ответ: {answer}",
    revealAnswer: "Правильный ответ: {answer}",
    perfectSummary: "Без ошибок. Отличная серия.",
    summaryWithAccuracy:
      "Тренировка завершена. Точность: {accuracy}%. Если хочешь, можно сразу пройти еще один раунд.",
  },
  en: {
    documentTitle: "Learn Numbers",
    eyebrow: "Numbers in Words",
    heroTitle: "Practice numbers in English and German",
    heroLead:
      "The app shows a number in digits, and you type it in words. You can set the language, range, and number of tasks.",
    settingsTitle: "Settings",
    uiLanguageLabel: "Interface language",
    uiLangRu: "Russian",
    uiLangEn: "English",
    uiLangDe: "German",
    languageLabel: "Answer language",
    answerLangEn: "English",
    answerLangDe: "German",
    taskCountLabel: "Number of tasks",
    customNumbersToggle: "Custom set of numbers",
    customNumbersLabel: "Numbers separated by commas or spaces",
    customNumbersHint: "Only these numbers will be used in this mode.",
    customNumbersPlaceholder: "For example: 7, 12, 45 100 999",
    rangeLabel: "Number range",
    minLabel: "From",
    maxLabel: "To",
    startButton: "Start training",
    resetButton: "Reset",
    trainingTitle: "Training",
    idleText: "Press “Start training” to get the first number.",
    taskStat: "Task",
    correctStat: "Correct",
    incorrectStat: "Mistakes",
    promptLabel: "Write this number in words",
    answerLabel: "Your answer",
    submitButton: "Check",
    skipButton: "Show answer",
    resultsTitle: "Results",
    totalCard: "Total",
    correctCard: "Correct",
    incorrectCard: "Incorrect",
    mistakesTitle: "Mistakes",
    playAgainButton: "Play again",
    yourAnswerLabel: "Your answer",
    correctAnswerLabel: "Correct answer",
    numberLabel: "Number",
    skippedAnswer: "skipped",
    placeholderEn: "For example: forty-two",
    placeholderDe: "For example: zweiundvierzig",
    errorIntegers: "All settings must be whole numbers.",
    errorNegative: "The range cannot contain negative numbers.",
    errorBounds: "The left bound must be less than or equal to the right bound.",
    errorMaxValue: `The maximum number must not exceed ${MAX_VALUE}.`,
    errorTaskCount: "The number of tasks must be between 1 and 500.",
    errorCustomNumbersRequired: "Add at least one number for custom mode.",
    errorCustomNumbersInvalid: `Only whole numbers from 0 to ${MAX_VALUE} are allowed.`,
    emptyAnswer: "Enter an answer first.",
    successNext: "Correct. Moving to the next number...",
    incorrectWithAnswer: "Incorrect. The correct answer is: {answer}",
    revealAnswer: "The correct answer is: {answer}",
    perfectSummary: "No mistakes. Great run.",
    summaryWithAccuracy:
      "Training complete. Accuracy: {accuracy}%. You can start another round right away.",
  },
  de: {
    documentTitle: "Learn Numbers",
    eyebrow: "Zahlen als Wörter",
    heroTitle: "Zahlentraining auf Englisch und Deutsch",
    heroLead:
      "Die App zeigt eine Zahl als Ziffern an, und du schreibst sie als Wort. Sprache, Bereich und Aufgabenzahl lassen sich frei einstellen.",
    settingsTitle: "Einstellungen",
    uiLanguageLabel: "Sprache der Oberfläche",
    uiLangRu: "Russisch",
    uiLangEn: "Englisch",
    uiLangDe: "Deutsch",
    languageLabel: "Antwortsprache",
    answerLangEn: "Englisch",
    answerLangDe: "Deutsch",
    taskCountLabel: "Anzahl der Aufgaben",
    customNumbersToggle: "Eigene Zahlenliste",
    customNumbersLabel: "Zahlen durch Komma oder Leerzeichen getrennt",
    customNumbersHint: "In diesem Modus werden nur diese Zahlen verwendet.",
    customNumbersPlaceholder: "Zum Beispiel: 7, 12, 45 100 999",
    rangeLabel: "Zahlenbereich",
    minLabel: "Von",
    maxLabel: "Bis",
    startButton: "Training starten",
    resetButton: "Zurücksetzen",
    trainingTitle: "Training",
    idleText: "Klicke auf „Training starten“, um die erste Zahl zu bekommen.",
    taskStat: "Aufgabe",
    correctStat: "Richtig",
    incorrectStat: "Fehler",
    promptLabel: "Schreibe diese Zahl als Wort",
    answerLabel: "Deine Antwort",
    submitButton: "Prüfen",
    skipButton: "Antwort zeigen",
    resultsTitle: "Ergebnis",
    totalCard: "Gesamt",
    correctCard: "Richtig",
    incorrectCard: "Falsch",
    mistakesTitle: "Fehler",
    playAgainButton: "Noch einmal",
    yourAnswerLabel: "Deine Antwort",
    correctAnswerLabel: "Richtige Antwort",
    numberLabel: "Zahl",
    skippedAnswer: "übersprungen",
    placeholderEn: "Zum Beispiel: forty-two",
    placeholderDe: "Zum Beispiel: zweiundvierzig",
    errorIntegers: "Alle Einstellungen müssen ganze Zahlen sein.",
    errorNegative: "Der Bereich darf keine negativen Zahlen enthalten.",
    errorBounds: "Die linke Grenze muss kleiner oder gleich der rechten Grenze sein.",
    errorMaxValue: `Die maximale Zahl darf ${MAX_VALUE} nicht überschreiten.`,
    errorTaskCount: "Die Anzahl der Aufgaben muss zwischen 1 und 500 liegen.",
    errorCustomNumbersRequired: "Fuege mindestens eine Zahl fuer den eigenen Modus hinzu.",
    errorCustomNumbersInvalid: `Es sind nur ganze Zahlen von 0 bis ${MAX_VALUE} erlaubt.`,
    emptyAnswer: "Gib zuerst eine Antwort ein.",
    successNext: "Richtig. Die nächste Zahl kommt...",
    incorrectWithAnswer: "Falsch. Die richtige Antwort ist: {answer}",
    revealAnswer: "Die richtige Antwort ist: {answer}",
    perfectSummary: "Ohne Fehler. Starke Runde.",
    summaryWithAccuracy:
      "Training abgeschlossen. Genauigkeit: {accuracy}%. Du kannst sofort eine neue Runde starten.",
  },
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
  5: "fünf",
  6: "sechs",
  7: "sieben",
  8: "acht",
  9: "neun",
  10: "zehn",
  11: "elf",
  12: "zwölf",
  13: "dreizehn",
  14: "vierzehn",
  15: "fünfzehn",
  16: "sechzehn",
  17: "siebzehn",
  18: "achtzehn",
  19: "neunzehn",
};

const DE_TENS = {
  20: "zwanzig",
  30: "dreißig",
  40: "vierzig",
  50: "fünfzig",
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

function detectSystemLanguage() {
  const browserLanguage =
    typeof navigator !== "undefined"
      ? navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : "")
      : "";

  const normalized = String(browserLanguage).toLowerCase();

  if (normalized.startsWith("ru")) {
    return "ru";
  }

  if (normalized.startsWith("de")) {
    return "de";
  }

  return "en";
}

function t(key, params = {}) {
  const dictionary = UI_TEXT[session.uiLanguage] ?? UI_TEXT.ru;
  let value = dictionary[key] ?? UI_TEXT.ru[key] ?? key;

  Object.entries(params).forEach(([paramKey, paramValue]) => {
    value = value.replace(`{${paramKey}}`, String(paramValue));
  });

  return value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toDiffUnits(value, language) {
  return Array.from(String(value)).flatMap((character, index) => {
    const lower = character.toLowerCase();
    let normalized = lower;

    if (language === "de") {
      normalized = normalized
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss");
    }

    const units = Array.from(normalized).filter((unit) => /[a-z]/.test(unit));
    return units.map((unit) => ({ unit, originalIndex: index }));
  });
}

function buildDiffMarkup(input, reference) {
  const originalCharacters = Array.from(String(input));
  const source = toDiffUnits(input, session.language);
  const target = toDiffUnits(reference, session.language);
  const rows = source.length + 1;
  const cols = target.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = source.length - 1; row >= 0; row -= 1) {
    for (let col = target.length - 1; col >= 0; col -= 1) {
      if (source[row].unit === target[col].unit) {
        dp[row][col] = dp[row + 1][col + 1] + 1;
      } else {
        dp[row][col] = Math.max(dp[row + 1][col], dp[row][col + 1]);
      }
    }
  }

  let row = 0;
  let col = 0;
  const matchedSourceUnits = Array(source.length).fill(false);

  while (row < source.length && col < target.length) {
    if (source[row].unit === target[col].unit) {
      matchedSourceUnits[row] = true;
      row += 1;
      col += 1;
    } else if (dp[row + 1][col] >= dp[row][col + 1]) {
      row += 1;
    } else {
      col += 1;
    }
  }

  const totalsByCharacter = Array(originalCharacters.length).fill(0);
  const matchedByCharacter = Array(originalCharacters.length).fill(0);

  source.forEach((item, index) => {
    totalsByCharacter[item.originalIndex] += 1;
    if (matchedSourceUnits[index]) {
      matchedByCharacter[item.originalIndex] += 1;
    }
  });

  return originalCharacters
    .map((character, index) => {
      if (totalsByCharacter[index] === 0) {
        return escapeHtml(character);
      }

      return matchedByCharacter[index] === totalsByCharacter[index]
        ? escapeHtml(character)
        : `<span class="diff-wrong">${escapeHtml(character)}</span>`;
    })
    .join("");
}

function renderMistakes() {
  if (session.mistakes.length === 0) {
    elements.mistakesSection.hidden = true;
    elements.mistakesList.innerHTML = "";
    return;
  }

  elements.mistakesSection.hidden = false;
  elements.mistakesList.innerHTML = session.mistakes
    .map((mistake) => {
      const enteredMarkup = mistake.userAnswer
        ? buildDiffMarkup(mistake.userAnswer, mistake.correctAnswer)
        : escapeHtml(t("skippedAnswer"));
      return `
        <article class="mistake-card">
          <div class="mistake-number">${t("numberLabel")}: ${escapeHtml(mistake.number)}</div>
          <div class="mistake-row">
            <div class="mistake-label">${t("yourAnswerLabel")}</div>
            <div class="mistake-value">${enteredMarkup}</div>
          </div>
          <div class="mistake-row">
            <div class="mistake-label">${t("correctAnswerLabel")}</div>
            <div class="mistake-value">${escapeHtml(mistake.correctAnswer)}</div>
          </div>
        </article>
      `;
    })
    .join("");
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
    elements.language.value === "de" ? t("placeholderDe") : t("placeholderEn");
}

function applyTranslations() {
  document.documentElement.lang = session.uiLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });

  document.title = t("documentTitle");
  updateAnswerPlaceholder();

  if (!elements.configError.hidden && elements.configError.dataset.i18nKey) {
    setMessage(
      elements.configError,
      t(elements.configError.dataset.i18nKey, elements.configError.dataset.i18nParams ? JSON.parse(elements.configError.dataset.i18nParams) : {}),
      "error",
      elements.configError.dataset.i18nKey,
      elements.configError.dataset.i18nParams ? JSON.parse(elements.configError.dataset.i18nParams) : {},
    );
  }

  if (!elements.feedback.hidden && elements.feedback.dataset.i18nKey) {
    const params = elements.feedback.dataset.i18nParams ? JSON.parse(elements.feedback.dataset.i18nParams) : {};
    setMessage(elements.feedback, t(elements.feedback.dataset.i18nKey, params), elements.feedback.dataset.messageType, elements.feedback.dataset.i18nKey, params);
  }

  if (!elements.sessionFinished.hidden) {
    updateSummaryText();
    renderMistakes();
  }
}

function setMessage(element, text, type, i18nKey = "", params = {}) {
  element.hidden = false;
  element.textContent = text;
  element.classList.remove("success", "error");
  element.dataset.i18nKey = i18nKey;
  element.dataset.i18nParams = JSON.stringify(params);
  element.dataset.messageType = type || "";
  if (type) {
    element.classList.add(type);
  }
}

function hideMessage(element) {
  element.hidden = true;
  element.textContent = "";
  element.classList.remove("success", "error");
  delete element.dataset.i18nKey;
  delete element.dataset.i18nParams;
  delete element.dataset.messageType;
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

function updateCustomNumbersVisibility() {
  const isCustomMode = elements.useCustomNumbers.checked;
  elements.customNumbersSection.hidden = !isCustomMode;
  document.querySelector(".range-section").classList.toggle("disabled", isCustomMode);
}

function parseCustomNumbers(rawValue) {
  const parts = rawValue
    .split(/[\s,;]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("errorCustomNumbersRequired");
  }

  const values = parts.map((value) => Number(value));
  const hasInvalidValue = values.some(
    (value) => !Number.isInteger(value) || value < 0 || value > MAX_VALUE,
  );

  if (hasInvalidValue) {
    throw new Error("errorCustomNumbersInvalid");
  }

  return [...new Set(values)];
}

function readConfig() {
  const min = Number(elements.minNumber.value);
  const max = Number(elements.maxNumber.value);
  const totalTasks = Number(elements.taskCount.value);
  const language = elements.language.value;
  const useCustomNumbers = elements.useCustomNumbers.checked;

  if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(totalTasks)) {
    throw new Error("errorIntegers");
  }

  if (min < 0 || max < 0) {
    throw new Error("errorNegative");
  }

  if (min > max) {
    throw new Error("errorBounds");
  }

  if (max > MAX_VALUE) {
    throw new Error("errorMaxValue");
  }

  if (totalTasks < 1 || totalTasks > 500) {
    throw new Error("errorTaskCount");
  }

  const customNumbers = useCustomNumbers
    ? parseCustomNumbers(elements.customNumbersInput.value)
    : [];

  return { min, max, totalTasks, language, useCustomNumbers, customNumbers };
}

function shuffleArray(values) {
  const result = [...values];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function buildNonRepeatingTaskQueue(sourceNumbers, totalTasks) {
  const uniqueNumbers = [...new Set(sourceNumbers)];
  const queue = [];

  while (queue.length < totalTasks) {
    let batch = shuffleArray(uniqueNumbers);

    if (queue.length > 0 && batch.length > 1 && queue[queue.length - 1] === batch[0]) {
      batch = [...batch.slice(1), batch[0]];
    }

    queue.push(...batch);
  }

  return queue.slice(0, totalTasks);
}

function buildRangeTaskQueue(min, max, totalTasks) {
  const rangeSize = max - min + 1;

  if (totalTasks > rangeSize) {
    const fullRange = Array.from({ length: rangeSize }, (_, index) => min + index);
    return buildNonRepeatingTaskQueue(fullRange, totalTasks);
  }

  const selected = new Set();
  while (selected.size < totalTasks) {
    selected.add(Math.floor(Math.random() * rangeSize) + min);
  }

  return shuffleArray([...selected]);
}

function buildTaskQueue(config) {
  if (config.useCustomNumbers) {
    return buildNonRepeatingTaskQueue(config.customNumbers, config.totalTasks);
  }

  return buildRangeTaskQueue(config.min, config.max, config.totalTasks);
}

function resetTrainingView() {
  session.isRunning = false;
  session.isLocked = false;
  session.mistakes = [];
  session.taskQueue = [];
  hideMessage(elements.feedback);
  elements.sessionIdle.hidden = false;
  elements.sessionActive.hidden = true;
  elements.sessionFinished.hidden = true;
  elements.answerInput.value = "";
  elements.mistakesSection.hidden = true;
  elements.mistakesList.innerHTML = "";
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
    session.useCustomNumbers = config.useCustomNumbers;
    session.customNumbers = config.customNumbers;
    session.currentTaskIndex = 0;
    session.correctAnswers = 0;
    session.incorrectAnswers = 0;
    session.currentNumber = null;
    session.lastConfig = config;
    session.isLocked = false;
    session.mistakes = [];
    session.taskQueue = buildTaskQueue(config);

    elements.sessionIdle.hidden = true;
    elements.sessionFinished.hidden = true;
    elements.sessionActive.hidden = false;
    hideMessage(elements.feedback);

    nextTask();
  } catch (error) {
    setMessage(elements.configError, t(error.message), "error", error.message);
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

  session.currentNumber = session.taskQueue[session.currentTaskIndex];
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

  updateSummaryText();
  renderMistakes();
}

function updateSummaryText() {
  const accuracy = Math.round((session.correctAnswers / session.totalTasks) * 100);
  elements.summaryText.textContent =
    accuracy === 100 ? t("perfectSummary") : t("summaryWithAccuracy", { accuracy });
}

function submitAnswer() {
  if (!session.isRunning || session.isLocked) {
    return;
  }

  const userValue = elements.answerInput.value.trim();
  if (!userValue) {
    setMessage(elements.feedback, t("emptyAnswer"), "error", "emptyAnswer");
    return;
  }

  const correctText = numberToWords(session.currentNumber, session.language);
  const normalizedUser = normalizeAnswer(userValue, session.language);
  const normalizedCorrect = normalizeAnswer(correctText, session.language);

  if (normalizedUser === normalizedCorrect) {
    session.correctAnswers += 1;
    setMessage(elements.feedback, t("successNext"), "success", "successNext");
    updateScoreboard();
  } else {
    session.incorrectAnswers += 1;
    session.mistakes.push({
      number: session.currentNumber,
      userAnswer: userValue,
      correctAnswer: correctText,
    });
    setMessage(
      elements.feedback,
      t("incorrectWithAnswer", { answer: correctText }),
      "error",
      "incorrectWithAnswer",
      { answer: correctText },
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
  session.mistakes.push({
    number: session.currentNumber,
    userAnswer: "",
    correctAnswer: correctText,
  });
  setMessage(
    elements.feedback,
    t("revealAnswer", { answer: correctText }),
    "error",
    "revealAnswer",
    { answer: correctText },
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
elements.useCustomNumbers.addEventListener("change", updateCustomNumbersVisibility);
elements.uiLanguage.addEventListener("change", () => {
  session.uiLanguage = elements.uiLanguage.value;
  applyTranslations();
});

const systemLanguage = detectSystemLanguage();
elements.uiLanguage.value = systemLanguage;
session.uiLanguage = systemLanguage;

updatePresetButtons();
updateAnswerPlaceholder();
applyTranslations();
updateCustomNumbersVisibility();
resetTrainingView();
