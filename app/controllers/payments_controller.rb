class PaymentsController < ApplicationController
    require "razorpay"
    Razorpay.setup('rzp_test_bcBvcsCAo0QnhI', 'YmWdA6jo4UyfolwlkYuaR2iX')
# Razorpay.setup('YOUR_KEY_ID', 'YOUR_SECRET')

# order = Razorpay::Order.create amount: 50000, currency: 'INR', receipt: 'TEST'
    def create_payment
        amount = params[:amount]
        order = Razorpay::Order.create(amount: amount, currency: 'INR')
        render json: order
    end
    
    def confirm_payment
        payment_id = params[:payment_id]
        razorpay_payment = Razorpay::Payment.fetch(payment_id)
        render json: { message: 'Payment confirmed' }
    end
end
