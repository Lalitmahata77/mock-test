

// import { useState } from 'react';

// const AddQuestion = () => {
//   const [formData, setFormData] = useState({
//     text: '',
//     options: ['', '', '', ''],
//     correctAnswer: '',
//     category: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/questions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
//       if (response.ok) window.location = '/manage-questions';
//     } catch (err) {
//       console.error('Creation failed:', err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-green-500">Add New Question</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Question Text</label>
//           <input
//             type="text"
//             placeholder="Question Text"
//             value={formData.text}
//             onChange={(e) => setFormData({ ...formData, text: e.target.value })}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
        
//         {formData.options.map((option, index) => (
//           <div key={index}>
//             <label className="block text-sm font-medium text-gray-700">{`Option ${String.fromCharCode(65 + index)}`}</label>
//             <input
//               type="text"
//               placeholder={`Option ${String.fromCharCode(65 + index)}`}
//               value={option}
//               onChange={(e) => {
//                 const newOptions = [...formData.options];
//                 newOptions[index] = e.target.value;
//                 setFormData({ ...formData, options: newOptions });
//               }}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
//           <select
//             value={formData.correctAnswer}
//             onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="A">A</option>
//             <option value="B">B</option>
//             <option value="C">C</option>
//             <option value="D">D</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Category</label>
//           <input
//             type="text"
//             placeholder="Category"
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Save Question
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestion;





import { useState } from 'react';
import { useCreateQuestionMutation } from '../../../redux/api/questions/questionApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: ''
  });

  const [createQuestion, { isLoading }] = useCreateQuestionMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion(formData).unwrap();
      toast.success('Question created successfully');
      navigate('/admin/manage-questions');
    } catch (err) {
      console.error('Creation failed:', err);
      toast.error('Creation failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Text</label>
          <input
            type="text"
            placeholder="Question Text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        {formData.options.map((option, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">{`Option ${String.fromCharCode(65 + index)}`}</label>
            <input
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...formData.options];
                newOptions[index] = e.target.value;
                setFormData({ ...formData, options: newOptions });
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
          <select
            value={formData.correctAnswer}
            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? 'Saving...' : 'Save Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;