import * as d3 from "d3";
import * as d3Zoom from "d3-zoom";
import d3Cloud from "d3-cloud";
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

fetch(
  "/list.json"
)
  .then((response) => response.json())
  .then((data) => {
    let layout = d3Cloud()
      .size([width, height])
      .words(data)
      .padding(5)
      .fontSize((d) => (d.size == 50 ? 50 : random(10, 15)))
      .rotate((d) => (d.size == 50 ? 0 : random(-20, 20)))
      .on("end", draw);
    layout.start();

    svg.call(d3Zoom.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([1, 8])
      .on("zoom", zoomed));

    function zoomed({transform}) {
      svg.select('g').attr(
            "transform",
            `translate(${transform.x + layout.size()[0] / 2}, ${transform.y + layout.size()[1] / 2}) scale(${transform.k})`
          )
    }

    function draw(words) {
      svg
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .join("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .attr("text-anchor", "middle")
        .attr("fill", (d) => (d.size == 50 ? "rgb(0,0,0)" : "#"+Math.floor(Math.random()*16777215).toString(16)))
        .attr("font-family", "Impact")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  });