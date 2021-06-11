class CartsController < ApplicationController
  
  def index
    carts = Cart.all
    render json: carts
  
  end
    def show
      cart = Cart.find(params[:id]) 
      render json: CartSerializer.new(cart).to_serialized_json

    end
   
    
     

end
