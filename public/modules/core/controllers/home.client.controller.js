'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		//dashboard alerts
		$scope.alerts = [
			{
				icon: 'glyphicon-user',
				colour: 'btn-success',
				total: '20,408',
				description: 'TOTAL CUSTOMER'
			},
			{
				icon: 'glyphicon-calendar',
				colour: 'btn-primary',
				total: '8,382',
				description: 'UPCOMING EVENTS'
			},
			{
				icon: 'glyphicon-edit',
				colour: 'btn-success',
				total: '527',
				description: 'NEW CUSTOMERS IN 24H'
			},
			{
				icon: 'glyphicon-record',
				colour: 'btn-info',
				total: '85,000',
				description: 'EMAILS SENT'
			},
			{
				icon: 'glyphicon-eye-open',
				colour: 'btn-warning',
				total: '268',
				description: 'REFERRALS TO MODERATE'
			},
			{
				icon: 'glyphicon-flag',
				colour: 'btn-danger',
				total: '348',
				description: 'REFERRALS TO MODERATE'
			}			

		];

	var productPercentage   = dc.pieChart("#Product-Percentage"),    
	    inputCost = dc.barChart("#InputCost"),
	    outputCost = dc.barChart("#OutputCost");


        
    var data =  [
	    {
	        "company": "AAA1",
	        "product": 'P1',
	        "InputCost": 10,
	        "OutputCost": 10,
	        "Percentage": 50
	    },
	    {
	        "company": "AAA2",
	        "product": 'P1',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 60
	    },
	    {
	        "company": "AAA3",
	        "product": 'P3',
	        "InputCost": 400,
	        "OutputCost": 400,
	        "Percentage": 30
	    },
	    {
	        "company": "AAA9",
	        "product": 'P4',
	        "InputCost": 800,
	        "OutputCost": 300,
	        "Percentage": 80
	    },
	    {
	        "company": "AAA4",
	        "product": 'P5',
	        "InputCost": 500,
	        "OutputCost": 200,
	        "Percentage": 40
	    },
	    {
	        "company": "AAA5",
	        "product": 'P6',
	        "InputCost": 100,
	        "OutputCost": 100,
	        "Percentage": 20
	    },
	    {
	        "company": "AAA8",
	        "product": 'P10',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 10
	    },
	    {
	        "company": "AAA6",
	        "product": 'P20',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 40
	    },
	    {
	        "company": "AAA7",
	        "product": 'P25',
	        "InputCost": 700,
	        "OutputCost": 600,
	        "Percentage": 90
	    }
	];

 var ndx = crossfilter(data),
        productDim  = ndx.dimension(function(d) {return d.product;}),
        PerProduct = productDim.group().reduceSum(function(d) {return +d.Percentage;}),
        inputDimension = ndx.dimension(function (d) { return d.product; }),
        inputCostGroup = inputDimension.group().reduceSum(function (d) { return d.InputCost; }),
        outputDimension = ndx.dimension(function (d) { return d.product; }),
        outputCostGroup = outputDimension.group().reduceSum(function (d) { return d.OutputCost;});

    
     productPercentage
        .width(450).height(300)
        .legend(dc.legend().x(10).y(70).itemHeight(13).gap(5))
        .dimension(productDim)
        .group(PerProduct)
        .innerRadius(15)
        .renderLabel(true)
        .label(function (d) {
            var label = d.value;
            return label;
        }) 
        .renderTitle(true)
        .ordinalColors(["#F44336","#E91E63","#9C27B0","#2196F3","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"])


    inputCost.width(400)
        .height(300)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel("Product")
        .yAxisLabel("Input Cost")
        .dimension(inputDimension)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(inputCostGroup)
        .ordinalColors(["#9C27B0","#E91E63","#9C27B0","#F44336","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"]);

    outputCost.width(400)
        .height(300)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel("Product")
        .yAxisLabel("Output Cost")
        .dimension(outputDimension)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(outputCostGroup)
        .ordinalColors(["#4CAF50","#E91E63","#9C27B0","#F44336","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"]);
  
  
    dc.renderAll();
	
	}
]);