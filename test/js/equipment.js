describe("Equipment", function() {
    var equipment;

    beforeEach(function() {
        equipment = new d20Equipment();
    });

    it('should be able to add equipment', function () {
        equipment.add(new d20Item());
        expect(equipment.length).toBeGreaterThan(0);
    });

    // TODO: Should be able to add multiple items

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

    // TODO: Should be able to remove multiple items
    // TODO: Removing non-owned items should not fail

    it('should be able to equip items', function() {
        var item = new d20Item(),
            equipped;
        equipment.add(item);

        equipment.equip(item);
        equipped = equipment.list({'equipped': true});
        // TODO: Need a better way to test this
        expect(equipped.length).toBeGreaterThan(0);
    });

    // TODO: Should not be able to equip items you don't have

    it('should not be able to equip two suits of armour', function() {
        var armour1 = new d20Item({'slot': d20Equipment.SLOT.armor}),
            armour2 = new d20Item({'slot': d20Equipment.SLOT.armor});
        equipment.add(armour1);
        equipment.add(armour2);

        equipment.equip(armour1);
        //TODO: Throw specific exception
        expect(function() { equipment.equip(armour2)}).toThrow();
    });

    // TODO: 2 x two-handed items
    // TODO: 3 x one-handed items
});