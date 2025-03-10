let circleY;
let sunsetColors;
let textLines = [];
let textHeight = 50;
let highlightedLines = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  circleY = height / 2; // Start the circle in the middle

  // Set the font (IBM Plex Serif Italic)
  textFont('Darker Grotesque'); // Apply Darker Grotesque font

  // Sunset colors for the text
  sunsetColors = [
    color(255, 150, 120),  // Muted light red
    color(255, 170, 100),  // Muted orange
  color(255, 200, 100),  // Muted yellow
  color(240, 210, 100),  // Muted light yellow
  color(220, 160, 140),  // Muted soft pink
  color(170, 100, 130),  // Muted rose
  color(130, 90, 150),   // Muted violet
  color(90, 60, 140),    // Muted deep purple
  color(70, 50, 130),    // Muted dark purple
  color(65, 55, 100),    // Muted purple-blue
  color(40, 50, 130),    // Muted indigo
  color(20, 80, 130),    // Muted blue
  color(30, 120, 170),   // Muted sky blue
  color(100, 160, 210),  // Muted light cyan
  color(130, 190, 220)   // Muted pale cyan
  ];

  // Define the poem (you can replace this with any text)
  let poem = [
    "In the quiet of the dusk,",
    "Where dreams and stars entwine,",
    "The skies are painted soft with hues,",
    "A canvas made of time.",
    "",
    "Whispers of the passing wind,",
    "Carry secrets yet untold,",
    "In the embrace of twilight's arms,",
    "The world begins to unfold.",
    "",
    "Shadows stretch across the earth,",
    "As colors fade to night,",
    "In the beauty of the fleeting day,",
    "The stars begin to light."
  ];

  // Store lines of the poem with sunset colors
  for (let i = 0; i < poem.length; i++) {
    textLines.push({
      text: poem[i],
      y: i * textHeight + 100, // Spacing between text lines
      color: sunsetColors[i % sunsetColors.length] // Use sunset colors cyclically
    });
  }
}

function draw() {
  // Disable any text shadow by resetting shadow properties
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowColor = color(0, 0);

  // Background gradient
  setGradient(0, 0, width, height, color(229, 179, 129), color(255, 94, 77), 1);

  // Move the circle with the mouse position
  circleY = constrain(mouseY, 0, height);  // Keep the circle within bounds

  // Reset highlighted lines array each frame
  highlightedLines = [];

  // Draw each text line with a background color
  for (let i = 0; i < textLines.length; i++) {
    let line = textLines[i];
    
    // Check if the circle is overlapping the text line
    if (circleY > line.y - textHeight / 2 && circleY < line.y + textHeight / 2) {
      // Add this line and all previous lines to highlightedLines
      for (let j = 0; j <= i; j++) {
        highlightedLines.push(j);
      }
    }
  }

  // Draw all highlighted lines with colored backgrounds
  for (let i = 0; i < highlightedLines.length; i++) {
    let line = textLines[highlightedLines[i]];

    // Set the background color for the highlighted lines
    fill(line.color);
    noStroke();
    rect(0, line.y - textHeight / 2, width, textHeight);
    
    // Draw the text on top
    fill(255);  // White text color
    textSize(30);  // Size of the text
    textAlign(CENTER, CENTER);
    text(line.text, width / 2, line.y);
  }

  // Draw the circle in orange
  fill(255, 136, 68); // Orange circle
  noStroke();
  ellipse(width / 2, circleY, 70, 70); // Larger circle
}

// Helper function for gradient background
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  
  if (axis === 1) { // Vertical gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
  else if (axis === 0) { // Horizontal gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}