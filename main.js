import * as d3 from "d3";
import * as topojson from "topojson-client";
import "./style.css";

const width = window.innerWidth;
const height = window.innerHeight;

let svg = d3
  .select("#container")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%");

var myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate"]

var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function (d) { return { text: d }; }))
  .padding(10)
  .fontSize(60)
  .on("end", draw);
layout.start();

function draw(words) {
  svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .join("text")
    .style("font-size", function (d) { return d.size + "px"; })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}

/*
fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json")
  .then((response) => response.json())
  .then((data) => {
    svg
      .append("path")
      .datum(topojson.feature(data, data.objects.states))
      .attr("fill", "#ddd")
      .attr("stroke", "white")
      .attr("d", d3.geoPath());

    fetch(
      "https://gist.githubusercontent.com/BlueZeeKing/0e70c5160f6a11d4004327defaf8cacd/raw/8bc80e8b214e77c96958881f326f2b9d63fe63e8/days.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        svg
          .append("g")
          .attr("fill", "blue")
          .attr("fill-opacity", 0.5)
          .attr("stroke", "black")
          .attr("stroke-width", 0.5)
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("transform", (d) => `translate(${d.position})`)
          .attr("r", "5")
          .append("title")
          .text((d) => `${d.day}\n${d.info}`);

        svg
          .selectAll("text")
          .data(data)
          .join("text")
          .attr("transform", (d) => `translate(${d.position})`)
          .attr("fill", "black")
          .attr("font-family", "Trebuchet MS, Arial, sans-serif")
          .attr("text-anchor", "middle")
          .attr("dy", "-10px")
          .attr("font-size", "5px")
          .text((d) => d.day);
      });
  });
/*