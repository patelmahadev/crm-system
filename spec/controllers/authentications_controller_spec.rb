require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do
  render_views
  def generate_jwt_token(customer)
    JWT.encode({ customer_id: customer.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  before(:each) do
    @customer = FactoryBot.create(:customer)
    @token = generate_jwt_token(@customer)
    request.headers['Authorization'] = "Bearer #{@token}"
  end

  describe 'GET #create' do
    it 'Creating a customer' do
      post :login, params: { email: @customer.email, password: "Password@123"}
      expect(response.status).to eq 200
    end
  end


end