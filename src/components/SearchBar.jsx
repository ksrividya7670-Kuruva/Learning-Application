import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { getCourses } from '../lib/dataStore';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const courses = getCourses();
    setSuggestions(courses.map(c => c.title));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = suggestions.filter((course) =>
    course.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (course) => {
    setQuery('');
    setIsOpen(false);
    const url = `/course/${encodeURIComponent(course)}`;
    window.history.pushState({ course }, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div ref={wrapperRef} className="relative hidden md:block">
      <label className="flex items-center w-[180px] xl:w-[220px] h-10 rounded-none border border-black/20 bg-white px-3.5 transition-colors focus-within:border-[#FF9100]">
        <Search className="h-4.5 w-4.5 text-gray-500 flex-shrink-0" />
        <input
          aria-label="Search courses"
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="ml-2.5 w-full bg-transparent text-sm font-medium text-black outline-none placeholder:text-gray-400"
        />
      </label>

      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full left-0 mt-1.5 w-full max-h-[300px] overflow-y-auto rounded-none border border-black/20 bg-white z-50 shadow-xl">
          {filteredCourses.length > 0 ? (
            <ul className="py-2">
              {filteredCourses.map((course) => (
                <li key={course}>
                  <button
                    onClick={() => handleSelect(course)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-[#FF9100] hover:text-black transition-colors"
                  >
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              No courses found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
