describe("Gilded Rose", function() {

  var sulfuras = null,
      vest = null;

  beforeEach( function() {
    init();

    vest = items[0];
    sulfuras = items[3];
  });

  it("qualities are known", function() {
    expect(vest.quality).toBe(20);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(7);
    expect(sulfuras.quality).toBe(80);
    expect(items[4].quality).toBe(20);
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

  function times(number, func) {
    for(var index = 0; index < number; index++) {
      func();
    }
  };

});
