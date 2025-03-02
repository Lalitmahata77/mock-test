
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCategoriesQuery } from '../../redux/api/questions/questionApiSlice';
// import '../../styles/Courses.css';

// const EngineeringDisciplines = () => {

//   const pdf = [
//         {
//         category: 'math',
//         url: '/pdfs/aeronautical.pdf'
//       },
//       { 
//         category: 'Agriculture Engineering',
//         url: '/pdfs/agricultural.pdf'
//       },
//       { 
//         category: 'Architecture Engineering',
//         url: '/pdfs/architecture.pdf'
//       },
//       { 
//         category: 'Automobile Engineering',
//         url: '/pdfs/automobile.pdf'
//       },
//       { 
//         category: 'Civil Engineering',
//         url: '/pdfs/civil.pdf'
//       },
//       { 
//         category: 'Computer Engineering',
//         url: '/pdfs/computer.pdf'
//       },
//       { 
//         category: 'Electrical Engineering',
//         url: '/pdfs/electrical.pdf'
//       },
//       { 
//         category: 'Electronics Engineering',
//         url: '/pdfs/electrical&electronics.pdf'
//       },
//       { 
//         category: 'Mechanical Engineering',
//         url: '/pdfs/mechanical.pdf'
//       },
//       { 
//         category: 'Geomatics Engineering',
//         url: '/pdfs/geomatics.pdf' 
//       },
//       {
//         category: 'Software Engineering',
//         url: '/pdfs/software.pdf'
//       },
//       { category: 'Biomedical Engineering',
//         url: '/pdfs/bioMedical.pdf' }
//     ];
//   const [selectedCard, setSelectedCard] = useState(null);
//   const navigate = useNavigate();
//   const { data: categories = [], isLoading, isError } = useCategoriesQuery();

//   const handleCardClick = (index) => {
//     setSelectedCard(index);
//   };

//   const closeOverlay = () => {
//     setSelectedCard(null);
//   };

//   const handleSyllabusClick = (url) => {
//     // Open PDF in new tab
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading categories</div>;
//   }

//   return (
//     <div className="container">
//       <h1 className="title">Choose Your Test Paper</h1>
//       <div className="grid">
//         {categories.map((category, index) => (
//           <div 
//             key={index} 
//             className="card"
//             onClick={() => handleCardClick(index)}
//           >
//             {category}
//           </div>
//         ))}
//       </div>

//       {selectedCard !== null && (
//         <div className="overlay" onClick={closeOverlay}>
//           <div className="options-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>{categories[selectedCard]}</h3>
//             <div className="options-container">
//               <button
//                 className="option-btn syllabus"
//                 onClick={() => handleSyllabusClick(`/pdfs/${categories[selectedCard].toLowerCase().replace(/ /g, '')}.pdf`)}
//               >
//                 Syllabus
//               </button>
//               <button 
//                 className="option-btn mock-test"
//                 onClick={() => navigate(`/test/${categories[selectedCard]}`)}
//               >
//                 Mock Test
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EngineeringDisciplines;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoriesQuery } from '../../redux/api/questions/questionApiSlice';
import '../../styles/Courses.css';

const EngineeringDisciplines = () => {
  const pdf = [
    { category: 'math', url: '/pdfs/aeronautical.pdf' },
    { category: 'Agriculture Engineering', url: '/pdfs/agricultural.pdf' },
    { category: 'Architecture Engineering', url: '/pdfs/architecture.pdf' },
    { category: 'Automobile Engineering', url: '/pdfs/automobile.pdf' },
    { category: 'Civil Engineering', url: '/pdfs/civil.pdf' },
    { category: 'Computer Engineering', url: '/pdfs/computer.pdf' },
    { category: 'Electrical Engineering', url: '/pdfs/electrical.pdf' },
    { category: 'Electronics Engineering', url: '/pdfs/electrical&electronics.pdf' },
    { category: 'Mechanical Engineering', url: '/pdfs/mechanical.pdf' },
    { category: 'Geomatics Engineering', url: '/pdfs/geomatics.pdf' },
    { category: 'Software Engineering', url: '/pdfs/software.pdf' },
    { category: 'Biomedical Engineering', url: '/pdfs/bioMedical.pdf' }
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const { data: categories = [], isLoading, isError } = useCategoriesQuery();

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const closeOverlay = () => {
    setSelectedCard(null);
  };

  const handleSyllabusClick = (category) => {
    const pdfEntry = pdf.find((entry) => entry.category === category);
    if (pdfEntry) {
      window.open(pdfEntry.url, '_blank', 'noopener,noreferrer');
    } else {
      console.error('PDF not found for category:', category);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Choose Your Test Paper</h1>
      <div className="grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="card"
            onClick={() => handleCardClick(index)}
          >
            {category}
          </div>
        ))}
      </div>

      {selectedCard !== null && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="options-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{categories[selectedCard]}</h3>
            <div className="options-container">
              <button
                className="option-btn syllabus"
                onClick={() => handleSyllabusClick(categories[selectedCard])}
              >
                Syllabus
              </button>
              <button 
                className="option-btn mock-test"
                onClick={() => navigate(`/test/${categories[selectedCard]}`)}
              >
                Mock Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringDisciplines;

