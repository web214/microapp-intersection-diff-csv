# Comparateur CSV – mode d'emploi (FR)

## 1. Utilisation

- **But** : comparer deux exports CSV (A et B) pour trouver rapidement les lignes communes, celles présentes uniquement dans A ou uniquement dans B.
- **Fonctionnement local** : tous les calculs se font dans votre navigateur, sans transfert réseau, ce qui garantit la confidentialité des données.
- **Fichiers volumineux** : l'interface a été pensée pour manipuler des fichiers de grande taille tant que votre navigateur dispose de suffisamment de mémoire. Évitez d'ouvrir d'autres onglets lourds pendant l'analyse.
- **Colonnes à conserver** : moins vous cochez de colonnes en sortie, plus le calcul est rapide et consomme peu de mémoire. Ne gardez que les champs nécessaires pour votre export final.
- **Astuce de préparation** : si vos CSV contiennent énormément de colonnes inutiles, réduisez-les d'abord avec un autre outil (ex. `csvcut`, `mlr cut`, tableur, etc.) avant de les charger dans l'application ; cela améliore nettement la réactivité.
- **Schéma des ensembles comparés** :

```
[ A \ B ] | [ A ∩ B ] | [ B \ A ]
  gauche     intersection    droite
```

## 2. Notes techniques

- **Technologies** : application 100 % front (HTML/CSS/JS). Aucun backend ni dépendance externe.
- **Sécurité** : Content Security Policy stricte (`script-src 'self' 'sha256-…'`) empêchant les injections externes ; aucun script distant n'est chargé.
- **Parsing** : lecteur CSV robuste gérant guillemets, délimiteurs, retours chariot CR/LF. Les lignes avec un nombre de colonnes inattendu sont signalées.
- **Clés de jointure** : chaque fichier peut avoir une clé différente. Le résultat inner join combine les colonnes A/B avec préfixes automatiques pour éviter les collisions.
- **Performance** :
  - Les données sont stockées sous forme d’objets JavaScript. Réduire le nombre de colonnes limite la taille de ces objets et accélère le rendu.
  - Les colonnes sélectionnées par défaut se limitent aux clés de jointure afin de réduire la charge initiale.
  - Les statistiques sont recalculées uniquement lorsque les fichiers ou options critiques changent ; le mode « calcul manuel » (désactiver l’option auto) permet de préparer plusieurs paramètres avant de lancer le traitement.
- **Fichiers très larges** :
  - La limite pratique dépend de la RAM et du moteur JS du navigateur ; sur une machine moderne, plusieurs dizaines voire centaines de milliers de lignes sont possibles si peu de colonnes sont sélectionnées.
  - En cas de ralentissement, diminuer les colonnes, filtrer les fichiers en amont, ou travailler par lots.
- **Export** : les résultats (intersection ou exclusifs) sont téléchargeables au format CSV avec un nom dérivé des fichiers sources.

Bonne comparaison !
