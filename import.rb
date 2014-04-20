`rm -f database.db`

require './config/database.rb'
require './lib/clean.rb'
require 'csv'

['./data/zipcodes_2012.csv', './data/zipcodes_2013.csv'].each do |file|
  CSV.foreach(file, headers: true) do |row|
    zip = Zipcode.first_or_create(:id => Clean.int(row['GEOID']))
    zip.update(:latitude  => Clean.float(row['INTPTLAT']),
               :longitude => Clean.float(row['INTPTLONG']))
    zip.save()
  end
end

CSV.foreach('./data/subsidized.csv', headers: true) do |row|
  School.create!(:name               => Clean.str(row['School']),
                 :state              => Clean.str(row['State']),
                 :type               => Clean.str(row['School Type']),
                 :recipients         => Clean.int(row['Recipients']),
                 :loans              => Clean.int(row['# of Loans Originated']),
                 :loan_value         => Clean.float(row['$ of Loans Originated']),
                 :dispursements      => Clean.int(row['# of Dispursements']),
                 :dispursement_value => Clean.float(row['$ of Dispursements']),
                 :zipcode            => Zipcode.first(:id => Clean.zipcode(row['Zip Code'])))
end
