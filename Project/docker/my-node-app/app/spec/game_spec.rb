describe "Poker game - the game" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @fe_base_ip = ENV['POKER_GAME_FRONTEND_BASE_IP'] || "localhost:3001"
    @url = "http://#{@fe_base_ip}"
    @username = "testz"
    @password = "password"
    @stake = "1000"
  end

  before:each do
    @driver.get(@url)
  end

  it 'should allow the user to select different stakes for single player and multiplayer games' do
    gametype = ["single", "multiplayer"]
    2.times do |i|
      login
      @driver.find_element(id: "gamepage").click
      @driver.switch_to.alert.accept
      @driver.find_element(id: gametype[i]).click
      @driver.find_element(id: "option1").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "100"
      @driver.find_element(id: "option2").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "50"
      @driver.find_element(id: "option3").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "20"
      @driver.find_element(id: "stake").clear
      @driver.find_element(id: "stake").send_keys @stake
      expect(@driver.find_element(id: "stake").attribute("value")).to include @stake
      @driver.get(@url)
    end
  end

  it 'should allow a game to be started and the first cards to be dealt (flop and player cards)' do
    gametype = ["single", "multiplayer"]
    player_position = ["top-left", "top-right", "bottom-left", "bottom-middle", "bottom-right"]
    2.times do |game|
      login
      @driver.find_element(id: "gamepage").click
      @driver.switch_to.alert.accept
      @driver.find_element(id: gametype[game]).click
      @driver.find_element(id: "start").click
      5.times do |player|
        expect(@driver.find_elements(css: "##{player_position[player]} .card").length).to eq 2
      end
      @driver.get(@url)
    end
    # check the flop has occurred
  end

  # it 'should check that the turn card has been dealt' do
  #
  # end
  #
  # it 'should check that the river card has been dealt' do
  #
  # end
  #
  # it 'should allow the user to place a bet' do
  #
  # end
  #
  # it 'should allow the user to check' do
  #
  # end
  #
  # it 'should allow the user to call the current stake' do
  #
  # end
  #
  # it 'should allow the user to raise the current stake' do
  #
  # end
  #
  # it 'should allow the user to fold' do
  #
  # end

  after:all do
    @driver.quit
  end

end
