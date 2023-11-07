import React from 'react';
import { useParams } from 'react-router-dom'; // Pastikan Anda telah mengatur routing sesuai kebutuhan Anda.
import '../styles/Chat.css';


const Chat = () => {
  const { psychologistId } = useParams();

  // Anda dapat menggunakan id psikolog untuk mendapatkan data psikolog dari server.
  // Misalnya, dengan memanggil API untuk mendapatkan data psikolog.

  // Gantilah dengan data yang sesuai dengan psikolog yang ingin Anda tampilkan.
  const psychologist = {
    id: psychologistId,
    name: 'Psikolog 1',
    photo: 'photo1.jpg',
  };

  return (
    <div>
      <div className="psychologist-profile">
        <img src={psychologist.photo} alt={psychologist.name} />
        <h2>{psychologist.name}</h2>
      </div>
      <div className="chat-container">

        <div className="user-chat">
          <div className="user-image"></div>
          <div className="user-message"></div>
        </div>
        <div className="psychologist-chat">
          <div className="psychologist-image"></div>
          <div className="psychologist-message"></div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
