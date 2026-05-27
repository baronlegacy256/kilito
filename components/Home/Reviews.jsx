import React from "react";
import Link from "next/link";

const reviews = [
  {
    title: "AMAZING SAFARI!",
    author: "TripAdvisor Traveler",
    date: "May 2023",
    content: "I did the safari in May with Godi to Ngorongoro — it was an amazing experience!! Godi is really nice, professional, patient, and really friendly. The park was amazing, we saw lots of animals there. I recommend at 100%!!!",
    image: "/assets/images/home/safari.jpg"
  },
  {
    title: "AWESOME TRIP!",
    author: "Audrey O'Neal",
    date: "Jun 2022",
    content: "I was a little hesitant about visiting Africa with just my daughter, but our guide Gordy spent three weeks catering to our every need on the safaris. I would trust him with my life! Don't go for second best — get the best guide to help you.",
    image: "/assets/images/cultural.jpg"
  },
  {
    title: "BEST SAFARI EXPERIENCE IN AFRICA",
    author: "Christian W",
    date: "Sep 2022",
    content: "Absolutely perfect safari experience with the best guide ever. Highly recommendable! The staff was attentive and had great knowledge of the sights we were visiting, as well as in-depth knowledge about cultural experiences we had.",
    image: "/assets/images/home/trekking.jpeg"
  },
  {
    title: "GREAT SAFARI AND TREKKING TRIP",
    author: "Mister GK",
    date: "Dec 2021",
    content: "We had the most enjoyable and adventurous ending to our Christmas couples trip with our friendly guide. Day one we went to Ngorongoro Crater for an exciting safari, and day two to the foot of Kilimanjaro. Everything was absolutely perfect!",
    image: "/assets/images/home/slider.jpg"
  }
];

function Reviews() {
  return (
    <div id="opinion-zone" className="full-width-div vignettes-zone" style={{ padding: "60px 0" }}>
      <style>{`
        .reviews-section-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (max-width: 767px) {
          .reviews-section-wrapper {
            padding: 0 10px;
          }
        }
        .review-card-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
          margin-bottom: 24px;
        }
        .review-card-link-wrapper:hover,
        .review-card-link-wrapper:focus {
          text-decoration: none;
          color: inherit;
        }
        .review-card-static {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 480px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #eaeaea;
        }
        .review-card-link-wrapper:hover .review-card-static {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        .review-card-body {
          padding: 20px 20px 10px 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: flex-start;
          overflow: hidden;
        }
        .review-card-title-style {
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          color: #222222;
          margin-bottom: 8px;
          line-height: 1.4;
          height: 42px;
        }
        .review-card-stars {
          margin-bottom: 12px;
          height: 18px;
        }
        .review-card-stars .fa-star {
          color: #f39c12;
          margin-right: 3px;
          font-size: 13px;
        }
        .review-card-text-style {
          font-size: 13.5px;
          color: #555555;
          line-height: 1.6;
          margin-bottom: 0;
          flex-grow: 1;
        }
        .review-card-image-wrapper {
          width: 100%;
          height: 150px;
          overflow: hidden;
          position: relative;
        }
        .review-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .review-card-link-wrapper:hover .review-card-image {
          transform: scale(1.05);
        }
        .review-card-footer {
          background-color: #f8f9fa;
          border-top: 1px solid #eeeeee;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 46px;
        }
        .review-card-author {
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          color: #333333;
          letter-spacing: 0.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 60%;
        }
        .review-card-date {
          font-size: 11px;
          color: #777777;
          text-transform: uppercase;
          font-weight: 600;
        }
      `}</style>

      <h2 className="lvl1-zone-title" style={{ marginBottom: "40px" }}>
        Traveler Reviews
        <br />
        <div className="lvl1-zone-subtitle">
          <span id="average-rating">4.7</span>/5
          <i className="rating-icon fa fa-star active" aria-hidden="true" style={{ color: "#f39c12", marginLeft: "5px" }}></i>
          <i className="rating-icon fa fa-star active" aria-hidden="true" style={{ color: "#f39c12" }}></i>
          <i className="rating-icon fa fa-star active" aria-hidden="true" style={{ color: "#f39c12" }}></i>
          <i className="rating-icon fa fa-star active" aria-hidden="true" style={{ color: "#f39c12" }}></i>
          <i className="rating-icon fa fa-star active" aria-hidden="true" style={{ color: "#f39c12" }}></i>
          &nbsp;Average Rating
        </div>
      </h2>

      <div className="reviews-section-wrapper">
        <div className="row">
          {reviews.map((review, idx) => (
            <div key={idx} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Link href="/customer-reviews" className="review-card-link-wrapper">
                <div className="review-card-static">
                  <div className="review-card-body">
                    <div 
                      className="review-card-title-style"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {review.title}
                    </div>
                    <div className="review-card-stars">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <p 
                      className="review-card-text-style" 
                      title={review.content}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {review.content}
                    </p>
                  </div>
                  <div className="review-card-image-wrapper">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="review-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="review-card-footer">
                    <span className="review-card-author" title={review.author}>
                      {review.author}
                    </span>
                    <span className="review-card-date">{review.date}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
