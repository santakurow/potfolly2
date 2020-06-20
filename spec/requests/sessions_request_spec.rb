require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  describe "POST /create" do

    def logged_in?
      !session[:user_id].nil?
    end

    before do
      @user = create(:user)
    end

    it "valid login params" do
      post "/sessions", params: {session: {
        email: @user.email,
        password: @user.password
      }}

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq "application/json; charset=utf-8"
      expect(logged_in?).to eq true
    end

  end

end
