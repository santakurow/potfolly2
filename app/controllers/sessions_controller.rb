class SessionsController < ApplicationController
  
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if authenticated? user
      login user
      render json: user
    else
      render json: "メールアドレスかパスワードが間違っています。"
    end
  end

  def restore
    render json: current_user
  end

  def destroy
    user = User.find(params[:id])
    logout if logged_in?
    render json: user
  end

  private

  def authenticated?(object)
    object && object.authenticate(params[:session][:password])
  end
end
