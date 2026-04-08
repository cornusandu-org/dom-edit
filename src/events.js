import { getAllElements } from "./query";

/**
 * @param {string} CSSselector
 * @param {number} timeout - timeout in seconds
 * @returns {Promise<Array<Element>>}
 */
export function waitFor(CSSselector, timeout = 3) {
    return new Promise((resolve, reject) => {
        let v;
        if ((v = getAllElements(CSSselector)).length >= 1) {
            resolve(v);
            return;
        }

        waitForNew(CSSselector, timeout).then(
            value => resolve(value)
        );
    });
}

/**
 * @param {string} CSSselector
 * @param {number} timeout - timeout in seconds
 * @returns {Promise<Array<Element>>}
 */
export function waitForNew(CSSselector, timeout = 3) {
    return new Promise((resolve, reject) => {
        const o = new MutationObserver(() => {
            const elements = getAllElements(CSSselector);
            if (elements.length >= 1) {
                o.disconnect();
                clearTimeout(timeoutId);
                resolve(elements);
            }
        });

        const timeoutId = setTimeout(() => {
            o.disconnect();
            resolve([]);
        }, timeout * 1000);

        const root = document.body || document.documentElement;
        o.observe(root, {
            childList: true,
            subtree: true
        });
    });
}

/**
 * @param {string} CSSselector
 * @param {Element} parent
 * @param {number} timeout - timeout in seconds
 * @returns {Promise<Array<Element>>}
 */
export function waitForChild(CSSselector, parent, timeout = 3) {
    return new Promise((resolve, reject) => {
        let v;
        if ((v = getAllElements(CSSselector).filter(el => el.parentElement == parent)).length >= 1) {
            resolve(v);
            return;
        }

        waitForNewChild(CSSselector, parent, timeout).then(
            value => resolve(value)
        );
    });
}

/**
 * @param {string} CSSselector
 * @param {Element} parent
 * @param {number} timeout - timeout in seconds
 * @returns {Promise<Array<Element>>}
 */
export function waitForNewChild(CSSselector, parent, timeout = 3) {
    return new Promise((resolve, reject) => {
        const o = new MutationObserver(() => {
            const elements = getAllElements(CSSselector).filter(el => el.parentElement == parent);
            if (elements.length >= 1) {
                o.disconnect();
                clearTimeout(timeoutId);
                resolve(elements);
            }
        });

        const timeoutId = setTimeout(() => {
            o.disconnect();
            resolve([]);
        }, timeout * 1000);

        o.observe(parent, {
            childList: true,
            subtree: true
        });
    });
}

