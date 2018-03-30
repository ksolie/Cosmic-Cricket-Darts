# Cosmic-Cricket-Darts

GUI and logic for the popular darts game "Cricket." 

This web app is used in conjunction with a Raspberry Pi and physical buttons for a arcade-like experience. 

The physical buttons connected to the Pi use Java to fire keyboard events. 

For example, pressing the "Start" button connected to the Pi will fire the keyboard event "s" which in turn will fire the necessary javascript function for the app. 

The logic covers every aspect for a full game experience including: scoring, automatic player rotation after 3 hits and/or misses, throws remaining, win criteria, and the ability to play with 1 to 4 players, ability to 'undo' turns an infinite number of times. All of this is also reflected in the UI as the game progresses including consistent style changes depending on which player's turn it is.

Uses JavaScript Object Literal Pattern. 

jQuery used for UI updates due to the tediousness of searching for DOM children. 

<img src="https://media.giphy.com/media/55d5go2p1e6f7SnEXK/giphy.gif">
