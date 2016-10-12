describe "Poker game api" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @fe_url = "http://localhost:3002"
    @url = "http://localhost:3000/api/users"
    @cards_url = "http://localhost:3000/api/games/test/winner"
    @deck_url = "http://localhost:3000/api/games"
    @username = "test" + rand(1000).to_s
    @password = "password"
  end

  it 'should allow a user to be created' do
    create_user = HTTParty.post(@url, body:{ username: "#{@username}", password: "#{@password}", wallet: "#{@wallet}"})
    create_user.code
    expect(create_user.code).to eq 201
    create_user.message
    expect(create_user.message).to eq "Created"
  end

  it 'should allow a user to log in' do
    login = HTTParty.post("#{@url}/login", body:{ username: "#{@username}", password: "#{@password}"})
    login.code
    expect(login.code).to eq 200
    login.message
    expect(login.message).to eq "OK"
  end
  # midway through this test - need to edit password, then edit username and password back to original
  it 'should allow a user to edit their username/password' do
    edit_username = HTTParty.patch("#{@url}/57ea4d5851eecd3b9b42e8e9", body:{ username: "alex_test"})
    edit_username.code
    expect(edit_username.code).to eq 200
    edit_username.message
    expect(edit_username.message).to eq "OK"
  end

  it 'should check that the deck that has been dealt is shuffled' do
    @driver.get(@fe_url)
    run_game
    deck = HTTParty.post("#{@deck_url}/0/test", body:{ test: "deck" })
    @driver.get(@fe_url)
    run_game
    deck2 = HTTParty.post("#{@deck_url}/1/test", body:{ test: "deck" })
    expect(deck).to_not eq deck2
    @driver.quit
  end

  it 'should return a royal flush and player 0 as the winner' do
    royalflush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][9]).to_not eq nil
  end

  it 'should return a straight flush and player 0 as the winner' do
    straightflush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][8]).to_not eq nil
  end

  it 'should return a four of a kind and player 0 as the winner' do
    fourkind
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][7]).to_not eq nil
  end

  it 'should return a full house and player 0 as the winner' do
    fullhouse
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][6]).to_not eq nil
  end

  it 'should return a flush and player 0 as the winner' do
    flush
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][5]).to_not eq nil
  end

  it 'should return a straight and player 0 as the winner' do
    straight
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][4]).to_not eq nil
  end

  it 'should return a three of a kind and player 0 as the winner' do
    threekind
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][3]).to_not eq nil
  end

  it 'should return a two pair and player 0 as the winner' do
    twopair
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][2]).to_not eq nil
  end

  it 'should return a pair and player 0 as the winner' do
    pair
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][1]).to_not eq nil
  end

  it 'should return a high card and player 0 as the winner' do
    highcard
    expect(@cards["winner"]).to eq 0
    expect(@cards["handValues"][0][0]).to_not eq nil
  end

end
