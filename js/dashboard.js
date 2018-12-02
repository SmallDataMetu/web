$( document ).ready(function() {

    $('#startTime').datepicker({format: 'yyyy/dd/mm'})
    $('#endTime').datepicker({format: 'yyyy/dd/mm'})

    drawGraph(
    [
 {
    "travelId": "a6c29409-150d-4ac6-92b2-43721c95e41f",
    "endTime": "2018-11-30T22:05:06.444+0000",
    "rating": {
      "anger": 2.00300731952,
      "contempt": 5.14648448e-8,
      "disgust": 0.000009180124,
      "fear": 0.0001912825,
      "happiness": 0.9875571,
      "neutral": 5.0009861537,
      "sadness": 0.00001889955,
      "surprise": 0.008229999
    }
  },
 {
    "travelId": "a6c29409-150d-4ac6-92b2-43721c95e41f",
    "endTime": "2018-12-01T22:05:06.444+0000",
    "rating": {
      "anger": 3.00300731952,
      "contempt": 5.14648448e-8,
      "disgust": 0.000009180124,
      "fear": 0.0001912825,
      "happiness": 0.9875571,
      "neutral": 0.0009861537,
      "sadness": 7.00001889955,
      "surprise": 2.008229999
    }
  },
 {
    "travelId": "a6c29409-150d-4ac6-92b2-43721c95e41f",
    "endTime": "2018-12-02T22:05:06.444+0000",
    "rating": {
      "anger": 0.00300731952,
      "contempt": 5.14648448e-8,
      "disgust": 0.000009180124,
      "fear": 3.0001912825,
      "happiness": 0.9875571,
      "neutral": 1.0009861537,
      "sadness": 5.00001889955,
      "surprise": 0.008229999
    }
  }
    ]
    );

});


function drawGraph(data) {

    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 20, bottom: 40, left: 50};
    var height = window.innerHeight - margin.top - margin.bottom;
    var width = $("#chart-line").width() - margin.left - margin.right;

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    //// define the lines
    var angerLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.anger); });

    var contemptLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.contempt); });

    var disgustLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.disgust); });

    var fearLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.fear); });

    var happinessLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.happiness); });

    var neutralLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.neutral); });

    var sadnessLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.sadness); });

    var surpriseLine = d3.line()
        .x(function(d) { return x(d.endTime); })
        .y(function(d) { return y(d.rating.surprise); });


    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart-line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y-%m-%d");

    // format the data
    data.forEach(function(d) {
      //d.endTime = d3.isoParse(d.endTime);
      d.endTime = parseTime(d.endTime.substr(0,10));
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.endTime; }));
    y.domain([0, d3.max(data, function(d) {
      return Math.max(d.rating.anger, d.rating.contempt, d.rating.disgust,
        d.rating.fear, d.rating.happiness, d.rating.neutral,
        d.rating.sadness, d.rating.surprise); })]);


      // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "angerLine")
            .attr("d", angerLine)
            .text("Anger");
        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "contemptLine")
            .attr("d", contemptLine)
            .text("Contempt");
        svg.append("path")
            .data([data])
            .attr("class", "disgustLine")
            .attr("d", disgustLine)
            .text("Disgust");
         svg.append("path")
             .data([data])
             .attr("class", "fearLine")
             .attr("d", fearLine)
             .text("Fear");
         // Add the valueline path.
         svg.append("path")
             .data([data])
             .attr("class", "happinessLine")
             .attr("d", happinessLine)
             .text("Happiness");
         svg.append("path")
             .data([data])
             .attr("class", "neutralLine")
             .attr("d", neutralLine)
             .text("Neutral");
        svg.append("path")
            .data([data])
            .attr("class", "sadnessLine")
            .attr("d", sadnessLine)
            .attr("dy", "2.35em")
            .attr("text-anchor", "middle")
            .text("Sadness");
        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "surpriseLine")
            .attr("d", surpriseLine)
            .text("Surprise");

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

}

function getEmotionLogs() {
      var driverId = $("#driverId").val();
      if (utils.isEmptyOrNull(driverId)) {
          driverId = null;
      }
      var vehicleId = $("#vehicleId").val();
      if (utils.isEmptyOrNull(vehicleId)) {
          vehicleId = null;
      }
      var startTime = $("#startTime").val();
      if (utils.isEmptyOrNull(startTime)) {
          startTime = null;
      } else {
          startTime = new Date(startTime).getTime() / 1000;
      }
      var endTime = $("#endTime").val();
      if (utils.isEmptyOrNull(endTime)) {
          endTime = null;
      } else {
          endTime = new Date(endTime).getTime() / 1000;
      }
      var data = {
          driverId : driverId,
          vehicleId : vehicleId,
          startTime : startTime,
          endTime : endTime
      };
      $.ajax({

          url : 'localhost:8080/get-rating-logs',
          type : 'POST',
          contentType: "application/json",
          dataType : 'json',
          data : data,
          success : function(data) {
              drawGraph(data);
          },
          error : function(request,error)
          {

          }
      });
 }



