describe("Items", function() {
    beforeEach(function() {});

    it("should have a certain set of attributes (e.g. name, slot, weight, description)", function() {
        var item = new d20Item();
        expect(item.has('name')).toBeTruthy();
        expect(item.has('weight')).toBeTruthy();
        expect(item.has('description')).toBeTruthy();
        expect(item.has('slot')).toBeTruthy();
    });

    //TODO: How to handle bonuses, feats, etc.?
});