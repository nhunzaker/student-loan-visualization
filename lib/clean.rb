module Clean
  def self.str(x)
    (x || '').to_s.strip
  end

  def self.float(x)
    (x || '').to_s.gsub(/\$|\,/, '').to_f
  end

  def self.int(x)
    (x || '').to_s.gsub(/\$|\,/, '').to_i
  end

  def self.zipcode(x)
    self.str(x)[0..5].to_i
  end
end
