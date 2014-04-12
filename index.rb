require 'data_mapper'

require 'csv'
require 'json'

require './models/school.rb'
require './models/geo.rb'

CSV.foreach('./data/zip.csv', headers: true) do |row|
  Geo.create(:zipcode   => row['GEOID'],
             :latitude  => row['INTPTLAT'],
             :longitude => row['INTPTLONG'])
end

CSV.foreach('./data/subsidized.csv', headers: true) do |row|
  School.create(:name               => row['School'].strip,
                :state              => row['State'],
                :zipcode            => row['Zip Code'],
                :type               => row['School Type'].strip,
                :recipients         => row['Recipients'],
                :loans              => row['# of Loans Originated'],
                :loan_value         => row['$ of Loans Originated'],
                :dispursements      => row['# of Dispursements'],
                :dispursement_value => row['$ of Dispursements'])
end
