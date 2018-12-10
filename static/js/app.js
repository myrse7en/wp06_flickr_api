import { Config } from '../../config.js';

let config = new Config();
const API_KEY = config.getKey();
const API_SECRET = config.getSecret();
//
// request header and put into nav id
$.get('../../components/header.html', function(response) {
  $('#nav').html(response);
});
//
// handler form submission using jQuery to listen for event
$("#search_text").submit((event) => {
  event.preventDefault();
  let keyword = $("#keyword").val();

  let url = 'https://api.flickr.com/services/rest/';

  let data = {
    method: 'flickr.photos.search',
    api_key: API_KEY,
    text: keyword,
    format: "json",
    nojsoncallback: "1"
  };


  $.getJSON(url, data, function(response) {
    console.log(response);
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    let photo_card = '';

    for (let i = 0; i < response.photos.photo.length; i++) {
        photo_card += `<div class="col-md-4"><figure class="photo_card"><a href="https://farm${response.photos.photo[i].farm}.staticflickr.com/${response.photos.photo[i].server}/${response.photos.photo[i].id}_${response.photos.photo[i].secret}.jpg"><img src="https://farm${response.photos.photo[i].farm}.staticflickr.com/${response.photos.photo[i].server}/${response.photos.photo[i].id}_${response.photos.photo[i].secret}.jpg" alt="${response.photos.photo[i].title}" class="searched_photo"></a><figcaption>${response.photos.photo[i].title}</figcaption></figure></div>`
      };
      $(".photos").html(photo_card);
  });
});
