// 2026_Recap_CarlosFlores.js
// 1. Counts the stats up to 99+
// 2. Runs the "What is Tobi's favorite thing to do?" quiz

// ---------- 1. Count up the stats ----------

function countUp( element )
{
   var target = parseInt( element.getAttribute( "data-target" ) );
   var current = 0;

   var timer = setInterval( function()
   {
      current = current + 1;
      element.textContent = current;

      if ( current >= target )
      {
         element.textContent = target + "+";   // show 99+ at the end
         clearInterval( timer );
      }
   }, 20 );
} // end function countUp

var numbers = document.querySelectorAll( ".number" );
for ( var i = 0; i < numbers.length; i++ )
   countUp( numbers[ i ] );

// ---------- 2. Tobi quiz ----------

var answers  = document.querySelectorAll( ".answer" );
var feedback = document.getElementById( "feedback" );
var reset    = document.getElementById( "reset" );

for ( var a = 0; a < answers.length; a++ )
{
   answers[ a ].addEventListener( "click", function()
   {
      // color every button: green for the right one, red for the one picked if wrong
      for ( var b = 0; b < answers.length; b++ )
      {
         if ( answers[ b ].getAttribute( "data-correct" ) == "yes" )
            answers[ b ].classList.add( "right" );
         answers[ b ].disabled = true;           // one guess only
      }

      if ( this.getAttribute( "data-correct" ) == "yes" )
         feedback.textContent = "Correct! Walks, treats, naps... Tobi loves it all.";
      else
      {
         this.classList.add( "wrong" );
         feedback.textContent = "Close! He loves that, but the answer is D. All of the above.";
      }

      reset.style.display = "inline-block";      // show the Try again button
   } );
} // end for

// Try again: clear the colors and turn the buttons back on
reset.addEventListener( "click", function()
{
   for ( var c = 0; c < answers.length; c++ )
   {
      answers[ c ].classList.remove( "right", "wrong" );
      answers[ c ].disabled = false;
   }
   feedback.textContent = "";
   reset.style.display = "none";
} );