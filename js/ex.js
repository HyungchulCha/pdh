PieChart();

function PieChart() {
  var width = 960,
    height = 960,
    margin = 40;

  var radius = Math.min(width, height) / 2 - margin;

  var svg = d3
    .select(".chart_pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  var data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 };

  var color = d3
    .scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    .range(d3.schemeDark2);

  var pie = d3
    .pie()
    .sort(null)
    .value((d) => d[1]);

  var data_ready = pie(Object.entries(data));

  var arc = d3
    .arc()
    .innerRadius(radius * 0)
    .outerRadius(radius * 0.8);

  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  svg
    .selectAll("allSlices")
    .data(data_ready)
    .join("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data[1]))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  svg
    .selectAll("allPolylines")
    .data(data_ready)
    .join("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function (d) {
      const posA = arc.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    });

  svg
    .selectAll("allLabels")
    .data(data_ready)
    .join("text")
    .text((d) => d.data[0])
    .attr("transform", function (d) {
      const pos = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style("text-anchor", function (d) {
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return midangle < Math.PI ? "start" : "end";
    });
}
