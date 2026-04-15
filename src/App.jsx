import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setSubmittedSearch('');
      setMeals([]);
      setErrorMessage('Please enter a meal name.');
      return;
    }

    setErrorMessage('');
    setSubmittedSearch(trimmedSearch);
    setSearchTerm('');
    fetchMeals(trimmedSearch);
  };

  const fetchMeals = async (mealQuery) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealQuery}`,
      );

      const data = await response.json();

      setMeals(data.meals || []);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
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
              <label htmlFor="meal-search" className="sr-only">
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

            {isLoading && <p className="section-text">Loading meals...</p>}

            {selectedMeal && (
              <article className="selected-meal">
                <img
                  className="selected-meal-image"
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                />

                <div className="selected-meal-content">
                  <div className="selected-meal-header">
                    <h3 className="selected-meal-title">
                      {selectedMeal.strMeal}
                    </h3>
                    <button
                      className="selected-meal-close"
                      type="button"
                      onClick={() => setSelectedMeal(null)}
                    >
                      ×
                    </button>
                  </div>

                  <p className="selected-meal-meta">
                    {selectedMeal.strCategory} • {selectedMeal.strArea}
                  </p>

                  <p className="selected-meal-instructions">
                    {showFullInstructions
                      ? selectedMeal.setFullInstructions
                      : `${selectedMeal.strInstructions.slice(0, 180)}...`}
                  </p>

                  <button
                    className="selected-meal-toggle"
                    type="button"
                    onClick={() => setShowFullInstructions((prev) => !prev)}
                  >
                    {showFullInstructions ? 'View full recipe' : 'View less'}
                  </button>
                </div>
              </article>
            )}

            <div className="meals-grid">
              {meals.map((meal) => (
                <article
                  className="meal-card"
                  key={meal.idMeal}
                  onClick={() => {
                    setSelectedMeal(meal);
                    setShowFullInstructions(false);
                  }}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-card-image"
                  />

                  <div className="meal-card-content">
                    <h3 className="meal-card-title">{meal.strMeal}</h3>
                    <p className="meal-card-meta">{meal.strCategory}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
