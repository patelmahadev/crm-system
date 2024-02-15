class Customer < ApplicationRecord
		has_secure_password
		  # mount_uploader :avatar, AvatarUploader
		  validates :email, presence: true, uniqueness: true
		  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
		  # validates :usern_ame, presence: true, uniqueness: true
		  validates :password,
		            length: { minimum: 6 },
		            if: -> { new_record? || !password.nil? }

	    has_many :contacts, dependent: :destroy
end
