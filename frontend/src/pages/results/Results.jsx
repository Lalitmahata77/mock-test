// Results.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Results.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, totalQuestions } = location.state || {};

    const calculatePercentage = () => {
        if (score!== undefined && totalQuestions!== undefined) {
            return ((score / totalQuestions) * 100).toFixed(2);
        }
        return "0.00";
    };

    const handleHome = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="results-container">
            <h2> Result</h2>
            {score!== undefined && totalQuestions!== undefined? (
                <div className="results-content">
                    <div className="results-table-container">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Correct Answers</td>
                                    <td>{score} / {totalQuestions}</td>
                                </tr>
                                <tr>
                                    <td>Correct Answer Percentage</td>
                                    <td>{calculatePercentage()}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="congratulations-message">
                        {calculatePercentage() > 70? (
                            <p>Congratulations! You did a great job!</p>
                        ): calculatePercentage() > 50? (
                            <p>Good job! You're on the right track.</p>
                        ): (
                            <p>Keep practicing! You'll get there.</p>
                        )}
                    </div>
                    <div className="results-buttons">
                        <button className="home-button" onClick={handleHome}>
                            Home
                        </button>
                    </div>
                </div>
            ): (
                <p>No results available.</p>
            )}
        </div>
    );
};

export default Results;