import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressConfirmationCard from "./AddressConfirmationCard";
import "./admincard.css";

function AddressConfirmationPage() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/relocation/request/all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching address requests:", error);
    }
  };

  const handleAccept = async (request, userId, relocationAction) => {
    console.log(request);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/relocation/request/accept",
        {
          city: request.city,
          street: request.street,
          houseNumber: request.houseNumber,
          apartmentNumber: request.apartmentNumber,
        },
        {
          params: {
            userId: userId,
            relocationAction: relocationAction,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Запрос успешно принят");
        setRequests(requests.filter((req) => req != request));
      } else {
        console.error("Ошибка при принятии запроса");
      }
    } catch (error) {
      console.error("Error accepting address request:", error);
    }
  };

  const handleDeny = async (request, userId, relocationAction) => {
    const data = {
      city: request.city,
      street: request.street,
      houseNumber: request.houseNumber,
      apartmentNumber: request.apartmentNumber,
    };
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/relocation/request/deny`,
        {
          data: data,
          params: {
            userId: userId,
            relocationAction: relocationAction,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Запрос успешно отклонен");
        setRequests(requests.filter((req) => req != request));
      }
    } catch (error) {
      console.error("Error denying address request:", error);
    }
  };

  return (
    <div className="address-confirmation-page">
      {requests.length === 0 ? (
        <p>No address change requests found.</p>
      ) : (
        requests.map((request) => (
          <AddressConfirmationCard
            key={request.id}
            request={request}
            onAccept={handleAccept}
            onDeny={handleDeny}
          />
        ))
      )}
    </div>
  );
}

export default AddressConfirmationPage;
