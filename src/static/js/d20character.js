var d20Character = Backbone.Model.extend({
    defaults: {
        strength:     10,
        dexterity:    10,
        constitution: 10,
        intelligence: 10,
        wisdom:       10,
        charisma:     10,
        legs: 2,      // really? This is how we will distinguish bipeds from others?
        // Maybe instead of 'legs', should do this by race?
        size: 'medium'
    },

    addEquipment: function() {

    },

    carryingCapacity: function() {
        var maxLoad,
            strength = this.get('strength') || 0,
            size = this.get('size') || 'medium',
            legs = this.get('legs') || 2;

        if (strength < 11) {
            maxLoad = strength * 10;
        } else {
            /*
                Both Paizo and WotC do some fudging; not sure how
                to approximate. It's also possible that results are
                off due to floating point precision problems.
            */
            maxLoad = 100 * Math.pow(1.15, strength-10);
        }
        maxLoad *= d20Character.carryingCapacityMultiplier[size][legs];

        return {
            'light'   : Math.floor(maxLoad / 3),
            'medium'  : Math.floor((maxLoad * 2) / 3),
            'heavy'   : Math.floor(maxLoad),
            'max'     : Math.floor(maxLoad),  // Alias
            'overhead': Math.floor(maxLoad),  // Alias
            'lift'    : Math.floor(2 * maxLoad),
            'drag'    : Math.floor(5 * maxLoad)
        }
    }
}, {  // class / static methods
    // TODO: Javascript enum? Would be nice for this
    SIZES: {
        'fine'       : -4,
        'diminuitive': -3,
        'tiny'       : -2,
        'small'      : -1,
        'medium'     : 0,
        'large'      : 1,
        'huge'       : 2,
        'gargantuan' : 3,
        'collosal'   : 4
    },

    carryingCapacityMultiplier: {
        /*
            For the most part, carrying capacity multipliers are straightforward:
                - Bipeds
                    - If size < 'medium', 2^(size+1), else 2^(size)
                - Quadrupeds
                    - If size < 'medium', 2 * biped, else 1.5 * biped
         */
        'fine'       : {2: 0.125, 4: 0.25},
        'diminuitive': {2: 0.25 , 4: 0.5 },
        'tiny'       : {2: 0.5  , 4: 0.75}, // Why?
        'small'      : {2: 0.75 , 4: 1   }, // Why???
        'medium'     : {2: 1    , 4: 1.5 },
        'large'      : {2: 2    , 4: 3   },
        'huge'       : {2: 4    , 4: 6   },
        'gargantuan' : {2: 8    , 4: 12  },
        'collosal'   : {2: 16   , 4: 24  }
    },

    getModifier: function(stat) {
        var modifier = (stat - 10) / 2;
        return Math.floor(modifier);
    }
});

// Leave this here for now
window.d20Character = d20Character;