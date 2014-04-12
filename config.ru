require './api.rb'
require './web.rb'

run Rack::Cascade.new [Loans::API, Loans::Web]
