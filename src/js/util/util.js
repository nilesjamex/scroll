/**
 * Breaks text into lines that fit within a maximum width
 * @param {string} text - The text to break into lines
 * @param {number} maxWidth - Maximum width in pixels
 * @param {HTMLElement} $container - Container element to append lines to
 */
const lineBreak = (text, maxWidth, $container) => {
  // Helper function to calculate total width of children
  const getTotalWidth = ($el) => {
    if (!$el || !$el.children) {
      return 0;
    }
    return Array.from($el.children).reduce(
      (acc, child) => acc + child.getBoundingClientRect().width,
      0
    );
  };

  // Helper function to create a new line element
  const createNewLine = () => {
    const $line = document.createElement("span");
    $line.classList.add("line");
    return $line;
  };

  // Split text into words and wrap each in a span
  const words = text.split(/\s/).map((word, index) => {
    const $word = document.createElement("span");
    $word.classList.add("word");
    $word.innerHTML = (index > 0 ? " " : "") + word;
    return $word;
  });

  // Clear container
  $container.innerHTML = "";

  words.forEach((word) => $container.appendChild(word));
  const needsLineBreaks = getTotalWidth($container) > maxWidth;
  $container.innerHTML = "";

  // Add spacing classes to words
  words.forEach((word, index) => {
    if (index > 0 && word.innerHTML.startsWith(" ")) {
      word.classList.add("left-space");
    }
    if (word.innerHTML.endsWith(" ")) {
      word.classList.add("right-space");
    }
  });

  // Handle line breaking based on width
  if (needsLineBreaks) {
    let $currentLine = createNewLine();
    $container.appendChild($currentLine);

    words.forEach((word) => {
      $currentLine.appendChild(word);
      if (getTotalWidth($currentLine) > maxWidth) {
        $currentLine.removeChild(word);
        $currentLine = createNewLine();
        $currentLine.appendChild(word);
        $container.appendChild($currentLine);
      }
    });
  } else {
    // All fits on a single line
    const $line = createNewLine();
    words.forEach((word) => $line.appendChild(word));
    $container.appendChild($line);
  }

  // Wrap line contents in text spans and remove empty lines
  Array.from($container.querySelectorAll(".line")).forEach(($line) => {
    if ($line.innerText.trim()) {
      $line.innerHTML = `<span class="text">${$line.innerHTML}</span>`;
    } else {
      $line.remove();
    }
  });
};

/**
 * Gets a numerical value from a CSS property
 * @param {HTMLElement} element - The element to get the style from
 * @param {string} property - The CSS property to get
 * @returns {number} - The value as a number
 */
const getStyleNumber = (element, property) => {
  return Number(getComputedStyle(element)[property].replace("px", ""));
};

/**
 * Detects if the device supports touch events
 * @returns {boolean} - True if touch is supported
 */
const isTouch = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  lineBreak,
  getStyleNumber,
  isTouch,
};
