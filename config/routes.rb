Rails.application.routes.draw do
  root "home#index"
  get 'home/index'
  get "/*path", to: "home#index"
end
