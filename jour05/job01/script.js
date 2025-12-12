document.addEventListener("DOMContentLoaded", function () {
    const btnInscription = document.getElementById("btn-inscription");
    if (btnInscription) {
        btnInscription.addEventListener("click", function () {
            window.location.href = "inscription.html";
        });
    }
    const btnConnexion = document.getElementById("btn-connexion");
    if (btnConnexion) {
        btnConnexion.addEventListener("click", function () {
            window.location.href = "connexion.html";
        });
    }
    const btnRetour = document.getElementById("btn-retour");
    if (btnRetour) {
        btnRetour.addEventListener("click", function () {
            window.location.href = "index.php";
        });
    }

    // --- Inscription form logic ---
    const form = document.getElementById("inscriptionForm");
    if (form) {
        // Variables globales pour la complétion de ville
        let villesSuggestions = [];
        let villesData = {};
        const villeInput = document.getElementById("ville");
        const autocompleteDiv = document.getElementById("ville-autocomplete");

        villeInput.addEventListener("input", async function () {
            const query = villeInput.value.trim();
            autocompleteDiv.innerHTML = "";
            villesSuggestions = [];
            villesData = {};
            const codepostalInput = document.getElementById("codepostal");
            const codepostalSelect = document.getElementById("codepostal-select");
            codepostalInput.style.display = "";
            codepostalInput.value = "";
            codepostalSelect.style.display = "none";
            codepostalSelect.innerHTML = "";
            if (query.length < 2) {
                codepostalInput.value = "";
                return;
            }
            // 1. On cherche d'abord dans l'API française
            let isFrench = false;
            try {
                const frResponse = await fetch(
                    "https://api-adresse.data.gouv.fr/search/?q=" +
                    encodeURIComponent(query) +
                    "&type=municipality&limit=5"
                );
                const frData = await frResponse.json();
                if (frData.features && frData.features.length > 0) {
                    isFrench = true;
                    frData.features.forEach((feature) => {
                        const cityName =
                            feature.properties.city || feature.properties.name;
                        const codePostal = feature.properties.postcode;
                        if (!villesData[cityName]) {
                            villesData[cityName] = {
                                codes: new Set(),
                                country: "France",
                                countryCode: "FR",
                                cityName: cityName,
                            };
                        }
                        if (codePostal) villesData[cityName].codes.add(codePostal);
                    });
                    Object.keys(villesData).forEach((cityName) => {
                        let codesArr = Array.from(villesData[cityName].codes);
                        let display = cityName + " (France)";
                        villesSuggestions.push(display);
                        villesData[display] = villesData[cityName];
                        const item = document.createElement("div");
                        item.className = "autocomplete-item";
                        item.textContent = display;
                        item.style.cursor = "pointer";
                        item.style.background = "#fff";
                        item.style.border = "1px solid #ccc";
                        item.style.padding = "6px";
                        item.addEventListener("mousedown", function () {
                            villeInput.value = display;
                            autocompleteDiv.innerHTML = "";
                            if (codesArr.length === 1) {
                                codepostalInput.value = codesArr[0];
                                codepostalInput.style.display = "";
                                codepostalInput.readOnly = true;
                                codepostalSelect.style.display = "none";
                                codepostalSelect.innerHTML = "";
                                codepostalInput.dispatchEvent(new Event("input"));
                            } else if (codesArr.length > 1) {
                                codepostalInput.value = codesArr[0];
                                codepostalInput.style.display = "none";
                                codepostalSelect.style.display = "";
                                codepostalSelect.innerHTML = codesArr
                                    .map((cp) => `<option value="${cp}">${cp}</option>`)
                                    .join("");
                                codepostalSelect.value = codesArr[0];
                                codepostalSelect.dispatchEvent(new Event("change"));
                            } else {
                                codepostalInput.value = "";
                                codepostalInput.style.display = "";
                                codepostalInput.readOnly = true;
                                codepostalSelect.style.display = "none";
                                codepostalSelect.innerHTML = "";
                            }
                            villeInput.dispatchEvent(new Event("change"));
                        });
                        autocompleteDiv.appendChild(item);
                    });
                }
            } catch (e) { }
            // 2. Si pas France, fallback sur Nominatim (étranger)
            if (!isFrench) {
                try {
                    const response = await fetch(
                        "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&accept-language=fr&q=" +
                        encodeURIComponent(query)
                    );
                    const villes = await response.json();
                    if (villes.length === 0) {
                        const item = document.createElement("div");
                        item.className = "autocomplete-item";
                        item.textContent = "Aucune ville trouvée";
                        item.style.background = "#f7f7f7";
                        autocompleteDiv.appendChild(item);
                        codepostalInput.value = "";
                    } else {
                        villes.forEach((v) => {
                            let cityName =
                                v.address &&
                                    (v.address.city ||
                                        v.address.town ||
                                        v.address.village ||
                                        v.address.hamlet)
                                    ? v.address.city ||
                                    v.address.town ||
                                    v.address.village ||
                                    v.address.hamlet
                                    : v.display_name;
                            let country =
                                v.address && v.address.country ? v.address.country : "";
                            let display = cityName + (country ? " (" + country + ")" : "");
                            villesSuggestions.push(display);
                            villesData[display] = {
                                codes: new Set(),
                                country: country,
                                countryCode:
                                    v.address && v.address.country_code
                                        ? v.address.country_code.toUpperCase()
                                        : "",
                                cityName: cityName,
                            };
                            const item = document.createElement("div");
                            item.className = "autocomplete-item";
                            item.textContent = display;
                            item.style.cursor = "pointer";
                            item.style.background = "#fff";
                            item.style.border = "1px solid #ccc";
                            item.style.padding = "6px";
                            item.addEventListener("mousedown", function () {
                                villeInput.value = display;
                                autocompleteDiv.innerHTML = "";
                                // Pour l'étranger, code postal éditable et pré-rempli "Étranger"
                                codepostalInput.value = "";
                                codepostalInput.style.display = "";
                                codepostalInput.readOnly = false;
                                codepostalInput.placeholder = "Code postal ou 'Étranger'";
                                codepostalSelect.style.display = "none";
                                codepostalSelect.innerHTML = "";
                                codepostalInput.dispatchEvent(new Event("input"));
                                villeInput.dispatchEvent(new Event("change"));
                            });
                            autocompleteDiv.appendChild(item);
                        });
                    }
                } catch (e) {
                    const item = document.createElement("div");
                    item.className = "autocomplete-item";
                    item.textContent = "Erreur lors de la recherche";
                    item.style.background = "#f7f7f7";
                    autocompleteDiv.appendChild(item);
                    codepostalInput.value = "";
                }
            }
        });

        // Fermer la liste si on clique ailleurs
        document.addEventListener("click", function (e) {
            if (e.target !== villeInput) {
                autocompleteDiv.innerHTML = "";
            }
        });

        const submitBtn = document.getElementById("submitBtn");
        const fields = [
            "nom",
            "prenom",
            "email",
            "password",
            "adresse",
            "ville",
            "codepostal",
        ];

        // Asynchronous validation simulation
        function asyncValidate(field, value) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(validators[field](value));
                }, 200); // Simule une requête asynchrone
            });
        }

        // Pour savoir si un champ a été touché (focus perdu ou modifié)
        const touchedFields = {};
        // Messages de succès personnalisés pour chaque champ
        const successMessages = {
            nom: "Nom valide",
            prenom: "Prénom valide",
            email: "Email valide",
            password: "Mot de passe valide",
            adresse: "Adresse valide",
            ville: "Ville valide",
            codepostal: "Code postal valide",
        };

        async function validateField(field) {
            const input = document.getElementById(field);
            const errorDiv = document.getElementById("error-" + field);
            const errorMsg = await asyncValidate(field, input.value);
            if (errorMsg) {
                errorDiv.textContent = errorMsg;
                errorDiv.classList.remove("success");
                if (touchedFields[field]) {
                    errorDiv.classList.add("active");
                }
            } else {
                // Affiche le message de succès personnalisé en vert si champ touché et valide
                if (touchedFields[field]) {
                    errorDiv.textContent = successMessages[field] || "Valide";
                    errorDiv.classList.remove("active");
                    errorDiv.classList.add("success");
                } else {
                    errorDiv.textContent =
                        errorDiv.dataset.help || errorDiv.textContent;
                    errorDiv.classList.remove("active");
                    errorDiv.classList.remove("success");
                }
            }
            return !errorMsg;
        }

        async function validateForm() {
            let valid = true;
            for (const field of fields) {
                const isValid = await validateField(field);
                if (!isValid) valid = false;
            }
            submitBtn.disabled = !valid;
            return valid;
        }

        // Ajoute gestion du focus et du blur pour chaque champ
        // Ajoute un data-help à chaque div.error pour conserver le message d'aide initial
        fields.forEach((field) => {
            const errorDiv = document.getElementById("error-" + field);
            errorDiv.dataset.help = errorDiv.textContent;
            let input = document.getElementById(field);
            // Pour le code postal, il peut y avoir un select
            if (field === "codepostal") {
                const codepostalSelect = document.getElementById("codepostal-select");
                codepostalSelect.addEventListener("change", () => {
                    // Met à jour la valeur de l'input caché pour la soumission
                    document.getElementById("codepostal").value =
                        codepostalSelect.value;
                    validateField("codepostal");
                    validateForm();
                });
                // Synchronise l'input caché à la valeur du select au moment de la soumission
                form.addEventListener("submit", () => {
                    if (codepostalSelect.style.display !== "none") {
                        document.getElementById("codepostal").value =
                            codepostalSelect.value;
                    }
                });
            }
            input.addEventListener("focus", () => {
                // Ne rien faire sur focus, couleur neutre par défaut
            });
            input.addEventListener("blur", () => {
                touchedFields[field] = true;
                validateField(field);
            });
            input.addEventListener("input", () => {
                validateField(field);
                validateForm();
            });
        });

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            // Marque tous les champs comme touchés pour forcer l'affichage rouge si erreur
            fields.forEach((f) => (touchedFields[f] = true));
            const isValid = await validateForm();
            if (isValid) {
                // Désactiver le bouton pendant la soumission
                submitBtn.disabled = true;
                submitBtn.textContent = "Inscription en cours...";

                // Envoyer les données au serveur
                const formData = new FormData(form);
                try {
                    const response = await fetch("traitement_inscription.php", {
                        method: "POST",
                        body: formData,
                    });
                    const result = await response.json();

                    if (result.success) {
                        alert(result.message || "Inscription réussie !");
                        form.reset();
                        fields.forEach((f) => {
                            touchedFields[f] = false;
                            const errorDiv = document.getElementById("error-" + f);
                            errorDiv.textContent = errorDiv.dataset.help || "";
                            errorDiv.classList.remove("active", "success");
                        });
                    } else {
                        alert("Erreur d'inscription :\n" + result.errors.join("\n"));
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Inscription";
                    }
                } catch (e) {
                    alert("Erreur de connexion au serveur. Veuillez réessayer.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Inscription";
                }
            } else {
                // Force la couleur rouge sur tous les champs invalides
                fields.forEach((f) => validateField(f));
            }
        });

        // Validation rules
        const validators = {
            nom: (value) => {
                const regex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
                if (!regex.test(value.trim())) {
                    return "Le nom doit contenir 2 à 50 lettres, espaces ou tirets.";
                }
                return "";
            },
            prenom: (value) => {
                const regex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
                if (!regex.test(value.trim())) {
                    return "Le prénom doit contenir 2 à 50 lettres, espaces ou tirets.";
                }
                return "";
            },
            email: (value) =>
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)
                    ? ""
                    : "L'email n'est pas valide.",
            password: (value) => {
                if (value.length < 8)
                    return "Le mot de passe doit contenir au moins 8 caractères.";
                if (!/[a-z]/.test(value))
                    return "Le mot de passe doit contenir au moins une minuscule.";
                if (!/[A-Z]/.test(value))
                    return "Le mot de passe doit contenir au moins une majuscule.";
                if (!/[0-9]/.test(value))
                    return "Le mot de passe doit contenir au moins un chiffre.";
                if (!/[@$!%*?&]/.test(value))
                    return "Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&).";
                if (/\s/.test(value))
                    return "Le mot de passe ne doit pas contenir d'espace.";
                return "";
            },
            adresse: (value) => {
                const val = value.trim();
                if (val.length < 4)
                    return "L'adresse doit contenir au moins 4 caractères.";
                return "";
            },
            ville: (value) => {
                if (!value) return "La ville est requise.";
                if (!villesSuggestions.includes(value))
                    return "Sélectionnez une ville dans la liste.";
                return "";
            },
            codepostal: (value) => {
                // Le code postal est readonly et toujours synchronisé, donc pas d'erreur possible
                return "";
            },
        };
        // Afficher/masquer le mot de passe
        const passwordInput = document.getElementById("password");
        const togglePasswordBtn = document.getElementById("togglePassword");
        const eyeIcon = document.getElementById("eyeIcon");
        let passwordVisible = false;
        togglePasswordBtn.addEventListener("click", function () {
            passwordVisible = !passwordVisible;
            passwordInput.type = passwordVisible ? "text" : "password";
            // Change SVG selon l'état
            if (passwordVisible) {
                eyeIcon.innerHTML = `<svg id="svgEyeOff" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="12" cy="12" r="2.5"/><line x1="3" y1="21" x2="21" y2="3"/></svg>`;
            } else {
                eyeIcon.innerHTML = `<svg id="svgEye" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="12" cy="12" r="2.5"/></svg>`;
            }
        });
    }

    // --- Connexion form logic ---
    const connexionForm = document.getElementById("connexionForm");
    if (connexionForm) {
        const submitBtn = document.getElementById("submitBtn");
        const fields = ["email", "password"];
        const validators = {
            email: (value) =>
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)
                    ? ""
                    : "L'email n'est pas valide.",
            password: (value) => {
                if (value.length < 8)
                    return "Le mot de passe doit contenir au moins 8 caractères.";
                if (!/[a-z]/.test(value))
                    return "Le mot de passe doit contenir au moins une minuscule.";
                if (!/[A-Z]/.test(value))
                    return "Le mot de passe doit contenir au moins une majuscule.";
                if (!/[0-9]/.test(value))
                    return "Le mot de passe doit contenir au moins un chiffre.";
                if (!/[@$!%*?&]/.test(value))
                    return "Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&).";
                if (/\s/.test(value))
                    return "Le mot de passe ne doit pas contenir d'espace.";
                return "";
            },
        };

        function asyncValidate(field, value) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(validators[field](value));
                }, 200);
            });
        }

        async function validateField(field) {
            const input = document.getElementById(field);
            const errorDiv = document.getElementById("error-" + field);
            const errorMsg = await asyncValidate(field, input.value);
            errorDiv.textContent = errorMsg;
            return !errorMsg;
        }

        async function validateForm() {
            let valid = true;
            for (const field of fields) {
                const isValid = await validateField(field);
                if (!isValid) valid = false;
            }
            submitBtn.disabled = !valid;
            return valid;
        }

        fields.forEach((field) => {
            document.getElementById(field).addEventListener("input", () => {
                validateField(field);
                validateForm();
            });
        });

        connexionForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const isValid = await validateForm();
            if (isValid) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Connexion en cours...";
                const formData = new FormData(connexionForm);
                try {
                    const response = await fetch("traitement_connexion.php", {
                        method: "POST",
                        body: formData,
                    });
                    const result = await response.json();
                    if (result.success) {
                        alert(result.message || "Connexion réussie !");
                        connexionForm.reset();
                        fields.forEach(
                            (f) => (document.getElementById("error-" + f).textContent = "")
                        );
                        submitBtn.disabled = true;
                        submitBtn.textContent = "Connexion";
                        // window.location.href = "index.php";
                    } else {
                        if (result.errors && result.errors.length) {
                            document.getElementById("error-email").textContent = "";
                            document.getElementById("error-password").textContent = "";
                            for (const err of result.errors) {
                                if (err.toLowerCase().includes("email")) {
                                    document.getElementById("error-email").textContent = err;
                                } else if (err.toLowerCase().includes("mot de passe")) {
                                    document.getElementById("error-password").textContent = err;
                                }
                            }
                            if (
                                !document.getElementById("error-email").textContent &&
                                !document.getElementById("error-password").textContent
                            ) {
                                document.getElementById("error-email").textContent =
                                    result.errors.join(" ");
                            }
                        } else {
                            alert(
                                "Erreur de connexion :\n" +
                                (result.errors || "Erreur inconnue")
                            );
                        }
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Connexion";
                    }
                } catch (e) {
                    alert("Erreur de connexion au serveur. Veuillez réessayer.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Connexion";
                }
            }
        });

        // Afficher/masquer le mot de passe (bouton œil)
        const passwordInput = document.getElementById("password");
        const togglePasswordBtn = document.getElementById("togglePassword");
        const eyeIcon = document.getElementById("eyeIcon");
        let passwordVisible = false;
        togglePasswordBtn.addEventListener("click", function () {
            passwordVisible = !passwordVisible;
            passwordInput.type = passwordVisible ? "text" : "password";
            if (passwordVisible) {
                eyeIcon.innerHTML = `<svg id="svgEyeOff" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="12" cy="12" r="2.5"/><line x1="3" y1="21" x2="21" y2="3"/></svg>`;
            } else {
                eyeIcon.innerHTML = `<svg id="svgEye" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="12" cy="12" r="2.5"/></svg>`;
            }
        });
    }
});