import React from 'react'
import '../styles/History.css';

const History = () => {
  return (
    
    <div className='CardReport'>
      <div className='CardReport__header'>
        <div className='Image'>
          <img src='https://i.imgur.com/8Km9tLL.png' alt='Logo' />
        </div>
        <div className='ReportInfo'>
          <div className='Name'>Reporter Name</div>
          <div className='Date'>Date</div>
        </div>
      </div>
      <div className='ReportStatus'>
        <div className='Status'>Status : Pending</div>
      </div>
      <div className='ReporterRole'>
        <div className='Role'>Reported As: Witness</div>
      </div>
      <div className='ReportChronology'>
        <div className='Chronology'>Chronology : Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos animi at totam quis praesentium quia quaerat dolorum magni iure modi, atque impedit nihil! Ab voluptatem quidem ipsa id temporibus.</div>
      </div>
      <div className='ReportProof'>
        <div className='Description'>Proof</div>
      </div>
        
    </div>
  )
}

export default History