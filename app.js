const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {

    const contexteAudio = new AudioContext();

    // Methode créé une source à partir de la source audio qu'on va pouvoir manipuler
    const src = contexteAudio.createMediaElementSource(audioPlayer);
    // Méthode pour la représentation de données audio
    const analyseur = contexteAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyseur);
    // Connect l'analyseur à la sortie audio du PC
    analyseur.connect(contexteAudio.destination);

    // Traite un signal numérique pour fournir une fréquence
    analyseur.fftSize = 1024;

    const frequencesAudio = analyseur.frequencyBinCount;

    // Tableau qui va contenir toutes les fréquence du son quand il est joué
    const tableauFrequences = new Uint8Array(frequencesAudio);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // Largeur de chaque petite barre
    const largeurBarre = (WIDTH / tableauFrequences.length) + 2;
    let hauteurBarre;
    let x;

    function retourneBarres(){

        requestAnimationFrame(retourneBarres);
        x = 0;

        // Retourne une valeur entre 0 et 255 par rapport à une fréquence de notre tableau
        analyseur.getByteFrequencyData(tableauFrequences);

        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,WIDTH,HEIGHT);

        // Pour chaque fréquence, on peut dessiner un petit rectangle
        for(let i = 0; i < frequencesAudio; i++){

            hauteurBarre = tableauFrequences[i];
            let r = 250;
            let g = 50;
            let b = i;

            // Couleur des rectangles
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            // Position, hauteur, largeur
            ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre)

            // Pour que les barres se créés l'une après l'autre
            x += largeurBarre + 1
        }
    }
    retourneBarres();
})