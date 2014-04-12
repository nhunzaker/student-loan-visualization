require 'data_mapper'

DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, "sqlite:///#{Dir.pwd}/database.db")

require './models/school.rb'
require './models/zipcode.rb'

DataMapper.finalize
DataMapper.auto_upgrade!
