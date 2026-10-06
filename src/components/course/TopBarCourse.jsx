import { useState, useEffect } from 'react';
import { Award, Bookmark, Share2 } from 'lucide-react';
import { isCourseBookmarked, toggleCourseBookmark } from '../../lib/api';

const TopBarCourse = ({ courseName, progress, onBack, onOpenCertificate }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isCourseBookmarked(courseName));
    const handleUpdate = () => setBookmarked(isCourseBookmarked(courseName));
    window.addEventListener('bookmarks_updated', handleUpdate);
    return () => window.removeEventListener('bookmarks_updated', handleUpdate);
  }, [courseName]);

  const handleBookmarkClick = () => {
    const isNowBookmarked = toggleCourseBookmark(courseName);
    setBookmarked(isNowBookmarked);
    alert(isNowBookmarked ? `★ ${courseName} added to your Bookmarks!` : `Removed ${courseName} from Bookmarks.`);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({ title: courseName, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Course link copied to clipboard!');
    }
  };

  return (
    <div className="sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/95 px-4 py-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="rounded-none bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:bg-slate-700 transition">
            ← Back
          </button>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{courseName}</h3>
            <div className="text-xs text-[#7C3AED]">Progress: {Math.round(progress)}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 rounded-none px-3 py-2 text-sm font-medium text-[#7C3AED] hover:bg-slate-100 dark:bg-slate-800 transition"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`flex items-center gap-1.5 rounded-none px-3.5 py-2 text-sm font-medium transition ${
              bookmarked
                ? 'bg-slate-100 dark:bg-slate-800 text-[#7C3AED] border border-slate-300 dark:border-slate-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] font-bold'
                : 'text-[#7C3AED] hover:bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-[#7C3AED] text-[#7C3AED]' : ''}`} />
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 rounded-none bg-[#FB6C00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#D97706] shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]"
          >
            <Award className="h-4 w-4" />
            <span>Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBarCourse;


