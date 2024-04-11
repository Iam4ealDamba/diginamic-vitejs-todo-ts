export default class Dom {
  static root_el = document.getElementById("root")!;

  /**
   * Creer un element HTML de type <div>
   * @param {string} markupName Nom de l'element HTML
   * @param {string} text Contenu de l'element HTML
   * @param {HTMLElement} parent Element parent de l'element HTML
   * @param {object} attributes Attributs de l'element HTML
   * @returns {HTMLElement} Element HTML
   */
  createMarkup(
    markupName: string,
    text: string,
    parent: HTMLElement,
    attributes?: { [key: string]: string }
  ): HTMLElement {
    const element = document.createElement(markupName);
    element.textContent = text;
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    parent.appendChild(element);
    return element;
  }

  /**
   * Creer un element HTML de type <div>
   * @param {string} markupName Nom de l'element HTML
   * @param {string} text Contenu de l'element HTML
   * @param {HTMLElement} parent Element parent de l'element HTML
   * @param {object} attributes Attributs de l'element HTML
   * @returns {HTMLElement} Element HTML
   */
  static createMarkup(
    markupName: string,
    text: string,
    parent: HTMLElement,
    attributes?: { [key: string]: string }
  ): HTMLElement {
    const element = document.createElement(markupName);
    element.textContent = text;
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    parent.appendChild(element);
    return element;
  }
}
