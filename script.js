function switchmode(mode){
    const tabuleiros = document.querySelectorAll(".tabuleiro");
    
    tabuleiros.forEach(tabuleiro => {
        tabuleiro.classList.remove("facil", "medio", "dificil");
        tabuleiro.classList.add(mode);
    })
    
    gerarCartasPorModo(mode);
}

    function gerarCartasPorModo(mode){
        const tabuleiro =document.querySelector(".tabuleiro");
        tabuleiro.innerHTML = "";
    
    let totalCartas;

    if(mode === "facil") totalCartas = 12;
    else if (mode ==="medio") totalCartas = 24;
    else if (mode ==="dificil") totalCartas =40;

    let totalPares = totalCartas/2;

    const ids = [];
    for (let i = 0; i < totalPares; i++){
        ids.push(i);
        ids.push(i);
    }
     
    ids.sort(() => Math.random() -0.5);

    for (let i = 0; i< totalCartas; i++) {
        const id = ids[i];

        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = id;
        card.setAttribute("onclick", "virarCarta(this)");

        const inner = document.createElement("div");
        inner.classList.add("inner-card");

        const front = document.createElement("div");
        front.classList.add("front");
        const imgFront = document.createElement("img");
        imgFront.src = "img/cartas.jpg";
        imgFront.classList.add("carta");
        front.appendChild(imgFront);

        const back = document.createElement("div");
        back.classList.add("back");
        const imgBack = document.createElement("img");
        imgBack.src = `img/${id}.png`;
        imgBack.classList.add("carta");
        back.appendChild(imgBack);

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        tabuleiro.appendChild(card);
    }

    cartasViradas = [];
    bloquearClique = false;
}
function virarCarta(carta){
    if (bloquearClique || carta.classList.contains("virada")) return;

    carta.classList.add("virada");
    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {
        bloquearClique = true;

        const [carta1, carta2] = cartasViradas;
        const id1 = carta1.dataset.id;
        const id2 = carta2.dataset.id;

        if(id1 === id2) {
            cartasViradas = [];
            bloquearClique = false;
        } else{
            setTimeout(() => {
                carta1.classList.remove("virada");
                carta2.classList.remove("virada");
                cartasViradas = [];
                bloquearClique = false;
            }, 1000);
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    switchmode('facil');
})