function getBathValue(){
    var uiBathrooms=document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1;
}
function getBHKValue(){
     var uiBHK=document.getElementsByName("uiBHK");
     for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(uiBHK[i].value);
        }
     }
     return -1;
}
function onClickedEstimatedPrice(){
    console.log("estimated price button clicked");
    var sqft=document.getElementById("uiSqft").value;
    var bhk=getBHKValue();
    var bathrooms=getBathValue();
    var locations=document.getElementById("uiLocations").value;
    var estPrice=document.getElementById("uiEstimatedPrice");
    var url = "http://127.0.0.1:5000/predict_home_price";
    $.post(url,{
        total_sqft:parseFloat(sqft),
        bhk:bhk,
        bath:bathrooms,
        location:locations
    },function(data,status){
        console.log(data.estimated_price);
        estPrice.innerHTML="<h2>"+data.estimated_price.toString()+"Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad(){
    console.log("document loaded");
    var url="http://127.0.0.1:5000/get_location_names"
    $.get(url,function(data,status){
        if(data){
            var locations=data.locations;
            var uiLocations=document.getElementById('uiLocations');
            $('#uiLocations').empty();
            for(var i in locations){
                var opt=new Option(locations[i]);
                $('#uiLocations').append(opt)
            }
        }
    })


}

window.onload=onPageLoad;