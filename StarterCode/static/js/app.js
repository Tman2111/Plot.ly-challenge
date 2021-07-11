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

     