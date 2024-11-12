## Scénario

Dans cette mise en situation, je prends le rôle d'un développeur back-end en freelance depuis maintenant un an dans la région de Lille.

J'ai l’habitude de travailler avec Kévin, un développeur front-end plus expérimenté que moi, et qui a déjà un bon réseau de contacts dans le milieu.  

Kévin me contacte pour me proposer de travailler avec lui en mutualisant nos compétences front / back sur un tout nouveau projet qui lui a été proposé.

Il s’agit d’une petite chaîne de librairies qui souhaite ouvrir un site de référencement et de notation de livres : Mon Vieux Grimoire.

<p align="center">
  <img src="https://github.com/user-attachments/assets/528e06cf-dfdd-45aa-b788-aa32f6fa549e" alt="1680512368252_Kasa logo">
</p>

Voici l’e-mail qu’il m'envoie : 

<table>
<tbody>
<tr>
<td>
<p><strong>De</strong>&nbsp;: Kévin<br><strong>À</strong>&nbsp;: Moi<br><strong>Sujet</strong>&nbsp;: Développement d’un site de notation de livres</p>
</td>
</tr>
<tr>
<td>
<p>Hello !</p>
<p>J’espère que tu vas bien. J’ai une nouvelle mission pour toi&nbsp;: il s’agit d’un client qui souhaite ouvrir un site de notation de livres au nom de sa chaîne de librairies “Le Vieux Grimoire” à Lille. Le site s’appellera “Mon Vieux Grimoire”, et permettra aux membres d’ajouter un nouveau livre et de mettre une note visible par le public.</p>
<p>&nbsp;</p>
<p>Nous sommes déjà en discussion avec le client depuis quelques semaines, et on a pu définir les spécifications fonctionnelles de la première version. De plus, j’ai fait appel à une designeuse avec qui j’ai l’habitude de travailler, et qui a conçu la maquette. Tu trouveras tout ça en pièce jointe.</p>
<p>&nbsp;</p>
<p>Je vais me charger de développer le front-end du site en React. Il me faut donc un développeur back-end, et c’est là que tu entres en jeu&nbsp;!</p>
<p>&nbsp;</p>
<p>Est-ce que ça t’intéresserait de t’occuper de la partie back-end&nbsp;?</p>
<p>&nbsp;</p>
<p>Si oui, je reviens vers toi avec le front-end développé d’ici la fin du mois, ainsi que plus de détails sur l’API à mettre en place.</p>
<p>&nbsp;</p>
<p>N’hésite pas si tu as des questions.</p>
<p>Bonne journée,<br><strong>Kévin</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>Pièces jointes&nbsp;</strong>:</p>
<ul>
<li><a class="custom-link" href="https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf">Spécifications fonctionnelles</a></li>
<li><a class="custom-link" href="https://www.figma.com/file/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?node-id=0%3A1">Maquette du site</a>&nbsp;</li>
</ul>
</td>
</tr>
</tbody>
</table>


### Quelque heures plus tard

Nous recevons un e-mail de Paul, le designer :

<table>
<tbody>
<tr>
<td>
<p><strong>Objet&nbsp;</strong>: Fonctionnalité et design<br><strong>De&nbsp;</strong>: Paul<br><strong>À</strong>&nbsp;: Moi</p>
</td>
</tr>
<tr>
<td>
<p>Salut,</p>
<p>&nbsp;</p>
<p>Bienvenue parmi nous ! Laura m’a dit de te briefer sur le design de la nouvelle version du site, alors voici les infos clés.</p>
<p>&nbsp;</p>
<p><strong>Design</strong></p>
<p>Voici&nbsp;<a class="custom-link" href="https://www.figma.com/file/2BZEoBhyxt5IwZgRn0wGsL/Kasa_FR?type=design&amp;node-id=0-1&amp;mode=design&amp;t=1KgUwWWFtuAVbsJ5-0" target="_blank" rel="noopener noreferrer">les maquettes sur Figma</a>&nbsp;pour le design d’interface. J’ai l’habitude de travailler avec la logique de composants sur Figma&nbsp;; Sandra m’a dit que ça te faciliterait le travail sur React. Tu trouveras toutes les ressources dont tu as besoin directement dans la maquette (logo, icônes pour les composants, etc.). Pour cela, il suffit de cliquer sur la ressource souhaitée et de faire "Exporter" au format voulu. Sur les vignettes des logements, pour les images de couverture, j'ai mis une rectangle orange que tu peux remplacer par l'image correspondante.</p>
<p>&nbsp;</p>
<p>Pour avoir un rendu le plus réaliste possible de l'application, utilise&nbsp;<a class="custom-link" href="https://www.figma.com/proto/2BZEoBhyxt5IwZgRn0wGsL/Kasa_FR?type=design&amp;node-id=3-0&amp;t=x8RBKuR4UiE3hhBW-0&amp;scaling=scale-down&amp;page-id=0%3A1&amp;starting-point-node-id=3%3A0&amp;show-proto-sidebar=1" target="_blank" rel="noopener noreferrer">les prototypes du site disponibles ici</a>. Ils te permettront notamment de voir les animations attendues sur les menus déroulants (Collapse).</p>
<p>&nbsp;</p>
<p><strong>Contraintes fonctionnelles</strong></p>
<p>Quelques précisions sur les fonctionnalités du site :</p>
<ul>
<li>Pour le défilement des photos dans la galerie (composant Gallery)&nbsp;:
<ul>
<li>Si l'utilisateur se trouve à la première image et qu'il clique sur "Image précédente", la galerie affiche la dernière image.&nbsp;</li>
<li>Inversement, quand l'image affichée est la dernière de la galerie, si l'utilisateur clique sur "Image suivante", la galerie affiche la première image.&nbsp;</li>
<li>S'il n'y a qu'une seule image, les boutons "Suivant" et "Précédent" ainsi que la numérotation n'apparaissent pas.</li>
</ul>
</li>
<li>La galerie doit toujours rester de la même hauteur, celle indiquée sur la maquette Figma. Les images seront donc coupées et centrées dans le cadre de l’image.</li>
<li>Collapse : Par défaut, les Collapses sont fermés à l'initialisation de la page.&nbsp;</li>
<li>Si le Collapse est ouvert, le clic de l'utilisateur permet de le fermer.
<ul>
<li>Inversement, si le Collapse est fermé, un clic permet de l'ouvrir.</li>
</ul>
</li>
</ul>
<p>&nbsp;</p>
<p>Bon courage pour le développement, j’ai hâte de voir ce que ça va donner&nbsp;!</p>
<p>&nbsp;</p>
<p>Paul,</p>
<p>Desginer</p>
</td>
</tr>
</tbody>
</table>

### Note : L'utilisation de Sass est obligatoire pour générer le style CSS du site web, ainsi que pour mettre en place l'animation CSS du menu déroulant.

