import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitedSearch, setSubmittedSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setSubmittedSearch('');
      setMeals([]);
      setErrorMessage('Please enter a meal name.');
      return;
    }

    setErrorMessage('');
    setSubmittedSearch(trimmedSearch);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-content">
          <div>
            <p className="eyebrow">React Project</p>
            <h1 className="site-title">Food Finder</h1>
            <p className="site-description">
              Search for meals and explore delicious recipe ideas.
            </p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <section className="search-section">
            <div className="search-copy">
              <h2 className="section-title">Find a meal</h2>
              <p className="section-text">
                Search by meal name to discover recipes and food inspiration
              </p>
            </div>

            <form className="search-form" onSubmit={handleSearchSubmit}>
              <label htmlFor="meal-search" className="sr-only">
                Search for a meal
              </label>

              <input
                id="meal-search"
                className="search-input"
                type="text"
                placeholder="Try pasta, chicken, beef..."
                value={searchTerm}
                onChange={() => setSearchTerm(event.target.value)}
              />

              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </section>

          <section className="results-section">
            <h2 className="section-title">Results</h2>

            {errorMessage ? (
              <p className="section-text">{errorMessage}</p>
            ) : submitedSearch ? (
              <p className="section-text">You searched for: {submitedSearch}</p>
            ) : (
              <p className="section-text">
                Search for a meal to see results here.
              </p>
            )}
            {isLoading && <p className='section-text'>Loading meals...</p>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
