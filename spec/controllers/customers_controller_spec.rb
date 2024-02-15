require 'rails_helper'
require 'spec_helper'

RSpec.describe CustomersController, type: :controller do
  render_views
  def generate_jwt_token(customer)
    JWT.encode({ customer_id: customer.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  before(:each) do
    @customer = FactoryBot.create(:customer)
    @token = generate_jwt_token(@customer)
    request.headers['Authorization'] = "Bearer #{@token}"
  end

  describe 'GET #index' do
    it 'returns a success response' do
      allow(controller).to receive(:authorize_request) # Stubbing authorize_request
      get :index
      expect(response).to be_successful
    end
  end


  describe 'GET #show' do
    it 'Show a customer' do
     get :show, params: { id: @customer.id }
      expect(response.status).to eq 200
    end
  end

  describe 'GET #create' do
    it 'Creating a customer' do
      post :create, params: { name: "test", username: "test", email: Faker::Internet.unique.email, password: "Password@123" }
      expect(response.status).to eq 201
    end
    it 'returns unprocessable_entity status with error messages' do
           post :create, params: { customer: { email: nil, password: 'password' } }
           expect(response).to have_http_status(:unprocessable_entity)
         end
  end

  describe 'GET #update' do
    it 'Updating a customer' do
      put :update, params: {id: @customer.id, name: "test", username: "test", email: Faker::Internet.unique.email, password: "Password@123" }
      expect(response.status).to eq 200
    end
    it 'updates the customer and returns success response' do
            new_name = 'New Name'
            put :update, params: { id: @customer.id, customer: { name: new_name } }
            expect(response).to have_http_status(:ok)
          end
  end

  describe 'GET #delete' do
    it 'destroy a specfic contact' do
      delete :destroy, params: {id: @customer.id }
      expect(response.status).to eq 200
    end
  end
end