'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Resume } from '@/types/dashboard';

/**
 * Resume Archive Page.
 * Displays a grid of existing resumes and an option to create a new one.
 */
export default function ResumesPage() {
  // In a real app, this would be fetched from a database
  const [resumes, setResumes] = useState<Resume[]>([
    { id: 1, name: "Senior Software Engineer", date: "Dec 15, 2025" },
    { id: 2, name: "Product Manager Role", date: "Nov 28, 2025" },
  ]);
  const [resumeToDelete, setResumeToDelete] = useState<string | number | null>(null);

  const handleDeleteClick = (id: string | number) => {
    setResumeToDelete(id);
  };

  const confirmDelete = () => {
    if (resumeToDelete) {
      setResumes(prev => prev.filter(r => r.id !== resumeToDelete));
      setResumeToDelete(null);
    }
  };

  const handleEdit = (id: string | number) => {
    window.location.href = `/builder?id=${id}`;
  };

  return (
    <DashboardShell>
      {/* Greeting Section */}
      <section className="text-center mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground">
          Welcome to your resume archive!
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-medium opacity-90">
          Your resumes, organized in one place.
        </p>
      </section>

      {/* Resume Sections */}
      <div className="max-w-6xl mx-auto px-4 mb-24 space-y-12">
        {/* Add New Section */}
        <section>
          <h3 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4 ml-1 text-foreground">Add New</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            <Link 
              href="/builder" 
              className="aspect-4/3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl sm:rounded-4xl flex flex-col items-center justify-center hover:bg-white hover:border-primary/50 transition-all group shadow-sm hover:shadow-md"
              aria-label="Create new resume"
            >
              <Plus className="w-8 h-8 sm:w-16 sm:h-16 text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300" strokeWidth={2.5} />
              <span className="mt-2 sm:mt-4 text-gray-500 font-bold group-hover:text-primary transition-colors text-xs sm:text-base">Start Fresh</span>
            </Link>
          </div>
        </section>

        {/* Recents Section */}
        <section>
          <h3 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4 ml-1 text-foreground">Recents</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <ResumeCard 
                   key={resume.id} 
                   resume={resume} 
                   onDelete={handleDeleteClick}
                   onEdit={handleEdit}
                 />
               ))
             ) : (
               <div className="col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-4xl bg-gray-50/50">
                 <p className="text-xl font-bold text-gray-400">No resumes found yet.</p>
                 <p className="text-gray-500 mt-2">Start by creating your first professional resume!</p>
               </div>
             )}
          </div>
        </section>
      </div>

       <ConfirmModal
         isOpen={resumeToDelete !== null}
         onClose={() => setResumeToDelete(null)}
         onConfirm={confirmDelete}
         title="Delete Resume"
         message="Are you sure you want to delete this resume? This action cannot be undone."
         confirmLabel="Delete"
         variant="destructive"
       />
     </DashboardShell>
  );
}
