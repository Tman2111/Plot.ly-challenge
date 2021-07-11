// Build the initial position of the page using the ID number from dropdown menu
function init (){
    var selector = d3.selectAll('#selDataset');

    d3.json('samples.json').then((data)=>{
    
        var sampleNames=data.names;
        sampleNames.forEach((sample) => {
            selector
              .append("option")
              .text(sample)
              .property("value", sample);
            });
      
        var defaultID = sampleNames[0];
    
        barChart(defaultID);
        bubbleChart(defaultID);
        metaData(defaultID);
        gaugeChart(defaultID)

      });
     };

  // Refresh the data each time when a new subject ID is selected
  function optionChanged(newID) {
    barChart(newID);
    bubbleChart(newID);
    metaData(newID);
    gaugeChart(newID)
};
init ();   

  // Horizontal Bar chart 
  function barChart(subjectId){
    d3.json('samples.json').then((data)=>{
        var samples = data.samples;
        var ID = samples.map(row=>row.id).indexOf(subjectId);
        var otuValueTen = samples.map(row=>row.sample_values);
        var otuValueTen = otuValueTen[ID].slice(0,10).reverse();
        var otuIdTen = samples.map(row=>row.otu_ids);
        var otuIdTen = otuIdTen[ID].slice(0,10);
        var otuLabelTen = samples.map(row=>row.otu_labels).slice(0,10);
        
        var trace={
            x: otuValueTen,
            y: otuIdTen.map(r=>`UTO ${r}`),
            text: otuLabelTen,
            type:'bar',
            orientation:'h'
        }
        var layout = {title: "Top 10 OTUs Found", margin: { t: 30, l: 150 }};
  
       Plotly.newPlot('bar',[trace],layout);
    })
};  

// Bubble Chart

function bubbleChart(subjectID){
  d3.json('samples.json').then((data)=>{
      var samples=data.samples;
      var ID= samples.map(row=>row.id).indexOf(subjectID);
      var otuIds = samples.map(row => row.otu_ids);
      var otuIds = otuIds[ID];            
      var sampleValues = samples.map(row => row.sample_values);
      var sampleValues = sampleValues[ID];
      var otuLabels = samples.map(row => row.otu_labels);
      var otuLabels = otuLabels[ID];
      var trace1 = {
          x: otuIds,
          y: sampleValues,
          text: otuLabels,
          mode: 'markers',
          marker: {size: sampleValues, 
                   color: otuIds
                  }
          };                       
          
      var layout = { xaxis: {title: 'OTU ID'},
                     height: 600,
                     width: 1000,
                   };
      Plotly.newPlot('bubble',[trace1], layout);
  })
};

