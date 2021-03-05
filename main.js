//Function called when there is changes in the lenght input box
function myFunction() {

  var len = document.getElementById("length").value;
  var l = len / 100; //mm to m conversion

   // checking if the length is in specified range
  if (len > 200 || len < 100) {
    alert("Please enter a value between 100 and 200")
  } else {

    var time_period = ((2 * Math.PI * Math.sqrt(l)) / Math.sqrt(9.8)).toFixed(4); //calculating the time period
    var nat_frq_hertz = (1 / time_period).toFixed(4); //calculating the natural frequency in hertz
    var nat_frq_rad = (nat_frq_hertz * (2 * Math.PI)).toFixed(4); //calculating the natural frequency in radians
    var max_amp = (len / Math.sqrt(2)).toFixed(4); //Max angular displacement =45deg ,max amplitutde is length of the string*cos(45deg)=len/square_root(2)

    // Displaying the results
    document.getElementById("time_period").innerHTML = "Time Period(T): " + time_period + " sec";
    document.getElementById("natural_f_Hz").innerHTML = "Natural Frequency(Hz): " + nat_frq_hertz + " Hz";
    document.getElementById("natural_f_rad").innerHTML = "Natural Frequncy(rad/sec): " + nat_frq_rad + " rad/sec";
    document.getElementById("len").innerHTML = "Length: " + len + " mm";
    document.getElementById("max_amp").innerHTML = "Maximum Amplitude: " + max_amp + " mm";

    //Chaning the length of the pendulum
    document.getElementById("thread").style.height = len - 50 + "px";

    //Changing the time period of the simple pendulum
    document.getElementById("thread").style.animationDuration = time_period + "s";
    document.getElementById("shadow").style.animationDuration = time_period / 2 + "s";

    //For plotting the graph for given length
    init();

    //Axis is plotted
    function showAxes(ctx, axes) {
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var xMin = 10;

      ctx.beginPath();
      ctx.strokeStyle = "rgb(128,128,128)";

      // X-Axis
      ctx.moveTo(xMin, height / 2);
      ctx.lineTo(width, height / 2);

      //  Y-Axis
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);

      ctx.stroke();
    }

    //The response for amplitude vs time plotted on the axis based on user's input
    function plotSine(ctx, xOffset, yOffset) {
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var scale = 20;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#4a47a3";

      var x = -4;
      var y = 0;
      var amplitude = max_amp - 67; //Have reduced the original amplitude so as to fit in the stimulator window
      var frequency = time_period*4; //the frequency is low for the given range for have multiplied by 10

      while (x < width) {
        y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
        ctx.lineTo(x, y);
        x++;
      }

      ctx.stroke();
      ctx.save();

    }

//The ouput grph is ploted by calling the plotSine() and showAxes() function
    function draw() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      context.clearRect(0, 0, 500, 500);
      showAxes(context);
      context.save();

      plotSine(context, step, 50);
      context.restore();
      step += 4;
    }

 //Plotting is initialised
    function init() {
      window.requestAnimationFrame(draw);
    }
    var step = 1;
  }

}

// Resuming the oscillations
function start() {
  document.getElementById("thread").style.animationPlayState = "running";
  document.getElementById("shadow").style.animationPlayState = "running";
}

//Pausing the oscillations
function stop() {
  document.getElementById("thread").style.animationPlayState = "paused";
  document.getElementById("shadow").style.animationPlayState = "paused";
}
