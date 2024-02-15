require 'rails_helper'
require 'spec_helper'

RSpec.describe ContactsController, type: :controller do
  render_views
  def generate_jwt_token(contact)
    JWT.encode({ customer_id: contact.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  before(:each) do

    @customer = FactoryBot.create(:customer)
    @contact = FactoryBot.create(:contact, customer_id: @customer.id)
    @token = generate_jwt_token(@customer)
    request.headers['Authorization'] = "Bearer #{@token}"
  end

  describe 'GET #index' do
    it 'returns a success response' do
      # request.headers[:token] = @token
      # allow(controller).to receive(:authorize_request) # Stubbing authorize_request
      get :index, params: {id: @contact.id}
      expect(response).to be_successful
    end
  end

  describe 'GET #create' do
    it 'Creating a contact' do
      post :create, params: {id: @contact.id, address: "test", address2: "test", country: "india", phone: 1234567890, zipcode: 123456 }
      expect(response.status).to eq 201
    end

    it 'create the contact and returns success respons' do
      post :create
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'GET #update' do
    it 'Updating a contact' do
      put :update, params: {id: @contact.id, address: "test", address2: "test", country: "india", phone: 1234567890, zipcode: 123456 }
      expect(response.status).to eq 200
    end
    it 'updates the contact and returns success response' do
            new_attributes = { attribute1: 'new value', attribute2: 'new value' }

            put :update, params: { id: @contact.id, contact: new_attributes }
            expect(response).to have_http_status(:ok)
          end
  end

  describe 'GET #delete' do
    it 'destroy a specfic contact' do
      delete :destroy, params: {id: @contact.id }
      expect(response.status).to eq 200
    end
  end
end
