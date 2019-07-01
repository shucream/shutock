Rails.application.routes.draw do
    scope :api do
        namespace :v1 do
            resources :products, only: [:create, :index, :show, :destroy]
            resources :shops, only: [:index, :show]

            namespace :search do
                resources :products, only: :index
            end
        end
    end
end
