module Api
  class BeersController < ApplicationController
    before_action :set_beer, only: [:update, :destroy]
    respond_to :json

    def index
      #respond_with Bar.all
      @beers = Beer.all
    end

    def create
      beer = Beer.new(beer_params)
      if beer.save
        respond_with :api, beer, status: :ok, location: api_beers_url
      else
        render json: { errors: beer.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @beer.update(beer_params)
        respond_with :api, @beer, status: :ok, location: api_beer_url(@beer)
      else
        render json: { errors: @beer.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @beer.destroy
      head :ok
    end

    def search
      query = params[:query]
      beers = Beer.where('name LIKE ?', "%#{query}%")

      respond_with beers
    end

    private

    def beer_params
      params.require(:beer).permit(:name)
    end

    def set_beer
      @beer = Beer.find(params[:id])
    end

  end
end
