function drawthePie(datacell,canvascell){
    var drawPieChart = function(data, colors) {
      var canvas = document.getElementById(canvascell);
      var ctx = canvas.getContext('2d');
      var x = canvas.width / 2;
          y = canvas.height / 2;
      var color,
          startAngle,
          endAngle,
          total = getTotal(data);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(var i=0; i<data.length; i++) {
        color = colors[i];
        startAngle = calculateStart(data, i, total);
        endAngle = calculateEnd(data, i, total);
        numcol=maxcolonne(datacell);
        ctx.beginPath();
        if (i>numcol) {
          ctx.fillStyle = 'rgb('+ Math.floor(255 - 50 * i-numcol) + ', '+Math.floor(150) +', '+0+')';
        }
        else
        {
          ctx.fillStyle = 'rgb('+ Math.floor(255 - 50 * i) + ', '+Math.floor(150) +', '+0+')';
        }
        console.log(10+i)
        ctx.moveTo(x, y);
        ctx.arc(x, y, y-100, startAngle, endAngle);
        ctx.fill();
        ctx.rect(canvas.width , 10, 12, 12);
        ctx.fill();
        ctx.font = "10px sans-serif";
        ctx.fillText(data[i].label + " - " + data[i].value + " (" + calculatePercent(data[i].value, total) + "%)", canvas.width - x*2, 0+i * 20+20 );
      }
    };
    
    var calculatePercent = function(value, total) {
      
      return (value / total * 100).toFixed(2);
    };
    
    var getTotal = function(data) {
      var sum = 0;
      for(var i=0; i<data.length; i++) {
        sum += data[i].value;
      }
          
      return sum;
    };
    
    var calculateStart = function(data, index, total) {
      if(index === 0) {
        return 0;
      }
      
      return calculateEnd(data, index-1, total);
    };
    
    var calculateEndAngle = function(data, index, total) {
      var angle = data[index].value / total * 360;
      var inc = ( index === 0 ) ? 0 : calculateEndAngle(data, index-1, total);
      
      return ( angle + inc );
    };
    
    var calculateEnd = function(data, index, total) {
      
      return degreeToRadians(calculateEndAngle(data, index, total));
    };
    
    var degreeToRadians = function(angle) {
      return angle * Math.PI / 180
    }
    //integrer la data ensuite
    
    var data =[] ;
    
    //colonne en titre
    axisX=true;
    if(axisX==true)
    {
    
    for (let index = 0; index < datacell[0].length; index++) {
      console.log(datacell[1][index])
      str = datacell[1][index].replace(/\s/g, '');
      console.log(str)
      data.push({label: datacell[0][index], value:Number(parseFloat(str.replace(/,/g, '')))})
      //console.log(data)
    }
    
    }
    //ligne en titre
    
    if(axisX==false)
    {
      for (let index = 0; index < datacell.length; index++) 
      {

      str = datacell[index][1].replace(/\s/g, '');

      data.push({label: datacell[index][0], value:Number(parseFloat(str.replace(/,/g, '')))})
      }
    }
    //test invert axis
    
    //parseFloat(celldata[numcol+index].replace(/,/g, '')) pour les virgules
    var colors = [ '#39CCCC', '#3D9970', '#001F3F', '#85144B' ];
    
    drawPieChart(data, colors);
    }