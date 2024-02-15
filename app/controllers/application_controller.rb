class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
      skip_before_action :verify_authenticity_token

    def not_found
       render json: { error: 'not_found' }
     end

     def authorize_request
       header = request.headers['Authorization'] # Retrieve the 'Authorization' header from the request
       header = header.split(' ').last if header # Extract the token part from the header
       begin
         # Customer.new
         @decoded = JsonWebToken.decode(header) # Decode the JWT token
         @current_user = Customer.find(@decoded[:customer_id]) # Find the user associated with the decoded token
       rescue ActiveRecord::RecordNotFound => e
         # Handle the case where the user is not found
         render json: { errors: e.message }, status: :unauthorized
       rescue JWT::DecodeError => e
         # Handle the case where the JWT token cannot be decoded
         render json: { errors: e.message }, status: :unauthorized
       end
     end

  end

