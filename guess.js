const readline = require("readline");
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function menu(){
    console.log("\n=== MENU ===");
    console.log("1. Jouer");
    console.log("2. Quitter");

    rl.question("Ton choix : ", (choix) => {
        if (choix == "1"){
            console.log("Tu as choisi de jouer !");
            demanderNombreJoueurs();
        } else if (choix == "2"){
            console.log("Au revoir !");
            rl.close();
        } else {
            console.log("Choix invalide");
            menu();
        }
    });
}

function demanderNombreJoueurs(){
    console.log("Combien de joueurs vont jouer ?");
    rl.question("A toi --> ", (choixJ) => {
        choixJoueurs(choixJ);
    });
}

function choixJoueurs(nbJoueurs){
    if (nbJoueurs == 1){
        rl.question("Comment tu t'appelles ? ", (input) => {
            choixNiveau([input]);
        });
    }else if (nbJoueurs == 2){
        rl.question("Nom du joueur 1 ? ", (j1) => {
        rl.question("Nom du joueur 2 ? ", (j2) => {
            choixNiveau([j1, j2]);
        });
        });
    }else{
        console.log("Nombre de joueurs est invalide");
        rl.question("Retour au menu principal ? (O/n)", (nouvChoix) =>{
            if(nouvChoix === 'O' || nouvChoix === 'o'){
                menu();
            }else if (nouvChoix === "n" || nouvChoix === "N"){
                demanderNombreJoueurs();
            }else{
                console.log("Choix invalide, réessayer");
                demanderNombreJoueurs();
            }
        }); 
    }
}

function AffichageChoixNiveau(noms){
    console.log("Choisis un niveau :");
    console.log("1. Facile");
    console.log("2. Moyen");
    console.log("3. Difficile");
    console.log("4. Impossible");
}

function choixNiveau(noms){
    let max;
    AffichageChoixNiveau();
    rl.question("--> ", (choix) => {
        const niveau = Number(choix);
        if(niveau > 4 || niveau < 1){
            console.log("Choix invalide, réessayer ");
            return choixNiveau(noms);
        }
        if(niveau === 1) max = 5000;
        if(niveau === 2) max = 10000;
        if(niveau === 3) max = 20000;
        if(niveau === 4) max = 99999;
        const nombreSecret = Math.floor(Math.random() * max) + 1;
        jeu(nombreSecret, noms, 0);
    });
}

function jeu(secretNumber, noms, essais){
    const joueurActuel = noms[essais % noms.length];
    console.log("Au tour de " + joueurActuel);
    rl.question("Devine le nombre ->", (input) => {
    const guess = Number(input);

    if(isNaN(guess) || guess < 1){
        console.log("Le nombre doit être positif et non nul\n");
        return jeu(secretNumber, noms, essais);
    }else if(guess < secretNumber){
        console.log("C'est plus!\n");
        essais++;
        return jeu(secretNumber, noms, essais);
    }else if(guess > secretNumber){
        console.log("C'est moins!\n");
        essais++;
        return jeu(secretNumber, noms, essais);
    }
    console.log("The WINNER is " + joueurActuel);
    console.log("Trouvé en " +essais + " essais");
    console.log("Retour au menu principal");
    menu();
    
});
}
menu();
