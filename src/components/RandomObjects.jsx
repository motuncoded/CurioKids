import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";

function RandomObjects() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("./random.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        const initialIndex = Math.floor(Math.random() * data.length);
        setCurrentIndex(initialIndex);
        setHistory([initialIndex]);
      })
      .catch((err) => console.error("Failed to load cards:", err));
  }, []);

  const showNextCard = () => {
    if (cards.length > 0) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * cards.length);
      } while (nextIndex === currentIndex); // avoid showing same card

      setCurrentIndex(nextIndex);
      setHistory((prev) => [...prev, nextIndex]);
    }
  };

  const showPreviousCard = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const prevIndex = newHistory[newHistory.length - 1];
      setCurrentIndex(prevIndex);
      setHistory(newHistory);
    }
  };

  const currentCard = currentIndex !== null ? cards[currentIndex] : null;

  return (
    <div>
      {currentCard && (
        <Card
          imageUrl={currentCard.imageUrl}
          name={currentCard.name}
          onNext={showNextCard}
          onPrev={showPreviousCard}
        />
      )}
    </div>
  );
}

export default RandomObjects;
