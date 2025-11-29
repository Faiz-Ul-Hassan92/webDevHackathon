'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function InterviewPrep() {
  const [jobUrl, setJobUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('input');
  const [summary, setSummary] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/generate-interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_url: jobUrl })
      });

      if (!response.ok) throw new Error('Failed to generate questions');

      const data = await response.json();
      setSummary(data.summary);
      
      const interleaved = [];
      for (let i = 0; i < 5; i++) {
        interleaved.push({ question: data.questions.technical[i], type: 'technical' });
        interleaved.push({ question: data.questions.behavioral[i], type: 'behavioral' });
      }
      
      setAllQuestions(interleaved);
      setStage('interview');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return;
    
    const current = allQuestions[currentIndex];
    const answerData = { 
        question: current.question, 
        answer: currentAnswer,
        type: current.type 
    };
    
    const newAnswers = [...answers, answerData];
    setAnswers(newAnswers);
    setCurrentAnswer('');
    
    // Move to next question or evaluating stage
    if (currentIndex === allQuestions.length - 1) {
        setStage('evaluating');
        // Start evaluating all answers
        evaluateAllAnswers(newAnswers);
    } else {
        setCurrentIndex(currentIndex + 1);
    }
    };

    const evaluateAllAnswers = async (allAnswers) => {
    try {
        const response = await fetch('http://localhost:8000/evaluate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            answers: allAnswers 
        })
        });

        if (!response.ok) throw new Error('Batch evaluation failed');
        
        const data = await response.json();
        setEvaluations(data.evaluations);
        setTimeout(() => setStage('results'), 100);
    } catch (err) {
        console.error('Evaluation error:', err);
        setError(err.message);
    }
    };

  if (stage === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Interview Prep</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Job URL</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://www.linkedin.com/jobs/view/..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !jobUrl}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : 'Start Interview'}
              </button>
            </div>
            {error && <p className="text-red-600 mt-3">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'interview') {
    const current = allQuestions[currentIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Company & Role</h2>
            <p className="text-gray-700 mb-2"><strong>Company:</strong> {summary.company}</p>
            <p className="text-gray-700"><strong>Role:</strong> {summary.role}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Question {currentIndex + 1} of {allQuestions.length}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${current.type === 'technical' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {current.type}
              </span>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4">{current.question}</h3>
            
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            />
            
            <button
              onClick={handleSubmitAnswer}
              disabled={!currentAnswer.trim()}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'evaluating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-xl text-gray-700">Evaluating your answers...</p>
          <p className="text-sm text-gray-500 mt-2">{evaluations.length} of {allQuestions.length} evaluated</p>
        </div>
      </div>
    );
  }

  if (stage === 'results') {
    const avgScore = (evaluations.reduce((sum, e) => sum + e.score, 0) / evaluations.length).toFixed(1);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Complete!</h1>
            <p className="text-2xl text-blue-600">Average Score: {avgScore}/10</p>
          </div>

          <div className="space-y-4">
            {answers.map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${item.type === 'technical' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.type}
                  </span>
                  <span className="text-2xl font-bold text-gray-800">{evaluations[i]?.score || '?'}/10</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600 mb-3 italic">Your answer: {item.answer}</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{evaluations[i]?.feedback || 'Evaluating...'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}