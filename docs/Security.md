# Risques DevOps

## Exposition de secrets dans le Git


Ne jamais push les fichiers `.env`.

Utiliser les GitHub Secrets pour les workflows GitHub Actions.

Fournir uniquement un fichier `.env.example` sans données sensibles.

---

## Indisponibilité de la base de données


Utiliser un `healthcheck` Docker.

Sauvegarder régulièrement les données.

---

## Vulnérabilités dans les dépendances

Mettre régulièrement les dépendances à jour.

Utiliser `npm audit` et les alertes GitHub Dependabot.

Corriger les vulnérabilités.

---

## Problème lié à un conteneur Docker

Surveiller les logs des conteneurs.

Utiliser des images officielles et maintenir les images Docker à jour.
