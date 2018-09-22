require 'csv'

class UsersController < ApplicationController
  include BCrypt

  def index
    users = create_users()

    username = request.params['username']
    password = request.params['password']

    username = username.gsub(/[!@#$%^&*]/, '');

    if not username or not password or not users[username.to_sym]
      render html: 'Bad request', status: 400
      return
    end

    salt = users[username.to_sym][:salt]
    hash = users[username.to_sym][:hash]

    if hash == (salt + password)
      render html: 'Authorized', status: 200
    else
      render html: 'Unauthorized', status: 401
    end
  end

  def show
    render html: "Hello World, #{request.params['id']}!", status: 200
  end

  def csv
    sleep 0.1
    render html: 'Hello World!', status: 200
  end

  private

  def create_users()
    salt = (0...8).map { (65 + rand(26)).chr }.join
    hash = Password.create(salt + "123456")

    users = {
      matt: { salt: salt, hash: hash },
      angel: { salt: salt, hash: hash }
    }
  end
end
