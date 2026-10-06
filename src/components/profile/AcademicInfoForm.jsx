import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

const AcademicInfoForm = ({ profile }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      studentId: profile?.studentId || '',
      registrationNumber: profile?.registrationNumber || '',
      department: profile?.department || '',
      branch: profile?.branch || '',
      program: profile?.program || '',
      semester: profile?.semester || '',
      section: profile?.section || '',
      rollNumber: profile?.rollNumber || '',
      batch: profile?.batch || '',
      admissionYear: profile?.admissionYear || '',
      graduationYear: profile?.graduationYear || '',
      cgpa: profile?.cgpa || '',
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log('Saving Academic Info:', data);
      await new Promise(resolve => setTimeout(resolve, 800)); // mock delay
      alert('Academic Information saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
      <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Information</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your university records and academic standing.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Identifiers */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Student ID</label>
            <input
              type="text"
              {...register('studentId')}
              disabled
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
              placeholder="e.g. STU12345"
            />
            <p className="mt-1 text-xs text-slate-400">Contact admin to change</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Registration Number</label>
            <input
              type="text"
              {...register('registrationNumber')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Roll Number</label>
            <input
              type="text"
              {...register('rollNumber')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>

          {/* Program Details */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Program</label>
            <select
              {...register('program')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Program</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="Ph.D">Ph.D</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Department</label>
            <input
              type="text"
              {...register('department')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. Engineering"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Branch</label>
            <input
              type="text"
              {...register('branch')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. Computer Science"
            />
          </div>

          {/* Current Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Semester</label>
            <select
              {...register('semester')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Section</label>
            <input
              type="text"
              {...register('section')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. A"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">CGPA</label>
            <input
              type="number"
              step="0.01"
              max="10"
              {...register('cgpa')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. 8.5"
            />
          </div>

          {/* Timeline */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Batch</label>
            <input
              type="text"
              {...register('batch')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. 2021-2025"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Admission Year</label>
            <input
              type="number"
              {...register('admissionYear')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Graduation Year (Expected)</label>
            <input
              type="number"
              {...register('graduationYear')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>

        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-[#7C3AED] hover:text-slate-900 dark:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-none bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition hover:bg-primary/90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicInfoForm;
