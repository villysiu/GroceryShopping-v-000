class Cart {
    constructor(cart_obj) {

      this.id = cart_obj.id;
      this.line_items = cart_obj.line_items;
    }
    
  }

   // const getCart = () => {
        fetch(CART_URL)
        .then(r => r.json())
        .then(cart_data => renderCart(cc=new Cart(cart_data)))
   //     }

    const renderCart = (current_cart) => {
    
        let cartDiv = document.createElement('div')
    //   cartDiv.className = "cart"
        cartDiv.dataset.id = current_cart.id
        cartDiv.id = `cart-id-${current_cart.id}`
        console.log(`Current cart id is ${current_cart.id}`)

        //checkout button is not implemented as it will go to another page
        cartDiv.innerHTML = `
            <p>Your cart</p>
            <button id="checkoutBtn" data-cart-id=${current_cart.id} onclick="checkout_msg()">Check out</button>
            `
        
        right.appendChild(cartDiv)
    
       let lineItemTable = document.createElement('table')
       lineItemTable.innerHTML = `<tr><td>item</td><td>Unit Price</td><td>quantity</td><td></td><td></td></tr>`
       cartDiv.appendChild(lineItemTable)

       current_cart.line_items.forEach(line_item => renderLineItem(line_item,lineItemTable))
     
       let subtotal = document.createElement('p')
       subtotal.id = "subtotal"
       subtotal.innerHTML = `Subtotal $${current_cart.cartTotal()}`
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
     deleteBtn.addEventListener('click', deleteItemInCart)
   }
   const AddItemToCart = (e) => {
       if (e.target.previousElementSibling.value >0) {
        console.log(e.target)
        let newItemObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                item_id: e.target.dataset.itemId,
                quantity: e.target.previousElementSibling.value
            })
        }

        fetch(LINEITEM_URL, newItemObj)
        .then(r => r.json())
        .then(data => addLineitem(data, e))
       }
  }
  const deleteItemInCart = (e) => {
    
    fetch(LINEITEM_URL+`/${e.target.dataset.lineitemId}`, {
      method: "DELETE"
      })
      .then(r => r.json())
     .then(data => removeLineitem(data, e)
    )
}
   const editQuantityInCart = (e) => {
    console.log(cc.cartTotal())
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
    const removeLineitem = (data, e) => {
        console.log(data)
         let LineitemToRemove = document.getElementById(`lineitem-${data.id}`)
         LineitemToRemove.parentElement.removeChild(LineitemToRemove)
         
         updateSubtotal(data.cart.subtotal)
       }
       const updateLineitem = (data, e) => {
          console.log(data.quantity)
          if (data.quantity > 0) {  
            let LineitemToUpdate = document.getElementById(`quantity-${data.id}`)
            LineitemToUpdate.value = data.quantity
            updateSubtotal(data.cart.subtotal)
          }
          else {
            removeLineitem(data, undefined)
          }
        }
      
      const addLineitem = (data, e) => {
          console.log(data)
          let LineitemToAdd = document.getElementById(`lineitem-${data.id}`)
          if (LineitemToAdd == null) {
              renderLineItem(data, document.querySelector('table'), e)
          }
          else {
              updateLineitem(data, e)
          }
          if (e.target.previousElementSibling.value > 0) {
            e.target.previousElementSibling.value = 0
          }
          updateSubtotal(data.cart.subtotal)
      
        }

   const updateSubtotal = (subtotal) => {
        document.getElementById('subtotal').innerHTML  = `Subtotal $${subtotal}`
    }
  
    function checkout_msg() {
        alert("Checkout button not setup!");
    }