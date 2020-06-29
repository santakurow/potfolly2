class PortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.all.includes(:user).with_attached_image.order(created_at: :desc)
    folios = []
    portfolios.each do |portfolio|
      tmp = {}
      if portfolio.image.attached?
        tmp[:image] = portfolio.image_url
      end
      tmp[:title] = portfolio.title
      tmp[:url] = portfolio.url
      tmp[:desc] = portfolio.desc
      folios << tmp
    end
    render json: folios
  end

  def new
    redirect_to root_path
  end
  
  def create
    portfolio = Portfolio.new(portfolio_params)
    if portfolio.save
      render json: portfolio
    else
      render json: checkErrors(portfolio)
    end
  end

  def portfolio_params
    params.require(:portfolio).permit(:title, :url, :desc, :image).merge(user_id: current_user.id)
  end
end
