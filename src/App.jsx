const App = () => {
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
                type="text"
                className="search-input"
                id="meal-search"
                placeholder="Try pasta, chicken, beef..."
              />

              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </section>

          <section className="results-section">
            <h2 className="section-title">Results</h2>
            <p className="section-text">
              Your meal cards will appear here once we connect the search.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
