class Post < ApplicationRecord
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks


    def self.search_published(query)
        params = {
          query: {
            multi_match: {
              query: query, 
              fields: [ :title ] 
            },
          },
        }
      
        self.__elasticsearch__.search(params)
      end
      
end
