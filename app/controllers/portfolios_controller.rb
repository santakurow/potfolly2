class PortfoliosController < ApplicationController
  def index
    
    if params[:id]
      user = User.find(params[:id])
      folios = image_with(user.portfolios.with_attached_image)
      render json: folios
    else
      portfolios = Portfolio.all.includes(:user, :category).with_attached_image.order(created_at: :desc)
      folios = image_with(portfolios) 
      render json: folios
    end
  end
  
  def create
    portfolio = Portfolio.new(portfolio_params)
    if portfolio.save
      flash[:success] = "ポートフォリオを公開しました。"
      render json: portfolio
    else
      render json: getErrors(portfolio)
    end
  end

  def show
    portfolio = Portfolio.find(params[:id])
    render json: portfolio
  end

  def edit
    portfolio = Portfolio.find(params[:id])
    if portfolio.user.id == current_user.id
      render json: portfolio
    else
      render json: "not permit user"
    end
  end

  def update
    portfolio = Portfolio.find(params[:id])
    if portfolio.user_id == current_user.id
      if portfolio.update(portfolio_params)
        flash[:success] = "ポートフォリオを更新しました。"
        render json: portfolio
      else
        render json: getErrors(portfolio)
      end
    else
      render json: "not permit user"
    end
  end

  def destroy
    portfolio = Portfolio.find(params[:id])
    if portfolio.user_id == current_user.id
      if portfolio&.destroy
        flash[:success] = "ポートフォリオを削除しました。"
        render json: nil
      end
    end
  end

  def getImage
    portfolio = Portfolio.find(params[:id])
    if portfolio.image.attached?
      render json: portfolio.image_url 
    else
      render json: nil
    end
  end

  def getCategory
    portfolios = Portfolio.where(category_id: params[:id]).includes(:user, :category).with_attached_image.order(created_at: :desc)
    folios = image_with(portfolios) 
    render json: folios
  end

  def search
    portfolios = Portfolio.where("title LIKE ?", "%#{params[:q]}%").includes(:user, :category).with_attached_image.order(created_at: :desc)
    folios = image_with(portfolios)
    render json: folios
  end
  
  private
  
  def portfolio_params
    params.require(:portfolio).permit(:title, :url, :desc, :image, :category_id).merge(user_id: current_user.id)
  end
  
  def image_with(portfolios)
    portfolios.map do |portfolio|
      tmp = {}
      if portfolio.image.attached?
        tmp[:image] = portfolio.image_url
      end
      tmp[:id] = portfolio.id
      tmp[:title] = portfolio.title
      tmp[:url] = portfolio.url
      tmp[:desc] = portfolio.desc

      tmp
    end
  end

end
  