import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const API_URL = process.env.NEXT_PUBLIC_OPENLIBRARY_API;

  useEffect(() => {
    fetchRecommendedBooks();
  }, []);

  async function fetchRecommendedBooks(viewAll = false) {
    setFadeOut(true);
    setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/search.json?q=technology${viewAll ? "" : "&limit=10"}`
        );
        setBooks(response.data.docs || []);
        setIsViewAll(viewAll);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setLoading(false);
      setFadeOut(false);
    }, 300);
  }

  const searchBooks = async () => {
    if (!query) return;

    setFadeOut(true);
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
      setFadeOut(false);
    }, 300);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchBooks();
    }
  };

  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationRange = () => {
    const pages = [];
    const totalVisiblePages = 5; // Jumlah halaman yang terlihat dalam pagination

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "..", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "..", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "..", currentPage - 1, currentPage, currentPage + 1, "..", totalPages);
      }
    }

    return pages;
  };


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = isViewAll ? books.slice(indexOfFirstBook, indexOfLastBook) : books;

  return (
    <div className="container mx-auto p-5">
      <header className="bg-blue-500 p-5 rounded-lg shadow-lg text-white text-center mb-6">
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

      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
          {isViewAll ? "Semua Buku" : "Rekomendasi Buku"}
        </h2>
        {!isSearching && !isViewAll && (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => fetchRecommendedBooks(true)}
          >
            View All
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        {currentBooks.length > 0 ? (
          currentBooks.map((book, index) => (
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

      {isViewAll && totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-4 py-2 border rounded bg-gray-200"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>

          {getPaginationRange().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && paginate(page)}
              className={`px-4 py-2 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              disabled={page === ".."}
            >
              {page}
            </button>
          ))}

          <button
            className="px-4 py-2 border rounded bg-gray-200"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}
