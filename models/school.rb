require 'json'

class School
  include DataMapper::Resource

  property :id,                 Serial
  property :name,               String
  property :state,              String
  property :type,               String
  property :recipients,         Integer
  property :loans,              Integer
  property :loan_value,         Float
  property :dispursements,      Integer
  property :dispursement_value, Float

  belongs_to :zipcode

  def to_json(*options)
    base = as_json
    base = base.merge({ :zipcode => zipcode }) if defined? zipcode
  end
end
