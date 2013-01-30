describe("Equipment", function() {
    var equipment;

    beforeEach(function() {
        equipment = new d20Equipment();
    });

    it('should be able to add equipment', function () {
        equipment.add(new d20Item());
        expect(equipment.length).toBeGreaterThan(0);
    });

    it('should be able to remove equipment', function () {
        var item = new d20Item();
        equipment.add(item);
        expect(equipment.length).toBeGreaterThan(0);
        equipment.remove(item);
        expect(equipment.length).toBeCloseTo(0);
    });

    it('should be able to list equipment', function() {
        var list;
        equipment.add(new d20Item());
        list = equipment.list();
        // TODO: Need a better way to test this
        expect(list).not.toBeUndefined();
    });

    it('should be able to equip items', function() {
        var item = new d20Item(),
            equipped;
        equipment.add(item);

        equipment.equip(item);
        equipped = equipment.list({'equipped': true});
        // TODO: Need a better way to test this
        expect(equipped.length).toBeGreaterThan(0);
    });
});