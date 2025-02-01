import { useState, useEffect } from 'react';

// Importing the JSON data directly
import heartData from "../../assets/heart.json";
import skeletonData from '../../assets/skeleton.json';
import musclesData from '../../assets/muscle.json';
import introData from '../../assets/intro_.json';

function MCQ() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedFile, setSelectedFile] = useState('heart');

  // Set the questions based on selected file
  useEffect(() => {
    if (!selectedFile) return;

    switch (selectedFile) {
      case 'heart':
        setQuestions(heartData);
        break;
      case 'skeleton':
        setQuestions(skeletonData);
        break;
      case 'muscles':
        setQuestions(musclesData);
        break;
      case 'intro':
        setQuestions(introData);
        break;
      default:
        setQuestions([]);
        break;
    }
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setProgress(0);
    setSelectedAnswer('');
  }, [selectedFile]);

  const renderQuestion = () => {
    if (questions.length === 0) return null;

    const q = questions[currentQuestionIndex];

    return (
      <div className="question mb-6  p-4 bg-white shadow-lg rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Q{currentQuestionIndex + 1}: {q.question}</h3>
        <div className="options space-y-4">
          {Object.entries(q.options).map(([key, value]) => (
            <div key={key} className="option">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="form-radio text-green-500"
                />
                <span className="text-sm">{key}: {value}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer.split(')')[0].trim(); // Extract the option letter

    if (selectedAnswer === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer('');
    } else {
      alert('Quiz Finished!');
    }

    const progressPercentage = Math.round((correctAnswers / questions.length) * 100);
    setProgress(progressPercentage);
  };

  return (
    <div className="h-[90vh] bg-white flex">

      {/* Questions and Options on the Left */}
      <div className="mcq-container w-3/4 p-8 bg-white rounded-lg shadow-lg">
        {/* Display Question and Options once a file is selected */}
        {selectedFile && (
          <>
            <div className="text-left mb-4">
              <p className="text-sm text-green-700">Progress: {progress}%</p>
              <p className="text-sm text-green-700">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>

            {/* Render Question */}
            {renderQuestion()}

            {/* Submit Answer Button */}
            <div className="flex justify-start mt-">
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:bg-gray-400"
              >
                Submit Answer
              </button>
            </div>
          </>
        )}
      </div>

      {/* File Selection on the Right */}
      <div className="file-selection w-1/4 p-4 bg-green-50 rounded-lg shadow-md ml-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Select a File</h2>
        <button
          onClick={() => setSelectedFile('heart')}
          className={`w-full mb-2 p-2 text-sm text-green-700 border rounded-md ${selectedFile === 'heart' ? 'bg-green-100' : 'bg-green-50'}`}
        >
          Heart
        </button>
        <button
          onClick={() => setSelectedFile('skeleton')}
          className={`w-full mb-2 p-2 text-sm text-green-700 border rounded-md ${selectedFile === 'skeleton' ? 'bg-green-100' : 'bg-green-50'}`}
        >
          Skeleton
        </button>
        <button
          onClick={() => setSelectedFile('muscles')}
          className={`w-full mb-2 p-2 text-sm text-green-700 border rounded-md ${selectedFile === 'muscles' ? 'bg-green-100' : 'bg-green-50'}`}
        >
          Muscles
        </button>
        <button
          onClick={() => setSelectedFile('intro')}
          className={`w-full p-2 text-sm text-green-700 border rounded-md ${selectedFile === 'intro' ? 'bg-green-100' : 'bg-green-50'}`}
        >
          Intro
        </button>
      </div>

    </div>
  );
}

export default MCQ;
