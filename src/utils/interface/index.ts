import Todo from "../../models/Todo";

export interface ITodoDTO {
  id?: string | number;
  name: string;
  done: boolean;
}

export interface ITodo {
  getId(): string | number;
  getName(): string;
  getDone(): boolean;
  changeDone(): void;
}

export interface IRender {
  articleElmt: HTMLElement;
  h2Elmt: HTMLHeadingElement;
  btnDeleteEl: HTMLButtonElement;
  btnValidateEl: HTMLButtonElement;
}

export interface IRenderConstructor {
  list: Todo[];
  form_btn: HTMLButtonElement;
  input_el: HTMLInputElement;
  modal_form_el: IModal;
  modal_delete_el: IModal;
}

export interface IModal {
  container_el: HTMLElement;
  content_el: HTMLElement;
  paragraph_el: HTMLParagraphElement;
  buttons_el: HTMLButtonElement[];
}

export interface IModalConstructor {
  modal_name: string;
  paragraph_name: string;
  buttons: {
    className: string;
    text: string;
  }[];
}

export interface IToastType {
  text: string;
  type: "success" | "error" | "info";
}

export interface IToastElementType {
  toast_el: HTMLElement;
  toast_h3_el: HTMLHeadingElement;
  toast_paragraph_el: HTMLParagraphElement;
}
