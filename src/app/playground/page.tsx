"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
  fetchAllRestaurants,
  fetchRestaurantById,
  searchRestaurantByName,
  fetchRecommendations,
} from "../../services/api";

export default function Playground() {
  const [data, setData] = useState<any>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const fetchAllData = async () => {
    setActiveButton("all");
    setError(null);
    try {
      const response = await fetchAllRestaurants();
      const limitedData = response.listKuliner.slice(0, 2);
      setData({ listKuliner: limitedData });
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setActiveButton(null);
    }
  };

  const fetchDataByID = async () => {
    setActiveButton("byID");
    setError(null);
    try {
      const response = await fetchRestaurantById(1);
      setData({ listKuliner: response.data.listKuliner });
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setActiveButton(null);
    }
  };

  const fetchDataByName = async () => {
    setActiveButton("byName");
    setError(null);
    try {
      const response = await searchRestaurantByName("sate");
      setData(response);
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setActiveButton(null);
    }
  };

  const fetchDataByNameWithLocation = async () => {
    setActiveButton("byNameWithLocation");
    setError(null);
    try {
      const response = await searchRestaurantByName(
        "sate",
        -6.120694599999999,
        106.1501611
      );
      setData(response);
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setActiveButton(null);
    }
  };

  const fetchDataRecommendation = async () => {
    setActiveButton("recommendation");
    setError(null);
    try {
      const response = await fetchRecommendations(
        -6.120694599999999,
        106.1501611
      );
      setData({ listKuliner: response.listKuliner });
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setActiveButton(null);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md fixed w-full top-0 left-0">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Back Arrow */}
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>

          {/* Brand Name */}
          <h1 className="text-2xl font-bold text-center text-black">
            KUKULINER
          </h1>

          {/* Info Button */}
          <Modal />
        </div>
      </div>

      <div className="container mx-auto my-10 px-4 py-8 ">
        <h1 className="text-2xl font-bold mb-6 text-center">API Playground</h1>
        <div className="space-y-4">
          {/* Fetch All Data */}
          <button
            className="px-4 py-2 rounded w-full flex justify-center items-center bg-blue-500 text-white"
            onClick={fetchAllData}
            disabled={activeButton === "all"}
          >
            {activeButton === "all" ? (
              <span className="spinner"></span>
            ) : (
              "Get All Data (2 for this demo)"
            )}
          </button>

          {/* Fetch Single Data by ID */}
          <button
            className="mt-2 px-4 py-2 rounded w-full flex justify-center items-center bg-green-500 text-white"
            onClick={fetchDataByID}
            disabled={activeButton === "byID"}
          >
            {activeButton === "byID" ? (
              <span className="spinner"></span>
            ) : (
              "Get Single Data by ID"
            )}
          </button>

          {/* Fetch Data by Name */}
          <button
            className="mt-2 px-4 py-2 rounded w-full flex justify-center items-center bg-yellow-500 text-white"
            onClick={fetchDataByName}
            disabled={activeButton === "byName"}
          >
            {activeButton === "byName" ? (
              <span className="spinner"></span>
            ) : (
              "Get Data by Name (Sate)"
            )}
          </button>

          {/* Fetch Data by Name with Location */}
          <button
            className="mt-2 px-4 py-2 rounded w-full flex justify-center items-center bg-purple-500 text-white"
            onClick={fetchDataByNameWithLocation}
            disabled={activeButton === "byNameWithLocation"}
          >
            {activeButton === "byNameWithLocation" ? (
              <span className="spinner"></span>
            ) : (
              "Get Data by Name (Sate) with Location"
            )}
          </button>

          {/* Fetch Data by Recommendation Based on User Location */}
          <button
            className="mt-2 px-4 py-2 rounded w-full flex justify-center items-center bg-red-500 text-white"
            onClick={fetchDataRecommendation}
            disabled={activeButton === "fetchDataRecommendation"}
          >
            {activeButton === "fetchDataRecommendation" ? (
              <span className="spinner"></span>
            ) : (
              "Get Data by Recommendation Based on User Location"
            )}
          </button>
        </div>

        {/* This is the render data result */}
        {showResult && (
          <div className="mt-4">
            <div className="bg-gray-100 p-4 text-black rounded overflow-auto max-w-full">
              <pre className="whitespace-pre-wrap break-words">
                {activeButton ? (
                  <div className="flex items-center justify-center">
                    <span className="spinner"></span>
                  </div>
                ) : error ? (
                  error
                ) : (
                  JSON.stringify(data, null, 2)
                )}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Modal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        className="text-gray-600 hover:text-gray-800 font-bold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white text-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="md:text-3xl font-semibold">[!INFO]</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 md:text-lg leading-relaxed">
                    Due to Vercel reducing serverless function execution
                    timeouts for hobby packages, as well as limited use of the
                    Distance Matrix API, I used 2 different approaches: Distance
                    Matrix API (main) and Haversine (fallback).
                  </p>
                  <p className="my-4 md:text-lg leading-relaxed">
                    So for this demo, in searchByNameWithLocation and
                    getUserRecommendation, I added a description of the method
                    used in the distance key value to find out which approach
                    was executed, like this for example &quot;distance&quot;:
                    &quot;0.00 km | Haversine&quot;, or &quot;distance&quot;:
                    &quot;0.00 km | Distance Matrix&quot;.
                  </p>
                  <p className="my-4 md:text-lg leading-relaxed">
                    You can learn the difference between <i>Distance Matrix</i>{" "}
                    and <i>Haversine formula</i> in{" "}
                    <Link
                      href="/docs/third-api#1-why-google-maps-distance-matrix-api"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      this documentation
                    </Link>{" "}
                    and also learn the difference between Search Restaurants by
                    Name and Search Restaurants by Name with Location in{" "}
                    <Link
                      href="/docs/api#3-search"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      this documentation
                    </Link>
                    .
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
