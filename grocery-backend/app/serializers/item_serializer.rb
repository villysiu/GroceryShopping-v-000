class ItemSerializer
    
    attr_reader :data
  
    def initialize(item_data)
      @data = item_data
    end
  
    def to_serialized_json
      self.data.to_json, except:[:created_at, :updated_at])
    end
  
   end