class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :plan
  
  attr_accessor :stripe_card_token
  
  def save_with_payment
		# This check to ensure that any validation that has been defined for 				the form fields has been met
		if valid?	
			customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)	#This is the Stripe gem sending the data off to create a new customer in stripe
			self.stripe_customer_token = customer.id
			save!
		end
  end	

  
end
