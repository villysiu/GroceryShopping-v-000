//const BASE_URL = "http://localhost:3000"
const BASE_URL = "http://127.0.0.1:3000"
const ITEMS_URL = `${BASE_URL}/items`
const CART_URL = `${BASE_URL}/carts/1`
const LINEITEM_URL = `${CART_URL}/line_items`
current_cart = 1
document.addEventListener('DOMContentLoaded', () => {
    getItems();
    getCart();
  })

const left = document.querySelector("#left-side");
const right = document.querySelector("#right-side");

const getItems = () => {
    fetch(ITEMS_URL)
    .then(r => r.json())
    .then(item_data => renderItems(item_data))
}

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
 

  const getCart = () => {
    fetch(CART_URL)
    .then(r => r.json())
    .then(cart_data => renderCart(cart_data))
    }
  
  const renderCart = (cartObj) => {
    //checkout button is setup to link
    let cartDiv = document.createElement('div')
    cartDiv.className = "cart"
    cartDiv.dataset.id = cartObj.id
    cartDiv.id = `cart-id-${cartObj.id}`
    console.log(`Current cart id is ${cartObj.id}`)
    //checkout button is not implemented as it will go to another page
    cartDiv.innerHTML = `
    <p>Your cart</p>
    <button id="checkoutBtn" data-cart-id=${cartObj.id} onclick="checkout_msg()">Check out</button>
    `
    
    right.appendChild(cartDiv)
    
      let lineItemTable = document.createElement('table')
      lineItemTable.innerHTML = `<tr><td>item</td><td>Unit Price</td><td>quantity</td><td></td><td></td></tr>`
      cartDiv.appendChild(lineItemTable)
      cartObj.line_items.forEach(line_item => renderLineItem(line_item,lineItemTable))
     
      let subtotal = document.createElement('p')
      subtotal.id = "subtotal"
      subtotal.innerHTML = `Subtotal $${cartObj.subtotal}`
      cartDiv.appendChild(subtotal)
    
  }

  const renderLineItem = (lineitem, lineItemTable, e) => {
   
   let lineitemLine = document.createElement('tr')
    lineitemLine.id = `lineitem-${lineitem.id}`
    lineitemLine.innerHTML = `
      <td>${lineitem.item.name}</td>
      <td> $${lineitem.item.price}</td>
      <td><input class="input-text" type="text" id="quantity-${lineitem.id}" size="2" value="${lineitem.quantity}"></td>
      <td><button id="update-btn-${lineitem.id}" data-lineitem-id=${lineitem.id}>Update</button></td>
      <td><button id="delete-btn-${lineitem.id}" data-lineitem-id=${lineitem.id}>Delete</button></td>
      `
      lineItemTable.appendChild(lineitemLine)

    let updateBtn = document.getElementById(`update-btn-${lineitem.id}`)
    updateBtn.addEventListener('click', editQuantityInCart)

    let deleteBtn = document.getElementById(`delete-btn-${lineitem.id}`)
    deleteBtn.addEventListener('click', deleteLineitem)
  }

const deleteLineitem = (e) => {
    
    fetch(LINEITEM_URL+`/${e.target.dataset.lineitemId}`, {
      method: "DELETE"
      })
      .then(r => r.json())
     .then(data => removeLineitem(data, e)
    )
}
const removeLineitem = (data, e) => {
 
  let LineitemToRemove = document.getElementById(`lineitem-${data.id}`)
  LineitemToRemove.parentElement.removeChild(LineitemToRemove)
  updateSubtotal(data.cart.subtotal)
}

const editQuantityInCart = (e) => {

  let updateItemObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      quantity: document.getElementById(`quantity-${e.target.dataset.lineitemId}`).value
    })
  }
  fetch(LINEITEM_URL+`/${e.target.dataset.lineitemId}`, updateItemObj)
    .then(r => r.json())
   .then(data => updateLineitem(data, e)
  )
}
const updateLineitem = (data, e) => {
  
  let LineitemToUpdate = document.getElementById(`quantity-${data.id}`)
  LineitemToUpdate.value = data.quantity
  updateSubtotal(data.cart.subtotal)

}
  const AddItemToCart = (e) => {
    
    let addItemObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        cart_id: current_cart,
        item_id: e.target.dataset.itemId,
        quantity: e.target.previousElementSibling.value
      })
    }
    //line_item is updated and redirect to cart show page. the whole cart is returned
    //for convience to display on the page
    fetch(LINEITEM_URL, addItemObj)
    .then(r => r.json())
    .then(data => addLineitem(data, e))
  }
  const addLineitem = (data, e) => {
    console.log(data)
    let oldLineitem = document.getElementById(`lineitem-${data.id}`)
    if (oldLineitem != null) {
      updateLineitem(data, e)
    }
    else {
      renderLineItem(data, document.querySelector('table'), e)
    }
    if (e.target.previousElementSibling.value > 0) {
      e.target.previousElementSibling.value = 0
    }
    updateSubtotal(data.cart.subtotal)

  }

  const updateSubtotal = (subtotal) => {
    document.getElementById('subtotal').innerHTML  = `Subtotal $${subtotal}`
  }
  // const updateCartToDom = (data, e) => {
  //   console.log(data)
    //reset quantity in add to cart to zero based on e
    // if (e.target.previousElementSibling != null && e.target.previousElementSibling.value > 0) {
    //   e.target.previousElementSibling.value = 0
    // }
   
    //remove the old cart
      // let cartToRemove = document.getElementById(`cart-id-${data.id}`)
      // cartToRemove.parentElement.removeChild(cartToRemove)
      
      // renderCart(data)
  // }
  
  function checkout_msg() {
    alert("Checkout button not setup!");
  }