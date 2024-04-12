import { useState } from "react";
import "./Rating.css";
import { Button, Modal } from "react-bootstrap";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";

export default function RatingModal({ userRated, requestId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="me-2 answer-request-btn opinion-request-btn"
        onClick={handleShow}
      >
        WYSTAW OPINIĘ UŻYTKOWNIKOWI
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wystawianie opinii</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RatingForm
            handleClose={handleClose}
            userRated={userRated}
            requestId={requestId}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function RatingForm({ userRated, requestId }) {
  const [ratingText, setRatingText] = useState();
  const [score, setScore] = useState();

  const handleChangeText = (event) => {
    setRatingText(event.target.value);
  };

  const handleChangeScore = (event) => {
    setScore(event.target.value);
  };

  const handleSendRating = async () => {
    if (!score) return true;
    const accessToken = getAuthTokenFromCookie();
    const ratingData = {
      user_rated: userRated,
      score,
      text: ratingText,
      request: requestId,
    };
    try {
      const response = await fetch("http://localhost:4000/rating/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) {
        if (response.status === 404) return "not found";
        else throw new Error("Wystąpił błąd");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <>
      <label for="rating-score" class="form-label">
        Wybierz ocenę (1-5):
      </label>
      <select
        class="form-select"
        id="rating-score"
        aria-label="Default select example"
        required
        onChange={handleChangeScore}
      >
        <option selected>Wybierz ocenę</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>

      <label for="rating-text" class="form-label">
        Napisz opinię:
      </label>
      <textarea
        id="rating-text"
        rows="4"
        cols="50"
        className="form-control"
        onChange={handleChangeText}
        required
      />
      <button className="mt-3 btn btn-primary" onClick={handleSendRating}>
        Wyślij ocenę
      </button>
    </>
  );
}
