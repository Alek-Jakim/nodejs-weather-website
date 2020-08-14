const form = document.getElementById('form');
const search = document.querySelector('.input');
const resultContainer = document.querySelector('.results');
const submitBtn = document.querySelector('.submit-btn');

const getLocation = async (e) => {
    e.preventDefault();
    let searchValue = search.value
    try {
        const res = await fetch(`/weather?address=${searchValue}`)
        const data = await res.json();

        if (data.error) {

            resultContainer.innerHTML = `
            <p>Location Not Found! Please Try Again!</p>
            `
            search.value = ''
            clearError();
        } else {
            resultContainer.innerHTML = `
            <p class="location">Search Results: ${data.location}</p>
            <p class="forecast">${data.forecast}<p>
            `

            search.value = ''
            clearData();
        }
    } catch (e) {
        console.log(e)
    }
}

const clearError = () => {
    setTimeout(() => {
        resultContainer.innerHTML = ''
    }, 3000)
}


form.addEventListener('submit', getLocation);