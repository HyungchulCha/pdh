/*
 * Chart - Bar Vertical, Bar Horizontal, Line, Bar + Line, Pie, Doughnut, Treemap
 *
 */

/*
 * Util
 *
 */

function util_dxTooltipInsertValue(html, onlyTarget = true) {
  return function (info) {
    const $html = $(html);
    $html
      .find(".ct_t")
      .append(`<span class="ct_title">${info.argumentText}</span>`);
    if (onlyTarget) {
      $html
        .find(".ct_b")
        .append(
          `<div><span class="ct_name">${info.seriesName}</span> : <span class="ct_value">${info.value}</span></div>`
        );
    } else {
      info.points.map((i) => {
        $html
          .find(".ct_b")
          .append(
            `<div><span class="ct_name">${i.seriesName}</span> : <span class="ct_value">${i.value}</span></div>`
          );
      });
    }
    // if (info.points !== undefined) {
    //   info.points.map((i) => {
    //     $html
    //       .find(".ct_b")
    //       .append(
    //         `<div><span class="ct_name">${i.seriesName}</span> : <span class="ct_value">${i.value}</span></div>`
    //       );
    //   });
    // } else {
    //   $html
    //     .find(".ct_b")
    //     .append(
    //       `<div><span class="ct_name">${info.seriesName}</span> : <span class="ct_value">${info.value}</span></div>`
    //     );
    // }
    return {
      html: $html.html(),
    };
  };
}

function util_dxGetDataKey(data) {
  const keys = data.reduce((acc, cur) => {
    return [...acc, ...Object.keys(cur)];
  }, []);
  return [...new Set(keys)];
}

function util_dxSetSeries({ type, axisName, data, color, arrIndex }) {
  const x1 = data.shift();
  return data
    .map((d, i) => {
      if (arrIndex !== undefined) {
        if (arrIndex.includes(i)) {
          return {
            type: type || null,
            axis: axisName || null,
            argumentField: x1,
            valueField: d,
            name: d,
            color: color[i],
          };
        }
      } else {
        return {
          type: type || null,
          axis: axisName || null,
          argumentField: x1,
          valueField: d,
          name: d,
          color: color[i],
        };
      }
    })
    .filter((d) => d);
}

function util_d3SetTreemapData({ data, index }) {
  return d3
    .hierarchy(data)
    .sum((d) => {
      return Array.isArray(d.value) ? d.value[index] : 0;
    })
    .sort((a, b) => b.height - a.height || b.value - a.value);
}

function util_d3SetTreemapDataParent({ leaves, index }) {
  const dpArr = leaves.map((d) => d.ancestors().slice(index)[0]);
  return dpArr.filter((item, i) => {
    return (
      dpArr.findIndex((item2, j) => {
        return item.data.name === item2.data.name;
      }) === i
    );
  });
}

function util_d3TooltipInsertValue({ target, targetText, parent }) {
  var domTooltip;
  $(target).on("mouseenter", function () {
    var thP = $(this).parents(parent);
    domTooltip = thP.find(".chart-tooltip");
    domTooltip.css("opacity", 1);
  });
  $(target).on("mousemove", function (e) {
    var ctName = $(this).find(targetText).first().text();
    var ctValue = $(this).find(targetText).last().text();
    domTooltip.find(".ct_t").text(ctName);
    domTooltip.find(".ct_b").text(ctValue);
    domTooltip.css({
      left: e.offsetX,
      top: e.offsetY,
    });
  });
  $(target).on("mouseleave", function () {
    domTooltip.css("opacity", 0);
  });
}

function util_getKoreanNumber(number) {
  const koreanUnits = ["", "만", "억", "조"];
  let answer = "";
  let unit = 10000;
  let index = 0;
  let division = Math.pow(unit, index);

  while (Math.floor(number / division) > 0) {
    const mod = Math.floor((number % (division * unit)) / division);
    if (mod) {
      const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      answer = `${modToString}${koreanUnits[index]} ` + answer;
    }
    division = Math.pow(unit, ++index);
  }
  return answer;
}

/*
 * Constant - Color, DX Tooltip Template, DX Tooltip Style, DX Legend Style, Data Type
 *
 */

