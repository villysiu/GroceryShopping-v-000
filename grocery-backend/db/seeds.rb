# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

LineItem.delete_all
Item.delete_all
Cart.delete_all


img_source = "http://clipart-library.com/images_k/"

    cart = Cart.create();   

    banana = Item.create(name: "Banana", avator: img_source + "banana-transparent-png/banana-transparent-png-20.png", price: 1)
    orange = Item.create(name: "Orange", avator: img_source + "orange-transparent-png/orange-transparent-png-13.png", price: 2)
    avocado = Item.create(name: "Avocado", avator: img_source + "transparent-avocado/transparent-avocado-23.png", price: 2)
    apple = Item.create(name: "Apple", avator: img_source + "transparent-apple/transparent-apple-17.png", price: 2)
    cabbage = Item.create(name: "Cabbage", avator: img_source + "transparent-cabbage/transparent-cabbage-8.png", price: 2)

    item_count = Item.count
   
    LineItem.create(item_id: banana.id, cart_id: cart.id, quantity: 4)
    LineItem.create(item_id: orange.id, cart_id: cart.id, quantity: 2)
    LineItem.create(item_id: avocado.id, cart_id: cart.id, quantity: 1)
    LineItem.create(item_id: apple.id, cart_id: cart.id, quantity: 2)
    LineItem.create(item_id: cabbage.id, cart_id: cart.id, quantity: 1)