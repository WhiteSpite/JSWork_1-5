const xml = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`

const parser = new DOMParser()
const DOM = parser.parseFromString(xml, 'text/xml')
const list = DOM.querySelector('list').children
const finObj = {list: []}

for (i of list) {
  let name = i.querySelector('name')
  const lang = name.getAttribute('lang')
  const firstName = name.querySelector('first')
  const secondName = name.querySelector('second')
  name = firstName.textContent + ' ' + secondName.textContent
  const age = i.querySelector('age')
  const prof = i.querySelector('prof')
  const student = {
    name: name,
    age: age.textContent,
    prof: prof.textContent,
    lang: lang
  }
  finObj.list.push(student)
}

console.log(finObj)