const COLOR_STYLE_01=["#ff8788","#f8aa61","#f7d15d","#aad66a","#63cfe2","#69b0ec","#4f75de","#8959f6","#405085"];
const COLOR_STYLE_02=["#ff8788","#f8aa61","#f7d15d","#aad66a"];
const COLOR_STYLE_03=["#69b0ec","#4f75de","#8959f6","#405085"];
const DX_TOOLTIP_TEMPLATE=`<div><div class="chart-tooltip"><div><div class="ct_t"></div><div class="ct_b"></div></div></div></div>`;
const D3_TOOLTIP_TEMPLATE=`<div class="chart-tooltip" style="opacity:0;"><div><div class="ct_t"></div><div class="ct_b"></div></div></div>`;
const DX_TOOLTIP_STYLE_01={enabled:!0,shared:!0,location:"edge",customizeTooltip:util_dxTooltipInsertValue(DX_TOOLTIP_TEMPLATE)};
const DX_LEGEND_STYLE_01={visible:!0,verticalAlignment:"bottom",horizontalAlignment:"center",itemTextPosition:"right"};

/*
 * DX Data Type
 * {Name, Value, Value ...}
 */
const DATA_CHART_BARSTACK = [{
  state: 'Germany',
  young: 5.3,
  middle: 26,
  older: 8,
}, {
  state: 'Japan',
  young: 6.45,
  middle: 30.5,
  older: 11.22,
}, {
  state: 'Russia',
  young: 12.56,
  middle: 45.5,
  older: 6.5,
}, {
  state: 'USA',
  young: 32,
  middle: 87,
  older: 15,
}];
const DATA_CHART_BARVERTICAL = [
  {
    state: "Saudi Arabia",
    year1970: 192.2,
    year1980: 509.8,
  },
  {
    state: "USA",
    year1970: 533.5,
    year1980: 480.2,
    year1990: 416.6,
    year2000: 352.6,
  },
  {
    state: "China",
    year1970: 30.7,
    year1980: 106,
    year1990: 138.3,
    year2000: 162.6,
  },
  {
    state: "Canada",
    year1970: 70.1,
    year1980: 83.3,
    year1990: 92.6,
    year2000: 126.9,
  },
  {
    state: "Mexico",
    year1970: 24.2,
    year1980: 107.2,
    year1990: 146.3,
    year2000: 171.2,
  },
];

const DATA_CHART_BARVERTICAL_02 = [
  {
    state: "Saudi Arabia",
    year1970: 192.2,
  },
  {
    state: "USA",
    year1970: 533.5,
  },
  {
    state: "China",
    year1970: 30.7,
  },
  {
    state: "Canada",
    year1970: 70.1,
  },
  {
    state: "Mexico",
    year1970: 24.2,
  },
];

const DATA_CHART_LINE = [
  {
    country: "USA",
    hydro: 59.8,
    oil: 937.6,
    gas: 582,
    coal: 564.3,
    nuclear: 187.9,
  },
  {
    country: "China",
    hydro: 74.2,
    oil: 308.6,
    gas: 35.1,
    coal: 956.9,
    nuclear: 11.3,
  },
  {
    country: "Russia",
    hydro: 40,
    oil: 128.5,
    gas: 361.8,
    coal: 105,
    nuclear: 32.4,
  },
  {
    country: "Japan",
    hydro: 22.6,
    oil: 241.5,
    gas: 64.9,
    coal: 120.8,
    nuclear: 64.8,
  },
  {
    country: "India",
    hydro: 19,
    oil: 119.3,
    gas: 28.9,
    coal: 204.8,
    nuclear: 3.8,
  },
  {
    country: "Germany",
    hydro: 6.1,
    oil: 123.6,
    gas: 77.3,
    coal: 85.7,
    nuclear: 37.8,
  },
];

const DATA_CHART_BARLINE = [
  {
    complaint: "Cold pizza",
    count: 78000000000,
    cumulativePercentage: 299,
    ccc: 56,
  },
  {
    complaint: "Not enough cheese",
    count: 12000000000,
    cumulativePercentage: 43,
    ccc: 290,
  },
  {
    complaint: "Underbaked or Overbaked",
    count: 5200000000,
    cumulativePercentage: 35,
    ccc: 33,
  },
  {
    complaint: "Delayed delivery",
    count: 112300000000,
    cumulativePercentage: 77,
    ccc: 290,
  },
  {
    complaint: "Damaged pizza",
    count: 32100000000,
    cumulativePercentage: 89,
    ccc: 33,
  },
  {
    complaint: "Incorrect billing",
    count: 8900000000,
    cumulativePercentage: 62,
    ccc: 270,
  },
  {
    complaint: "Wrong size delivered",
    count: 22200000000,
    cumulativePercentage: 100,
    ccc: 33,
  },
];

