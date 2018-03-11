const app = {
    dartValue: null,
    targetValue: null,
    numberOfPlayers: 4,
    currentPlayer: 0,
    throwsRemaining: 2,
    targetValuePressed: false,
    players: [  
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      bull: 0,
      score: 0
      
    },
      {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      bull: 0,
      score: 0
    },
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      bull: 0,
      score: 0
    },
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      bull: 0,
      score: 0
    }], 
    
    onTwenty() {

   
        this.dartValue = 20;
        this.doScoring();
      // counter goes up, once it hits 3, reset to zero and switch player 



      if (this.targetValuePress) {} //what if someone hits a score before hitting a target value? 
      
    },
    onNineteen() {
        this.dartValue = 19;
        this.doScoring();
    },
    onEighteen() {
        this.dartValue = 18;
        this.doScoring();
    },

    onSeventeen() {
        this.dartValue = 17;
        this.doScoring();
    },

    onSixteen() {
        this.dartValue = 16;
        this.doScoring();
    },

    onFifteen() {
        this.dartValue = 15;
        this.doScoring();
    },

    onBull() {
        console.log("hi")
        this.dartValue = 25;
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
    
    
    doScoring() {                   // Example: 40 + 60 = 100; Take the remainder and then reset to max value and point other players. 
        this.players[this.currentPlayer][this.dartValue] = (this.players[this.currentPlayer][this.dartValue] + (this.targetValue * this.dartValue));
        let remainder = ((this.players[this.currentPlayer][this.dartValue]) - (this.dartValue * 3)); // Remainder of points to give to other players 
        
        
        this.updateDartboardView(this.dartValue, this.currentPlayer, this.players[this.currentPlayer][this.dartValue]);

        console.log(remainder)

        if (remainder > 0) {
            this.players[this.currentPlayer][this.dartValue] = (this.dartValue * 3); // Reset the current player's dart value to maxium
            

            // Point other players 
      
            for (let i = 0; i < this.numberOfPlayers; i++) { 
                if (i === this.currentPlayer) {
                } else if (this.players[i][this.dartValue] < (this.dartValue * 3)) { // if the opponents aren't closed, point them with remainder 
                    
                    this.players[i]['score'] = ((this.players[i]['score']) + (remainder));
                    
                    $("#player-" + (i + 1)).text(this.players[i]['score']) // Update Score View 

                }
            } 
        };  

        var audio = new Audio('./sounds/knob.ogg');
        audio.play();

        console.log(this.players)
        this.onDartScore();

    },

    updateDartboardView(dartValue, playerNum, playerDartScore) {
        let player = 0;

        if (playerNum === 0) {
            player = 1;
        } else if (playerNum === 1) {
            player = 2;
        } else if (playerNum === 2) {
            player = 4;
        } else {
            player = 5;
        }

        if (playerDartScore  >= (dartValue * 3)) {

            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('X');
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').addClass('number-circle number-circle-blue');

            
    
        } else if (playerDartScore  === (dartValue * 2)) {
    
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('X');
    
        } else if (playerDartScore  === dartValue) {
    
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('/');
    
        } else {
    
            return;
    
        } 
    },

    onDartScore() {

        this.throwsRemaining--;
        
        if (this.throwsRemaining < 0) {
            this.nextPlayer();
        }
    },
    
    nextPlayer() {

        var audio = new Audio('./sounds/next-turn.ogg');
        audio.play();


        if (this.currentPlayer === (this.numberOfPlayers - 1)) {
            this.currentPlayer = 0;
        }
        else {
            this.currentPlayer++;
        }

        this.throwsRemaining = 2;
        this.updateActivePlayerCSS();

    },

    updateActivePlayerCSS() {
        
        for (let i = 1; i < 6; i++) {
            $('#player-box-' + i).removeClass('player-active'); // good
            $("table").find('th:nth-child(' + i + ')').removeClass('player-active-header');
            $("table").find('td:nth-child(' + i + ')').removeClass('player-active-board');
            $("table").find('tr:last-child td:nth-child(' + i + ')').removeClass('border-bottom');

        } 


        $('#player-box-' + (this.currentPlayer + 1)).addClass('player-active') // good 

        /*

        This extra logic at the top here is chunky... but necessary. 
        The problem here is our array of players starts at 0, and the child elements to target start with 1.
        We also need to skip the 3rd child element since that is the column of numbers. 
        In hindsight, it would have been better to create an empty object in the players array to occupy index 0. 

        */

        let player = this.currentPlayer 

        if (this.currentPlayer === 0) {
            player = 1;
        } else if (this.currentPlayer === 1) {
            player = 2;
        } else if (this.currentPlayer === 2) {
            player = 4;
        } else {
            player = 5;
        }
        
         $("table").find('th:nth-child(' + player + ')').addClass('player-active-header');
         $("table").find('td:nth-child(' + player + ')').addClass('player-active-board');
         $("table").find('tr:last-child td:nth-child(' + player + ')').addClass('border-bottom');

      $("table").find('.number-circle').removeClass('number-circle-blue');

      // current player
      $("table").find('td:nth-child' + '(' + player + ')').find('.number-circle').addClass('number-circle-blue');





    },

    onDartMiss() {
        var audio = new Audio('./sounds/miss.ogg');
        audio.play();
        this.onDartScore();
    },

    pickNumberOfPlayers() {
       
        if (this.numberOfPlayers === 4) {
            this.numberOfPlayers = 1;
        } else {
            this.numberOfPlayers++
        }
        
        console.log(this.numberOfPlayers)
    },

    goBack() {
        // create an array that you push to, probably 5 long. 
        // once it reaches 5, start removing the first item in the array after pushing on the new item
        // they will just be objects with "snapshots" of the game information 
        // if you go back, just replace the score values, current player value, throws left value
    },

    disableButtons() {
        this.pickNumberOfPlayers = function() {
            console.log("does notnhing");
        }

        this.pickNumberOfPlayers();
    },

    checkWin() {
        // 21*3 + 20 * 3, whatever this total is...
      // if playerONescore > total && playerTWoscore < playerONeScore
      // call this after each turn, can use player[turn] here too. 
    },



    goBack() {
        // restore the array of player objects to previous values 
        // have three snap shots, so you can go back up to 3 
        // go back turns and/or previous player if needed 
    },

    setupInitialViewCSS() {
        $("table").find('th:nth-child(1)').addClass('player-active-header');
        $("table").find('td:nth-child(1)').addClass('player-active-board');
        $("table").find('tr:last-child td:nth-child(1)').addClass('border-bottom');
        
    },
  
    cacheDOM() {
        this.twenty = document.getElementById("twenty");
        this.nineteen = document.getElementById("nineteen");
        this.eighteen = document.getElementById("eighteen");
        this.seventeen = document.getElementById("seventeen");
        this.sixteen = document.getElementById("sixteen");
        this.fifteen = document.getElementById("fifteen");
        this.bull = document.getElementById("bull-button");

        this.single = document.getElementById("single");
        this.double = document.getElementById("double");
        this.triple = document.getElementById("triple");

        this.miss = document.getElementById("miss");
        this.playerSelection = document.getElementById("playerSelection");
    },
  
    bindEvents() {
        this.twenty.onclick = this.onTwenty.bind(this);
        this.nineteen.onclick = this.onNineteen.bind(this);
        this.eighteen.onclick = this.onEighteen.bind(this);
        this.seventeen.onclick = this.onSeventeen.bind(this);
        this.sixteen.onclick = this.onSixteen.bind(this);
        this.fifteen.onclick = this.onFifteen.bind(this);
        this.bull.onclick = this.onBull.bind(this);

        this.single.onclick = this.onSingle.bind(this);
        this.double.onclick = this.onDouble.bind(this);
        this.triple.onclick = this.onTriple.bind(this);

        this.miss.onclick = this.onDartMiss.bind(this);
        this.playerSelection.onclick = this.pickNumberOfPlayers.bind(this);
    },
  
    init() {
        setTimeout(() => {
            var audio = new Audio('./sounds/sizzle.wav');
            audio.play(); 
        }, 250)
  
      this.cacheDOM();
      this.bindEvents();
      this.setupInitialViewCSS();
    }
  
  }
  
  app.init();
  
//   app.pickNumberOfPlayers();
//   app.disableButtons();
//   app.pickNumberOfPlayers();



// send in dart for id selector
// send in player for the child selector 

// use switch statement for dart * 3 value compared to *1 , *2, *3 



