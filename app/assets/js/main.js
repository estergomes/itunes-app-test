var contentBox = document.querySelector('.content-box');
function showEntry(data) {
  var output = '';

  data.map(function (dt) {
    output += `
      <div class="album">
        <div class="image">
          <img src=${dt['im:image'][2]['label']} alt="">
        </div>
          <div class="text">
            <h3>${dt['im:artist'].label} - ${dt.title.label}</h3>
            <ul>
              <li><span class="medium-text">Category</span> ${dt.category.attributes.term}</li>
              <li><span class="medium-text">Release: </span> ${dt['im:releaseDate'].attributes.label} </li>
            </ul>
          </div>
      </div>`;

    contentBox.innerHTML = output;
  })
}

function getData() {
  fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    .then(response => response.json())
    .then(data => {
      console.log(data.feed.entry)
      showEntry(data.feed.entry)
    })
    .catch(err => console.log(err));
}
getData();