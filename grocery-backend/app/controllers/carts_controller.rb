class CartsController < ApplicationController
    
  def index
    carts = Cart.all
    render json: carts
  
  end
    def show
        cart = Cart.find(params[:id])
         render json: CartSerializer.new(cart).to_serialized_json
         
        #render json: cart
    end
    def create
        #cart = Cart.create
      end
    
      def destroy
        render json: Cart.find(params[:id]).destroy
      end
    
     

end
