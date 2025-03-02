import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetQuestionByIdQuery, useUpdateQuestionMutation } from '../../../redux/api/questions/questionApiSlice';
import { toast } from 'react-toastify';

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: question, isLoading, isError } = useGetQuestionByIdQuery(id);
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: ''
  });

  useEffect(() => {
    if (question) {
      setFormData({
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
        category: question.category
      });
    }
  }, [question]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateQuestion({ questionId: id, formData }).unwrap();
      toast.success('Question updated successfully');
      navigate('/admin/manage-questions');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Update failed');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading question</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Edit Question</h2>
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
          {isUpdating ? 'Saving...' : 'Save Question'}
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;