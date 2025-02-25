export default function SearchResults({ results }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">References</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <a
              href={result.urlMap}
              className="text-orange-500 font-bold hover:underline"
            >
              {result.title}
            </a>
            <p className="text-gray-600 mt-2">{result.teaser}</p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                {result.contentType}
              </span>
              {result.matches?.map((match, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                >
                  Score: {Math.round((1 - match.distance) * 100)}%
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
