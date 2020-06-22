class PortfoliosController < ApplicationController
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
