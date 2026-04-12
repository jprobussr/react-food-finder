import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

            <form className="search-form">
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
            <p className="section-text">
              Current search: {searchTerm || 'Nothing typed yet.'}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
