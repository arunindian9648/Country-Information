const countryInput = document.getElementById('countryInput');
const search = document.getElementById('search');

let search_result = document.getElementById('search_result');
let flag = document.getElementById('flag');
let name = document.getElementById('name');
let capital = document.getElementById('capital');
let continent = document.getElementById('continent');
let currency = document.getElementById('currency');
let sub_region = document.getElementById('sub_region');
let coatOfArms = document.getElementById('coatOfArms');
let language = document.getElementById('language');
let cs = document.getElementById('cs');
let tz = document.getElementById('tz');

// The loading element
let loading = document.getElementById('loading');

// Add event listener to the search button
search.addEventListener('click', async () => {
    let countryName = countryInput.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    // Show the loading screen
    loading.style.display = 'block';
    search_result.style.display = 'none'; // Hide search result while loading

    try {
        // Fetch country data
        let res = await fetch(finalURL);
        let data = await res.json();

        if (res.ok) {
            search_result.style.display = 'block'; // Show search result once data is fetched
            loading.style.display = 'none'; // Hide loading screen

            let countryData = data[0];

            flag.src = countryData.flags.svg;
            flag.alt = countryData.flags.alt;
            coatOfArms.src = countryData.coatOfArms.svg;
            coatOfArms.alt = countryData.coatOfArms.alt;

            name.innerHTML = countryData.name.official;
            capital.innerHTML = countryData.capital;
            continent.innerHTML = countryData.continents;
            sub_region.innerHTML = countryData.subregion;
            currency.innerHTML = countryData.currencies[Object.keys(countryData.currencies)].name;
            cs.innerHTML = countryData.currencies[Object.keys(countryData.currencies)].symbol;
            tz.innerHTML = countryData.timezones;
            language.innerHTML = Object.values(countryData.languages).toString().split(',').join(', ');

        } else {
            loading.style.display = 'none'; // Hide loading screen on error
            alert("Wrong input given");
        }
    } catch (e) {
        loading.style.display = 'none'; // Hide loading screen if there is an error
        console.log("Error: ", e);
        alert("An error occurred while fetching the data.");
    }
});
