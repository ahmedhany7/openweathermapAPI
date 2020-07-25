var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');


button.addEventListener('click', () =>{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=metric&appid=c84500c5a2d1d94bf1c27c05ae5737f7&lang=ar')
  .then(
    function(response) {
      if (response.status === 404) {
        main.innerHTML = 'City not found';
        temp.innerHTML = "";
        clouds.src = "";
        desc.innerHTML = "";
        return;
      }
      else if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        //console.log(data);
      
        main.innerHTML = data['name'];
        temp.innerHTML = data['main']['temp']+"°";
        clouds.src = "http://openweathermap.org/img/wn/"+data['weather'][0]['icon']+"@2x.png";
        desc.innerHTML = data['weather'][0]['description'];

        input.value ="";
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

});
