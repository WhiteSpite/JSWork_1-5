const but = document.querySelector('button')
const uri = 'https://picsum.photos/v2/list?limit='


function getVal() {
    const val = document.querySelector('input').value
    if (1 <= val && val <= 10) return val
    else insertHTML(`Число ${val} вне диапазона 1-10`, true)
}

function insertHTML(res, out=false) {
    const div = document.createElement('div')
    but.after(div)
    if (!out) {
        for (let i of res) {
            div.insertAdjacentHTML('afterbegin', `<img src="${i.download_url}" alt="img">`)
        }
    } else div.insertAdjacentHTML('afterbegin', `<p>${res}</p>`)
    but.after(div)
}

function makeRequest() {
    const val = getVal()
    if (!val) return
    let xhr = new XMLHttpRequest()
    xhr.open('get', uri + val)
    xhr.onload = function f() {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response)
            for (let i of res)
                console.log(i)

            insertHTML(res)
        } else
            console.log('Статус запроса: ' + xhr.status)
    }
    xhr.onerror = () => console.log("Ошибка! Статус: " + xhr.status + '. Попробуй включить VPN')
    xhr.send()
}

but.addEventListener('click', makeRequest)
