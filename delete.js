const app = {
    dartValue: null,
    targetValue: null,
    numberOfPlayers: 2,
    currentPlayer: 0,
    targetValuePressed: false,
    players: [  
    {
      20: 0,
      19: 0,
      18: 0,
      score: 0
      
    },
      {
      20: 0,
      19: 57,
      18: 0,
      score: 0
    }], 
    
    onTwenty() {
        this.dartValue = 20;
        this.doScoring();
      // counter goes up, once it hits 3, reset to zero and switch player 

      // what if someone hits a score before hitting a target value? 
      // use a boolean to check that 
    },
    onNineteen() {
        this.dartValue = 19;
        this.doScoring();
    },
    onEighteen() {
        this.dartValue = 18;
        this.doScoring();
    },
  
    onSingle() {
        this.targetValue = 1;
    },
  
    onDouble() {
        this.targetValue = 2;
    },
  
    onTriple() {
        this.targetValue = 3;
    },
    
    
    doScoring() {                   // Example: 40 + 60 = 100; Take the remainder and then reset to max value and pointer other players. 
        this.players[this.currentPlayer][this.dartValue] = (this.players[this.currentPlayer][this.dartValue] + (this.targetValue * this.dartValue));
        let remainder = ((this.players[this.currentPlayer][this.dartValue]) - (this.dartValue * 3)); // Remainder of points to give to other players 
        
        console.log(remainder)

        if (remainder > 0) {
            this.players[this.currentPlayer][this.dartValue] = (this.dartValue * 3); // Reset the current player's dart value to maxium
            

            // Point other players 
      
            for (let i = 0; i < this.numberOfPlayers; i++) { 
                if (i === this.currentPlayer) {
                } else if (this.players[i][this.dartValue] < (this.dartValue * 3)) { // if the opponents aren't closed, point them with remainder 
                    
                    this.players[i]['score'] = ((this.players[i]['score']) + (remainder));   

                }
            } 
        };  



        console.log(this.players)

    },
    
    checkWin() {
        // 21*3 + 20 * 3, whatever this total is...
      // if playerONescore > total && playerTWoscore < playerONeScore
      // call this after each turn, can use player[turn] here too. 
    },
    
    updateView() {
        // switch statement
      // if current player player[turn][this.dartValue] < 20 && > 21 
      // < dartValue && > (dartValue + 1)
      // then change to 1 slash
      // else else 
      // $("#[dartValue]").innerText = one two or three
    },
    
    // update view for how many throws player has left 


    goBack() {
        // restore the array of player objects to previous values 
        // have three snap shots, so you can go back up to 3 
        // go back turns and/or previous player if needed 
    },
  
    cacheDOM() {
        this.twenty = document.getElementById("twenty");
        this.nineteen = document.getElementById("nineteen");
        this.eighteen = document.getElementById("eighteen");
    

        this.single = document.getElementById("single");
        this.double = document.getElementById("double");
        this.triple = document.getElementById("triple");
    },
  
    bindEvents() {
        this.twenty.onclick = this.onTwenty.bind(this);
        this.nineteen.onclick = this.onNineteen.bind(this);
        this.eighteen.onclick = this.onEighteen.bind(this);

        this.single.onclick = this.onSingle.bind(this);
        this.double.onclick = this.onDouble.bind(this);
        this.triple.onclick = this.onTriple.bind(this);
    },
  
    init() {
      this.cacheDOM();
      this.bindEvents();
    }
  
  }
  
  app.init();
  
  