# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Item.delete_all

img_source = "http://clipart-library.com/images_k/"


    Item.create(name: "Banana", avator: img_source + "banana-transparent-png/banana-transparent-png-20.png", price: 1)
    Item.create(name: "Orange", avator: img_source + "orange-transparent-png/orange-transparent-png-13.png", price: 2)
    Item.create(name: "Avocado", avator: img_source + "transparent-avocado/transparent-avocado-23.png", price: 2)
    Item.create(name: "Apple", avator: img_source + "transparent-apple/transparent-apple-17.png", price: 2)
    Item.create(name: "Cabbage", avator: img_source + "transparent-cabbage/transparent-cabbage-8.png", price: 2)
    