const DATA_CHART_PIE = [
  {
    country: "Russia",
    area: 19,
  },
  {
    country: "Canada",
    area: 48,
  },
  {
    country: "Korea",
    area: 57,
  },
  {
    country: "USA",
    area: 32,
  },
  {
    country: "China",
    area: 65,
  },
  {
    country: "Brazil",
    area: 24,
  },
  {
    country: "Australia",
    area: 25,
  },
  {
    country: "India",
    area: 32,
  },
  {
    country: "Others",
    area: 55,
  },
];

const DATA_TREEMAP = {
  name: "test",
  children: [
    {
      name: "농구",
      children: [
        {
          name: "AA",
          value: [56746, 3456, 456, 7456, 23234],
        },
        {
          name: "AB",
          value: [567, 5634, 4567, 345, 456734],
        },
        {
          name: "AC",
          value: [567, 5678, 456, 6789, 890],
        },
      ],
    },
    {
      name: "축구",
      children: [
        {
          name: "BA",
          value: [456, 4566, 2341, 3456, 45567],
        },
        {
          name: "BB",
          value: [3456, 3456, 3456, 345, 345],
        },
        {
          name: "BC",
          value: [67456, 4567, 456, 567456, 23434],
        },
      ],
    },
    {
      name: "배구",
      children: [
        {
          name: "CA",
          value: [45745, 342, 4356, 526456, 21234],
        },
        {
          name: "CB",
          value: [57456, 1234, 456, 12341, 1234],
        },
        {
          name: "CC",
          value: [12234, 234, 456, 123414, 14134],
        },
      ],
    },
    {
      name: "야구",
      children: [
        {
          name: "DA",
          value: [52345, 1234, 1234, 123, 456345],
        },
        {
          name: "DB",
          value: [56746, 4567, 456, 56456, 67856],
        },
        {
          name: "DC",
          value: [33456, 5678, 5678, 56778, 3456],
        },
      ],
    },
    {
      name: "탁구",
      children: [
        {
          name: "EA",
          value: [7456, 4356, 456, 56456, 1234],
        },
        {
          name: "EB",
          value: [5456, 45567, 2356, 56876, 78696],
        },
        {
          name: "EC",
          value: [2345, 3456, 456, 2345, 45674],
        },
      ],
    },
  ],
};

/*
 * Bar
 *
 */

function chart_dxBarLine({
  target,
  dataSource,
  arrSeries,
  legendStyle,
  tooltipStyle,
  rotated,
  axisY1,
  axisY2,
  fnY1AxisFormat,
  fnY2AxisFormat,
  fnLabelFormat,
}) {
  var _chartBarLine = $(target)
    .dxChart({
      dataSource,
      commonSeriesSettings: {
        ignoreEmptyPoints: true,
      },
      series: arrSeries,
      legend: legendStyle || null,
      tooltip: tooltipStyle || null,
      rotated: rotated || false,
      valueAxis: axisY2
        ? [
            {
              name: axisY1,
              position: "left",
              label: {
                customizeText: fnY1AxisFormat || null,
              },
            },
            {
              name: axisY2,
              position: "right",
              label: {
                customizeText: fnY2AxisFormat || null,
              },
            },
          ]
        : fnY1AxisFormat
        ? {
            label: {
              customizeText: fnY1AxisFormat || null,
            },
          }
        : null,
      customizeLabel: fnLabelFormat || null,
    })
    .dxChart("instance");
  setTimeout(function () {
    _chartBarLine.option("dataSource", dataSource);
  }, 80);

  return _chartBarLine;
}

/*
 * Pie
 *
 */

