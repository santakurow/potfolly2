require 'rails_helper'

RSpec.describe Portfolio, type: :model do
  before do
    @portfolio = build(:portfolio)
  end

  describe "validation" do
   it "is invalid without title" do
    @portfolio.title = ""
    @portfolio.valid?
    expect(@portfolio.errors[:title]).to include("can't be blank")
   end

   it "is invalid length title" do
    @portfolio.title = "a" * 51
    @portfolio.valid?
    expect(@portfolio.errors[:title]).to include("is too long (maximum is 50 characters)")
   end

   it "is invalid without url" do
    @portfolio.url = ""
    @portfolio.valid?
    expect(@portfolio.errors[:url]).to include("can't be blank")
   end

   it "is invalid wrong url" do
    @portfolio.url = "ftps://hoge.file"
    expect(@portfolio.valid?).to eq false
   end

  end
  
end
