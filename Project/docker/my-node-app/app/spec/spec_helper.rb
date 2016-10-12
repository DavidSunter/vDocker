require 'pry'
require 'rspec'
require 'selenium-webdriver'
require 'httparty'
require 'json'

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.color = true
  config.tty = true
end

def login
  @driver.find_element(id: "loginpage").click
  expect(@driver.title).to include "Login"
  @driver.find_element(id: "username").send_keys @username
  @driver.find_element(id: "password").send_keys @password
  @driver.find_element(id: "login-button").click
  expect(@driver.title).to include "Home"
  expect(@driver.find_element(id: "custom-msg").attribute("innerHTML")).to include "Welcome, #{@username}"
end
