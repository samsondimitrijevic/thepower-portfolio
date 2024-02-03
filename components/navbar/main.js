import "./style.css";
import { DOCUMENTATION } from "./constants";

const toggleButton = document.getElementById("menu-toggle");
const menuContentElement = document.getElementById("menu-content");
const inputSearch = document.getElementById("menu-search");
const favoritesListElement = document.querySelector(
  "#menu-content > .favorites"
);
const searchBlockElement = document.querySelector("#menu-content > .search");

const getDocumentationTemplate = (title, url) => {
  return `
      <li class="favorite-element">
      <a href="${url}">${title}</a>
      </li>`;
};

const generateList = (listId, elements) => {
  const ulElement = document.createElement("ul");
  ulElement.id = listId;

  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });
  return ulElement;
};

const setupFavoritesList = () => {
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUl = generateList("favorites-list", favorites);

  favoritesListElement.append(favoritesUl);
};

const normalizeText = (text) => text.trim().toLowerCase();

const handleSearch = (event) => {
  const { value } = event.target;
  const normalizedValue = normalizeText(value);

  const filteredDocumentation = DOCUMENTATION.filter((doc) => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizedValue);
  });

  const searchUl = generateList("search-list", filteredDocumentation);

  const previousUl = document.getElementById("search-list");
  if (previousUl) {
    previousUl.remove();
  }

  searchBlockElement.append(searchUl);
};

const handleOpenMenu = () => {
  menuContentElement.classList.toggle("menu-content--open");
};

toggleButton.addEventListener("click", handleOpenMenu);
inputSearch.addEventListener("input", handleSearch);

setupFavoritesList();
