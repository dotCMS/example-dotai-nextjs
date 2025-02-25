import { useState } from "react";
import SearchInput from "../travel-bot/SearchInput";
import SearchTypeSelector from "../travel-bot/SearchTypeSelector";
import SearchResults from "../travel-bot/SearchResults";

/**
 * TravelBotComponent - A search interface that combines AI-powered chat and keyword search
 * for travel-related content.
 *
 * Features:
 * - Two search modes: AI Chat and Keyword search
 * - AI Chat: Provides natural language responses and relevant articles
 * - Keyword Search: Returns matching articles based on search terms
 * - Displays search results with relevance scores
 * - Shows AI-generated summaries for chat responses
 */
export default function TravelBotComponent({
  indexName,
  placeholderAiSearch,
  placeholderInputSearch,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("aiChat");
  const [answer, setAnswer] = useState("");

  /**
   * Makes requests to DotCMS AI endpoints
   * @param {string} endpoint - Endpoint path ('api/v1/ai/search' or 'api/v1/ai/completions')
   * @param {object} customConfig - Specific configuration for each search type
   * @returns {Promise<Response>} Server response
   */
  const makeDotCMSAIRequest = async (endpoint, customConfig = {}) => {
    // Base configuration common to both endpoints
    const baseConfig = {
      prompt: searchQuery, // Search text
      threshold: 0.25, // Relevance threshold (0-1)
      responseLengthTokens: 500, // Maximum response length
      indexName: indexName, // DotCMS search index
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOTCMS_HOST}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ ...baseConfig, ...customConfig }),
      }
    );
    return response;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setAnswer("");
    setSearchResults([]);

    try {
      if (searchType === "keyword") {
        const response = await makeDotCMSAIRequest("api/v1/ai/search");
        const data = await response.json();
        setSearchResults(data.dotCMSResults || []);
      } else {
        const response = await makeDotCMSAIRequest("api/v1/ai/completions");
        const data = await response.json();
        setSearchResults(data.dotCMSResults || []);

        if (data.openAiResponse?.choices?.[0]?.message?.content) {
          setAnswer(data.openAiResponse.choices[0].message.content);
        }
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setAnswer("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="min-h-[200px] flex flex-col">
        <SearchInput
          placeholderAiSearch={placeholderAiSearch}
          placeholderInputSearch={placeholderInputSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchType={searchType}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        <SearchTypeSelector
          searchType={searchType}
          setSearchType={setSearchType}
        />

        <div className="flex-1 relative">
          {isLoading && (
            <div className="mt-8 flex justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}

          {answer && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-semibold mb-2">Summary:</div>
              <div className="text-gray-700 whitespace-pre-wrap">{answer}</div>
            </div>
          )}

          {searchResults.length > 0 && (
            <SearchResults results={searchResults} />
          )}

          {(searchResults.length > 0 || answer) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
