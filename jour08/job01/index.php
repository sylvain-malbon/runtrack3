<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Création de compte - Job 01</title>
</head>
<body>
	<!-- Header avec navigation -->
	<header>
		<nav>
			<ul>
				<li><a href="index.php">Accueil</a></li>
				<li><a href="index.php">Inscription</a></li>
				<li><a href="index.php">Connexion</a></li>
				<li><a href="index.php">Rechercher</a></li>
			</ul>
		</nav>
	</header>

	<!-- Section formulaire de création de compte -->
	<section>
		<h2>Créer un compte</h2>
		<form action="#" method="post">
			<!-- Civilité -->
			<div>
				<label>Civilité :</label>
				<input type="radio" id="mr" name="civilite" value="mr">
				<label for="mr">Monsieur</label>
				<input type="radio" id="mme" name="civilite" value="mme">
				<label for="mme">Madame</label>
			</div>

			<!-- Prénom -->
			<div>
				<label for="prenom">Prénom :</label>
				<input type="text" id="prenom" name="prenom" required>
			</div>

			<!-- Nom -->
			<div>
				<label for="nom">Nom :</label>
				<input type="text" id="nom" name="nom" required>
			</div>

			<!-- Adresse -->
			<div>
				<label for="adresse">Adresse :</label>
				<input type="text" id="adresse" name="adresse" required>
			</div>

			<!-- Email -->
			<div>
				<label for="email">Email :</label>
				<input type="email" id="email" name="email" required>
			</div>

			<!-- Mot de passe -->
			<div>
				<label for="password">Mot de passe :</label>
				<input type="password" id="password" name="password" required>
			</div>

			<!-- Validation mot de passe -->
			<div>
				<label for="password2">Confirmer le mot de passe :</label>
				<input type="password" id="password2" name="password2" required>
			</div>

			<!-- Passions -->
			<div>
				<label>Passions :</label>
				<input type="checkbox" id="informatique" name="passions[]" value="informatique">
				<label for="informatique">Informatique</label>
				<input type="checkbox" id="voyages" name="passions[]" value="voyages">
				<label for="voyages">Voyages</label>
				<input type="checkbox" id="sport" name="passions[]" value="sport">
				<label for="sport">Sport</label>
				<input type="checkbox" id="lecture" name="passions[]" value="lecture">
				<label for="lecture">Lecture</label>
			</div>

			<!-- Bouton de validation -->
			<div>
				<button type="submit">Créer le compte</button>
			</div>
		</form>
	</section>

	<!-- Footer -->
	<footer>
		<ul>
			<li><a href="index.php">Accueil</a></li>
			<li><a href="index.php">Inscription</a></li>
			<li><a href="index.php">Connexion</a></li>
			<li><a href="index.php">Rechercher</a></li>
		</ul>
	</footer>
</body>
</html>
