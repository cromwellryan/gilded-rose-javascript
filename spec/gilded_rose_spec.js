describe("Gilded Rose", function() {

  beforeEach( function() {
    initialize();
  });

  it("initial qualities are known", function() {
    expect(items[0].quality).toBe(20);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(7);
    expect(items[3].quality).toBe(80);
    expect(items[4].quality).toBe(20);
    expect(items[5].quality).toBe(6);
  });

  describe("vests", function() {
    it("vest goes to 19 after 1 update", function() {
      update_quality()
      expect( items[0].quality).toBe(19)
    });
    
    it("vests never go negative", function() {
      for(var index = 0; index < 25; index++) {
        update_quality();
      };

      expect(items[0].quality).toBe(0);
    });

    it("vests deteriorate at 2 after 10 days", function() { 
      times(10, update_quality);
      expect(items[0].quality).toBe(10);
      update_quality();
      expect(items[0].quality).toBe(8);
      update_quality();
      expect(items[0].quality).toBe(6);
    });
  });

  function times(number, func) {
    for(var index = 0; index < number; index++) {
      func();
    }
  };

});
