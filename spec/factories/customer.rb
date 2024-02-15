require 'faker'
FactoryBot.define do
  factory :customer do
    email { Faker::Internet.unique.email }
    username {"Testing user"}
    password {"Password@123"}
  end
end