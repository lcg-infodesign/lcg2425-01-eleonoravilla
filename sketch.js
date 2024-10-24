// l'opera che ho scelto è : Untilited 1974 , Vera Molnar
// https://www.mutualart.com/Artwork/Untitled/E1AA40C508595035
function setup() {
  createCanvas(windowWidth, windowHeight); // canvas delle dimensioni della finestra--> può adattarsi
  noLoop(); // draw() eseguito solo una volta
}


function draw() {
  // dichiaro variabili colori
  let backgroundColor = color(50, 50, 50); // sfondo grigio scuro
  let strokeColor = color(98, 108, 116); // quadrati grigio chiaro
 
  
  //  dimensioni e spazi
  let gridSize = 5; // Numero di quadrati in ogni lato della griglia
  let canvasSize = min(width, height); // dimensione canvas è la più piccola tra altezza e larghezza, così rimane sempre quadrata
  let totalMargin = canvasSize * 0.07; //margine totale, 7% della dimensione del canvas
  let availableSpace = canvasSize - (2 * totalMargin); // lo spazio disponibile per la griglia è il canvas - i magini
  let squareSize = availableSpace / gridSize; // dimensione di ciascun quadrato= spazio disponibile / numero di quadrati per lato
  let spacing = squareSize * 0.09;// spaizio tra i quadrati, 9 % della dimensione del quadrato
  let margin = totalMargin + (availableSpace - (gridSize * (squareSize + spacing) - spacing)) / 2; // margine tra il quadrato e il canvas,  in modo che i quadrati siano centrati correttamente all'interno del canvas, considerando anche lo spazio tra i quadrati.divido per de per ottenere il margine in ciascun lato

  // sfondo grigio scuro quadrato
  fill(backgroundColor);
  noStroke();
  let backgroundSize = canvasSize; // quadrato di sfondo = canvas
  let backgroundX = (width - backgroundSize) / 2; //centrato orizzontalmente
  let backgroundY = (height - backgroundSize) / 2;// centrato verticalmente
  rect(backgroundX, backgroundY, backgroundSize, backgroundSize); 

  let selectedSquares = selectRandom(3, gridSize * gridSize); // seleziono tre quadrati casuali dalla griglia di 5x5 utilizzando  selectRandom()
  let disappearingSquare = floor(random(gridSize * gridSize));// seleziono un quadrato casuale, che non verrà disegnato


  // CICLO PER DISEGNARE I QUADRATI
  for (let i = 0; i < gridSize * gridSize; i++) // per tutti i quadrati della griglia da 0 a 24
   {
    let x = backgroundX + margin + (i % gridSize) * (squareSize + spacing); // Calcolo la posizione orizzontale del quadrato , tenendo conto della sua posizione nella griglia e del margine
    let y = backgroundY + margin + floor(i / gridSize) * (squareSize + spacing); // Calcolo la posizione verticale del quadrato in base , alla riga in cui si trova
    
    drawConcentricSquares(x, y, squareSize, strokeColor, backgroundColor, 
                          selectedSquares.includes(i), i === disappearingSquare); //Disegna un quadrato concentrico nella posizione (x, y) con le dimensioni calcolate e applica scomparsa e riempimento
  }
}

function selectRandom(count, max) {
  let result = []; // array vuto per indici casuali
  while (result.length < count) { //genero numeri casuali finchè l'array non ha il numero di elementi desiderato
    let r = floor(random(max));
    if (!result.includes(r)) result.push(r); //verifico che il numero non sia già presente e lo aggiungo
  }
  return result;
}

function drawConcentricSquares(x, y, size, strokeColor, backgroundColor, isSelected, isDisappearing) {
  stroke(strokeColor); // bordo per quadrati concentrici
  strokeWeight(size / 20); // spessore del bordo in fuzione della dimensione del quadrato
  
  let filledIndex = isSelected ? floor(random(1, 6)) : -1;// Se il quadrato è tra quelli selezionati, genera un indice casuale che indica quale livello sarà riempito. Se non è selezionato, non riempie nessun quadrato
  
  for (let k = 0; k < 6; k++) { // 6 livelli concentrici
    if (isDisappearing && k === 0) continue; // Se il quadrato deve scomparire, salta il disegno del livello più grande
    
    let innerSize = size - k * (size / 6);// calcolo la dimensione del quadrato concentrico in base al livello k
    fill(k === filledIndex ? strokeColor : backgroundColor); //Riempie il livello corrente con il colore del bordo se il livello corrisponde a filledIndex; altrimenti usa il colore di sfondo
    rect(x + k * (size / 12), y + k * (size / 12), innerSize, innerSize); // Disegna un quadrato concentrico, ogni volta più piccolo e leggermente spostato verso l'interno
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //Ridimensiona il canvas quando la finestra viene ridimensionata
  redraw();// Forza la riesecuzione della funzione draw() dopo il ridimensionamento
}
