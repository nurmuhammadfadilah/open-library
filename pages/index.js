import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_OPENLIBRARY_API;

  // Ambil data rekomendasi buku saat pertama kali dibuka
  useEffect(() => {
    async function fetchRecommendedBooks() {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search.json?q=technology&limit=10`);
        setBooks(response.data.docs || []);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
      setLoading(false);
    }
    fetchRecommendedBooks();
  }, []);

  // Fungsi untuk mencari buku berdasarkan judul
  const searchBooks = async () => {
    if (!query) return;

    setFadeOut(true); // Aktifkan animasi menghilang
    setTimeout(async () => {
      setIsSearching(true);
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search.json?title=${query}`);
        setBooks(response.data.docs || []);
      } catch (error) {
        console.error("Error searching books:", error);
      }
      setLoading(false);
      setFadeOut(false); // Matikan animasi setelah loading selesai
    }, 300); // Waktu fade-out sebelum data baru dimuat
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchBooks();
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Header dengan Search Bar */}
      <header className="bg-blue-500 p-5 rounded-lg shadow-lg text-white text-center mb-6">
        {/* <h1 className="text-2xl font-bold">📚 Open Library Book Finder 📚</h1> */}
        <Header />
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Cari buku berdasarkan judul..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-2 rounded-l-md w-80 text-black"
          />
          <button
            onClick={searchBooks}
            className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500"
          >
            🔍 Cari
          </button>
        </div>
      </header>

      {/* Judul Section */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {isSearching ? "Hasil Pencarian Buku" : "Rekomendasi Buku"}
      </h2>

      {/* Animasi Loading */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Grid Buku */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="border rounded-lg shadow-lg overflow-hidden bg-white p-4">
              <img
                src={book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : `https://upload.wikimedia.org/wikipedia/commons/9/9b/No_cover.JPG`}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="mt-3">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author_name?.join(", ") || "Penulis tidak diketahui"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
}
