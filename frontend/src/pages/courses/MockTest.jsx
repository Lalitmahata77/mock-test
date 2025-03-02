

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuestionByCategoryQuery } from '../../redux/api/questions/questionApiSlice';

// const MockTest = () => {
//   const { category } = useParams(); // Get category from URL
//   const { data: questions = [], isLoading, isError } = useQuestionByCategoryQuery(category);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(60); // 5-minute timer

//   // Timer Countdown
//   useEffect(() => {
//     if (!isSubmitted && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       calculateScore(); // Auto-submit
//     }
//   }, [timeLeft, isSubmitted]);

//   // Format Time (MM:SS)
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Calculate Score
//   const calculateScore = () => {
//     let correct = 0;
//     questions.forEach((q, index) => {
//       if (selectedOptions[index] === q.correctAnswer) correct++;
//     });
//     setScore(correct);
//     setIsSubmitted(true);
//   };

//   // Handle Option Selection
//   const handleOptionSelect = (optionKey) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [currentQuestion]: optionKey,
//     });
//   };

//   if (isLoading) {
//     return <div className="text-center text-xl">Loading...</div>;
//   }

//   if (isError) {
//     return <div className="text-center text-xl text-red-500">Error loading questions</div>;
//   }

//   return (
//     <div className="mock-test text-black p-4">
//       {!isSubmitted ? (
//         <>
//           <div className="timer text-center text-lg mb-4">
//             Time Remaining: {formatTime(timeLeft)}
//           </div>

//           <h2 className="text-2xl font-bold mb-4 text-center">Question {currentQuestion + 1}/20</h2>
//           <p className="mb-4 text-center">{questions[currentQuestion]?.text}</p>
          
//           <div className="options mb-4 flex flex-row items-center justify-center gap-5">
//             {questions[currentQuestion]?.options.map((option, idx) => {
//               const optionKey = String.fromCharCode(65 + idx);
//               return (
//                 <label key={idx} className="block mb-2">
//                   <input
//                     type="radio"
//                     name={`option-${currentQuestion}`}
//                     value={optionKey}
//                     checked={selectedOptions[currentQuestion] === optionKey}
//                     onChange={() => handleOptionSelect(optionKey)}
//                     className="mr-2"
//                   />
//                   {option}
//                 </label>
//               );
//             })}
//           </div>

//           <div className="navigation flex justify-between">
//             <button
//               onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
//               disabled={currentQuestion === 0}
//               className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Previous
//             </button>
            
//             {currentQuestion < 19 ? (
//               <button
//                 onClick={() => setCurrentQuestion(p => p + 1)}
//                 disabled={!selectedOptions[currentQuestion]}
//                 className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={calculateScore}
//                 className="py-2 px-4 bg-green-500 text-black rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="results text-center">
//           <h2 className="text-2xl font-bold mb-4">Test {timeLeft === 0 ? "Time's Up!" : "Submitted"} 🚨</h2>
//           <p className="text-xl mb-4">Total Marks: {score}/20</p>
//           <div className="answer-review">
//             {questions.map((q, index) => (
//               <div key={index} className="review-item mb-4">
//                 <p className="font-bold">Q{index + 1}: {q.text}</p>
//                 <p>Your Answer: {selectedOptions[index] || "Not answered"}</p>
//                 <p>Correct Answer: {q.correctAnswer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MockTest;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestionByCategoryQuery, useSaveResultsMutation } from '../../redux/api/questions/questionApiSlice';
import { useGetAllUsersQuery } from '../../redux/api/user/userApiSlice';

const MockTest = () => {
  const { category } = useParams(); // Get category from URL
  const { data: questions = [], isLoading, isError } = useQuestionByCategoryQuery(category);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 5-minute timer
  const [saveResults] = useSaveResultsMutation();
  const [startTime] = useState(Date.now());

  const { data: users, refetch, isLoading: isUsersLoading, error: usersError } = useGetAllUsersQuery();

  // Timer Countdown
  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      calculateScore(); // Auto-submit
    }
  }, [timeLeft, isSubmitted]);

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate Score
  const calculateScore = async () => {
    let correct = 0;
    const answers = questions.map((q, index) => {
      const isCorrect = selectedOptions[index] === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        questionId: q._id,
        userAnswer: selectedOptions[index],
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    setScore(correct);
    setIsSubmitted(true);

    // Save results to the database
    try {
      await saveResults({
        userId: users?.[0]?.id || "user_id_placeholder",
        category,
        score: correct,
        totalQuestions: questions.length,
        timeTaken: Math.floor((Date.now() - startTime) / 1000),
        answers,
      }).unwrap();
    } catch (err) {
      console.error('Failed to save results:', err);
    }
  };

  // Handle Option Selection
  const handleOptionSelect = (optionKey) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: optionKey,
    });
  };

  if (isLoading || isUsersLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (isError || usersError) {
    return <div className="text-center text-xl text-red-500">Error loading questions</div>;
  }

  return (
    <div className="mock-test text-black p-4">
      {!isSubmitted ? (
        <>
          <div className="timer text-center text-lg mb-4">
            Time Remaining: {formatTime(timeLeft)}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">Question {currentQuestion + 1}/20</h2>
          <p className="mb-4 text-center">{questions[currentQuestion]?.text}</p>
          
          <div className="options mb-4 flex flex-row items-center justify-center gap-5">
            {questions[currentQuestion]?.options.map((option, idx) => {
              const optionKey = String.fromCharCode(65 + idx);
              return (
                <label key={idx} className="block mb-2">
                  <input
                    type="radio"
                    name={`option-${currentQuestion}`}
                    value={optionKey}
                    checked={selectedOptions[currentQuestion] === optionKey}
                    onChange={() => handleOptionSelect(optionKey)}
                    className="mr-2"
                  />
                  {option}
                </label>
              );
            })}
          </div>

          <div className="navigation flex justify-between">
            <button
              onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
              disabled={currentQuestion === 0}
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Previous
            </button>
            
            {currentQuestion < 19 ? (
              <button
                onClick={() => setCurrentQuestion(p => p + 1)}
                disabled={!selectedOptions[currentQuestion]}
                className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            ) : (
              <button
                onClick={calculateScore}
                className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="results text-center">
          <h2 className="text-2xl font-bold mb-4">Test {timeLeft === 0 ? "Time's Up!" : "Submitted"} 🚨</h2>
          <p className="text-xl mb-4">Total Marks: {score}/20</p>
          <div className="answer-review">
            {questions.map((q, index) => (
              <div key={index} className="review-item mb-4">
                <p className="font-bold">Q{index + 1}: {q.text}</p>
                <p>Your Answer: {selectedOptions[index] || "Not answered"}</p>
                <p>Correct Answer: {q.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTest;