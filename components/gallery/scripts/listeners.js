export const addCardsListeners = (handler) => {
  const cards = document.querySelectorAll(".thepower-gallery .card");
  cards.forEach((card) => card.addEventListener("click", handler));
};

export const addModalListeners = (handler) => {
  const closeButton = document.getElementById("modal-close");
  closeButton.addEventListener("click", handler);
};

export const addScoreButtonListeners = (handler) => {
  const scoreButtons = document.querySelectorAll(".review-container > button");
  scoreButtons.forEach((button) => {
    button.addEventListener("click", handler);
  });
};
