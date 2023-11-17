import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Reservation = {
  id: number;
  psikolog_name: string;
  datetime: string;
  feedback: string | null;
};

const FeedbackPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const psikologId = 1; // Replace with the logged-in psychologist's ID or fetch it from somewhere

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/psikolog/booked/${psikologId}`);
        setReservations(response.data.data); // Assuming response.data contains the reservations array
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    fetchReservations();
  }, [psikologId]);

  const handleFeedbackSubmit = async (reservationId: number, feedback: string) => {
    try {
      const updatedReservations = reservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, feedback } : reservation
      );
      setReservations(updatedReservations);

      await axios.post(`http://localhost:3010/psikolog/feedback/${reservationId}`, { feedback });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Handle error state or display an error message to the user
    }
  };

  const handleFeedbackDelete = async (reservationId: number) => {
    try {
      const updatedReservations = reservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, feedback: null } : reservation
      );
      setReservations(updatedReservations);

      await axios.delete(`http://localhost:3010/psikolog/feedback/${reservationId}`);
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div>
      <h1>Reservations</h1>
      {Array.isArray(reservations) && reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>{reservation.psikolog_name}</p>
            <p>{reservation.datetime}</p>
            {reservation.feedback ? (
              <div>
                <p>{reservation.feedback}</p>
                <button onClick={() => handleFeedbackDelete(reservation.id)}>Delete Feedback</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const feedback = formData.get('feedback') as string;
                  handleFeedbackSubmit(reservation.id, feedback);
                }}
              >
                <textarea name="feedback" required />
                <button type="submit">Submit Feedback</button>
              </form>
            )}
          </div>
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default FeedbackPage;
