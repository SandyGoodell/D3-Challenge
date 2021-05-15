// @TODO: YOUR CODE HERE!
// SVG container
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
// margins
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
// var chartGroup = 
svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(data => {
      // Parse data
    var poverty = [];
    var healthcare =[];
    //console.log((data));
    data.forEach(function(data) {
      
      poverty.push(parseFloat(data.poverty));
      //data.age = +data.age;
      healthcare.push(parseFloat(data.healthcare));
      //console.log("Healthcare:", data.healthcare);
      //console.log("Poverty:", data.poverty);
    });
    console.log(healthcare);
    console.log(poverty);
    //add X axis
    var x = d3.scaleLinear()
    .domain([poverty])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + svgHeight + ")")
    .call(d3.axisBottom(x));
    // add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(healthcare)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));





    



})
