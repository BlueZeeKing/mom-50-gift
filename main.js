import * as d3 from "d3";
import * as d3Zoom from "d3-zoom";
import d3Cloud from "d3-cloud";
import data from "./list.json";
import "./style.css";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const width = window.innerWidth;
const height = window.innerHeight;

let svg = d3
  .select("#container")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")

let layout = d3Cloud()
  .size([width, height])
  .words(data)
  .padding(5)
  .fontSize((d) => (d.size == 50 ? 50 : random(10, 15)))
  .rotate((d) => (d.size == 50 ? 0 : random(-20, 20)))
  .on("end", draw);
layout.start();

let zoom = d3Zoom.zoom()
  .extent([[0, 0], [width, height]])
  .scaleExtent([0.5, 8])
  .on("zoom", zoomed)

svg.call(zoom)

function zoomed({transform}) {
  svg.select('g').attr(
        "transform",
        `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
      )
}

function draw(words) {
  svg
    .append("g")
    .selectAll("text")
    .data(words)
    .join("text")
    .style("font-size", function (d) {
      return d.size + "px";
    })
    .attr("text-anchor", "middle")
    .attr("fill", (d) => (d.color))
    .attr("font-family", "Impact")
    .attr("transform", function (d) {
      return "translate(" + [d.x + layout.size()[0] / 2, d.y + layout.size()[1] / 2] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) {
      return d.text;
    })
    .append("title")
    .text((d) => d.person)
}