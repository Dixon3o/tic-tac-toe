# Tic Tac Toe

A browser-based Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS, organized using the Module pattern (IIFE) and Factory functions.

# Features

- **Custom Player Names:** Enter names for Player 1 (`X`) and Player 2 (`O`), or leave them blank to use default names.
- **Turn & Win Detection:** Tracks active turns, checks all winning combinations, and detects draw conditions.
- **Start / Restart Control:** Start a new match or reset the board anytime with custom or default player names.
- **Status Feedback:** Displays current turn, invalid move notices, winner announcements, and game-over states.

# Project Structure

├── index.html  
├── style.css    
├── script.js    
└── README.md

# Live demo

https://dixon3o.github.io/tic-tac-toe/

# What I Practiced

- Encapsulating state and exposing only needed methods using IIFEs and factory functions.
- Separating core game logic from DOM manipulation and event listeners.
- Rendering dynamic UI elements and handling array indices via `Array.prototype.forEach`.