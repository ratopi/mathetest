var challengers =
	function ()
	{
		// returns a number between 1 and max
		function createNumber_1_max( max )
		{
			return Math.ceil( Math.random() * max );
		}

		// returns a number between 1 and 10
		function createNumber_1_10()
		{
			return createNumber_1_max( 10 );
		}

		// ---

		// storage for storing information about the last task ...
		var lastTask = {};

		// --

		return {

			"?10er": {
				"name": "10er Freunde",
				"fn": function ()
				{
					var c = 10;

					var a = createNumber_1_10();

					var expected = c - a;

					return {
						"task": a + " + ? = " + c + " : ",
						"result": expected
					};
				}
			},

			/*
			"?10erS": {
				"name": "10er Freunde (Subtraktion)",
				"fn": function ()
				{
					var c = 10;

					var a = createNumber_1_10();

					var expected = c - a;

					return {
						"task": c + " - " + a + " = ",
						"result": expected
					};
				}
			},
			*/

			"?a": {
				"name": "Addition",
				"fn": function ()
				{
					var a = createNumber_1_10() - 1;
					var b = createNumber_1_10() - 1;

					var expected = a + b;

					return {
						"task": a + " + " + b + " = ",
						"result": expected
					};
				}
			},

			"?a10": {
				"name": "Addition (10er)",
				"fn": function ()
				{
					var a, b, expected;

					do {
						a = createNumber_1_10() - 1;
						b = createNumber_1_10() - 1;

						expected = a + b;
					} while ( expected > 10 );

					return {
						"task": a + " + " + b + " = ",
						"result": expected
					};
				}
			},

			"?s": {
				"name": "Subtraktion",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();

					var c = a + b;

					var expected = c - a;

					return {
						"task": c + " - " + a + " = ",
						"result": expected
					};
				}
			},

			"?s10": {
				"name": "Subtraktion (10er)",
				"fn": function ()
				{
					var a, b, c, expected;

					do {
						a = createNumber_1_10();
						b = createNumber_1_10();
					} while ( b > a );

					expected = a - b;

					return {
						"task": a + " - " + b + " = ",
						"result": expected
					};
				}
			},

			"?m510": {
				"name": "Multiplikation mit 5 und 10",
				"fn": function ()
				{
					var a, b;

					if ( Math.random() < .5 )
					{
						a = createNumber_1_max(2) * 5;
						b = createNumber_1_10();
					}
					else
					{
						a = createNumber_1_10();
						b = createNumber_1_max(2) * 5;
					}

					var c = a * b;
					return {
						"task": a + " · " + b + " = ",
						"result": c
					};
				}
			},

			"?m": {
				"name": "Multiplikation",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();
					var c = a * b;
					return {
						"task": a + " · " + b + " = ",
						"result": c
					};
				}
			},

			"?m100": {
				"name": "Multiplikation (mit Zehnern)",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();

					Math.random() < .5 ? a *= 10 : b *= 10;

					var c = a * b;
					return {
						"task": a + " · " + b + " = ",
						"result": c
					};
				}
			},

			"?d": {
				"name": "Division",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();
					var c = a * b;
					return {
						"task": c + " : " + b + " = ",
						"result": a
					};
				}
			},

			"?d100": {
				"name": "Division (mit Zehnern)",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();

					Math.random() < .5 ? a *= 10 : b *= 10;

					var c = a * b;
					return {
						"task": c + " : " + b + " = ",
						"result": a
					};
				}
			},

			"?dr": {
				"name": "Division mit Rest",
				"fn": function ()
				{
					var a = createNumber_1_10();
					var b = createNumber_1_10();

					if ( Math.random() < .5 ) a *= 10;

					var c = Math.floor( a / b );
					var rest = a % b;

					var expected = [];
					if ( rest === 0 ) expected.push( "" + c );
					expected.push( c + "R" + rest );
					if ( c === 0 ) expected.push( "R" + rest );

					return {
						"task": a + " : " + b + " = ",
						"result": expected
					};
				}
			},


			"?ag": {
				"name": "Addition großer Zahlen",
				"fn": function ()
				{
					var a = createNumber_1_max( 500 ) - 1;
					var b = createNumber_1_max( 500 ) - 1;

					var expected = a + b;

					return {
						"task": a + " + " + b + " = ",
						"result": expected
					};
				}
			},

			"?sg": {
				"name": "Subtraktion großer Zahlen",
				"fn": function ()
				{
					var a = createNumber_1_max( 500 );
					var b = createNumber_1_max( 500 );

					var c = a + b;

					var expected = c - a;

					return {
						"task": c + " - " + a + " = ",
						"result": expected
					};
				}
			},

			"?dvs": {
				"name": "Winkelsummen in Drei- und Vierecken",
				"fn": function ()
				{
					function dreieck()
					{
						var a = createNumber_1_max( 180 - 2 );
						var b = createNumber_1_max( 180 - 1 - a );
						var c = 180 - a - b;

						return {
							"task": 180 + " - " + a + " - " + b + " = ",
							"result": c
						};
					}

					function viereck()
					{
						var a = createNumber_1_max( 360 - 3 );
						var b = createNumber_1_max( 360 - 2 - a );
						var c = createNumber_1_max( 360 - 1 - a - b );
						var d = 360 - a - b - c;

						return {
							"task": 360 + " - " + a + " - " + b + " - " + c + " = ",
							"result": d
						};
					}

					return Math.random() < .5 ? dreieck() : viereck();
				}
			},

		};
	}();
