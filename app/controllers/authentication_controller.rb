class AuthenticationController < ApplicationController
	before_action :authorize_request, except: :login

	# POST /auth/login
	def login
	  @customer = Customer.find_by_email(params[:email])
	  if @customer&.authenticate(params[:password])
	    token = JsonWebToken.encode(customer_id: @customer.id)
	    time = Time.now + 24.hours.to_i
	    render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
	                   email: @customer.email }, status: :ok
	  else
	    render json: { error: 'unauthorized' }, status: :unauthorized
	  end
	end

	private

	def login_params
	  params.permit(:email, :password)
	end
end
