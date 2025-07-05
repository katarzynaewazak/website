(function() {
    "use strict";

    /**
   * Snippet from: https://programming.bogdanbucur.eu/how-to-get-the-url-anchor-with-javascript/
   * @returns Anchor part of URL
   */
  function getAnchor() {
    return (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : null;
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  function setValues(title, category, customer, date, subTitle, description, imageLinks, anchor) {
    //document.getElementById('galleryTitle').innerHTML = title;
    //document.getElementById('galleryCategory').innerHTML = category;
    //document.getElementById('galleryCustomer').innerHTML = customer;
    //document.getElementById('galleryDate').innerHTML = date;
    //document.getElementById('gallerySubTitle').innerHTML = subTitle;
    //document.getElementById('galleryDescription').innerHTML = description;

    const galleryImages = document.getElementById('galleryImages');
    galleryImages.innerHTML = '';

    if(!imageLinks) {
        return;
    }

    var imageElements = "";

    function processImages() {
        imageLinks.forEach(imageLink => {
            var imageElement = `<div class="swiper-slide portfolio-content"><a href="assets/img/projects/${anchor.replace(/\/+$/, '')}/${imageLink}" data-gallery="portfolio-gallery-product"><img src="assets/img/projects/${anchor.replace(/\/+$/, '')}/${imageLink}" alt=""></a></div>`
            imageElements += imageElement;
        });
    }

    processImages();
    if(imageLinks.length < 4) {
        //processImages();
    }

    galleryImages.innerHTML = imageElements;
    initSwiper();
  }
  
  function setDefaults(){
    console.log("default loading");
    setValues("", "", "", "", "", "", null);
  }

  function processGallery(anchor, json) {
    //console.log(json);

    if(!json) {
        setDefaults();
        return;
    }

    const title = json.title || null, 
    category = json.category || null,
    customer = json.customer || null, 
    date = json.year || null,
    subTitle = json.subTitle || null,
    description = json.description || null,
    imageLinks = json.photosOrder || null;

    setValues(title, category, customer, date, subTitle, description, imageLinks, anchor);
  }

  function loadPortfolio() {
    const anchor = getAnchor();

    if(anchor == null){
        setDefaults();
        return;
    }
    const path = `assets/img/projects/${anchor.replace(/\/+$/, '')}/gallery.json`;

    console.log(path);
    

    fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      processGallery(anchor, json);
    })
    .catch((error) => {
      console.log(error);
      setDefaults();
    });

  }


  window.addEventListener('load', loadPortfolio);
  window.addEventListener("hashchange", loadPortfolio, false);

    


})();


