import * as readline from 'readline';

console.log("hello world");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let qte: number,
    prix: number,
    etat: string;

rl.question('Entrez la quantité : ', (answer) => {
    qte = parseInt(answer);
    console.log(`Quantité : ${qte}`);

    rl.question('Entrez le prix : ', (answer) => {
        prix = parseFloat(answer);
        console.log(`Prix : ${prix}`);

        rl.question('Entrez l\'état : ', (answer) => {
            etat = answer.toUpperCase();
            console.log(`État : ${etat}`);

            rl.close();

            afficheData(qte, prix, etat);
        });
    });
});

const remises = [
    { seuil: 1000, taux: 0.03 },
    { seuil: 5000, taux: 0.05 },
    { seuil: 7000, taux: 0.07 },
    { seuil: 10000, taux: 0.10 },
    { seuil: 50000, taux: 0.15 }
];

const taxesParEtat: { [key: string]: number } = {
    UT: 0.0685,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
    CA: 0.0825
};

function calculerRemise(prixTotal: number): number {
    let taux = 0;
    for (const remise of remises) {
        if (prixTotal >= remise.seuil && remise.taux > taux) {
            taux = remise.taux;
        }
    }

    return prixTotal * taux;
}

function calculerTaxe(prixTotal: number, etat: string): number {
    const tauxTaxe = taxesParEtat[etat] || 0;
    return prixTotal * tauxTaxe;
}

function afficheData(qte: number, prix: number, etat: string) {
    console.log("\nDonnées collectées :");
    console.log(`Quantité : ${qte}`);
    console.log(`Prix : ${prix}`);
    console.log(`État : ${etat}`);

    const prixTotalInitial = qte * prix;
    console.log(`\nPrix total initial : ${prixTotalInitial.toFixed(2)} €`);

    const remise = calculerRemise(prixTotalInitial);
    console.log(`Remise appliquée : ${remise.toFixed(2)} €`);

    const prixApresRemise = prixTotalInitial - remise;
    console.log(`Prix après remise : ${prixApresRemise.toFixed(2)} €`);

    const taxe = calculerTaxe(prixApresRemise, etat);
    console.log(`Taxe (${etat}) : ${taxe.toFixed(2)} €`);

    const prixFinal = prixApresRemise + taxe;
    console.log(`\nPrix final (TTC) : ${prixFinal.toFixed(2)} €`);
}