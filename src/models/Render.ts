import { IModal, IRenderConstructor } from "../utils/interface";

import FetchData from "../services/FetchData";
import Dom from "./Dom";
import Todo from "./Todo";
import Toast from "./Toast";

export default class Render extends Dom {
  private todoList: Todo[];
  private form_btn: HTMLButtonElement;
  private form_input: HTMLInputElement;
  private modal_form_el: IModal;
  private modal_delete_el: IModal;

  /**
   * Constructeur de la classe Render
   * @param {Todo[]} list Liste de tache a afficher
   * @param {HTMLElement} root
   * @param {HTMLButtonElement} form_btn
   * @param {HTMLInputElement} input_el
   * @param {IModal} modal_form_el
   * @param {IModal} modal_delete_el
   */
  constructor({
    list,
    form_btn,
    input_el,
    modal_form_el,
    modal_delete_el,
  }: IRenderConstructor) {
    super();
    this.todoList = list;
    this.form_btn = form_btn;
    this.form_input = input_el;
    this.modal_form_el = modal_form_el;
    this.modal_delete_el = modal_delete_el;

    // Afficher la liste de tache
    this.render();
    this.EventManager();
  }

  /**
   *  Gère les évènements sur les boutons de la liste de tache
   */
  private EventManager() {
    const ul_el = document.querySelector("ul") as HTMLElement;
    const form_el = document.querySelector("form") as HTMLElement;

    this.modal_form_el.buttons_el[0].addEventListener("click", () => {
      this.modal_form_el.container_el.style.visibility = "hidden";
      this.modal_form_el.container_el.style.opacity = "0%";
    });

    this.form_btn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (!this.form_input.value.length || this.form_input.value.length < 3) {
        this.modal_form_el.container_el.style.visibility = "visible";
        this.modal_form_el.container_el.style.opacity = "100%";
      } else {
        await this.addButtonEvent();
      }
    });
    form_el.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!this.form_input.value.length || this.form_input.value.length < 3) {
        this.modal_form_el.container_el.style.visibility = "visible";
        this.modal_form_el.container_el.style.opacity = "100%";
      } else {
        await this.addButtonEvent();
      }
    });
    ul_el.addEventListener("click", async (e) => {
      const btn = e.target as HTMLButtonElement;

      if (btn.classList.contains("delete-btn")) {
        this.modal_delete_el.container_el.style.visibility = "visible";
        this.modal_delete_el.container_el.style.opacity = "100%";

        for (const modal_btn of this.modal_delete_el.buttons_el) {
          modal_btn.addEventListener("click", async () => {
            if (modal_btn.innerText == "Annuler") {
              this.modal_delete_el.container_el.style.visibility = "hidden";
              this.modal_delete_el.container_el.style.opacity = "0%";
            } else {
              this.modal_delete_el.container_el.style.visibility = "hidden";
              this.modal_delete_el.container_el.style.opacity = "0%";
              await this.deleteButtonEvent(btn, ul_el);
            }
          });
        }
      }

      if (btn.classList.contains("valide-btn"))
        this.updateButtonEvent(btn, ul_el);
    });
  }

  /**
   * Affiche la liste de tache dans le DOM
   */
  private render() {
    if (this.todoList.length > 0) {
      if (document.querySelector("ul")) {
        document.querySelector("ul")!.remove();
      }

      const ul_el = this.createMarkup("ul", "", Dom.root_el);

      this.todoList.forEach((todo) => {
        const li_el = this.createMarkup("li", "", ul_el, {
          class: `todo-${todo.getId()}`,
        });
        li_el.style.order = todo.getDone() ? "2" : "1";

        this.createMarkup("h2", todo.getName(), li_el, {
          class: todo.getDone() ? "done" : "",
        });

        const container_el = this.createMarkup("div", "", li_el, {
          "aria-label": "todo-container",
        });
        this.createMarkup(
          "button",
          todo.getDone() ? "Invalider" : "Valider",
          container_el,
          {
            class: "valide-btn",
            "data-id": String(todo.getId()),
            type: "button",
          }
        );
        this.createMarkup("button", "Supprimer", container_el, {
          class: "delete-btn",
          "data-id": String(todo.getId()),
          type: "button",
        });
      });
    } else {
      if (document.querySelector("ul")) {
        document.querySelector("ul")!.remove();
      }
      const ul_el = this.createMarkup("ul", "", Dom.root_el);
      this.createMarkup("h4", "Aucune taches n'est disponible", ul_el);
    }
  }

  /**
   * Gère les évènements sur le bouton d'ajout de tache
   */
  private async addButtonEvent() {
    try {
      const todo_to_add = new Todo({
        name: this.form_input.value,
        done: false,
      });
      const new_todo = await FetchData.addTodo(todo_to_add);

      this.form_input.value = "";

      if (new_todo) {
        if (document.querySelector("ul>h4")) {
          document.querySelector("ul>h4")!.remove();
        }

        // Ajout de la tâche dans le DOM
        this.todoList.push(new_todo);
        const li_el = this.createMarkup(
          "li",
          "",
          document.querySelector("ul")!,
          {
            class: `todo-${new_todo.getId()}`,
          }
        );
        this.createMarkup("h2", new_todo.getName(), li_el);

        const container_el = this.createMarkup("div", "", li_el, {
          "aria-label": "todo-container",
        });
        this.createMarkup("button", "Valide", container_el, {
          class: "valide-btn",
          "data-id": String(new_todo.getId()),
          type: "button",
        });
        this.createMarkup("button", "Supprimer", container_el, {
          class: "delete-btn",
          "data-id": String(new_todo.getId()),
          type: "button",
        });

        // Ajout d'une notification
        const toast_success = new Toast({
          text: "Tâche ajoutée à la liste",
          type: "success",
        });
        await toast_success.showModal();
      } else {
        // Ajout d'une notification
        const toast_error = new Toast({
          text: "Tâche non ajoutée à la liste",
          type: "error",
        });
        await toast_error.showModal();
      }
    } catch (error) {}
  }

  /**
   * Gère les évènements sur le bouton de suppression de tache
   * @param {HTMLButtonElement} btn Bouton de suppression de tache
   * @param {HTMLElement} ul_el Ul de la liste de tache
   */
  private async deleteButtonEvent(btn: HTMLButtonElement, ul_el: HTMLElement) {
    const todo_id = btn.getAttribute("data-id");
    const todo_deleted = await FetchData.deleteTodo(String(todo_id));

    if (todo_deleted) {
      this.todoList = this.todoList.filter(
        (t) => t.getId() != todo_deleted.getId()
      );
      const li_el = document.querySelector(`.todo-${todo_id}`)!;
      ul_el.removeChild(li_el);

      if (this.todoList.length == 0) {
        this.createMarkup("h4", "Aucune taches n'est disponible", ul_el);
      }

      // Ajout d'une notification
      const toast_success = new Toast({
        text: "Tâche supprimée de la liste",
        type: "success",
      });
      await toast_success.showModal();
    } else {
      // Ajout d'une notification
      const toast_error = new Toast({
        text: "Tâche non supprimée de la liste",
        type: "error",
      });
      await toast_error.showModal();
    }
  }

  /**
   * Gère les évènements sur le bouton de modification de tache
   * @param {HTMLButtonElement} btn Bouton de validation de tache
   * @param {HTMLElement} ul_el Ul de la liste de tache
   */
  private async updateButtonEvent(btn: HTMLButtonElement, ul_el: HTMLElement) {
    const todo_id = btn.getAttribute("data-id");
    const todo = this.todoList.filter((t) => t.getId() == todo_id)[0];
    const todo_updated = await FetchData.updateTodo(
      todo.getId(),
      !todo.getDone()
    );

    if (todo_updated) {
      this.todoList = this.todoList.map((t) => {
        if (t.getId() == todo_updated.getId()) {
          t.changeDone();
        }
        return t;
      });

      const li_el = document.querySelector(
        `.todo-${todo_id}`
      )! as HTMLLIElement;
      if (todo_updated.getDone()) {
        btn.innerText = "Invalider";
        document.querySelector(`.todo-${todo_id} > h2`)!.classList.add("done");
        li_el.style.order = "2";
      } else {
        btn.innerText = "Valider";
        document
          .querySelector(`.todo-${todo_id} > h2`)!
          .classList.remove("done");
        li_el.style.order = "1";
      }

      if (this.todoList.length == 0) {
        this.createMarkup("h4", "Aucune taches n'est disponible", ul_el);
      }
    } else {
      // Ajout d'une notification
      const toast_error = new Toast({
        text: "Tâche non modifiée",
        type: "error",
      });
      await toast_error.showModal();
    }
  }
}
