class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login user
      render json: user
    else
      render json: checkErrors(user)
    end
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    if user.save
      render json: user
    else
      render json: checkErrors(user)
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email, :firstname, :lastname, :pr, :password, :password_confirmation)
  end
end
