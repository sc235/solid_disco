# 🎮 Jeu de Morpion (Tic-Tac-Toe)

Un jeu de Morpion classique créé avec HTML, CSS et JavaScript vanilla.

## ✨ Fonctionnalités

- **Grille 3x3** : Plateau de jeu classique avec cases cliquables
- **Deux modes de jeu** : Jouer à 2 joueurs ou contre l'ordinateur
- **IA intelligente** : L'ordinateur joue de manière stratégique (bloque les victoires, prend le centre, etc.)
- **Alternance des joueurs** : Les joueurs X et O jouent à tour de rôle
- **Détection automatique de victoire** : Le jeu détecte automatiquement les alignements de 3 symboles (lignes, colonnes, diagonales)
- **Détection de match nul** : Affichage automatique quand toutes les cases sont remplies sans gagnant
- **Compteur de scores** : Suivi des victoires de chaque joueur
- **Bouton Rejouer** : Réinitialisation complète de la grille pour une nouvelle partie
- **Design responsive** : Interface adaptée aux différentes tailles d'écran

## 🚀 Comment jouer

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Choisissez votre mode de jeu :
   - **2 Joueurs** : Jouez avec un ami sur le même écran
   - **Contre l'ordinateur** : Affrontez l'IA du jeu
3. Le joueur X commence toujours en premier
4. Cliquez sur une case vide pour placer votre symbole
5. Le jeu alterne automatiquement entre les joueurs
6. Le premier à aligner 3 symboles gagne !
7. Utilisez le bouton "Rejouer" pour commencer une nouvelle partie
8. Changez de mode de jeu à tout moment avec le sélecteur

## 🎨 Design

- **Interface moderne** : Design épuré avec dégradés et ombres
- **Animations** : Effets de survol et animations sur les cellules gagnantes
- **Couleurs distinctes** : X en rouge, O en bleu pour une meilleure lisibilité
- **Responsive** : S'adapte aux écrans mobiles et desktop

## 📁 Structure des fichiers

```
TicTacToe/
├── index.html      # Structure HTML du jeu
├── style.css       # Styles CSS et animations
├── script.js       # Logique JavaScript du jeu
└── README.md       # Documentation du projet
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec Flexbox, Grid et animations
- **JavaScript ES6+** : Programmation orientée objet avec classes

## 🔧 Installation

Aucune installation requise ! Il suffit de :

1. Télécharger tous les fichiers dans un même dossier
2. Ouvrir `index.html` dans votre navigateur web
3. Commencer à jouer !

## 🎯 Logique du jeu

Le jeu utilise une approche orientée objet avec la classe `TicTacToe` qui gère :
- L'état du plateau (tableau de 9 éléments)
- L'alternance des joueurs
- La détection des conditions de victoire
- La gestion des scores
- Les interactions utilisateur

## 🌟 Fonctionnalités avancées

- **Mise en évidence des cellules gagnantes** : Animation spéciale pour les 3 symboles alignés
- **Gestion des états** : Le jeu se met en pause après une victoire ou un match nul
- **Validation des coups** : Impossible de jouer sur une case déjà occupée ou après la fin du jeu
- **Interface utilisateur intuitive** : Messages clairs et retours visuels
- **IA stratégique** : L'ordinateur joue intelligemment en priorisant les victoires, bloquant les menaces et prenant des positions stratégiques
- **Changement de mode dynamique** : Possibilité de changer entre les modes de jeu sans recharger la page
- **Messages contextuels** : Affichage adapté selon le mode de jeu (joueur vs joueur ou vs ordinateur)

Amusez-vous bien ! 🎉
# solid_disco
