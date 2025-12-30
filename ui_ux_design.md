# 🎨 UI/UX DESIGN GUIDELINES

**Responsable :** Équipe Design / Front-end
**Objectif :** Créer une identité visuelle forte et des assets graphiques via IA.

## 1. CHARTE GRAPHIQUE
* **Palette de couleurs :** Définir une couleur Primaire (CTA, Header) et Secondaire.
* **Typographie :** Utiliser des Google Fonts lisibles (ex: Roboto, Open Sans, Montserrat).
* **Logo :** Généré par IA (Midjourney/DALL-E/Canva AI). [cite_start]Doit être lisible en petit dans le Header[cite: 37].

## 2. STRUCTURE VISUELLE (WIREFRAMING)
### HEADER
* Logo à gauche.
* [cite_start]Menu de navigation au centre (Accueil, Produits, À propos, Contact)[cite: 17].
* Icônes à droite (Panier, Recherche).

### HOMEPAGE (LANDING)
* [cite_start]**Slicer / Hero Section :** Une grande bannière rotative ou statique avec image haute qualité et CTA[cite: 18, 39].
* **Grid Produits :** Mise en avant de 3-4 produits phares.
* [cite_start]**Footer :** Liens utiles, Copyright, Réseaux sociaux[cite: 18].

## 3. GÉNÉRATION D'IMAGES (ASSETS)
[cite_start]Les images doivent avoir un rendu "professionnel et de qualité"[cite: 29].

* **Product Shots :** Produit sur fond neutre ou mis en situation (lifestyle).
    * *Prompt Tip :* "Studio lighting, 4k resolution, white background, product photography of [Object]."
* **Bannières :** Images larges pour le slicer. Évitez le texte dans l'image générée (ajoutez le texte en HTML/CSS par-dessus).

## 4. ERGONOMIE & UX
* **Contraste :** Le texte doit être lisible sur les fonds.
* **Espaces :** Utiliser le système de padding/margin de Tailwind pour aérer le contenu.
* **Navigation :** Le retour à l'accueil doit se faire en cliquant sur le logo.