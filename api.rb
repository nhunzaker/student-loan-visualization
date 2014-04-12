require 'grape'
require './config/database.rb'
require './lib/clean'

module Loans
  class API < Grape::API
    version 'v1', using: :header, vendor: 'nhunzaker'
    format :json

    resource :zipcodes do
      desc "Return a list of all zipcodes."
      get '' do
        Zipcode.all
      end

      desc "Return a zipcode model given a code."
      params do
        requires :id, type: Integer, desc: "Zipcode id."
      end
      route_param :id do
        get do
          Zipcode.first(:id => Clean.zipcode(params[:id]))
        end
      end
    end

    desc "Return a list of all schools."
    get :schools do
      School.all
    end
  end
end
