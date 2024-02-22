import { TECHNOLOGIES_URL } from "../constants";

// const apiRequest = fetch(TECHNOLOGIES_URL)
// .then((res) => res.json())
// .then((cardsData) => {
//     cards = cardsData;
//     setupCards();
// });

// ***********
// GET TECHNOLOGIES
// ***********
export const getTechnologies = async (sucessCb, errorCb) => {
  try {
    // throw new Error("could not grab data");
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();
    sucessCb(cardsData);
  } catch (err) {
    errorCb(err);
  }
};

// ***********
// POST REVIEW
// ***********
let isFetching = false;
export const postReview = async (currentCard, vote, successCb) => {
  if (isFetching) {
    return;
  }

  isFetching = true;
  const updateData = { ...currentCard };
  updateData.reviews++;
  updateData.score =
    (currentCard.score * currentCard.reviews + vote) / updateData.reviews;

  // console.log(`Current: ${currentCard}`);
  // console.log(`Updated: ${updateData}`);

  try {
    const res = await fetch(`${TECHNOLOGIES_URL}/${currentCard.id}`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateData }),
    });
    const updatedCard = await res.json();
    // cards = cards.map((card) =>
    //   card._id === updatedCard._id ? updatedCard : card
    // );
    // setupCards();
    // addCardsListeners();
    // setupModalData(updatedCard);
    // closeModal();
    successCb(updatedCard);
    isFetching = false;
  } catch (err) {
    isFetching = false;
    // error handling
    console.log(`Error: ${err}`);
  }
};
