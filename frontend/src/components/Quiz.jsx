// Quiz.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Quiz.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Quiz = ({ questions }) => { // Removed onSubmit prop
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(7200); // 120 minutes
    const timerRef = useRef(null);
    const [score, setScore] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (Object.keys(questions).length === 0) return; // Handle no questions case

        if (timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
        } else {
            handleSubmit(); // Auto-submit when time runs out
        }

        return () => clearInterval(timerRef.current);
    }, [timeRemaining, questions]);

    const handleAnswerChange = (question, answer) => {
        setAnswers({ ...answers, [question]: answer });
    };

    const handleSubmit = () => {
        clearInterval(timerRef.current);

        let correctAnswersCount = 0;
        for (const questionText in questions) {
            if (answers[questionText] === questions[questionText].correctAnswer) {
                correctAnswersCount++;
            }
        }

        setScore(correctAnswersCount);

        // Navigate to Results page with the score
        navigate('/results', { state: { score: correctAnswersCount, totalQuestions: Object.keys(questions).length } });
    };

    const handleNextQuestion = () => {
        setCurrentQuestion(prevQuestion => Math.min(prevQuestion + 1, Object.keys(questions).length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion(prevQuestion => Math.max(prevQuestion - 1, 0));
    };

    const questionKeys = Object.keys(questions);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="assessment-container fullscreen">
            <h2>Exam</h2>
            <div className="timer">
                {timeRemaining !== null && <p>Time Remaining: {formatTime(timeRemaining)}</p>}
            </div>

            {questionKeys.length > 0 ? ( // Check if questions exist
                <div>
                    <p className="question-text">{questionKeys[currentQuestion]}</p>
                    <div className="options">
                        {questions[questionKeys[currentQuestion]].options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={questionKeys[currentQuestion]}
                                    value={option}
                                    onChange={() => handleAnswerChange(questionKeys[currentQuestion], option)}
                                    checked={answers[questionKeys[currentQuestion]] === option} // Add checked attribute
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <div className="navigation">
                        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button>
                        <button onClick={handleNextQuestion} disabled={currentQuestion === questionKeys.length - 1}>Next</button>
                    </div>
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                </div>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
};

export default Quiz;