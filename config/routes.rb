Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  devise_for :users, path:'' , path_names:{
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    articles: 'articles'
  }

  get '/articles', to: "articles#home"

  post 'create', to: "articles#create"

  delete 'delete', to: "articles#delete"

  get 'search', to: "articles#search"

  put 'update', to: "articles#update"

  get 'like_post', to: "articles#like"
  
  get 'comment_on_post', to: "articles#comment"

  get 'by_topic', to: "articles#articles_by_topic"

  get 'topposts', to: "articles#top_posts"

  get 'recommended_posts', to: "articles#recommended_posts"

  get 'saveforlater', to: "articles#save_for_later"

  get 'draftlist', to: "articles#drafts"

  get 'revisionhistory', to: "articles#revisions"

  # route for follow and unfollow
  resources :profiles, only: [:show] do
    member do
      post 'follow'
      delete 'unfollow'
    end
    collection do
      get :my_profile
      post :create_profile
    end
  end

  resources :playlists, only: [:index, :create, :show] do
    member do
      post 'share'
    end
  end
  post 'playlists/add_article', to: 'playlists#add_article'


  post 'make_payment', to: 'payments#create_payment'
  post 'payment_done', to: 'payments#confirm_payment'
end
