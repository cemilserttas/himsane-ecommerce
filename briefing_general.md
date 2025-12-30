# 📁 BRIEFING GÉNÉRAL DU PROJET (READ FIRST)

## 1. VISION DU PROJET & OBJECTIFS EXAMEN
Nous ne construisons pas seulement un site, nous construisons une **marque digitale** cohérente.
L'objectif est de valider l'examen "IA & E-commerce" en démontrant deux choses :
1.  **Technique :** Un site fonctionnel, déployé et responsive.
2.  **Méthodologie IA :** Une capacité prouvée à prompter l'IA pour générer du code, du contenu et du design.

**Nom de code du projet :** HIMSANE E-COMMERCE
[cite_start]**Deadline de livraison (PDF) :** 05/01[cite: 7].
**Livrable final :** Site en ligne + Rapport PDF explicatif.

## 2. ARCHITECTURE TECHNIQUE (STACK TECHNIQUE)
Pour respecter la contrainte de gratuité et de stabilité sur Netlify, nous refusons les CMS lourds (WordPress) et les bases de données SQL.

* **Core :** HTML5 Sémantique.
* **Styling :** Tailwind CSS (via CDN) pour un design rapide et responsive sans étape de "build" complexe.
* **Logic :** Vanilla JavaScript (ES6+).
* **Data :** Fichiers JSON statiques (ex: `products.json`) pour simuler la base de données produits.
* **Infrastructure :**
    * IDE : Anti-Gravity (Google IDX).
    * Versioning : GitHub.
    * Hosting : Netlify (Déploiement continu depuis la branche `main`).

## 3. RÈGLES D'OR (DOs & DON'Ts)

### ✅ DO (À FAIRE ABSOLUMENT)
* **DOCUMENTER LES PROMPTS :** C'est 50% de la note. Chaque ligne de code, chaque texte et chaque image doit avoir une trace du prompt utilisé. [cite_start]Copiez-les dans un fichier texte brut au fur et à mesure[cite: 12].
* **TESTER EN LOCAL :** Vérifiez toujours le rendu dans la prévisualisation Anti-Gravity avant de commit.
* **RESPONSIVE FIRST :** Le site doit être parfait sur mobile.

### ❌ DON'T (INTERDIT)
* **PAS DE PHP/MYSQL :** Netlify ne lit pas le PHP. Restez sur du statique.
* **NE PAS MODIFIER SANS COMMIT :** Chaque fonctionnalité majeure = un commit git.
* [cite_start]**NE PAS OUBLIER LES MEMBRES :** Les noms/prénoms doivent figurer sur le rendu final[cite: 9].

## 4. CRITÈRES DE SUCCÈS (KPIs)
1.  [cite_start]**Navigation Fluide :** Menu clair, Header complet, Footer informatif [cite: 16-18].
2.  [cite_start]**Identité Marque :** Cohérence entre le logo, les couleurs et le ton des textes[cite: 23].
3.  [cite_start]**Page Produit :** Doit contenir titre, prix, description, cross-selling et avis[cite: 30].