require 'faker'
FactoryBot.define do
  factory :contact do
    address {"testing address"}
    address2 { "testing address 2"}
    country { "INDIA"}
    phone { 1234567789}
    zipcode { 12345}
  end
end