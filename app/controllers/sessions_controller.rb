class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      login user
      render json: user
    else
      render json: "メールアドレスかパスワードが間違っています。"
    end
  end

  def restore
    render json: current_user
  end
end
