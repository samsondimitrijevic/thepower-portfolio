import "./style.css";
import { IMAGES } from "./constants";

const appElement = document.getElementById("carousel-container");

const getCarouselTemplate = () => {
  return /*html*/ ` 
  <div id="thepower-carousel" class="thepower-carousel">
      <ul class="scrollable-set styled-scrollabar"></ul>
      <div class="image-preview"></div>
  </div> `;
};

appElement.innerHTML += getCarouselTemplate();

const scrollableElement = document.querySelector(".scrollable-set");
const imagePreviewElement = document.querySelector(".image-preview");
let imageInterval;

const getScrollableElementTemplate = (image, index) => {
  return /*html*/ `
    <li role="button" class="clickable">
        <img src="${image.src}" alt="${image.alt}" data-index="${index}">
    </li>
  `;
};

const setupScrollableSet = () => {
  IMAGES.forEach((image, index) => {
    const template = getScrollableElementTemplate(image, index);
    scrollableElement.innerHTML += template;
  });
};

let actualImageIndex = 0;
const setupCarouselInterval = () => {
  imageInterval = setInterval(() => {
    if (actualImageIndex === IMAGES.length - 1) {
      actualImageIndex = 0;
    } else {
      actualImageIndex += 1;
    }
    setupImagePreview(IMAGES[actualImageIndex].src);
  }, 3000);
};

const resetCarouselPreview = () => {
  clearInterval(imageInterval);
  setupCarouselInterval();
};

// const setupImagePreview = (src) => {
//   imagePreviewElement.style.backgroundImage = `url(${src})`;
//   const selectedImage = document.querySelector(`image[src="${src}"]`);
//   const imageIndex = Number(selectedImage.getAttribute("data-index"));
//   actualImageIndex = imageIndex;
//   resetCarouselPreview();
//   selectedImage.scrollIntoView({  behavior: "smooth"  });
// };

const setupImagePreview = (src) => {
  imagePreviewElement.style.backgroundImage = `url(${src})`;
  const selectedImage = document.querySelector(`img[src="${src}"]`);
  const liElement = selectedImage.parentNode;
  const imageIndex = Number(selectedImage.getAttribute("data-index"));
  actualImageIndex = imageIndex;
  resetCarouselPreview();
  liElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
};

const handleChangePreview = (event) => {
  const image = event.target.children[0];
  setupImagePreview(image.getAttribute("src"));
};

const addScrollableListeners = () => {
  const scrollable = document.querySelectorAll("li.clickable");
  scrollable.forEach((scrollable) =>
    scrollable.addEventListener("click", handleChangePreview)
  );
};

setupScrollableSet();
setupImagePreview(IMAGES[0].src);
addScrollableListeners();
setupCarouselInterval();
