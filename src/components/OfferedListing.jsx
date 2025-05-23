import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import SkletonLoading from "./SkletonLoading";
import { useNavigate } from "react-router-dom";

const OfferedListing = () => {
  const [loading, setLoading] = useState(true);
  const [offerListings, setOfferListings] = useState([]);
  const navigate = useNavigate();

  //===Load Data ===//
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/posts?type=all&offer=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const json = await res.json();
        if (json.success === false) {
          console.log("Failed to fetch listings");
        } else {
          // Ensure we're setting unique listings
          setOfferListings(json);
        }
      } catch (error) {
        console.log("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  //====SLider Functions=====//
  function SamplePrevArrow({ onClick }) {
    return (
      <div
        className="absolute bottom-0 left-5 z-10 p-2 px-5 sm:px-8 sm:p-4 sm:py-3 rounded-s-md bg-brand-blue flex items-center justify-center border-2 border-transparent cursor-pointer shadow-lg hover:bg-white/90 hover:border-2 hover:border-brand-blue duration-300 group sm:right-32 sm:left-auto"
        onClick={onClick}
      >
        <BsArrowLeft className="text-white text-xl sm:text-xl group-hover:text-brand-blue" />
      </div>
    );
  }

  function SampleNextArrow({ onClick }) {
    return (
      <div
        className="absolute bottom-0 right-5 sm:right-2 px-5 sm:px-8 sm:py-3 z-10 p-2 sm:p-4 rounded-e-md bg-brand-blue flex items-center justify-center border-2 border-transparent cursor-pointer shadow-lg hover:bg-white/90 duration-300 group hover:border-brand-blue"
        onClick={onClick}
      >
        <BsArrowRight className="text-white text-xl sm:text-xl group-hover:text-brand-blue" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: offerListings.length > 4,
    lazyLoad: true, // Enable lazy loading
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="content">
          <h2 className="text-3xl font-bold sm:text-5xl font-heading text-brand-blue sm:text-left">
            Enjoy Our{" "}
            <span className="bg-amber-400 px-1 pb-1">Exciting Discount</span>
          </h2>
          <p className="font-content font-medium text-sm sm:text-lg mt-4 max-w-3xl">
            Find Your Perfect Home! Whether you want to rent or buy, we've got
            great deals for you. Discover comfortable rentals and awesome
            properties for sale. Your dream home is just a click away!
          </p>
        </div>

        <div className="post_container !mt-4">
          {loading ? (
            <SkletonLoading />
          ) : offerListings.length > 0 ? (
            <div className="slider_container">
              <Slider {...settings} className="z-10 relative">
                {offerListings.map((listing) => (
                  <div key={listing._id} className="px-2">
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <p>No discount offers available at the moment.</p>
          )}
        </div>

        <div className="btn_container flex items-center justify-center">
          <button
            className="group relative inline-flex items-center overflow-hidden rounded bg-brand-blue px-8 py-3 text-white"
            onClick={() => navigate("/search")}
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:me-4">
              Explore More
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferedListing;
