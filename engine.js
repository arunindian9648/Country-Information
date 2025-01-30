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




search.addEventListener('click', async () => {
    let countryName = countryInput.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  
    search_result.style.display = 'none'; 

    try {
      
        let res = await fetch(finalURL);
        let data = await res.json();

        if (res.ok) {
            search_result.style.display = 'block'; 
           

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
              search_result.style.display = 'none'; 
            alert("Wrong input given");
        }
    } catch (e) {
        search_result.style.display = 'none'; 
        console.log("Error: ", e);
        alert("An error occurred while fetching the data.");
    }
});
