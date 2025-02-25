export default function SearchTypeSelector({ searchType, setSearchType }) {
  return (
    <div className="mt-4 flex items-center space-x-6">
      <span className="text-gray-600">Type:</span>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="searchType"
          value="aiChat"
          checked={searchType === "aiChat"}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
        />
        <span className="ml-2 text-gray-600">AI Chat</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="searchType"
          value="keyword"
          checked={searchType === "keyword"}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
        />
        <span className="ml-2 text-gray-600">Keyword</span>
      </label>
    </div>
  );
}
