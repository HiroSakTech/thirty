
var client = contentful.createClient({
  space: 'whaiavtd1ssp',
  accessToken: 'LeO9eBOQBOlg9DG0Ou3rr6hMIBUMCPWdypZl9zvqO-4'
})


client.getEntries({
  content_type: 'contents',
  order: '-fields.volume'
})
.then(function (entries) {
  items = entries.items

  entries.items.forEach(function (entry) {
    let message = entry.fields.message;
    let title = entry.fields.title;
    let headerImage = 'https:' + entry.fields.headerImage.fields.file.url;
    let entryid = entry.sys.id;
    let youtube = entry.fields.youtube;
    let note = entry.fields.note;
    let html =
      `<div class="contents row">
        <div class="contents--image col-lg-6 col-12">
          <img src= ${headerImage} alt="no image" class="contentsImage">
        </div>
        <div class="contents--texts col-lg-6 col-12">
          <div class="contents--texts__link">
            <div class="linkIcons">
              <a href=${youtube} class="youtubeLink" target="_blank" rel="noopener noreferrer" >
                <i class="fab fa-youtube youtubeIcon Icons"></i>
              </a>
              <a href=${note} class="noteLink" target="_blank" rel="noopener noreferrer" >
                <i class="far fa-sticky-note noteIcon Icons"></i>
              </a>
            </div>
          </div>
          <div class="contents--texts__message">
            <h3 class="message">${message}</h3>
          </div>
          <div class="contents--texts__title">
            <h3 class="title"> ${title}</h3>
          </div>
          <div class="contents--texts__more" data-entry-id=${entryid}>
            MORE
          </div>
        </div>
      </div>`

    $('.contentsField').append(html);
  })
})

$(document).on('click',".contents--texts__more", function() {
  let id = $(this).data("entry-id");
  var entry = items.find(item => item.sys.id == id);
    const title2 = entry.fields.title;
    const youtube = entry.fields.youtube;
    const note = entry.fields.note;
    const modalImage = 'https:' + entry.fields.modalImage.fields.file.url;
    const body = documentToHtmlString(entry.fields.body);
    let modalview =
    `<div class="modal js-modal container.fluid">
      <div class="modal__bg js-modal-close"></div>
      <div class= "modal__content row">
        <div class="leftField col-lg-6 col-12">
          <div class="modal-image">
            <img src=${modalImage} alt="no image" class="contentsImage">
          </div>
          <div class="linkArea">
            <div class="icons">
              <a href=${youtube} class="youtubeLink" target="_blank" rel="noopener noreferrer" >
                <i class="fab fa-youtube youtubeIcon Icons"></i> Youtube
              </a>
              <a href=${note} class="noteLink" target="_blank" rel="noopener noreferrer" >
                <i class="far fa-sticky-note noteIcon Icons"></i> note
              </a>
            </div>
          </div>
        </div>
        <div class="modal-texts col-lg-6 col-12">
          <div class="modal-titlearea">
            <h2 class="modal-title">${title2}</h2>
          </div>
          <div id="modal-body">
          </div>
          <div class="closeArea">
            <a class="js-modal-close closeBtn" href="">CLOSE</a>
          </div>
        </div>
      </div>
    </div>`
    $('.contentsField').append(modalview);
    document.getElementById('modal-body').innerHTML = body;
    $('.js-modal').fadeIn();
      return false;
  })




$(function(){
  $(document).on('click',".js-modal-close", function(){
      $('.js-modal').fadeOut();
      $('.js-modal').remove();
      return false;
  });
});


$(function(){
  $(window).scroll(function (){
      $('.firstmessage').each(function(){
          var position = $(this).offset().top;
          var scroll = $(window).scrollTop();
          var windowHeight = $(window).height();
          if (scroll > position - windowHeight + 200){
            $(this).addClass('fadein');
          }
      });
  });
});

