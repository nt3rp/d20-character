var d20Item = Backbone.Model.extend({
    defaults: function() {
        return {
            weight: 0,
            slot: d20Item.SLOT.slotless,
            description: '',
            name: 'Unknown Item'
        }
    }
}, {
    SLOT: { //TODO: What properties? Limits maybe?
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

var d20ItemCollection = Backbone.Collection.extend({
    model: d20Item
})