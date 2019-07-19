Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resources :products, only: %i[index show create update destroy]

      resources :shops, only: %i[index show create update destroy]

      resources :stocks, only: %i[create update destroy]

      namespace :search do
        resources :products, only: :index
        resources :shops, only: :index
      end
    end
  end
end
