# Guide de contribution — SummitGear

Merci de contribuer à ce projet ! Ce document décrit le workflow Git et les conventions à respecter.

---

## Workflow Git

### Branches

| Branche       | Rôle                                     |
|---------------|------------------------------------------|
| `main`        | Branche destiné à la production                   |
| `dev`         | Intégration des nouvelles fonctionnalités |
| `feature/<nom>` | Nouvelle fonctionnalité                  |
| `fix/<nom>`   | Correction de bug                        |
| `docs/<nom>`  | Documentation uniquement                 |
| `chore/<nom>` | Maintenance              |

**Règle : on ne pousse jamais directement sur `main`.** Toute modification passe par une Pull Request depuis `develop` ou une branche de fonctionnalité.

### Créer une branche

```bash
git checkout <branch>
git pull origin develop
git checkout -b feature/ma-fonctionnalite
```

### Soumettre une Pull Request

1. Pousser la branche : `git push origin feat/ma-fonctionnalite`
2. Ouvrir une PR vers `develop` sur GitHub
3. Rédiger une description claire de ce qui a changé
4. Attendre une review du chef de projet (cyprien) avant de merger

---

## Conventional Commits

Ce projet suit la spécification **[Conventional Commits](https://www.conventionalcommits.org/)**.

### Format

```
<type>(<scope>): <description courte>

[corps optionnel]

[footer optionnel]
```

### Types autorisés

| Type       | Usage |
|------------|---|
| `feature`    | Nouvelle fonctionnalité |
| `fix`      | Correction de bug |
| `docs`     | Documentation |
| `test`     | Ajout ou correction de tests |
| `chore`    | Maintenance (CI, config…) |

### Exemples

```bash
feature(auth): add JWT login endpoint
fix(cart): fix quantity not updating on increment
```

### Règles

- Description en **minuscules**, sans point final
- Impératif présent : `add`, `fix`, `update` — pas `added`, `fixed`
- Scope entre parenthèses si pertinent : `feat(cart)`, `fix(auth)`
- Commits atomiques : **un commit = une chose**

---

## Standards de code

- **TypeScript strict** activé sur frontend et backend
- Pas de `any` sauf cas justifié avec commentaire
- Les variables d'environnement sensibles restent dans `.env` (jamais committé)
- Toute nouvelle route API doit être documentée dans le README

---

## Setup local

Voir le [README](../README.md) pour les instructions d'installation en local.