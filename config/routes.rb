Rails.application.routes.draw do
  root "home#index"

  post '/users', to: "users#create"

  post '/sessions', to: "sessions#create"
  get '/sessions/restore', to: "sessions#restore"

  get '/portfolios', to: "portfolios#index"
  post '/portfolios', to: "portfolios#create"

  # get "/*path", to: "home#index"
end
