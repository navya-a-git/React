const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;