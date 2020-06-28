class UsersController < ApplicationController

  before_action :get_params_id, only: [:create, :update, :destroy, :avatarStore]

  def create
    if @user.save
      login @user
      render json: @user
    else
      render json: checkErrors(@user)
    end
  end

  def update
    @user.update(user_params)
    if @user.save
      render json: user
    else
      render json: checkErrors(@user)
    end
  end

  def destroy
    if @user&.destroy
      render json: @user
    end
  end

  def avatarStore
    if @user.avatar.attached?
      render json: @user.image_url
    else
      render json: nil
    end
  end
  
  private

  def get_params_id
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:nickname, :email, :firstname, :lastname, :pr, :password, :password_confirmation, :avatar)
  end

end
