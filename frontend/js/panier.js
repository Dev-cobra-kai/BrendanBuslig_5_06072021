//*********************** LE PANIER *****************************

// Récupération des données du panier
let monPanier = JSON.parse(localStorage.getItem("panier"));

console.log(monPanier);

let panierPlein = document.getElementById("panier-body");

// Affichage des produits du panier
const produitPanier = document.getElementById("votre-panier");

function panierVide() {
    if (monPanier == null || monPanier == 0) {
        return true;
    } else {
        return false;
    }
}

// Panier vide
if (monPanier == null || monPanier == 0) {
    const panierVide =
        `<tbody>
                <tr class="panier-body">
                    <td class="panier-vide">Votre panier est vide</td>
                </tr>
            </tbody>`;

    produitPanier.innerHTML = panierVide;

    // window.alert("panier vide");
    // window.location.href = "../index.html";

    // Panier plein
} else {

    for (j = 0; j < monPanier.length; j++) {

        panierPlein.innerHTML +=
            `<tbody>
                <tr class="panier-body">
                    <td class="panier-nom">${monPanier[j].nom}</td>
                    <td class="panier-couleur">${monPanier[j].couleur}</td>
                    <td class="panier-quantite"><input type="number" min="1" orderId="${monPanier[j].quantite}" class="input-quantite" value="${monPanier[j].quantite}"><input id="productId" type="hidden" value="${monPanier[j].id}"></td>
                    <td class="panier-prix-unitaire">${monPanier[j].prix}</td>               
                    <td><button class="btn-supprimer"> Supprimer </button></td>
                </tr>
            </tbody>`;

        let ajouterTeddy = [];
        for (m = 0; m < monPanier[j].quantite; m++) {
            ajouterTeddy.push(monPanier[j].id);
        }
    }
}

// Modifier la quantité dans le panier
function modifierQuantite() {

    let inputQuantity = document.querySelectorAll(".input-quantite");

    for (let n = 0; n < inputQuantity.length; n++) {
        inputQuantity[n].addEventListener("change", function (e) {
            e.preventDefault();

            const itemId = e.target.nextElementSibling.value

            monPanier.forEach((element) => {
                if (element.id === itemId) {
                    element.quantite = e.target.value
                }
            });
            localStorage.setItem("panier", JSON.stringify(monPanier))
            montantTotal()

        })
    }
}
modifierQuantite()

// Supprimer un article du panier
function supprimerArticle() {

    let btn_supprimer = document.querySelectorAll(".btn-supprimer");

    for (let k = 0; k < btn_supprimer.length; k++) {
        btn_supprimer[k].addEventListener("click", function (e) {
            e.preventDefault();

            let idSupprimerTeddy = monPanier[k].id;
            console.log(idSupprimerTeddy);

            let colorSupprimerTeddy = monPanier[k].couleur;
            console.log(colorSupprimerTeddy);

            monPanier = monPanier.filter((element) => element.id !== idSupprimerTeddy || element.couleur !== colorSupprimerTeddy);
            console.log(monPanier);

            const onlinePanier = JSON.stringify(monPanier)
            localStorage.setItem("panier", onlinePanier)

            // alert("Article supprimer du panier");
            window.location.reload()
        })
    }
}
supprimerArticle();

// Vider entièrement le panier
function viderPanier() {

    const btn_vider_panier = document.getElementById("btn-vider")
    btn_vider_panier.addEventListener("click", function (e) {
        e.preventDefault();

        localStorage.clear();
        window.location.reload();
    });
}
viderPanier()

// Fonction calculant le montant total du panier
function montantTotal() {
    // Montant Total du panier
    let totalPanier = [];

    if (panierVide() == false) {

        for (l = 0; l < monPanier.length; l++) {
            const prix = parseInt(monPanier[l].prix, 10);
            const quantity = parseInt(monPanier[l].quantite, 10);
            let prixQuantity = prix * quantity;
            let montantTotal = prixQuantity;

            totalPanier.push(montantTotal)
            console.log(totalPanier);
        }

        // Retourner la valeur précédente et la valeur courante additionnées
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        totalPanier = totalPanier.reduce(reducer, 0);
        console.log(totalPanier);

        prixTotal = document.getElementById("panier-footer");
        prixTotal.innerHTML =
            `<tfoot>
        <tr >
            <td></td>
            <td></td>
            <th>Montant Total :</th>
            <th class="montant-total">${totalPanier} €</th>
        </tr
    </tfoot>`;

        localStorage.setItem("totalPanier", JSON.stringify(totalPanier));
    }
}
montantTotal()


