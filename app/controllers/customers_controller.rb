class CustomersController < ApplicationController
	before_action :authorize_request, except: :create
	  before_action :find_customer, except: %i[create index]

	  # GET /customers
	  def index
	    @customers = Customer.all
	    render json: @customers, status: :ok
	  end

	  # GET /customers/{customername}
	  def show
	    render json: @customer, status: :ok
	  end

	  # POST /customers
	  def create
	    @customer = Customer.new(customer_params)
	    if @customer.save
	      render json: @customer, status: :created
	    else
	      render json: { errors: @customer.errors.full_messages },
	             status: :unprocessable_entity
	    end
	  end

	  # PUT /customers/{customername}
	  def update
	    unless @customer.update(customer_params)
	      render json: { errors: @customer.errors.full_messages },
	             status: :unprocessable_entity
	     else
	     	render json: @customer, status: :ok
	    end
	  end

	  # DELETE /customers/{customername}
	  def destroy
	    @customer.destroy
	    render json: {message: "Customer deleted successfully"}
	  end

	  private

	  def find_customer
	  	@customer = Customer.find_by_email!(@current_user.email)
	    # @customer = Customer.find_by_username!(params[:_username])
	    rescue ActiveRecord::RecordNotFound
	      render json: { errors: 'customer not found' }, status: :not_found
	  end

	  def customer_params
	    params.permit(
	       :name, :username, :email, :password, :password_confirmation
	    )
	  end
end
