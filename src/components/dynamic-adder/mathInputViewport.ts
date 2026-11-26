type ContentStyles = {
  height: string;
  overflowX: string;
  overflowY: string;
  alignItems: string;
  hadKeypadOpenClass: boolean;
  scrollLeft: number;
  scrollTop: number;
  windowScrollX: number;
  windowScrollY: number;
};

let activeKeypadOwner: symbol | null = null;
let pendingBlurTimeout: ReturnType<typeof setTimeout> | null = null;
let pendingBlurOwner: symbol | null = null;
let contentElement: HTMLElement | null = null;
let originalContentStyles: ContentStyles | null = null;

function restoreContentViewport() {
  if (contentElement && originalContentStyles) {
    contentElement.style.height = originalContentStyles.height;
    contentElement.style.overflowX = originalContentStyles.overflowX;
    contentElement.style.overflowY = originalContentStyles.overflowY;
    contentElement.style.alignItems = originalContentStyles.alignItems;
    contentElement.scrollLeft = originalContentStyles.scrollLeft;
    contentElement.scrollTop = originalContentStyles.scrollTop;
    if (!originalContentStyles.hadKeypadOpenClass) {
      contentElement.classList.remove('keypad-open');
    }
    window.scrollTo(originalContentStyles.windowScrollX, originalContentStyles.windowScrollY);
  }

  contentElement = null;
  originalContentStyles = null;
}

export function activateMathInputKeypad(owner: symbol, input: HTMLInputElement | null) {
  if (!input) {
    return;
  }

  if (pendingBlurTimeout) {
    clearTimeout(pendingBlurTimeout);
    pendingBlurTimeout = null;
    pendingBlurOwner = null;
  }

  const nextContentElement = input.closest<HTMLElement>('.backdrop');
  if (contentElement !== nextContentElement) {
    restoreContentViewport();
    contentElement = nextContentElement;
    if (contentElement) {
      originalContentStyles = {
        height: contentElement.style.height,
        overflowX: contentElement.style.overflowX,
        overflowY: contentElement.style.overflowY,
        alignItems: contentElement.style.alignItems,
        hadKeypadOpenClass: contentElement.classList.contains('keypad-open'),
        scrollLeft: contentElement.scrollLeft,
        scrollTop: contentElement.scrollTop,
        windowScrollX: window.scrollX,
        windowScrollY: window.scrollY,
      };
    }
  }

  activeKeypadOwner = owner;
  if (contentElement && originalContentStyles) {
    contentElement.classList.add('keypad-open');
    contentElement.style.overflowX = 'hidden';
    contentElement.style.overflowY = 'auto';
    contentElement.style.alignItems = 'flex-start';
  }
}

export function scheduleMathInputKeypadClose(owner: symbol) {
  if (pendingBlurTimeout) {
    clearTimeout(pendingBlurTimeout);
  }

  pendingBlurOwner = owner;
  pendingBlurTimeout = setTimeout(() => {
    pendingBlurTimeout = null;
    pendingBlurOwner = null;
    if (activeKeypadOwner === owner) {
      activeKeypadOwner = null;
      restoreContentViewport();
    }
  }, 0);
}

export function isMathInputKeypadActive(owner: symbol) {
  return activeKeypadOwner === owner;
}

export function releaseMathInputKeypad(owner: symbol) {
  if (pendingBlurTimeout && pendingBlurOwner === owner) {
    clearTimeout(pendingBlurTimeout);
    pendingBlurTimeout = null;
    pendingBlurOwner = null;
  }

  if (activeKeypadOwner === owner) {
    activeKeypadOwner = null;
    restoreContentViewport();
  }
}

export function getMathInputContentElement() {
  return contentElement;
}
