const countriesContainer = document.querySelector('.countries-container');
const filterRegion = document.querySelector('.filter-region');
const searchInput = document.querySelector('.searchbar input');
const themeChanger = document.querySelector('.theme-changer');

function toggleDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode';
    } else {
        document.body.classList.remove('dark');
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    toggleDarkMode(isDarkMode);
});

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data);
        allCountriesData = data;
    });

filterRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries);
});

function renderCountries(data) {
    countriesContainer.innerHTML = "";
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country');
        countryCard.href = `./src/cardscountry.html?name=${country.name.common}`;

        const cardHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="country-text">
                <h3 class="country-title"> ${country.name.common}</h3>
                <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital?.[0]}</p>
            </div>`;

        countryCard.innerHTML = cardHTML;
        countriesContainer.append(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
});

themeChanger.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('dark');
    toggleDarkMode(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});
