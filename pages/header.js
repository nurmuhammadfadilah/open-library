import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Klik untuk refresh */}
        <Link href="/" onClick={(e) => { e.preventDefault(); router.reload(); }}>
          <span className="text-white text-2xl font-bold cursor-pointer">
            📚 Open Library 📚
          </span>
        </Link>

        {/* Menu untuk layar besar */}
        <div className="hidden md:flex space-x-6">
          {/* <Link href="/" className="text-white hover:text-yellow-300">
            Beranda
          </Link> 
          <Link href="/kategori" className="text-white hover:text-yellow-300">
            Kategori
          </Link>
          <Link href="/tentang" className="text-white hover:text-yellow-300">
            Tentang
          </Link>
          <Link href="/kontak" className="text-white hover:text-yellow-300">
            Kontak
          </Link> */}
        </div>

        {/* Tombol Menu Hamburger untuk Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu untuk Mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-600 py-2">
          {/* <Link href="/" className="text-white py-2 hover:text-yellow-300">
            Beranda
          </Link>
          <Link href="/kategori" className="text-white py-2 hover:text-yellow-300">
            Kategori
          </Link>
          <Link href="/tentang" className="text-white py-2 hover:text-yellow-300">
            Tentang
          </Link>
          <Link href="/kontak" className="text-white py-2 hover:text-yellow-300">
            Kontak
          </Link> */}
        </div>
      )}
    </nav>
  );
}
