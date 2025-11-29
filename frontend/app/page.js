'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function InterviewPrep() {
  const [jobUrl, setJobUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setQuestions(null);

    try {
      const response = await fetch('http://localhost:8000/generate-interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_url: jobUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Interview Prep</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Job URL
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://www.linkedin.com/jobs/view/..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !jobUrl}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {questions && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Behavioral Questions</h2>
              <div className="space-y-3">
                {questions.behavioral.map((q, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-900">Q{i + 1}:</span>
                    <p className="text-gray-700 mt-1">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Questions</h2>
              <div className="space-y-3">
                {questions.technical.map((q, i) => (
                  <div key={i} className="p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Q{i + 1}:</span>
                    <p className="text-gray-700 mt-1">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}