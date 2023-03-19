# Choix des technologies

## langages

### python

* Privilégié par les membres de l'équipe
* langage des notebook
* permet le développement rapide d'applications de bureau
* la performance n'est pas une priorité pour le projet

### javascript

* nécessaires à l'utilisation d'electron

### typescript

* pour avoir un code js plus propre

## Partie GUI

### electrons

* Un membre de l'équipe possède de l'experience avec la librairie (Fortini Donat)
* Le cross-plateforme est directement fonctionnelle (l'équipe peut donc développer à la fois sur Linux et Windows)
* La séparation du code gérant l'IHM est possible sans trop de difficulté (consigne de l'UE)

## Partie "backend"

### selenium

* Permet l'ouverture d'un navigateur à partir d'un programme python
* permet la gestion de la page par ce programme
* à la base surtout utilisé pour le test mais le changement de fonction ne semble pas problématique
* permet la prévisualisation du notebook dans la page ouverte/gérée

### jupyter notebook

* toujours le plus populaire par rapport à jupyterLab
* convient mieux à notre objectif (création et prévisualisation d'un notebook donc pas besoins d'un IDE en ligne)
* le but du projet est de créer un notebook jupyter (!).

### webdriver

* nécessaire à l’installation simple des driver servant à ouvrir les navigateur
* nécessaire au bon fonctionnement de selenium avec les navigateurs dans sa dernière version.

### pytest

* framework de test python simple convenant à notre projet

## Possible

### Poetry

pour simplifier le build python, à regarder plus tard

### Sphinx

pour la documentation, à voir plus tard

* [Retour readme](../../README.md)
