Rails.application.routes.draw do
  root "home#index"
  get 'home/index'
  post '/users', to: "users#create"
  post '/sessions', to: "sessions#create"
  get '/sessions/restore', to: "sessions#restore"
  get "/*path", to: "home#index"
end
