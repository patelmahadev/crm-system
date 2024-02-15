Rails.application.routes.draw do

  resources :customers
  resources :contacts
    post '/auth/login', to: 'authentication#login'
    get '/*a', to: 'application#not_found'
  get 'posts/:id/edit', to: 'hello_world#index';
  get 'posts/:id', to: 'hello_world#index';
  get 'posts/new', to: 'hello_world#index';
  get 'user', to: 'hello_world#user';
  get 'user/profile', to: 'hello_world#profile';
  root 'hello_world#index'
  get '*path' => 'hello_world#index'


end
