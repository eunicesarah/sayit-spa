import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Consultation.css';
import axios from 'axios';

type Psychologist = {
  psikolog_id: number;
  psikolog_email: string;
  psikolog_name: string;
  psikolog_password: string;
  psikolog_klinik: string;
  psikolog_phone: string;
};

const Consultation = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [selectedPsychologistId, setSelectedPsychologistId] = React.useState<number | null>(null);

  const fetchPsiko = () => {
    return axios.get('http://localhost:3000/psikolog/consultation')
    .then((response) => setPsychologists(response.data.data));
  };
  
  useEffect(() => {
     fetchPsiko();
  }, []);
  
  return (
    <div className='consultation'>
      <h1>Daftar Psikolog</h1>
      {psychologists.map((psychologist) => (
        <div key={psychologist.psikolog_id} className="psychologist-card">
            <div className='psikologInfo'>
            <div className="psikologImg">
                <img src="yunis.jpg" alt={psychologist.psikolog_name} />
            </div>
            <div className="psikolofDesc">
                <h2>{psychologist.psikolog_name}</h2>
                <p>{psychologist.psikolog_phone}</p>
                <p>{psychologist.psikolog_klinik}</p>
            </div>
            </div>

            <div className="psikolofInfo">
                <Link to={`/chat/${psychologist.psikolog_id}`}>
                <button onClick={() => setSelectedPsychologistId(psychologist.psikolog_id)}>Chat</button>
                </Link>
            </div>

        </div>
      ))}
    </div>
  );
};

export default Consultation;