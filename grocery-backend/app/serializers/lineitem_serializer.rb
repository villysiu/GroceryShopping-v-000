class LineitemSerializer
    
    attr_reader :data
  
    def initialize(line_item_data)
      @data = line_item_data
     
    end
  
    def to_serialized_json
      self.data.to_json(
          include: {
            item: {except: [:created_at, :updated_at]}
          },
        except: [:created_at, :updated_at])
        
      end
  
   end
