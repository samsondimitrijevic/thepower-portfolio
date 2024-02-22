import {
  getModalTemplate,
  getContainerTemplate,
  getCardTemplate,
  getModalBodyTemplate,
} from "./scripts/templates";

import { getTechnologies, postReview  } from "./scripts/api";

import { 
  addCardsListeners, 
  addModalListeners, 
  addScoreButtonListeners,
} from "./scripts/listeners";
import "./style.css";


const appElement = document.getElementById("gallery-container");

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const modalElement = document.getElementById("thepower-modal");
const galleryElement = document.getElementById("thepower-gallery");
const loadingElement = document.querySelector(".thepower-gallery > h1");
let cards;
let currentCard;

const setupCards = () => {
  loadingElement.remove();
  galleryElement.innerHTML = "";

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const setupGlobalCardsFromAPI = (updatedCard) => {
  cards = cards.map((card) =>
  card._id === updatedCard._id ? updatedCard : card
  );
setupCards();
addCardsListeners(handleOpenModal);
setupModalData(updatedCard);
closeModal();
};

const handleReview = (event) => {
  const vote = Number(event.target.getAttribute("data-score"));
  //  console.log(vote);
  postReview(currentCard, vote, setupGlobalCardsFromAPI);
};



const setupModalData = (cardData) => {
  currentCard = cardData;
  modalTitle.textContent = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  addScoreButtonListeners(handleReview);
};

const handleOpenModal = (event) => {
  const cardId = event.target.id;
  // console.log(cardId);
  // console.log(cards);
  const cardData = cards.find((card) => card._id == cardId);
  setupModalData(cardData);
  // console.log(cardData);
  modalElement.style.display = "block";
};



const closeModal = () => {
  modalElement.style.display = "none";
};


const setGlobalCardsFromAPI = (cardsData) => {
  cards = cardsData;
  setupCards();
  addCardsListeners(handleOpenModal);
};

const setErrorMessageFromAPI = (err) => {
  loadingElement.textContent = `Error: ${err}`;
};

getTechnologies(setGlobalCardsFromAPI, setErrorMessageFromAPI);
addModalListeners(closeModal);
