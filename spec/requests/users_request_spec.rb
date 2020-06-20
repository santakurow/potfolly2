require 'rails_helper'

RSpec.describe "Users", type: :request do

  describe "POST /users" do

    def logged_in?
      !session[:user_id].nil?
    end

    it "valid signup params" do

      expect do
        post "/users", params: {
          user: {
            nickname: "test",
            email: "hoge@test.com",
            password: "foobar",
            password_confirmation: "foobar"
          }
        }
      end.to change { User.count }.by(1)

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq "application/json; charset=utf-8"
      expect(logged_in?).to eq true
    end

  end
end
