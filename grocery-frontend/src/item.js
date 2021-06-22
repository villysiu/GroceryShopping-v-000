//const getItems = () => {
    fetch(ITEMS_URL)
    .then(r => r.json())
    .then(item_data => renderItems(item_data))
//}

const renderItems = (ItemsData) => {
  
    ItemsData.forEach(item => renderItemCard(item))
}

const renderItemCard = (itemObj) => {
    let itemCard = document.createElement('div')
    itemCard.className = "col-sm-4"
    itemCard.dataset.id = itemObj.id
    itemCard.innerHTML = `
    
      <h4>${itemObj.name}</h4>
      <p><img class="img" src="${itemObj.avator}"></p>
      <p>$${itemObj.price}</p>
      <input class="input-text" type="text" name="quantity" size="2" value="0">
      <button class="add-btn" data-item-id=${itemObj.id}>Add to cart</button>
    `
     itemCard.lastElementChild.addEventListener('click', AddItemToCart)
     left.appendChild(itemCard)
  }