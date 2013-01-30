var d20Item = Backbone.Model.extend({
    defaults: function() {
        return {
            weight: 0,
            slot: d20Item.SLOT.slotless,
            description: '',
            name: 'Unknown Item',
            equipped: false
        }
    }
}, {
    SLOT: { //TODO: What properties? Limits maybe? Are limits based on race?
        'armor': {},
        'belt': {},
        'body': {},
        'chest': {},
        'eyes': {},
        'feet': {},
        'hands': {},
        'head': {},
        'headband': {},
        'neck': {},
        'ring': {},
        'shield': {},
        'shoulders': {},
        'wrist': {},
        'slotless': {}
    }
});

var d20Equipment = Backbone.Collection.extend({
    model: d20Item,

    list: function(config) {
        var results;
        if (!config) {
            results = this.filter(function() {
                return true;
            });
        } else {
            results = this.where(config);
        }

        return _.invoke(results, 'toJSON');
    },

    equip: function(item) {
        // Takes in an item, or the name of an item
        var foundItem = this.get(item);

        if (!foundItem) {
            foundItem = (this.where({'name': item}) || [])[0]; // underscore `findWhere` not available :(
        }

        // TODO: Conditions

        // TODO: Exception
        foundItem.set('equipped', true);
    }
});

//TODO: Is a character's gear different than a general item collection?
//TODO: How to handle equipped gear vs. held gear?