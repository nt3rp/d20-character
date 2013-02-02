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

    // TODO: Equipping an item should not duplicate the item

    it('should not allow equipping the same item multiple times', function() {
        var item = new d20Item();
        equipment.add(item);
        equipment.equip(item);
        expect(function () { equipment.equip(item)}).toThrow('Item already equipped');
    });

    it('should not allow equipping items it doesn\'t have', function() {
        var item = new d20Item();
        expect(function () { equipment.equip(item)}).toThrow('Item not found');
    });

    it('should respect magic item slot limitation', function() {
        var item1, item2, item3, slot, slotIndex;

        for (slotIndex in d20Equipment.SLOT) {
            slot = d20Equipment.SLOT[slotIndex];

            item1 = new d20Item({slot: slot});
            equipment.add(item1);

            item2 = new d20Item({slot: slot});
            equipment.add(item2);

            item3 = new d20Item({slot: slot});
            equipment.add(item3);

            equipment.equip(item1);

            //TODO: Throw specific exceptions?
            if (slot.name === 'ring') {
                equipment.equip(item2);
                expect(function() { equipment.equip(item3)}).toThrow();
            } else {
                expect(function() { equipment.equip(item2)}).toThrow();
            }
        }
    });

    // TODO: How to deal with 'handed' items, and shields?
});