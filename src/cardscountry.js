const countryName = new URLSearchParams(location.search).get('name')
const flagImg = document.querySelector(".country-container img")
const countryTitle = document.querySelector(".country-details h1")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const domain = document.querySelector(".domain")
const currencies = document.querySelector(".currencies")
const languages = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const themeChanger = document.querySelector('.theme-changer')

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

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    console.log(country)
    flagImg.src = country.flags.svg;
    countryTitle.innerText = country.name.common;
    population.innerText = country.population.toLocaleString('en-In');
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    capital.innerText = country.capital?.[0];
    domain.innerText = country.tld.join(", ");
    currencies.innerText = country.currencies;

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText = country.name.common;
    }

    if(country.currencies) {
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(", ")
    }

    if(country.languages) {
        languages.innerText = Object.values(country.languages).join(", ")
    }

    if(country.borders) {
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `cardscountry.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
})

themeChanger.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('dark');
    toggleDarkMode(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});