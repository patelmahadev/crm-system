# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end

  def user
    render json: "user"
  end

  def profile
    render json: "profile"
  end
end
