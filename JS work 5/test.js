const but = document.querySelector('button')
if (localStorage.div) but.insertAdjacentHTML('afterend', localStorage.div)

function getVal() {
    function isIn(inp) {if (1 <= inp && inp <= 10) return true}
    const pageNum = parseInt(document.querySelector('.page-num').value)
    const limit = parseInt(document.querySelector('.limit').value)
    if (isIn(pageNum) && isIn(limit)) return [pageNum, limit]
    else {
        let filler = ""
        if (!isIn(pageNum)) {
            if (!isIn(limit)) filler = 'Номер страницы и лимит'
            else filler = 'Номер страницы'
        } else filler = 'Лимит'
        insertHTML(`${filler} вне диапазона 1-10`, true)
        return
    }
}

function insertHTML(res, out=false) {
    const div = document.createElement('div')
    but.after(div)
    if (!out) {
        for (let i of res) {
            div.insertAdjacentHTML('afterbegin', `<img src="${i.download_url}" alt="img">`)
        }
        localStorage.setItem('div', div.outerHTML)
        console.log(localStorage.div)
    }
    else div.insertAdjacentHTML('afterbegin', `<p>${res}</p>`)
}

function makeRequest() {
    const valList = getVal()
    if (!valList) return
    const url = `https://picsum.photos/v2/list?page=${valList[0]}&limit=${valList[1]}`
    fetch(url)
        .then(res => res.json())
        .then(data => insertHTML(data))
}

but.addEventListener('click', makeRequest)
