class UsersController < ApplicationController
  def new

  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email, :firstname, :lastname, :pr, :password, :password_confirmation)
  end
end
