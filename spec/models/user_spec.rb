require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = create(:user)
  end

  describe "validations" do

    describe "nickname" do
      it "should a nickname is presence" do
        expect(@user.valid?).to eq(true)
      end
  
      it "should a nickname is within 50 characters" do
        expect(@user.valid?).to eq(true)
      end
  
      it "should validate the blank error message for the nickname" do
        @user.nickname = ""
        @user.valid?
        expect(@user.errors[:nickname]).to include("can't be blank")
      end
  
      it "should validate the longest error message for the nickname" do
        @user.nickname = "a" * 51
        @user.valid?
        expect(@user.errors[:nickname]).to include("is too long (maximum is 50 characters)")
      end
    end

    describe "email" do
      it "should a email is presence" do
        expect(@user.valid?).to eq(true)
      end
  
  
      it "should validate the blank error message for the email" do
        @user.email = ""
        @user.valid?
        expect(@user.errors[:email]).to include("can't be blank")  
      end
  
      it "should validate the longest error message for the email" do
        @user.email = "a" * 247 + "@hoge.com"
        @user.valid?
        expect(@user.errors[:email]).to include("is too long (maximum is 255 characters)")  
      end
  
      it "should validate the invalid-address" do
        invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
          foo@bar_baz.com foo@bar+baz.com]
        invalid_addresses.each do |invalid|
          @user.email = invalid
          expect(@user.valid?).to eq(false)
        end
      end
  
      it "should be unquie email" do
        other = @user.dup
        other.email = @user.email.upcase
        expect(other.valid?).to eq(false)
      end
  
      it "should be saved low-case email" do
        email = "Hoge@hoGe.com"
        user = User.new(nickname: "hoge", email: email, password: "foobar", password_confirmation: "foobar")
        user.save
        expect(user.email.downcase).to eq(user.reload.email)
      end
    end

    describe "password" do
      it "should presence a password" do
        @user.password = @user.password_confirmation = ""
        expect(@user.valid?).to eq(false)
      end

      it "should be rather than 6 length password" do
        @user.password = @user.password_confirmation = "a" * 5
        @user.valid?
        expect(@user.errors[:password]).to include("is too short (minimum is 6 characters)") 
      end
    end
    
  end
  
end
