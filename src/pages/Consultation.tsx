import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan Anda telah mengatur routing sesuai kebutuhan Anda.
import '../styles/Consultation.css';
const psychologists = [
  {
    id: 1,
    name: 'Yuyun SP.G',
    photo: 'photo1.jpg',
    phone: '0812345678',
    office: 'koica',
  },
  {
    id: 2,
    name: 'asmi S.L(X)',
    photo: 'photo2.jpg',
    phone: '0810101010',
    office: 'koica',
  },

];

const Consultation = () => {
  const [selectedPsychologistId, setSelectedPsychologistId] = React.useState<number | null>(null);
  return (
    <div className='consultation'>
      <h1>Daftar Psikolog</h1>
      {psychologists.map((psychologist) => (
        <div key={psychologist.id} className="psychologist-card">
            <div className='psikologInfo'>
            <div className="psikologImg">
                <img src="yunis.jpg" alt={psychologist.name} />
            </div>
            <div className="psikolofDesc">
                <h2>{psychologist.name}</h2>
                <p>{psychologist.phone}</p>
                <p>{psychologist.office}</p>
                
            </div>
            </div>

            <div className="psikolofInfo">
                <Link to={`/chat/${psychologist.id}`}>
                <button onClick={() => setSelectedPsychologistId(psychologist.id)}>Chat</button>
                </Link>
            </div>

        </div>
      ))}
      {selectedPsychologistId && <Link to={`/chat/${selectedPsychologistId}`}></Link>}
    </div>
  );
};

export default Consultation;