//*********************** LE FORMULAIRE ************************

let form = document.querySelector("#leFormulaire");

// Ecouter la modification du Nom
form.lastName.addEventListener("change", function () {
    validLastName(this);
});

// Ecouter la modification du Prénom
form.firstName.addEventListener("change", function () {
    validFirstName(this);
});

// Ecouter la modification de l'Adresse
form.address.addEventListener("change", function () {
    validAddress(this);
});

// Ecouter la modification de la Ville
form.city.addEventListener("change", function () {
    validCity(this);
});

// Ecouter la modification de l'e-mail
form.email.addEventListener("change", function () {
    validEmail(this);
});

// Ecouter la soumission du formulaire
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validLastName(form.lastName) && validFirstName(form.firstName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {
        form.submit();
    }
});

//******************* Validation NOM *********************

const validLastName = function (inputLastName) {

    // Création de la reg exp pour la validation du Nom
    let lastNameRegExp = new RegExp(
        "^[a-zA-Z]"
    );

    // Récupération de la balise SMALL
    let small = inputLastName.nextElementSibling;

    // On teste l'expression régulière
    if (lastNameRegExp.test(inputLastName.value)) {
        small.innerHTML = "Nom : Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "Nom : Non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//******************* Validation PRENOM *********************

const validFirstName = function (inputFirstName) {

    // Création de la reg exp pour la validation du Prénom
    let firstNameRegExp = new RegExp(
        "^[a-zA-Z]"
    );

    // Récupération de la balise SMALL
    let small = inputFirstName.nextElementSibling;

    // On teste l'expression régulière
    if (firstNameRegExp.test(inputFirstName.value)) {
        small.innerHTML = "Prénom : Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "Prénom : Non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};
//******************* Validation ADRESSE *********************

const validAddress = function (inputAddress) {

    // Création de la reg exp pour la validation de l'Adresse
    let addressRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]"
    );

    // Récupération de la balise SMALL
    let small = inputAddress.nextElementSibling;

    // On teste l'expression régulière
    if (addressRegExp.test(inputAddress.value)) {
        small.innerHTML = "Adresse : Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "Adresse : Non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//******************* Validation VILLE *********************

const validCity = function (inputCity) {

    // Création de la reg exp pour la validation de la Ville
    let cityRegExp = new RegExp(
        "^[a-zA-Z]"
    );

    // Récupération de la balise SMALL
    let small = inputCity.nextElementSibling;

    // On teste l'expression régulière
    if (cityRegExp.test(inputCity.value)) {
        small.innerHTML = "Ville : Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "Ville : Non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//******************* Validation EMAIL *********************

const validEmail = function (inputEmail) {

    // Création de la reg exp pour la validation email
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g"
    );

    // Récupération de la balise SMALL
    let small = inputEmail.nextElementSibling;

    // On teste l'expression régulière
    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = "E-mail : Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "E-mail : Non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

// Mettre le formulaire dans le local storage
const btn_commander = document.getElementById("btn-commander");

btn_commander.addEventListener("click", function (e) {
    e.preventDefault();

    // Validité lorsque le formulaire est vide
    if (monPanier == null) {
        alert("Votre panier est vide");

    } else if (validLastName(form.lastName) == "" || validFirstName(form.firstName) == "" || validAddress(form.address) == "" || validCity(form.city) == "" || validEmail(form.email) == "") {
        alert("Remplir le formulaire");

        // } else if (totalPanier == 0) {
        //     alert("Vous n'avez pas mis de quantité");

    } else {

        const contact = {
            lastName: document.getElementById("lastName").value,
            firstName: document.getElementById("firstName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        }
        console.log(contact);

        const onlineContact = JSON.stringify(contact)
        localStorage.setItem("contact", onlineContact);

        let products = [];

        // monPanier.forEach((element) => {
        //     products.push(element.id)
        // })

        const panierForm = {
            contact, products,
        };
        console.log(panierForm);

        // Envoyer le résultat au back-end
        const objetServeur = fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(panierForm),
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log(objetServeur);

        objetServeur.then(async function (commande) {
            try {
                const contenu = await commande.json();
                console.log(contenu);

                window.location.href = `commande.html?orderId=${contenu.orderId}`

                // document.location = `commande.html?orderId=${contenu.orderId}`;
                // localStorage.setItem("commandeId", contenu.orderId)
                // window.location = "commande.html";

            } catch (erreur) {
                console.log(erreur);
                alert("ERREUR catch")
            }
        })
    }
});

