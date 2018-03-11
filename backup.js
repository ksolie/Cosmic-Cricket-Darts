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

      if (this.targetValuePress) {} 
      
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
    
    
    doScoring() {                   
        this.players[this.currentPlayer][this.dartValue] = (this.players[this.currentPlayer][this.dartValue] + (this.targetValue * this.dartValue));
        let remainder = ((this.players[this.currentPlayer][this.dartValue]) - (this.dartValue * 3));

        function updateView(dartValue, playerNum, playerDartScore) {
            
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
                $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').addClass('number-circle');
        
            } else if (playerDartScore  === (dartValue * 2)) {
        
                $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('X');
        
            } else if (playerDartScore  === dartValue) {
        
                $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('/');
        
            } else {
        
                return;
        
            }
            
        }
        
        updateView(this.dartValue, this.currentPlayer, this.players[this.currentPlayer][this.dartValue])

        console.log(remainder)

        if (remainder > 0) {
            this.players[this.currentPlayer][this.dartValue] = (this.dartValue * 3); // Reset the current player's dart value to maxium

      
            for (let i = 0; i < this.numberOfPlayers; i++) { 
                if (i === this.currentPlayer) {
                } else if (this.players[i][this.dartValue] < (this.dartValue * 3)) { // if the opponents aren't closed, point them with remainder 
                    
                    this.players[i]['score'] = ((this.players[i]['score']) + (remainder));
                    
                    $("#player-" + (i + 1)).text(this.players[i]['score'])

                }
            } 
        };  

        console.log(this.players)
        this.onDartScore();

    },

    onDartScore() {
        this.throwsRemaining--;
        
        if (this.throwsRemaining < 0) {
            this.nextPlayer();
        }
    },
    
    nextPlayer() {
        if (this.currentPlayer === (this.numberOfPlayers - 1)) {
            this.currentPlayer = 0;
        }
        else {
            this.currentPlayer++;
        }

        this.throwsRemaining = 2;

        for (let i = 1; i < 5; i++) {
            $('#player-box-' + i).removeClass('player-active');
        } 
        console.log('current player' + this.currentPlayer)
        $('#player-box-' + (this.currentPlayer + 1)).addClass('player-active')
    },

    onDartMiss() {
        this.onDartScore();
    },

    pickNumberOfPlayers() {
       
        if (this.numberOfPlayers === 4) {
            this.numberOfPlayers = 1;
        } else {
            this.numberOfPlayers++
        }
        
    },

    updateView() {
        
    },

    disableButtons() {
        this.pickNumberOfPlayers = function() {
            console.log("does notnhing");
        }

        this.pickNumberOfPlayers();
    },

    goBack() {

    },
  
    cacheDOM() {
        this.twenty = document.getElementById("twenty");
        this.nineteen = document.getElementById("nineteen");
        this.eighteen = document.getElementById("eighteen");
        this.seventeen = document.getElementById("seventeen");
        this.sixteen = document.getElementById("sixteen");
        this.fifteen = document.getElementById("fifteen");
        this.bull = document.getElementById("bull");

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

        this.single.onclick = this.onSingle.bind(this);
        this.double.onclick = this.onDouble.bind(this);
        this.triple.onclick = this.onTriple.bind(this);

        this.miss.onclick = this.onDartMiss.bind(this);
        this.playerSelection.onclick = this.pickNumberOfPlayers.bind(this);
    },
  
    init() {
      this.cacheDOM();
      this.bindEvents();
    }
  
  }
  
  app.init();
  