function chart_dxPie({
  target,
  type,
  dataSource,
  arrSeries,
  legendStyle,
  tooltipStyle,
}) {
  const _chartPie = $(target)
    .dxPieChart({
      type: type || null,
      dataSource,
      commonSeriesSettings: {
        label: {
          visible: true,
          position: "columns",
          backgroundColor: "none",
          // customizeText(e) {
          //   return `${e.argument} ${e.valueText}`;
          // },
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      customizePoint(a) {
        return {
          color: COLOR_STYLE_01[a.index],
        };
      },
      resolveLabelOverlapping: "shift",
      series: arrSeries,
      legend: legendStyle || null,
      tooltip: tooltipStyle || null,
      // onPointClick(e) {
      //   fnToggleVisibility(e.target);
      // },
      // onLegendClick(e) {
      //   fnToggleVisibility(this.getAllSeries()[0].getPointsByArg(e.target)[0]);
      // },
    })
    .dxPieChart("instance");
  setTimeout(function () {
    _chartPie.option("dataSource", dataSource);
  }, 80);

  return _chartPie;
}

/*
 * Treemap
 *
 */

let TREEMAP;

function chart_d3Treemap({
  dom,
  tile = d3.treemapBinary,
  width = 960,
  height = 960,
  margin = 0,
  marginTop = margin,
  marginRight = margin,
  marginBottom = margin,
  marginLeft = margin,
  padding = 0,
  paddingInner = padding,
  paddingOuter = padding,
  paddingTop = paddingOuter,
  paddingRight = paddingOuter,
  paddingBottom = paddingOuter,
  paddingLeft = paddingOuter,
  round = true,
  colors = d3.schemeTableau10,
}) {
  const root = util_d3SetTreemapData({ data: DATA_TREEMAP, index: 0 });
  const leaves = root.leaves();
  const G = leaves.map((d) => d.ancestors().slice(-2)[0].data.name);
  const zDomain = new d3.InternSet(G);
  const color = d3.scaleOrdinal(zDomain, COLOR_STYLE_01);
  const label = (d, n) => {
    return [
      ...d.name.split(/(?=[A-Z][a-z])/g),
      n.value.toLocaleString("en"),
    ].join("\n");
  };
  const L = leaves.map((d) => label(d.data, d));
  root.sort((a, b) => d3.descending(a.value, b.value));

  const _treemap = d3
    .treemap()
    .tile(tile)
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .paddingInner(paddingInner)
    .paddingTop(paddingTop)
    .paddingRight(paddingRight)
    .paddingBottom(paddingBottom)
    .paddingLeft(paddingLeft)
    .round(round);

  _treemap(root);

  const uid = `O-${Math.random().toString(16).slice(2)}`;

  const svg = d3
    .create("svg")
    .attr("viewBox", [-marginLeft, -marginTop, width, height]);

  const node = svg
    .selectAll()
    .data(leaves)
    .join("g")
    .attr("class", "square-g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  node
    .append("rect")
    .attr("class", "square-rect")
    .attr("fill", (d, i) => color(G[i]))
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("stroke-opacity", "0.16")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  node
    .append("clipPath")
    .attr("id", (d, i) => `${uid}-clip-${i}`)
    .append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  node
    .append("text")
    .attr("class", "square-text")
    .attr(
      "clip-path",
      (d, i) => `url(${new URL(`#${uid}-clip-${i}`, location)})`
    )
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#fff")
    .attr("fill-opacity", "0.48")
    .selectAll("tspan")
    .data((d, i) => `${L[i]}`.split(/\n/g))
    .join("tspan")
    .attr("x", 6)
    .attr("y", (d, i, D) => {
      return `${i * 1.4 + 1.4}em`;
    })
    .text((d) => d);

  svg
    .selectAll()
    .data(util_d3SetTreemapDataParent({ leaves, index: -2 }))
    .join("text")
    .attr("class", "text-parent")
    .attr("transform", (d) => {
      return `translate(${d.x0},${d.y0})`;
    })
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "#fff")
    .attr("fill-opacity", "1")
    .selectAll("tspan")
    .data((d, i) => {
      return [d.data.name, d.value];
    })
    .join("tspan")
    .attr("x", 6)
    .attr("y", (d, i, D) => {
      return `${i * 1.4 + 1.4}em`;
    })
    .text((d) => {
      return d;
    });

  $(dom).append(D3_TOOLTIP_TEMPLATE);

  return Object.assign(svg.node(), {
    update(index) {
      const _leaves = _treemap(
        util_d3SetTreemapData({ data: DATA_TREEMAP, index })
      ).leaves();
      svg
        .selectAll(".square-g")
        .data(_leaves)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .call((node) =>
          node.attr("transform", (d) => `translate(${d.x0},${d.y0})`)
        )
        .call((node) => {
          return node
            .select("rect")
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0);
        })
        .call((node) =>
          node
            .select("clipPath rect")
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0)
        )
        .call((node) => {
          return node.select("text tspan:last-child").text((d) => d.value);
        });
      svg
        .selectAll(".text-parent")
        .data(util_d3SetTreemapDataParent({ leaves: _leaves, index: -2 }))
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
        .call((node) =>
          node.select(".depth01 tspan:last-child").text((d) => d.value)
        );
    },
  });
}

