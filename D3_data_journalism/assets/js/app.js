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
d3.csv("assets/data/data.csv").then(data => {
      // Parse data
    let filterdata = {
      "poverty" : [],
      "healthcare" : []
    }
     //console.log((data));
    data.forEach(function(data) {
      
      filterdata.poverty.push(parseFloat(data.poverty));
      //data.age = +data.age;
      filterdata.healthcare.push(parseFloat(data.healthcare));
      //console.log("Healthcare:", data.healthcare);
      //console.log("Poverty:", data.poverty);
    });
    console.log(filterdata.healthcare);
    console.log(filterdata.poverty);
    var XlinearScale = d3.scaleLinear()
      .domain([d3.min(filterdata.poverty), d3.max(filterdata.poverty)])
      .range([0,width]);
    var YlinearScale = d3.scaleLinear()
      .domain([d3.min(filterdata.healthcare), d3.max(filterdata.healthcare)])
      .range([height, 0]);
    

    var BottomAxis = d3.axisBottom(XlinearScale)
    var LeftAxis = d3.axisLeft(YlinearScale)

    let xaxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(BottomAxis)

    let yaxis = chartGroup.append("g")
      .call(LeftAxis)

    let nodes = svg.selectAll("g").data(filterdata)

    
    var Circlegroup = chartGroup.selectAll("circle")
      .data(filterdata)
      .join("circle")
      .attr("cx", d => {
      console.log(d["poverty"])



      })
      .attr("cy", d => YlinearScale(d.healthcare))
      .attr("r", "15")
      .classed("stateCircle", true)
  
    


    

    






    



})
