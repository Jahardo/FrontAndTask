const FeaturedImagesWrapper = document.querySelector('.featured-images')
const LastImageWrapper = document.querySelector('.last-images')

const createFeatureNode= (im,i) => {
    const {tags :tagsList} = im
    const isSelected= Math.floor(Math.random() * 2) === 1
    const node = document.createElement("div")
    node.innerHTML = `
    <div class="featured-image">
        <img src="../${im.image}" class="img-box">
        <div class="title-box"><a href="#" class="ref title-feature">${im.title}</a></div>
        <div class="tags-box">${Object.values(tagsList).map(tag => `<a class="ref tags-font" href="#">#${tag}</a>`).join(' ')}</div>
            <img class="svg-box" src="${isSelected ? '../icons/star-regular.svg' : '../icons/star-solid.svg'}"><div class="gradient-box">
        </div>
    </div>`
    if(i === 0) node.classList.add('box1')
    return node
}
const createLastNode = (im,i) => {
    const {tags :tagsList} = im
    const isSelected= Math.floor(Math.random() * 2) === 1
    const node = document.createElement("div")
    node.innerHTML = `
    <div class="last-image">
        <img src="../${im.image}" class="img-box">
        <div class="title-last">${im.title}</div>
        <div class="">${Object.values(tagsList).map(tag => `<a class="tags-last ref" href="#">#${tag}</a>`).join(' ')}</div>
        <img class="svg-box" src="${isSelected ? '../icons/star-regular.svg' : '../icons/star-solid.svg'}">
    </div>`
    if(i === 0) node.classList.add('box1')
    return node
}
const fetchData =  async () => {
    const data = await fetch('../data.json').then(res=>res.json())
    console.log(data)
    const last = data.sort((a,b) => {
        return a.age > b.age
    }).slice(0,2)
    console.log(last)
    const featured = data.sort((a,b) => {
        return a.id > b.id
    }).slice(0,5)
    console.log(featured)
    last.forEach(img => {
        LastImageWrapper.append(createLastNode(img,1))
    })
    featured.forEach((img,i) => {
        FeaturedImagesWrapper.append(createFeatureNode(img,i))
    })
    const adbox = document.createElement('div')
    adbox.classList.add('ad-banner')
    LastImageWrapper.append(adbox)
}
fetchData();

const getCount = () => {
    const all = document.getElementsByTagName("*")
    console.log(all.length)
    const allTags = Array.from(all)
    const tags = {}
    const tagsByLength = {}
    allTags.forEach(item => {
        const tagsLength = item.tagName.length
        if(! tagsByLength[tagsLength]){
            tagsByLength[tagsLength] = []
        }
        if(! tags[item.tagName]) {
            tags[item.tagName] = {tagsCount:0}
        }
        tags[item.tagName].tagsCount += 1
        tagsByLength[tagsLength].push(item.tagName)
    })
    console.log(tags)
    console.log(tagsByLength)
}
getCount()