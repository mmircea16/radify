require 'sinatra'
require 'redis'
require 'json'

set :public_folder, 'resources/public'


get '/' do
  File.read(File.join(File.dirname(__FILE__), 'resources/public/html/index.html'))
end

get '/api/radar/:id' do
  redis = Redis.new
  redis.get("blip-#{params[:id]}")
end

post '/api/radar' do
  content_type :json
  redis = Redis.new
  id = SecureRandom.hex(10)
  data = request.body.read
  redis.set("blip-#{id}", data)
  {_id: id}.to_json
end

put '/api/radar/:id' do
  content_type :json
  redis = Redis.new
  id = params[:id]
  data = request.body.read
  redis.set("blip-#{id}", data)
  {_id: id}.to_json
end