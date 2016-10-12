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

def run_game
    login
    @driver.find_element(id: "gamepage").click
    @driver.find_element(id: "single").click
    @driver.find_element(id: "start").click
end

def royalflush
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
        "playerHands": {
            "player0": [ {"suit": "heart", "value": 10}, {"suit": "heart", "value": 11} ],
              "player1": [ {"suit": "diamond", "value": 2}, {"suit": "diamond", "value": 3} ],
              "player2": [ {"suit": "diamond", "value": 4}, {"suit": "diamond", "value": 5} ],
              "player3": [ {"suit": "diamond", "value": 6}, {"suit": "diamond", "value": 7} ],
              "player4": [ {"suit": "diamond", "value": 8}, {"suit": "diamond", "value": 9} ]
          },
          "tableCards": [
              {"suit": "heart", "value": 12}, {"suit": "heart", "value": 13}, {"suit": "heart", "value": 14}, {"suit": "spade", "value": 7}, {"suit": "club", "value": 9}
          ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def straightflush
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
        "playerHands": {
          "player0": [ {"suit": "heart", "value": 8}, {"suit": "heart", "value": 7} ],
            "player1": [ {"suit": "diamond", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "diamond", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "diamond", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "diamond", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 6}, {"suit": "heart", "value": 5}, {"suit": "heart", "value": 4}, {"suit": "spade", "value": 7}, {"suit": "club", "value": 9}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def fourkind
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 11}, {"suit": "diamond", "value": 11} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 6}, {"suit": "heart", "value": 5}, {"suit": "heart", "value": 4}, {"suit": "spade", "value": 11}, {"suit": "club", "value": 11}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def fullhouse
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 9}, {"suit": "diamond", "value": 9} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 6}, {"suit": "heart", "value": 5}, {"suit": "heart", "value": 10}, {"suit": "spade", "value": 10}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def flush
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 2}, {"suit": "heart", "value": 4} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 6}, {"suit": "heart", "value": 8}, {"suit": "heart", "value": 10}, {"suit": "spade", "value": 3}, {"suit": "club", "value": 4}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def straight
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 14}, {"suit": "heart", "value": 13} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "heart", "value": 7}, {"suit": "diamond", "value": 2}, {"suit": "club", "value": 12}, {"suit": "spade", "value": 11}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def threekind
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 7}, {"suit": "spade", "value": 7} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 3} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "club", "value": 7}, {"suit": "diamond", "value": 2}, {"suit": "club", "value": 12}, {"suit": "spade", "value": 11}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def twopair
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 4}, {"suit": "spade", "value": 4} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 6} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "club", "value": 3}, {"suit": "diamond", "value": 3}, {"suit": "club", "value": 12}, {"suit": "spade", "value": 17}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def pair
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 14}, {"suit": "spade", "value": 14} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 6} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 6}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 8}, {"suit": "diamond", "value": 9} ]
        },
        "tableCards": [
            {"suit": "club", "value": 3}, {"suit": "diamond", "value": 2}, {"suit": "club", "value": 12}, {"suit": "spade", "value": 17}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end

def highcard
  @cards = HTTParty.post("#{@cards_url}",
    :body => {
      "playerHands": {
          "player0": [ {"suit": "heart", "value": 14}, {"suit": "spade", "value": 2} ],
            "player1": [ {"suit": "spade", "value": 2}, {"suit": "diamond", "value": 4} ],
            "player2": [ {"suit": "spade", "value": 4}, {"suit": "diamond", "value": 5} ],
            "player3": [ {"suit": "spade", "value": 5}, {"suit": "diamond", "value": 7} ],
            "player4": [ {"suit": "spade", "value": 3}, {"suit": "diamond", "value": 2} ]
        },
        "tableCards": [
            {"suit": "club", "value": 6}, {"suit": "diamond", "value": 11}, {"suit": "club", "value": 12}, {"suit": "spade", "value": 8}, {"suit": "club", "value": 10}
        ]
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'}
  )
end
