const but = document.querySelector('button')


function getVal() {
    const inputNodes = document.querySelectorAll('input')
    const paramList = []
    for (let i of inputNodes) {
        const val = i.value
        if (100 <= val && val <= 300) paramList.push(parseInt(val))
        else {insertHTML(`Значение "${val}" вне диапазона 100-300`, true); return}
    }  
    console.log(paramList)
    return paramList
}

function insertHTML(res, out=false) {
    const div = document.createElement('div')
    but.after(div)
    if (!out) div.insertAdjacentHTML('afterbegin', `<img src="${res}" alt="img">`)
    else div.insertAdjacentHTML('afterbegin', `<p>${res}</p>`)
    but.after(div)
}

function makeRequest() {
    const valList = getVal()
    if (!valList) return
    const url = `https://picsum.photos/${valList[0]}/${valList[1]}`
    fetch(url)
        .then(res => insertHTML(res.url))
}

but.addEventListener('click', makeRequest)
