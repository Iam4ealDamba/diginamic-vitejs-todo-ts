import { IToastElementType, IToastType } from "../utils/interface/index";
import Dom from "./Dom";

export default class Toast {
  private text: string;
  private type: "success" | "error" | "info";
  private element: IToastElementType;

  /**
   *  Constructeur de la classe Toast
   * @param text le texte du toast
   * @param type le type du toast (erreur, success, info)
   */
  constructor({ text, type }: IToastType) {
    this.text = text;
    this.type = type;
    this.element = this.generate();
  }

  /**
   * Affiche le toast dans le DOM
   */
  async showModal() {
    let hidden_toast = new Promise((resolve) =>
      setTimeout(() => {
        this.element.toast_el.style.visibility = "hidden";
        this.element.toast_el.style.opacity = "0%";
        this.element.toast_el.style.transform = "translateX(200%)";
        resolve("ok");
      }, 2000)
    );

    let can_be_deleted = new Promise((resolve) =>
      setTimeout(() => {
        resolve("ok");
      }, 3000)
    );

    switch (this.type) {
      case "success":
        this.element?.toast_el.classList.add("toast-success");
        this.element.toast_h3_el.innerText = this.type;
        this.element.toast_paragraph_el.innerText = this.text;
        this.element.toast_el.style.visibility = "visible";
        this.element.toast_el.style.opacity = "100%";
        this.element.toast_el.style.transform = "translateX(0%)";

        await Promise.all([hidden_toast, can_be_deleted]).then(() => {
          Dom.root_el.removeChild(this.element.toast_el);
        });
        break;
      case "error":
        this.element.toast_el.classList.add("toast-error");
        this.element.toast_h3_el.innerText = this.type;
        this.element.toast_paragraph_el.innerText = this.text;
        this.element.toast_el.style.visibility = "visible";
        this.element.toast_el.style.opacity = "100%";
        this.element.toast_el.style.transform = "translateX(0%)";

        await Promise.all([hidden_toast, can_be_deleted]).then(() => {
          Dom.root_el.removeChild(this.element.toast_el);
        });
        break;
      case "info":
        this.element?.toast_el.classList.add("toast-info");
        this.element.toast_h3_el.innerText = this.type;
        this.element.toast_paragraph_el.innerText = this.text;
        this.element.toast_el.style.visibility = "visible";
        this.element.toast_el.style.opacity = "100%";
        this.element.toast_el.style.transform = "translateX(0%)";

        await Promise.all([hidden_toast, can_be_deleted]).then(() => {
          Dom.root_el.removeChild(this.element.toast_el);
        });
        break;
    }
  }

  // Private Methods
  /**
   * Génère un toast
   * @returns {IToastElementType} retourne un objet contenant les elements du toast
   * - toast_el: le toast
   * - toast_h3_el: le titre du toast
   * - toast_paragraph_el: le texte du toast
   */
  private generate() {
    const toast_el = Dom.createMarkup("div", "", Dom.root_el, {
      class: "toast-container",
    });
    const toast_h3_el = Dom.createMarkup("h3", "", toast_el, {
      class: "toast-h3",
    }) as HTMLHeadingElement;
    const toast_paragraph_el = Dom.createMarkup("p", "", toast_el, {
      class: "toast-p",
    }) as HTMLParagraphElement;
    toast_el.style.transition = "all 0.3s ease-in-out";
    toast_el.style.visibility = "hidden";
    toast_el.style.opacity = "0%";
    toast_el.style.transform = "translateX(200%)";

    return {
      toast_el,
      toast_h3_el,
      toast_paragraph_el,
    };
  }
}
