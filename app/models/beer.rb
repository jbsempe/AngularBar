class Beer < ApplicationRecord
  has_many :barbeers
  has_many :bars, through: :barbeers
end
