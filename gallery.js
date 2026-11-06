// Select the gallery elements
const filterButtons = document.querySelectorAll(".filter-button");
const galleryCards = document.querySelectorAll(".gallery-card");
const noResults = document.querySelector(".no-results");

// Filter photographs by category
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.category;

    // Update the active button
    filterButtons.forEach(function (filterButton) {
     filterButton.classList.remove("active");
});
  button.classList.add("active");

  // Counting the visible photographs
  let visibleCount = 0;
 

  galleryCards.forEach(function (card) {
    const cardCategory = card.dataset.category;

    const shouldShow = 
    selectedCategory === "all" ||
    cardCategory === selectedCategory;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
   });
});

  // Select the lightbox elements
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  // Store the photographs currently available in the gallery
  let visibleImages = [];
  let currentImageIndex = 0;
  let previouslyFocusedElement = null;

  // Get the currently visible gallery images
  function updateVisibleImages() {
    visibleImages = Array.from(galleryCards)
    .filter(function (card) {
      return !card.hidden
    })
    .map(function (card) {
      return {
        image: card.querySelector("img"),
        title: card.querySelector("h3").textContent
      };
    })
  }

  // Open the lightbox
  function openLightbox(index) {
    updateVisibleImages();

    currentImageIndex = index;
    previouslyFocusedElement = document.activeElement;

    showLightboxImage();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  // Display the selected photograph
  function showLightboxImage() {
    const selectedImage = visibleImages[currentImageIndex]

      if (!selectedImage) {
        return;
      }

      lightboxImage.src = selectedImage.image.src;
      lightboxImage.alt = selectedImage.image.alt;
      lightboxCaption.textContent = selectedImage.title;
  }

  // Open a pgorogrephg when it's card is clicked
  galleryCards.forEach(function (card) {
    const imageButton = card.querySelector(".image-button")

    imageButton.addEventListener("click", function () {
      updateVisibleImages();

      const image = card.querySelector("img");

      currentImageIndex = visibleImages.findIndex(function (item) {
        return item.image === image;
      });

      openLightbox(currentImageIndex);
    });
  });

  // Move to the previous photograph
  function showPreviousImage() {
    currentImageIndex =
      (currentImageIndex - 1 + visibleImages.length) %
      visibleImages.length;

      showLightboxImage();
  }

  // Move to the next photograph
  function showNextImage() {
    currentImageIndex =
    (currentImageIndex + 1) % visibleImages.length;

    showLightboxImage();
  }

  // Close the lightbox
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    lightboxImage.src = "";
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Button events
  closeButton.addEventListener("click", closeLightbox);

  previousButton.addEventListener("click", showPreviousImage);

  nextButton.addEventListener("click", showNextImage);

  // Close when the dark background itself is clicked
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains ("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if(event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }
  })