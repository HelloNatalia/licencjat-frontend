import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RatingStars({ userId }) {
  const navigation = useNavigate();
  const [ratingData, setRatingData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function getUserRatingInfo() {
      const res = await fetch(
        `http://localhost:4000/rating/user-ratings-info/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        if (res.status === 404) navigation("/announcements");
      }
      const data = await res.json();
      setRatingData(data);
      setIsLoading(false);
    }
    getUserRatingInfo();
  }, []);
  const elements = [];
  if (isLoading) return <div>Loading ...</div>;
  else {
    const roundedScore = Math.floor(ratingData.rate);

    for (let i = 1; i < 6; i++) {
      if (roundedScore >= i) elements.push(<i class="bi bi-star-fill"></i>);
      else elements.push(<i class="bi bi-star"></i>);
    }
  }

  return (
    <div className="d-flex mt-3 ms-3">
      <div className="mb-3">{elements}</div>
      <p className="ms-1 stars d-none d-sm-block">
        {ratingData.rate} ({ratingData.total})
      </p>
    </div>
  );
}
