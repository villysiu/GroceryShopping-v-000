class CartSerializer
    
    attr_reader :data
  
    def initialize(cart_data)
      @data = cart_data
    end
  
    def to_serialized_json
      self.data.to_json(include: {
        line_items: {except: [:created_at, :updated_at]}
        }, except:[:created_at, :updated_at])
      end
  
   end
