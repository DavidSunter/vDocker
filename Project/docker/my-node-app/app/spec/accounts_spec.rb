describe "Poker game - the accounts" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @fe_base_ip = ENV['POKER_GAME_FRONTEND_BASE_IP'] || "localhost:3001"
    @url = "http://#{@fe_base_ip}"
    @username = "testz"
    @password = "password"
    @stake = "1000"
    @invalid_username = "invalid invalid invalid"
    @invalid_password = "thisisawrongpassword"
  end

  before:each do
    @driver.get(@url)
  end

  it 'should have a home page that shows links to register, login and the game' do
    expect(@driver.find_element(id: "homepage").attribute("outerHTML")).to include "<a", "Home"
    expect(@driver.find_element(id: "registerpage").attribute("outerHTML")).to include "<a", "Register"
    expect(@driver.find_element(id: "loginpage").attribute("outerHTML")).to include "a", "Login"
    expect(@driver.find_element(id: "gamepage").attribute("outerHTML")).to include "a", "Game"
  end

  # currently causes the app to crash
  # it 'should provide users a way to register an account' do
  #   @driver.find_element(id: "registerpage").click
  #   expect(@driver.title).to include "Register"
  #   @driver.find_element(id: "registerusername").send_keys @username
  #   @driver.find_element(id: "registerpassword").send_keys @password
  #   @driver.find_element(id: "register-button").click
  #   expect(@driver.title).to include "Login"
  #   expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "You have successfully registered. Now you can login"
  # end

  # currently causes the app to crash
  # it 'should not allow users to register an account using invalid details' do
  #   @driver.find_element(id: "registerpage").click
  #   expect(@driver.title).to include "Register"
  #   # This will currently fail due to allowing you to register with nothing in the fields
  #   @driver.find_element(id: "register-button").click
  #   expect(@driver.title).to include "Register"
  #   expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid username and password."
  #   @driver.find_element(id: "registerusername").send_keys @username
  #   @driver.find_element(id: "register-button").click
  #   expect(@driver.title).to include "Register"
  #   expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid username."
  #   @driver.find_element(id: "registerpassword").send_keys @password
  #   @driver.find_element(id: "register-button").click
  #   expect(@driver.title).to include "Register"
  #   expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid password."
  # end

  it 'should provide registered users a way to login' do
    login
  end

  it 'should not allow an unregistered user to login' do
    @driver.find_element(id: "loginpage").click
    expect(@driver.title).to include "Login"
    @driver.find_element(id: "username").send_keys @invalid_username
    @driver.find_element(id: "password").send_keys @invalid_password
    @driver.find_element(id: "login-button").click
    expect(@driver.title).to include "Login"
    expect(@driver.find_element(id: "login-msg").attribute("innerHTML")).to include "A user does not exist with the given details"
  end

  it 'should allow the user to logout' do

  end

  it 'should not allow an unauthorised user to start a game' do
    @driver.find_element(id: "gamepage").click
    @driver.switch_to.alert.accept
  end

  after:all do
    @driver.quit
  end

end
