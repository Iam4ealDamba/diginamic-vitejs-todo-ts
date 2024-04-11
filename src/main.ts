"use strict";

// Dependences
import FetchData from "./services/FetchData";
import Dom from "./models/Dom";
import Render from "./models/Render";
import Modal from "./models/Modal";
import "./styles/style.css";

// Functions
/**
 * Initialise la page et l'affiche le formulaire et la liste de tache ou le message d'erreur 500
 */
const setup = async () => {
  const data = await FetchData.loadTodos();
  if (!data) {
    const msg =
      "Désoler, une erreur du serveur c'est produite, veuillez reessayer plus tard !";
    const header = Dom.createMarkup("header", "", Dom.root_el, {
      class: "error-header",
    });
    Dom.createMarkup("img", "", header, {
      src: "/images/internal-server-error.jpg",
      alt: "error image",
      class: "error-img",
    }) as HTMLImageElement;
    Dom.createMarkup("h1", msg, header, {});
  } else {
    // Formulaire
    const header_el = Dom.createMarkup("header", "", Dom.root_el);
    const form_el = Dom.createMarkup("form", "", header_el);
    const input_el = Dom.createMarkup("input", "", form_el, {
      type: "text",
      name: "todo",
      id: "todo",
      placeholder: "Entrer une tâche...",
    }) as HTMLInputElement;
    const add_button_el = Dom.createMarkup(
      "button",
      "Ajouter une tache",
      form_el,
      {
        type: "button",
      }
    ) as HTMLButtonElement;

    // Modals
    const modal_form = new Modal({
      modal_name: "form-error",
      paragraph_name:
        "Veuillez entrer un nom de tâche valide (3 caractères minimum)",
      buttons: [
        {
          className: "form-error",
          text: "Fermer la fenêtre",
        },
      ],
    });
    const modal_delete = new Modal({
      modal_name: "form-delete",
      paragraph_name: "Voulez-vous supprimer cette tâche ?",
      buttons: [
        {
          className: "form-error",
          text: "Confirmer",
        },
        {
          className: "form-error",
          text: "Annuler",
        },
      ],
    });

    new Render({
      list: data,
      form_btn: add_button_el,
      input_el: input_el,
      modal_form_el: modal_form.getModal(),
      modal_delete_el: modal_delete.getModal(),
    });
  }
};
setup();
