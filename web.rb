require 'sinatra'

module Loans
  class Web < Sinatra::Base
    get '/' do
      erb :index
    end
  end
end
