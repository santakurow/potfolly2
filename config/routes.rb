Rails.application.routes.draw do
  root "home#index"
  get 'home/index'
  get 'users/new'
  get "/*path", to: "home#index"
end
