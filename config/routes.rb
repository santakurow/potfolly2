def avoid_react_routes(routes)
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
  get '/user_portfolio/:id', to: "users#getUser"
  
  post "/resets/:id", to: 'password_resets#create'
  
  post '/sessions', to: "sessions#create"
  delete '/sessions/:id', to: "sessions#destroy"
  get '/sessions/getCurrentUser', to: "sessions#getCurrentUser"
  get '/sessions/getLoggedIn', to: "sessions#getLoggedIn"

  get '/portfolios', to: "portfolios#index"
  get '/myportfolio/:id', to: "portfolios#index"
  get '/portfolios/category/:id', to: "portfolios#getCategory"
  get '/portfolio/:id/detail', to: "portfolios#show"
  get '/portfolio/:id/edit', to: "portfolios#edit"
  get '/portfolio/:id/getImage', to: "portfolios#getImage"
  post '/portfolio', to: "portfolios#create"
  patch '/portfolio/:id', to: "portfolios#update"
  delete '/portfolio/:id', to: "portfolios#destroy"
  
  get '/search/:q', to: "portfolios#search"

  avoid_react_routes ["/signup", "/public", "/mypage", "/mypage/*path", "/portfolios/*path", "/portfolio/*path", "/my-portfolio/*path"]

end
