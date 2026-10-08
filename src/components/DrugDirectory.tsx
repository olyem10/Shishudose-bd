import React, { useState, useMemo } from 'react';
import { BANGLADESH_PEDIATRIC_DRUGS, THERAPEUTIC_CATEGORIES } from '../data/bangladeshDrugs';
import { PatientProfile } from '../types/pediatric';
import { DrugCalculatorCard } from './DrugCalculatorCard';
import { Search, Star, Filter, X, Sparkles } from 'lucide-react';

interface DrugDirectoryProps {
  patient: PatientProfile;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const DrugDirectory: React.FC<DrugDirectoryProps> = ({
  patient,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Filtered drug list
  const filteredDrugs = useMemo(() => {
    return BANGLADESH_PEDIATRIC_DRUGS.filter((drug) => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(drug.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && drug.category !== selectedCategory) {
        return false;
      }

      // Search query (generic, bangla, brands, indication)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchGeneric = drug.genericName.toLowerCase().includes(q);
        const matchBangla = drug.banglaName?.includes(q) || false;
        const matchBrands = drug.popularBDBrands.some((b) => b.toLowerCase().includes(q));
        const matchFormBrands = drug.formulations.some((f) => 
          f.bdBrands.some((fb) => fb.toLowerCase().includes(q))
        );
        const matchIndication = drug.indication.toLowerCase().includes(q);

        return matchGeneric || matchBangla || matchBrands || matchFormBrands || matchIndication;
      }

      return true;
    }).sort((a, b) => {
      // Prioritize favorites on top
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.genericName.localeCompare(b.genericName);
    });
  }, [searchQuery, selectedCategory, showOnlyFavorites, favorites]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Generic or BD Brand (e.g., Meropen, Tazopen, Lasix, Vancocin, Flacol, Napa, Zimax...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs (Segmented Button Group - Allowed by Design constitution) */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            {THERAPEUTIC_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Favorites Filter Toggle */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${
              showOnlyFavorites
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
            <span>Pinned ({favorites.length})</span>
          </button>
        </div>

        {/* Results Metadata (Unboxed text with bullet separators) */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-800 font-mono tabular-nums">{filteredDrugs.length}</strong> medications</span>
            <span aria-hidden="true">·</span>
            <span>Calculated for <strong className="text-sky-700 font-mono tabular-nums">{patient.weightKg} kg</strong> child</span>
          </div>

          {(searchQuery || selectedCategory !== 'all' || showOnlyFavorites) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowOnlyFavorites(false);
              }}
              className="text-xs text-sky-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

      </div>

      {/* Drug Cards Grid */}
      {filteredDrugs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDrugs.map((drug) => (
            <DrugCalculatorCard
              key={drug.id}
              drug={drug}
              patient={patient}
              isFavorite={favorites.includes(drug.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-2">
          <p className="text-sm font-semibold text-slate-700">No drugs found matching "{searchQuery}"</p>
          <p className="text-xs text-slate-500">
            Try searching for generic (e.g. Paracetamol) or common Bangladeshi trade brand (e.g. Napa, Ace, Zimax, Denvar).
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowOnlyFavorites(false);
            }}
            className="mt-2 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
