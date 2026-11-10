var code;         // the access code built from the digits entered
var digitCounter; // which digit we are on (1 to 4)
var digit;        // digit typed by user (as a string)

// Initialization Phase
code = "";        // start with an empty code
digitCounter = 1; // prepare to loop

// Processing Phase
while ( digitCounter <= 4 ) // loop 4 times, one digit each time
{
   // prompt for input and read one digit from the user
   digit = window.prompt( "Create your 4 digit access code. Enter digit " +
      digitCounter + " (or -1 to quit):", "0" );

   // exit if user clicks Cancel or inputs -1
   if ( digit === null || digit == -1 )
      break;

   // only accept a single digit 0-9
   if ( digit.length != 1 || isNaN( parseInt( digit ) ) )
   {
      window.alert( "Please enter one digit from 0 to 9." );
      continue; // ask for the same digit again
   }

   // add the digit to the end of the code
   code = code + digit;

   // move on to the next digit
   digitCounter = digitCounter + 1;
} // end while

// Termination Phase
// display the digits exactly as they were entered
if ( code.length == 4 )
   document.writeln( "<h1>Your access code is " + code + "</h1>" );
else
   document.writeln( "<h1>Access code not finished.</h1>" );
