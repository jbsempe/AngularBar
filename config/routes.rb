Rails.application.routes.draw do
  root 'dashboard#index'
  get '/beers' => 'dashboard#beers'

  namespace :api, default: {format: :json} do
    resources :bars, only: [:index, :create, :update, :destroy] do
      collection do
        get :search
      end
    end
    resources :beers, only: [:index, :create, :update, :destroy] do
      collection do
        get :search
      end
    end
  end
end
