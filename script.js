
var scores, roundScore, activePlayer, gamePlaying;

init();

function init(){

    gamePlaying = true;

    /**Players scores */
    scores = [0,0];

    /**Round score */
    roundScore = 0;

    /**Current player  player 1 -> 0 / player 2 -> 1*/
    activePlayer = 0;

    //Use query selector to change css element
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');


}

//read the value with the element with this ID and store it in variable x
//var x = document.querySelector('#score--0').textContent;


//Roll button
document.querySelector('#btn--roll').addEventListener('click',function() {

    if (gamePlaying){

            //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        

        //2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';

        //Change dice image according to number
        diceDOM.src = 'dice-' + dice + '.png';
        

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 ){
            //Add score
            roundScore += dice;
            document.getElementById('current--' + activePlayer).textContent = roundScore;
        } else {
        nextPlayer();
        }

    }

}) ;


//
document.getElementById('btn--hold').addEventListener('click',function(){
    if (gamePlaying){

        //Add the current score to  global player score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game(change to 100!!)
        if (scores[activePlayer] >= 20){
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--winner');

            gamePlaying = false;
            
        } else {

            //nextPlayer
            nextPlayer();
        }
    }

})


/**Function that changes current player */
function nextPlayer() {

     //Next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //IF activePlayer === 0, THEN activePlayer=1 ELSE active 0
     roundScore = 0;

     document.getElementById('current--0').textContent = '0';
     document.getElementById('current--1').textContent = '0';

     document.querySelector('.player--0').classList.toggle('player--active');
     document.querySelector('.player--1').classList.toggle('player--active');

     //document.querySelector('.player--0').classList.remove('player--active');
     //document.querySelector('.player--1').classList.add('player--active');
     document.querySelector('.dice').style.display = 'none';
}



//Iniciate a new game when button "New Game" is clicked
document.getElementById('btn--new').addEventListener('click',init);




/**Add dice value to current player score box. The current player selector changes acording to active player number*/
//document.querySelector('#current--' + activePlayer).textContent = dice;
//document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';