$(document).ready(function () {
  chart_dxBarLine({
    target: ".chart_barstack",
    dataSource: DATA_CHART_BARSTACK,
    arrSeries: util_dxSetSeries({
      type: "stackedBar",
      data: util_dxGetDataKey(DATA_CHART_BARSTACK),
      color: COLOR_STYLE_02,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
  });
  chart_dxBarLine({
    target: ".chart_barvertical",
    dataSource: DATA_CHART_BARVERTICAL,
    arrSeries: util_dxSetSeries({
      type: "bar",
      data: util_dxGetDataKey(DATA_CHART_BARVERTICAL),
      color: COLOR_STYLE_02,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
  });
  chart_dxBarLine({
    target: ".chart_barvertical02",
    dataSource: DATA_CHART_BARVERTICAL_02,
    arrSeries: util_dxSetSeries({
      type: "bar",
      data: util_dxGetDataKey(DATA_CHART_BARVERTICAL_02),
      color: COLOR_STYLE_03,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
  });
  chart_dxBarLine({
    target: ".chart_barhorizontal",
    dataSource: DATA_CHART_BARVERTICAL,
    arrSeries: util_dxSetSeries({
      type: "bar",
      data: util_dxGetDataKey(DATA_CHART_BARVERTICAL),
      color: COLOR_STYLE_03,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
    rotated: true,
  });
  chart_dxBarLine({
    target: ".chart_line",
    dataSource: DATA_CHART_LINE,
    arrSeries: util_dxSetSeries({
      type: "line",
      data: util_dxGetDataKey(DATA_CHART_LINE),
      color: COLOR_STYLE_01,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
  });
  chart_dxBarLine({
    target: ".chart_barline",
    dataSource: DATA_CHART_BARLINE,
    arrSeries: [
      ...util_dxSetSeries({
        type: "bar",
        axisName: "frequency",
        data: util_dxGetDataKey(DATA_CHART_BARLINE),
        color: COLOR_STYLE_01,
        arrIndex: [0],
      }),
      ...util_dxSetSeries({
        type: "line",
        axisName: "percentage",
        data: util_dxGetDataKey(DATA_CHART_BARLINE),
        color: COLOR_STYLE_01,
        arrIndex: [1, 2],
      }),
    ],
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
    axisY1: "frequency",
    axisY2: "percentage",
    fnY1AxisFormat: function (th) {
      return `${util_getKoreanNumber(th.value)}`;
    },
  });
  chart_dxPie({
    target: ".chart_pie",
    dataSource: DATA_CHART_PIE,
    arrSeries: util_dxSetSeries({
      data: util_dxGetDataKey(DATA_CHART_PIE),
      color: COLOR_STYLE_01,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
  });
  chart_dxPie({
    target: ".chart_doughnut",
    dataSource: DATA_CHART_PIE,
    arrSeries: util_dxSetSeries({
      data: util_dxGetDataKey(DATA_CHART_PIE),
      color: COLOR_STYLE_01,
    }),
    legendStyle: DX_LEGEND_STYLE_01,
    tooltipStyle: DX_TOOLTIP_STYLE_01,
    type: "doughnut",
  });

  TREEMAP = chart_d3Treemap({
    dom: ".chart_treemap",
    width: 414,
    height: 414,
  });
  document.querySelector(".chart_treemap").append(TREEMAP);
  util_d3TooltipInsertValue({
    target: ".square-g",
    targetText: ".square-text tspan",
    parent: ".chart_treemap",
  });
});
