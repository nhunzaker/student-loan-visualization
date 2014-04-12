class Zipcode
  include DataMapper::Resource

  property :id,        Integer, :key => true
  property :latitude,  Float
  property :longitude, Float

  has n, :schools
end
