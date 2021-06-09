class CartsController < ApplicationController
    def index
        cart = current_cart
        render json: cart
    end
    def create
        
      end
    
      def destroy
        render json: Cart.find(params[:id]).destroy
      end

end
