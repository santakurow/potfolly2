class PasswordResetsController < ApplicationController

  def create
    user = User.find(params[:id])
    if user && user.authenticate(params[:user][:password])

      if reset_authenticated user
        user.create_reset_digest
        user.update_attribute(:password_digest, user.reset_digest)
        login user
        user.update_attribute(:reset_digest, nil)
        render json: user
      else
        render json: getErrors(user)
      end

    else
      error_msg = {}
      error_msg[:password] = "パスワードが間違っています。"
      error_msg[:error] = true
      render json: error_msg
    end
  end


  private

  def reset_authenticated(user)
    user.update(reset_params)
  end

  def reset_params
    params.require(:user).permit(:password, :reset_password, :reset_password_confirmation)
  end

end
