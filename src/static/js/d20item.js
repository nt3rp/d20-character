var d20Item = Backbone.Model.extend({
    defaults: function() {
        return {
            weight: 0,
            slot: d20Equipment.SLOT.slotless,
            description: '',
            name: 'Unknown Item',
            equipped: false
        }
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
        var foundItem = this.get(item),
            slotCount, slot;

        if (!foundItem) {
            foundItem = (this.where({'name': item}) || [])[0]; // `_.findWhere` not available :(
        }

        // TODO: Exception if item is not found

        // Check if item slot is full
        slot = foundItem.get('slot');
        slotCount = this.select(function(elem) {
            return (elem.get('equipped') === true) &&
                _.isEqual(slot, elem.get('slot'));
        }).length;

        if (slotCount >= slot.limit) {
            throw new Error(
                'Exceeded slot limit equipping \'' + foundItem.get('name') + '\'' +
                'to \'' + slot.name + '\' (Limit: ' + slot.limit+ ', Equipped: ' + slotCount + ')'
            );
        }

        foundItem.set('equipped', true);
    }
}, {
    //TODO: Replace plain old javascript objects with Models? http://stackoverflow.com/a/6351460/165988
    SLOT: { //TODO: What properties? Limits maybe? Are limits based on race?
        'armor': {
            'name': 'armor',
            'limit': 1 // TODO: Should limits be optional; assumed to be 1?
        },
        'belt': {
            'name': 'belt',
            'limit': 1
        },
        'body': {
            'name': 'body',
            'limit': 1
        },
        'chest': {
            'name': 'chest',
            'limit': 1
        },
        'eyes': {
            'name': 'eyes',
            'limit': 1
        },
        'feet': {
            'name': 'feet',
            'limit': 1
        },
        'hands': {
            'name': 'hands',
            'limit': 1
        },
        'head': {
            'name': 'head',
            'limit': 1
        },
        'headband': {
            'name': 'headband',
            'limit': 1
        },
        'neck': {
            'name': 'neck',
            'limit': 1
        },
        'ring': {
            'name': 'ring',
            'limit': 2
        },
        'shield': {
            'name': 'shield',
            'limit': 1
        },
        'shoulders': {
            'name': 'shoulders',
            'limit': 1
        },
        'wrist': {
            'name': 'wrist',
            'limit': 1
        },
        'slotless': {
            'name': 'slotless',
            'limit': 1
        }
    }
});

// TODO: Is a character's gear different than a general item collection?
// TODO: How to handle equipped gear vs. held gear?
// TODO: How to handle weapons?