import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadQuotes() {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/quotes"
        );
        const data = await res.json();

        setQuotes(data.data.data);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    loadQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      
      
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
         Quotes App
      </h1>

       
      {status === "loading" && (
        <p className="text-center text-white text-lg animate-pulse">
          Loading quotes...
        </p>
      )}

      {status === "error" && (
        <p className="text-center text-red-200">
          Failed to load quotes
        </p>
      )}

      {status === "success" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-5 shadow-lg hover:scale-105 transition"
            >
              <p className="text-white text-lg leading-relaxed">
                “{q.content}”
              </p>

              <p className="text-sm text-gray-200 mt-4 text-right">
                ~{q.author}
              </p>

             {/* ///////////tags//////// */}
              {q.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/30 text-white text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;