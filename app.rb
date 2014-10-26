require 'sinatra'
require 'redis'
require 'json'
require 'twitter'
require 'omniauth-twitter'

CONSUMER_KEY = ENV['CONSUMER_KEY']
CONSUMER_SECRET = ENV['CONSUMER_SECRET']
configure do
  enable :sessions
  use OmniAuth::Builder do
    provider :twitter, CONSUMER_KEY, CONSUMER_SECRET
  end

end

get '/login' do
  redirect to('/auth/twitter')
end

get '/auth/failure' do
  params[:message]
end

get '/auth/twitter/callback' do
  session[:uid] = env['omniauth.auth']['uid']
  redirect to('/')
end


default_radar = {
  id: "something",
  name: "name of the radar" ,
  description: "description of the radar",
  template: {
    id: "some-id",
    segments: [{id:"id-segment", name:"techniques"}, {id:"some-id", name:"languages"}, {id:"languages", name:"languages"}, {id:"platforms", name:"platforms"}],
    tiers: [{id:"hold", name:"hold", description: "something"}, {id:"assess", name:"assess", description: "something"}, {id:"trial", name:"trial", description: "something"}]
  },
  blips: []
}

get '/' do
  if session[:uid]
    redis = Redis.new
    id = redis.get("twitter-#{session[:uid]}")
    if id.nil?
      id = SecureRandom.hex(10)
      data = default_radar.to_json
      redis.set("blip-#{id}", data)
      redis.set("twitter-#{session[:uid]}", id)
    end
    redirect to("/radar/#{id}")
  else
    redirect to('/login')
  end

end

get '/radar/:id' do
  File.read(File.join(File.dirname(__FILE__), 'public/html/index.html'))
end

get '/main' do
  File.read(File.join(File.dirname(__FILE__), 'public/html/main.html'))
end

get '/api/radar/:id' do
  redis = Redis.new
  redis.get("blip-#{params[:id]}")
end

post '/api/radar' do
  content_type :json
  if session[:uid]
    redis = Redis.new
    id = SecureRandom.hex(10)
    data = request.body.read
    redis.set("blip-#{id}", data)
    redis.set("twitter-#{session[:uid]}", id)
    {_id: id}.to_json
  else
    status 401
  end

end

put '/api/radar/:id' do
  content_type :json
  redis = Redis.new
  id = params[:id]
  if session[:uid] and redis.get("twitter-#{session[:uid]}") == id
    data = request.body.read
    redis.set("blip-#{id}", data)
    {_id: id}.to_json
  else
    status 401
  end

end