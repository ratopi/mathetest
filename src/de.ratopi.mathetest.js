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
	var currentInput;
	var currentInputMaxLength;

	var startTime;
	var correctAnswers;
	var answerCount;

	var runningTime;

	// ---

	function init( _challenger )
	{
		challenger = _challenger;

		currentInputMaxLength = 10;

		correctAnswers = 0;
		answerCount = 0;
		runningTime = 5 * 60 * 1000; // 5 minutes

		$( "#resultDiv" ).hide();

		nextChallenge();

		$( document ).keypress( keypressHandler );

		showTime();
	}

	function nextChallenge()
	{
		currentInput = "";
		finished = false;
		$( "#message" ).hide();

		challenge = challenger();

		$( "#task" ).text( challenge.task );

		showCurrentInput();
	}

	function keypressHandler( event )
	{
		if ( ! startTime )
		{
			startTime = new Date().getTime();
			showTime();
		}

		var charCode = event.charCode;
		var keyCode = event.keyCode;
		var asciiCode = event.which;

		if ( finished )
		{
			if ( keyCode === 13 )
			{
				nextChallenge();
			}
		}
		else
		{
			if ( currentInput.length < currentInputMaxLength )
			{
				if ( charCode >= 48  &&  charCode <= 57 ) // "0" .. "9"
				{
					var n = charCode - 48;
					currentInput = currentInput + n;
				}
				if ( charCode === 82  ||  charCode === 114 ) // "R" or "r"
				{
					if ( currentInput.indexOf( 'R' ) === -1 ) currentInput += "R";
				}
			}

			if ( keyCode === 8  ||  keyCode === 46 ) // "back space" or "del"
			{
				if  ( currentInput.length > 0 ) currentInput = currentInput.substring( 0, currentInput.length - 1 );
			}
			else if ( keyCode === 13 ) // Enter or Return
			{
				checkResult();
			}
		}

		showCurrentInput();
	}

	function checkResult()
	{
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
			$( '#message' ).show().text( "RICHTIG" ).css( "background-color", "green" );
			finished = true;
			correctAnswers++;
		}
		else
		{
			$( '#message' ).show().html( "* FALSCH! *<br>Richtig ist: " + expected ).css( "background-color", "red" );
			finished = true;
		}
	}

	function showCurrentInput()
	{
		$( "#numberC" ).text( currentInput + "_" );
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