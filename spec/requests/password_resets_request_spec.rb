require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do

  describe "POST /create" do

    def logged_in?
      !session[:user_id].nil?
    end

    before do
      @user = create(:user)
    end

    it "valid reset params" do
      post "/resets/#{@user.id}", params: {
        user: {
          password: "foobar",
          reset_password: "foobarbuzz",
          reset_password_confirmation: "foobarbuzz"
        }
      }
      expect(logged_in?).to eq true
      expect(@user.reset_digest).to be_nil
      expect(response.content_type).to eq "application/json; charset=utf-8"
      expect(response).to have_http_status(200)
    end

    # it "invalid reset params" do
    #   post "/resets/#{@user.id}", params: {
    #     user: {
    #       password: "foobarr",
    #       reset_password: "foobarbuzz",
    #       reset_password_confirmation: "foobarbuzz"
    #     }
    #   }
    #   expect(logged_in?).to eq false
    # end
  end

end
