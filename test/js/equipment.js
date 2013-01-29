describe("Equipment", function() {
    var character;

    beforeEach(function() {
        character = new d20Character();
    });

    // TODO: Are we concerned with HOW a player is able to carry gear?
    // TODO: Throw specific exception?
    it('should be able to add equipment to a character', function() {
        expect(character.addEquipment).not.toThrow()
    });

    // TODO: What is the equipment format?
    // TODO: Should equipment be a separate model?
    xit('should be able to see a list of a character\'s equipment', function () {
        character.addEquipment('backpack')
    });

    xit('should be able to remove equipment from a character', function () {

    });

    // TODO: Does this belong here?
    xit('should be able to equip items', function() {

    })
});