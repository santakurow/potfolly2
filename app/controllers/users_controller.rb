class UsersController < ApplicationController

  # def new
  #   redirect_to root_path
  # end

  def create
    user = User.new(user_params)
    if user.save
      login user
      render json: user
    else
      error = user.errors.messages.merge(invalid: true)
      render json: error
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email, :firstname, :lastname, :pr, :password, :password_confirmation)
  end
end