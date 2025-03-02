

import { Link } from 'react-router-dom';
import { useGetQuestionsQuery, useDeleteQuestionMutation } from '../../../redux/api/questions/questionApiSlice';
import { toast } from 'react-toastify';

const QuestionList = () => {
  const { data: questions, isLoading, isError } = useGetQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id).unwrap();
      toast.success('Question deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Delete failed');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading questions</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Manage Questions</h2>
      <Link to="/admin/create-questions" className="mb-4 inline-block py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add New Question
      </Link>
      
      <table className="min-w-full text-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Question</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td className="py-2 px-4 border-b">{question.text}</td>
              <td className="py-2 px-4 border-b">{question.category}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/admin/edit-question/${question._id}`} className="mr-2 py-1 px-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(question._id)} className="py-1 px-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;