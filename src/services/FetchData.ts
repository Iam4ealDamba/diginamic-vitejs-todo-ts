import Todo from "../models/Todo";
import { ITodoDTO } from "../utils/interface";

export default class FetchData {
  static url: string = "http://localhost:3000/todos";

  /**
   * Recupère à partir du serveur une liste de tache et la retourne.
   * @returns {Promise<Todo[] | null>} Liste de tache ou message d'erreur
   */
  static async loadTodos(): Promise<Todo[] | null> {
    try {
      return await fetch(FetchData.url).then(async (response) => {
        if (response.status === 200) {
          let list = (await response.json()) as ITodoDTO[];
          let data: Todo[] = [];

          list.forEach((todo) => {
            data.push(new Todo(todo));
          });

          return data;
        }
        return null;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Envoie à partir du serveur une nouvelle tache.
   * @param {Todo} todo Nouvelle tache à ajouter
   * @returns {Promise<Todo | null>} Nouvelle tache ou null
   */
  static async addTodo(todo: Todo): Promise<Todo | null> {
    return await fetch(FetchData.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: todo.getName(),
        done: todo.getDone(),
      }),
    })
      .then(async (response) => {
        if (response.status === 201) {
          const list = (await response.json()) as ITodoDTO;
          const todo = new Todo(list);
          return todo;
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  /**
   * Supprimer une tache a partir du serveur.
   * @param {Todo} todo_id Identifiant de la tache
   * @returns {Promise<Todo | null>} Tache supprimé ou null
   */
  static async deleteTodo(todo_id: string | number): Promise<Todo | null> {
    return await fetch(`${FetchData.url}/${todo_id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        if ((await response.status) === 200) {
          let list = (await response.json()) as ITodoDTO;
          let todo = new Todo(list);
          return todo;
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  /**
   * Mis à jour d'une tache a partir du serveur.
   * @param {(string | number)} todo_id Identifiant de la tache
   * @param {boolean} done Valeur boolean à mettre à jour
   * @returns {Promise<Todo |null>} Tache mis à jour ou null
   */
  static async updateTodo(
    todo_id: string | number,
    done: boolean
  ): Promise<Todo | null> {
    console.log(todo_id, done);

    return await fetch(`${FetchData.url}/${todo_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: done,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          let list = (await response.json()) as ITodoDTO;
          let todo = new Todo(list);

          return todo;
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
