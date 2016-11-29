class Bar < ApplicationRecord
  has_many :barbeers
  has_many :beers, through: :barbeers

  validates :name, uniqueness: true
end
