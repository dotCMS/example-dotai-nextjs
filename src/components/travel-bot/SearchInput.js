export default function SearchInput({
  searchQuery,
  setSearchQuery,
  searchType,
  handleSearch,
  isLoading,
  placeholderAiSearch,
  placeholderInputSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          searchType === "aiChat" ? placeholderAiSearch : placeholderInputSearch
        }
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {searchType === "aiChat" ? "Ask AI" : "Search"}
      </button>
    </div>
  );
}
