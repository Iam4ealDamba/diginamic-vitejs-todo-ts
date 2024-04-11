import { ITodoDTO } from "../utils/interface";
import Dom from "./Dom";

export default class Todo extends Dom {
  private id: number | string;
  private name: string;
  private done: boolean;

  /**
   * Constructeur de la tache
   * @param  id Identifiant de la tache
   * @param  name Nom de la tache
   * @param  done Etat de la tache
   */
  constructor({ id, name, done }: ITodoDTO) {
    super();
    this.id = String(id);
    this.name = name;
    this.done = done;
  }

  /**
   * Retourne l'identifiant de la tache
   * @returns {number | string} Identifiant de la tache
   */
  getId() {
    return this.id;
  }

  /**
   * Retourne le nom de la tache
   * @returns {string} Nom de la tache
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retourne l'etat de la tache
   * @returns {boolean} Etat de la tache
   */
  getDone(): boolean {
    return this.done;
  }

  /**
   * Change l'etat de la tache
   */
  changeDone() {
    this.done = !this.done;
  }
}
