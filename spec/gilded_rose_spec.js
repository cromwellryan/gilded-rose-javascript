describe("Gilded Rose", function() {

  var sulfuras = null,
      vest = null,
      brie = null,
      elixir = null,
      tix = null;

  beforeEach( function() {
    init();

    vest = items[0];
    brie = items[1];
    elixir = items[2];
    sulfuras = items[3];
    tix = items[4];
  });

  it("qualities are known", function() {
    expect(vest.quality).toBe(20);
    expect(brie.quality).toBe(0);
    expect(elixir.quality).toBe(7);
    expect(sulfuras.quality).toBe(80);
    expect(tix.quality).toBe(20);
    expect(items[5].quality).toBe(6);
  });

  describe("vests", function() {
    it("go to 19 after 1 update", function() {
      update_quality()
      expect(vest.quality).toBe(19)
    });
    
    it("never go negative", function() {
      times(25, update_quality);
      expect(vest.quality).toBe(0);
    });

    it("deteriorate at 2 after 10 days", function() { 
      times(10, update_quality);
      expect(vest.quality).toBe(10);
      update_quality();
      expect(vest.quality).toBe(8);
      update_quality();
      expect(vest.quality).toBe(6);
    });
  });

  describe("sulfuras", function() {
    it("never degrades", function() {
      times(100, update_quality);
      expect(sulfuras.quality).toBe(80);
    });
  });

  describe("aged brie", function() {
    it("get's slightly better until sell date", function() {
      update_quality();
      expect(brie.quality).toBe(1);
    });

    it("get's really good after it's sell date", function() {
      update_quality();
      update_quality(); // sell date
      update_quality(); // mmm
      expect(brie.quality).toBe(4);
      update_quality(); // mmm
      expect(brie.quality).toBe(6);
    });
  });

  describe("elixir", function() {
    it("go to 6 after 1 update", function() {
      update_quality()
      expect(elixir.quality).toBe(6)
    });
    
    it("never go negative", function() {
      times(elixir.sell_in * 2, update_quality);
      expect(elixir.quality).toBe(0);
    });

    it("deteriorate at 2 after 5 days", function() { 
      times(elixir.sell_in, update_quality);
      expect(elixir.quality).toBe(2);
      update_quality();
      expect(elixir.quality).toBe(0);
    });
 
  });

  describe("concert tix", function() {
    it("increases by 1 up to 10 days", function() {
      times(5, update_quality);
      expect(tix.quality).toBe(25);
    });

    it("increases by 2 between day 10 and 5", function() {
      times(5, update_quality); // normal
      update_quality();
      expect(tix.quality).toBe(27);
    })

    it("increases by 3 between day 5 and event day", function() {
      times(10, update_quality);
      update_quality();
      expect(tix.quality).toBe(38);
    });

    it("is worthless after event day", function() {
      times(20, update_quality);
      expect(tix.quality).toBe(0);
    });
  });

  function times(number, func) {
    for(var index = 0; index < number; index++) {
      func();
    }
  };

});
