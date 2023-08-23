/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import md5 from 'md5';
import './App.css';
import CharacterList from './CharactersList.jsx';

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10; 

  const publicKey = '3870783a5a294c792ab18cb38a8be804';
  const privateKey = '0d5e1491a55ef08c26cfb844dfcf1555e3b0737f';

  const fetchCharacters = async (page) => {
    const offset = (page - 1) * charactersPerPage;
    const timestamp = Date.now();
    const hash = md5(timestamp + privateKey + publicKey);

    let apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${charactersPerPage}&offset=${offset}`;

    if (searchTerm) {
      apiUrl += `&nameStartsWith=${searchTerm}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <img 
        src='https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-4.png' 
        style={{ width: 200 }}
      />
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <CharacterList characters={characters} />
      <Pagination
        currentPage={currentPage}
        charactersPerPage={charactersPerPage}
        totalCharacters={1562} 
        onPageChange={handlePageChange}
      />
    </>
  );
}

const Pagination = ({ currentPage, totalCharacters, charactersPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);

  return (
    <div style={containerStyles}>
      <ul className="pagination" style={containerStyles}>
        <li>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
        </li>
        <li>
          Página {currentPage} de {totalPages}
        </li>
        <li>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </li>
      </ul>
    </div>
  );
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15
}


export default App;


