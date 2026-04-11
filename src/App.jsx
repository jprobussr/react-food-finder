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
            <h2 className="section-title">Find a meal</h2>
            <p className="section-text">
              Search by meal name to discover recipes and food inspiration.
            </p>
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
