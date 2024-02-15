require 'rails_helper'
RSpec.describe Customer, type: :model do
  describe "validations" do
     it { should validate_presence_of(:email)}
     it { should validate_uniqueness_of(:email)}
	  it 'validates password length' do
	  	should validate_length_of(:password).
	  	is_at_least(6).
	  	on(:create)
	  end
  end
   describe "associations" do
     it { should have_many(:contacts).dependent(:destroy) }
   end

end
