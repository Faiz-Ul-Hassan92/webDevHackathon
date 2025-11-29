import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">Career AI</span>
          <div className="text-sm text-gray-500">Candidate Dashboard</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}