
var challengers = {

	"?m": {
		"name": "Multiplikation",
		"fn":  function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );
			var c = a * b;
			return {
				"task": a + " · " + b,
				"result": c
				};
		}
	},

	"?m100": {
		"name": "Multiplikation (mit Zehnern)",
		"fn":  function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );

			Math.random() < .5 ? a *= 10 : b *= 10;

			var c = a * b;
			return {
				"task": a + " · " + b,
				"result": c
				};
		}
	},

	"?d": {
		"name": "Division",
		"fn": function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );
			var c = a * b;
			return {
				"task": c + " : " + b,
				"result": a
			};
		}
	},

	"?d100": {
		"name": "Division (mit Zehnern)",
		"fn": function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );

			Math.random() < .5 ? a *= 10 : b *= 10;

			var c = a * b;
			return {
				"task": c + " : " + b,
				"result": a
			};
		}
	},

	"?dr": {
		"name": "Division mit Rest",
		"fn": function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );

			if ( Math.random() < .5 ) a *= 10;

			var c = Math.floor( a / b );
			var rest = a % b;

			var expected = [];
			if ( rest === 0 ) expected.push( "" + c );
			expected.push( c + "R" + rest );
			if ( c === 0 ) expected.push( "R" + rest );

			return {
				"task": a + " : " + b,
				"result": expected
			};
		}
	},

	"?a": {
		"name": "Addition",
		"fn": function()
		{
			var a = Math.floor( Math.random() * 10 );
			var b = Math.floor( Math.random() * 10 );

			var expected = a + b;

			return {
				"task": a + " + " + b,
				"result": expected
			};
		}
	},

	"?s": {
		"name": "Subtraktion",
		"fn": function()
		{
			var a = Math.ceil( Math.random() * 10 );
			var b = Math.ceil( Math.random() * 10 );

			var c = a + b;
			
			var expected = c - a;
			
			return {
				"task": c + " - " +a,
				"result": expected
			};
		}
	},

};
