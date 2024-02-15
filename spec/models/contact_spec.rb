require 'rails_helper'
RSpec.describe Contact, type: :model do
  describe "validations" do
     it { should validate_presence_of(:phone)}
  end

end
