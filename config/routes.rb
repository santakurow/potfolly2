def avoid_api_routes(routes)
  routes.each do |route|
    get "#{route}", to: "home#index"
  end
end

Rails.application.routes.draw do
  root "home#index"
  get "home/index"
  
  post '/users', to: "users#create"
  patch '/users/:id', to: "users#update"
  get '/users/:id/avatarStore', to: "users#avatarStore"
  
  post "/resets/:id", to: 'password_resets#create'

  post '/sessions', to: "sessions#create"
  get '/sessions/restore', to: "sessions#restore"

  get '/portfolios', to: "portfolios#index"
  post '/portfolios', to: "portfolios#create"


  avoid_api_routes ["/public", "/mypage", "/mypage/*path", "/portfolios/*path"]

end
