import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

const ContactInfoForm = ({ profile }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      personalEmail: profile?.personalEmail || '',
      officialEmail: profile?.officialEmail || '',
      mobileNumber: profile?.mobileNumber || '',
      alternateNumber: profile?.alternateNumber || '',
      emergencyName: profile?.emergencyName || '',
      emergencyNumber: profile?.emergencyNumber || '',
      emergencyRelation: profile?.emergencyRelation || '',
      currentAddress: profile?.currentAddress || '',
      permanentAddress: profile?.permanentAddress || '',
      city: profile?.city || '',
      state: profile?.state || '',
      country: profile?.country || '',
      zipCode: profile?.zipCode || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log('Saving Contact Info:', data);
      await new Promise(resolve => setTimeout(resolve, 800)); // mock delay
      alert('Contact Information saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
      <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">How can we reach you?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Email & Phone */}
        <div>
          <h3 className="mb-4 text-base font-bold text-slate-800 dark:text-slate-100">Email & Phone</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Personal Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                {...register('personalEmail', { required: 'Email is required' })}
                className={`w-full rounded-none border ${errors.personalEmail ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition`}
              />
              {errors.personalEmail && <p className="mt-1 text-xs text-red-500">{errors.personalEmail.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Official Email</label>
              <input
                type="email"
                {...register('officialEmail')}
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Mobile Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                {...register('mobileNumber', { required: 'Mobile number is required' })}
                className={`w-full rounded-none border ${errors.mobileNumber ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition`}
              />
              {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">{errors.mobileNumber.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Alternate Number</label>
              <input
                type="tel"
                {...register('alternateNumber')}
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="mb-4 text-base font-bold text-slate-800 dark:text-slate-100">Emergency Contact</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Contact Name</label>
              <input
                type="text"
                {...register('emergencyName')}
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Contact Number</label>
              <input
                type="tel"
                {...register('emergencyNumber')}
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Relationship</label>
              <input
                type="text"
                {...register('emergencyRelation')}
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div>
          <h3 className="mb-4 text-base font-bold text-slate-800 dark:text-slate-100">Address Details</h3>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Current Address</label>
              <textarea
                {...register('currentAddress')}
                rows="2"
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              ></textarea>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Permanent Address</label>
              <textarea
                {...register('permanentAddress')}
                rows="2"
                className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">City</label>
                <input
                  type="text"
                  {...register('city')}
                  className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">State</label>
                <input
                  type="text"
                  {...register('state')}
                  className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Country</label>
                <input
                  type="text"
                  {...register('country')}
                  className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">ZIP Code</label>
                <input
                  type="text"
                  {...register('zipCode')}
                  className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
                />
              </div>
            </div>
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

export default ContactInfoForm;
