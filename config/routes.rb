Rails.application.routes.draw do
  root "home#index"
  get 'home/index'
  # get '/users/new'
  post '/users', to: "users#create"
  get "/*path", to: "home#index"
end
