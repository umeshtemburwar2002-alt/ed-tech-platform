import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function CountrySelector({ value, onChange, countries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
    onChange(country);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-left flex items-center justify-between hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-all"
      >
        <span>{value || 'Select a country'}</span>
        <FaChevronDown
          className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-50">
          {/* Search input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries..."
            className="w-full px-4 py-2 bg-slate-700 border-b border-slate-600 text-white placeholder-slate-400 focus:outline-none"
          />

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((country) => (
                <button
                  key={country}
                  onClick={() => handleSelect(country)}
                  className={`w-full px-4 py-2 text-left hover:bg-slate-600 transition-all ${
                    value === country ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {country}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-slate-400 text-sm">No countries found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
