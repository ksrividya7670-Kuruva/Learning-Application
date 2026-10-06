import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

const PersonalInfoForm = ({ profile }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      gender: profile?.gender || '',
      dateOfBirth: profile?.dateOfBirth || '',
      bloodGroup: profile?.bloodGroup || '',
      nationality: profile?.nationality || '',
      maritalStatus: profile?.maritalStatus || '',
      languages: profile?.languages || '',
      biography: profile?.biography || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // API call would go here
      console.log('Saving Personal Info:', data);
      await new Promise(resolve => setTimeout(resolve, 800)); // mock delay
      alert('Personal Information saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
      <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update your basic personal details here.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className={`w-full rounded-none border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className={`w-full rounded-none border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Gender</label>
            <select
              {...register('gender')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Date of Birth</label>
            <input
              type="date"
              {...register('dateOfBirth')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Blood Group</label>
            <select
              {...register('bloodGroup')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Nationality</label>
            <input
              type="text"
              {...register('nationality')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. Indian, American"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Marital Status</label>
            <select
              {...register('maritalStatus')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Languages */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Languages Known</label>
            <input
              type="text"
              {...register('languages')}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              placeholder="e.g. English, Hindi, Telugu"
            />
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Biography / About Me</label>
          <textarea
            {...register('biography')}
            rows="4"
            className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            placeholder="Write a short bio about yourself..."
          ></textarea>
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

export default PersonalInfoForm;
