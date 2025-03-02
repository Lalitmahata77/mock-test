
// import  { useEffect, useState } from 'react';
// import '../styles/Leaderboard.css';

// const Leaderboard = () => {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       const response = await fetch('/api/scores/leaderboard/:testId');
//       const data = await response.json();
//       setLeaderboard(data);
//     };
//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard-container">
//       <h2>Leaders in the Field</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Username</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.map((entry, index) => (
//             <tr key={entry._id}>
//               <td>{index + 1}</td>
//               <td>{entry.user[0]?.username}</td>
//               <td>{entry.maxScore}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;
import React, { useState } from 'react';
import { useCategoriesQuery, useLeaderBoardQuery } from '../redux/api/questions/questionApiSlice';

const Leaderboard = () => {
  const [category, setCategory] = useState('All');
  const { data: categories = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategoriesQuery();
  const { data: leaderboard = [], isLoading: isLeaderboardLoading, isError: isLeaderboardError } = useLeaderBoardQuery(category === 'All' ? '' : category);

  return (
    <div className="leaderboard p-4 text-green-500">
      <h1 className="text-2xl font-bold mb-4 text-center">Leaderboard</h1>
      
      {/* Category Filter */}
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="category-filter mb-4 p-2 border border-gray-300 rounded-md"
      >
        <option value="All">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Loading and Error States */}
      {isCategoriesLoading || isLeaderboardLoading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : isCategoriesError || isLeaderboardError ? (
        <div className="text-center text-xl text-red-500">Error loading data</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-0  border-b">Rank</th>
              <th className="py-2 px-0  border-b">Name</th>
              <th className="py-2 px-0  border-b">Category</th>
              <th className="py-2 px-0  border-b">Total Score</th>
              <th className="py-2 px-0  border-b">Average Score</th>
              <th className="py-2 px-0  border-b">Tests Taken</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId}>
                <td className="py-2 px-4 text-center border-b">{index + 1}</td>
                <td className="py-2 px-4 text-center border-b">{entry.name}</td>
                <td className="py-2 px-4 text-center border-b">{entry.category}</td>
                <td className="py-2 px-4 text-center border-b">{entry.totalScore}</td>
                <td className="py-2 px-4 text-center border-b">{entry.averageScore}</td>
                <td className="py-2 px-4 text-center border-b">{entry.totalTests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;