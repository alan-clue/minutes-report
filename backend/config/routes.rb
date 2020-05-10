Rails.application.routes.draw do
  namespace :api do
    scope :v1 do
      resources :post
    end
  end
end
