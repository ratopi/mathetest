/*
License: http://creativecommons.org/licenses/by-nc-sa/3.0/
*/

// --- package creation ...

var de = de = de || {};
de.ratopi = de.ratopi || {};

// --- package interface definition

de.ratopi.mathetest = function()
{
	return {
		"init": init,
	}

	// ---

	var challenger;

	var challenge;

	var finished;

	var startTime;
	var correctAnswers;
	var answerCount;

	var runningTime;

	// ---

	function init( _challenger )
	{
		challenger = _challenger;

		correctAnswers = 0;
		answerCount = 0;
		runningTime = 5 * 60 * 1000; // 5 minutes

		$( "#resultDiv" ).hide();

		$( '#result' ).keypress( keypressed );

		$( '#message' ).click( nextChallengeIfFinished );

		nextChallenge();

		showTime();
	}

	function nextChallenge()
	{
		finished = false;
		$( "#message" ).hide();

		challenge = challenger();

		$( "#task" ).text( challenge.task );

		$( '#result' ).val( '' ).focus();
	}

	function nextChallengeIfFinished()
	{
		if ( finished )
		{
			nextChallenge();
		}
	}

	function keypressed( event )
	{
		if ( ! startTime )
		{
			startTime = new Date().getTime();
			showTime();
		}

		var charCode = event.charCode;
		var keyCode = event.keyCode;
		var asciiCode = event.which;

		console.log( keyCode  + " " + finished );

		if ( keyCode === 13 ) // return / enter
		{
			if ( finished )
			{
				nextChallenge();
			}
			else
			{
				checkResult();
			}
		}
		else if ( finished )
		{
			return false;
		}
		else if ( keyCode === 0  &&  ( charCode < 48  ||  charCode > 57 ) && ( charCode !== 82  &&  charCode !== 114 ) ) // '0' .. '9' , 'R' or 'r'
		{
			return false;
		}
	}

	function checkResult()
	{
		var currentInput = $( '#result' ).val();

		if ( currentInput.length === 0 ) return;

		answerCount++;

		var expected = challenge.result;

		var correct = expected == currentInput;

		if ( typeof expected === 'object' )
		{
			console.log( "ARRAY" );

			for ( var key in challenge.result )
			{
				console.log( "testing " + expected[ key ] + " ?= " + currentInput );
                if ( expected[ key ] == currentInput )
                {
                    correct = true;
                    break;
                }
			}

			expected = expected[ 0 ];
		}
		
		if ( correct )
		{
			$( '#message' ).show().text( "RICHTIG" ).addClass( 'correct' ).removeClass( 'wrong' );
			finished = true;
			correctAnswers++;
		}
		else
		{
			$( '#message' ).show().html( "* FALSCH! *<br>Richtig ist: " + expected ).removeClass( 'correct' ).addClass( 'wrong' );
			finished = true;
		}
	}

	function showTime()
	{
		if ( ! startTime )
		{
			$( "#duration" ).text( "0:00" );
		}
		else
		{
			var now = new Date().getTime();
			var duration = now - startTime;

			var seconds = Math.floor( duration / 1000 );
			var minutes = Math.floor( seconds / 60 );
			seconds = seconds - minutes * 60;
			if ( seconds < 10 ) seconds = "0" + seconds;

			$( "#duration" ).text( minutes + ":" + seconds );

			if ( duration >= runningTime )
			{
				gameOver();
			}
			else
			{
				window.setTimeout( showTime, 1000 );
			}
		}
	}

	function gameOver()
	{
		var wrongAnswers = answerCount - correctAnswers;
		$( "#correctAnswers" ).text( correctAnswers );
		$( "#wrongAnswers" ).text( wrongAnswers );
		$( "#answerCount" ).text( answerCount );
		$( "#quota" ).text( ( Math.round( ( correctAnswers / answerCount ) * 1000 ) / 10 ) + "%" );
		$( "#durationPer" ).text( ( Math.round( runningTime / answerCount / 100 ) / 10 ) + "s" );

		$( "#challenge" ).hide();
		$( "#resultDiv" ).show();
	}

}();