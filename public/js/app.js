const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location1 = search.value
    // console.log(location)
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location1).then((response) => {
    response.json().then((data = {}) => {
        if (data.error) {
            messageOne.textContent=(data.error)
        }
        else messageOne.textContent=data.location
            messageTwo.textContent= (`${data.Forecast.summary}  While the current temperture is ${data.Forecast.currentTemp}C°`)+
            (`Have a beautiful week!! Hashem Loves you!!
             `)


    })
})
})
