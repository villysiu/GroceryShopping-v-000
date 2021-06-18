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