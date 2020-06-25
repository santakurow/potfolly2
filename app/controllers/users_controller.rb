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

  def avatarStore
    user = User.find(params[:id])
    if user.avatar.attached?
      render json: user.image_url
    else
      render json: nil
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:nickname, :email, :firstname, :lastname, :pr, :password, :password_confirmation, :avatar)
  end

end
