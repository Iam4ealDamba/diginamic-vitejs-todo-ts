## Bonjour Yvan, voici l'exercice à faire sur les taches en TypeScript.
---

### Présentation du projet
Pour faire la présentation de ce projet, je vait en premier lieu expliquer les differents dossiers qui le compose:

- **node_module**:  Ce dossier contient les dépendences du projets.
- **public**:  Il contientt les médias du projet (l'icone et l'image d'erreur 500)
- **src**:  Il contient tout le code typescript du projet
  - **data**:  Contient le fichier "db.json"
  - **models**:  Contient toutes les classes qui seront utilisées
  - **services**:  Contient la class qui servira à faire le CRUD via l'URL de json-server.
  - **styles**:  Contient le fichier "style.css"
  - **utils**:  Contient les interfaces utilisées dans le projet.

Le projet à comme script principale le fichier **main.js**.

##### 1- Les Models
Pour revenir sur le dossiers models, il contient donc les classes qui vont nous servirent à créer nos objets:

- **Dom**: une class qui sert à delivrer la methode **createMarkup**, qui va créer nos elements HTML.
- **Modal**: Cette class va servir à créer des objets représentant des modals dans notre navigateur.
- **Render**: C'est grâce à cette class que le projet va pouvoir s'afficher, il gère donc tout l'affichage au niveau de la liste des taches.
- **Todo**: C'est la class qui va nous servir à générer nos objets de tache.
- **Toast**: C'est la class qui sert à créer des toasts (notifications).

##### 2- Les Dependences
Dans ce projett, plusieurs dépendences ont été utilisées, en voici la liste:


- **typescript**: version - 5.2.2
- **vite**: version - 5.2.0

### Lancer le projet
Le projet est lancé avec le bundler ViteJS, et qui va gérer le code en TypeScript, de ce fait, il n'y à pas de dossier d'export du code TypeScript transpilé en JavaScript.

##### 1- Installer les dependences
Pour installer les dépendences du projet, lance cette commande dans le terminal:

```bash
  # Pour yarn
  yarn

  # Pour npm
  npm install 
```

Si tu le souhaite, tu peux faire cette instruction ci-dessous afin de compilé et minifié le code dans un fichier nommé **dist**:

```bash
  # Pour yarn
  yarn build

  # Pour npm
  npm run build
```

##### 2- Lancer Vite JS
Cette commande va donc, dans un premier temps, créer un dossier **dist** dans la raçine du projet contenant le code compilé et minifié.

Pour lancer le projet, si tu à utiliser la commande **build** afin de compilé et minifié le projet, alors il va te faloir executer ce code dans le terminal à la racine du projet.

```bash
  # Pour yarn
  yarn preview

  # Pour npm
  npm run preview
```

Sinon, tu peux aussi l'executer directement  en TypeScript avec cette commande:

```bash
  # Pour yarn
  yarn preview

  # Pour npm
  npm run preview
```

##### 3- Lancer json-server
Aussi, tu aura remarqué dans le navigateur qu'une erreur 500 apparait dans la fenetre, cest normal, il faut maintenant lancer dans un nouveau terminal de **VSCode** une nouvelle instruction afin de lancer json-server:

``` bash
  # Lancer le serveur "json-server"
  npx json-server ./src/data/db.json
```

Avec ça, je pense avoir bien présenter le projet dans son ensemble, je te souhaite un bon essai !