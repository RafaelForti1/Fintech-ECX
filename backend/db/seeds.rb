# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

User.find_or_create_by!(email: 'admin@ecxwallet.com') do |user|
  user.name = 'Admin User'
  user.password = 'password123'
  user.password_confirmation = 'password123'
  user.role = 'admin'
end

User.find_or_create_by!(email: 'user@ecxwallet.com') do |user|
  user.name = 'John Doe'
  user.password = 'password123'
  user.password_confirmation = 'password123'
  user.role = 'user'
end

puts "Seeds executed successfully!"
