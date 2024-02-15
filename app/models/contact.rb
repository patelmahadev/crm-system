class Contact < ApplicationRecord
  validates :phone, presence: true
  
  belongs_to :customer
end
