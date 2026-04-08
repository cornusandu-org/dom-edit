/**
 * @param {string} CSSselector - a CSS selector for elements
 * @returns {Array<Element>} a list of elements (possibly non-html elements)
 */
export function getAllElements(CSSselector) {
    if (typeof CSSselector !== "string") {
        throw new TypeError("getElements() recieved CSSselector not of type string.");
    }

    const results = Array.from(document.querySelectorAll(CSSselector));
    return results;
}

/**
 * @param {string} CSSselector - a CSS selector for elements
 * @returns {Array<HTMLElement>} a list of HTML elements
 */
export function getHtmlElements(CSSselector) {
    if (typeof CSSselector !== "string") {
        throw new TypeError("getElements() recieved CSSselector not of type string.");
    }

    const results = Array.from(document.querySelectorAll(CSSselector));
    return results.filter(element => element instanceof HTMLElement);
}
