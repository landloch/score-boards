import type { DirectiveBinding } from "vue";

type ClickAwayElement = HTMLElement & {
  clickOutsideEvent?: (event: MouseEvent) => void;
};

export const clickAway = {
  beforeMount: (el: ClickAwayElement, binding: DirectiveBinding<() => void>) => {
    el.clickOutsideEvent = (event: MouseEvent) => {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target as Node))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: ClickAwayElement) => {
    if (el.clickOutsideEvent) {
      document.removeEventListener("click", el.clickOutsideEvent);
    }
  },
};