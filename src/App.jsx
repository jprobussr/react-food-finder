import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchMeals = async (mealQuery) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealQuery}`,
    );

    const data = await response.json();
    setMeals(data.meals || []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setSubmittedSearch('');
      setMeals([]);
      setErrorMessage('Please enter a meal name');
      return;
    }

    setErrorMessage('');
    setSubmittedSearch(trimmedSearch);
    setSearchTerm('');
    fetchMeals(trimmedSearch);
  };

  let message = 'Search for a meal to see results here.';

  if (errorMessage) {
    message = errorMessage;
  } else if (submittedSearch) {
    message = `You searched for: ${submittedSearch}`;
  }

  const hasSearched = submittedSearch !== '';

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
                Search by meal name to discover recipes and food inspiration.
              </p>
            </div>

            <form className="search-form" onSubmit={handleSearchSubmit}>
              <label className="sr-only" htmlFor="meal-search">
                Search for a meal
              </label>
              <input
                id="meal-search"
                className="search-input"
                type="text"
                placeholder="Try pasta, chicken, beef..."
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </section>

          <section className="results-section">
            <h2 className="section-title">Results</h2>
            <p className="section-text">{message}</p>
            {hasSearched && meals.length === 0 && !errorMessage && (
              <p className="section-text">
                No meals found for "{submittedSearch}".
              </p>
            )}

            <div className="meals-grid">
              {meals.map((meal) => {
                return (
                  <article>
                    <img
                      className="meal-card-image"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                    />

                    <div className="meal-card-content">
                      <h3 className="meal-card-title">{meal.strMeal}</h3>
                      <p className="meal-card-meta">{meal.strCategory}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            {isLoading && <p className="section-text">Loading meals...</p>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
