function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = `${window.location.protocol}//${window.location.host}/predict_home_price`;
 // var url = "https://bengaluru-house-price-prediction.onrender.com/get_location_names"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  //  var url = "https://bengaluru-house-price-prediction.onrender.com/predict_home_price";
  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = `${window.location.protocol}//${window.location.host}/get_location_names`;
  //var url = "https://banglore-home-prices.onrender.com/get_location_names";
  console.log(url);
  console.log(window.location.protocol,window.location.host);
  //var url = "https://bengaluru-house-price-prediction.onrender.com/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
   // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    //var url = "https://bengaluru-house-price-prediction.onrender.com/get_location_names";

  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      console.log(data);
      if(data) {
          var locations = data.location;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
        console.log("get_location_names loaded sucessfully");
      }
  });
}

$(document).ready(onPageLoad)
//window.onload = onPageLoad;
