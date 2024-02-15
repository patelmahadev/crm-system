class ContactsController < ApplicationController
		  before_action :authorize_request
		  before_action :find_customer, :find_contact, except: %i[create index]

		def index
	      @contacts = @current_user.contacts
	      render json: @contacts, status: :ok
		end

		def create
			@contact = @current_user.contacts.new(contact_params)
			if @contact.save
			  render json: @contact, status: :created
			else
			  render json: { errors: @contact.errors.full_messages },
			         status: :unprocessable_entity
			end
		end

		def update
			unless @contact.update(contact_params)
			  render json: { errors: @contact.errors.full_messages },
			         status: :unprocessable_entity
			 else
			 	render json: @contact, status: :ok
			end
		end

		def show
			render json: @contact
        end

		def destroy
			@contact.destroy
		    render json: {message: "Customer deleted successfully"}
		end


		private

		def find_customer
			@current_user = Customer.find_by_email(@current_user.email)
		  rescue ActiveRecord::RecordNotFound
		    render json: { errors: 'customer not found' }, status: :not_found
		end

		def contact_params
		  params.permit(
		     :address, :address2, :phone, :country, :zipcode
		  )
		end

		def find_contact
			# @contact = Contact.find(params[:id])
			@contact = Contact.find_by(id: params[:id]) || Contact.find_by(id: params.dig(:contact, :id))
		end
end
