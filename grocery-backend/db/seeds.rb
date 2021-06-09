# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Item.delete_all

img_source = "https://images.freeimages.com/images/small-previews/"


    Item.create(name: "Banana", avator: img_source + "79/banana-1328691.jpg", price: 1)
    Item.create(name: "Orange", avator: img_source + "434/orange-1325927.jpg", price: 2)
    Item.create(name: "Avocado", avator: img_source + "434/orange-13227.jpg", price: 2)
    Item.create(name: "Apple", avator: img_source + "434/orange-1325927.jpg", price: 2)
    Item.create(name: "Cabbage", avator: img_source + "81f/cabbage-1322374.jpg", price: 2)
    