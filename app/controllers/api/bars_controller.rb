module Api
  class BarsController < ApplicationController
    before_action :set_bar, only: [:update, :destroy]
    respond_to :json

    def index
      #respond_with Bar.all
      @bars = Bar.all
    end

    def create
      bar = Bar.new(bar_params)
      if bar.save
        respond_with :api, bar, status: :ok, location: api_bars_url
      else
        render json: { errors: bar.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @bar.update(bar_params)
        respond_with :api, @bar, status: :ok, location: api_bar_url(@bar)
      else
        render json: { errors: @bar.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @bar.destroy
      head :ok
    end

    def search
      query = params[:query]
      bars = Bar.where('name LIKE ?', "%#{query}%")

      respond_with bars
    end

    private

    def bar_params
      params.require(:bar).permit(:name)
    end

    def set_bar
      @bar = Bar.find(params[:id])
    end

  end
end
