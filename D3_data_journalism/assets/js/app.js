// @TODO: YOUR CODE HERE!
// SVG container
var svgWidth = 960;
var svgHeight = 500;
// margins
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

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
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(filterdata => {
  console.log(filterdata)
  filterdata.forEach(d => {
    d.poverty = +d.poverty,
    d.healthcare = +d.healthcare

  })

    var XlinearScale = d3.scaleLinear()
      .domain([d3.min(filterdata, d => d.poverty), d3.max(filterdata, d => d.poverty)])
      .range([0,width]);
    var YlinearScale = d3.scaleLinear()
      .domain([d3.min(filterdata, d => d.healthcare), d3.max(filterdata, d => d.healthcare)])
      .range([height, 0]);

    var BottomAxis = d3.axisBottom(XlinearScale)
    var LeftAxis = d3.axisLeft(YlinearScale)

    let xaxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(BottomAxis)

    let yaxis = chartGroup.append("g")
      .call(LeftAxis)

      
    let circleGroup = chartGroup.append('g')
    circleGroup.selectAll("circle")
      .data(filterdata)
      .join("circle")
      .attr("cx", d => XlinearScale(d.poverty))
      .attr("cy", d => YlinearScale(d.healthcare))
      .attr("r", "15")
      .classed("stateCircle", true)
      .attr("opacity", ".5");

    
    // Put state abbreviation in circle
    var circlesTextGroup = chartGroup.selectAll()
      .data(filterdata)
      .enter()
      .append("text")
      .text(d=>(d.abbr))
      .attr("x", d => XlinearScale(d.poverty))
      .attr("y", d => YlinearScale(d.healthcare))
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .attr("fill", "black");   

    // create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

 


})
