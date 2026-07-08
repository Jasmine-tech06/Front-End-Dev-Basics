const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search your favourite home décor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>
  );
};

export default SearchBar;