import { IModalConstructor } from "../utils/interface";
import Dom from "./Dom";

export default class Modal extends Dom {
  private container_el: HTMLElement | undefined;
  private content_el: HTMLElement | undefined;
  private paragraph_el: HTMLParagraphElement | undefined;
  private buttons_el: HTMLButtonElement[] = [];

  /**
   * Constructeur de la classe Modal
   *
   * @param {string} modal_name Nom du modal
   * @param {string} paragraph_name Nom du paragraphe
   * @param {object[]} buttons Boutons du modal
   */
  constructor({ modal_name, paragraph_name, buttons }: IModalConstructor) {
    super();

    this.initialize(modal_name, paragraph_name, buttons);
  }

  /**
   * Retourne un objet représentant les elements du modal
   *
   * @returns {IModal} Objet contenant les elements du modal
   */
  getModal() {
    return {
      container_el: this.container_el!,
      content_el: this.content_el!,
      paragraph_el: this.paragraph_el!,
      buttons_el: this.buttons_el,
    };
  }

  private initialize(
    modal_name: string,
    paragraph_name: string,
    buttons: {
      className: string;
      text: string;
    }[]
  ) {
    this.container_el = this.createMarkup("div", "", Dom.root_el, {
      class: `modal-container-${modal_name}`,
    });
    this.content_el = this.createMarkup("div", "", this.container_el, {
      class: "modal-content",
    });
    this.paragraph_el = this.createMarkup(
      "p",
      paragraph_name,
      this.content_el,
      {
        class: "modal-paragraph",
      }
    ) as HTMLParagraphElement;

    for (let btn of buttons) {
      this.buttons_el?.push(
        this.createMarkup("button", btn.text, this.content_el, {
          class: `modal-${btn.className}-btn`,
        }) as HTMLButtonElement
      );
    }

    this.container_el.style.visibility = "hidden";
    this.container_el.style.opacity = "0%";
    this.container_el.style.transition = "all 0.2s ease-in-out";
  }
}
