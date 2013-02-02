var d20Character = Backbone.Model.extend({
    defaults: function() {
        return {
            strength:     10,
            dexterity:    10,
            constitution: 10,
            intelligence: 10,
            wisdom:       10,
            charisma:     10,
            legs: 2,      // really? This is how we will distinguish bipeds from others?
            // Maybe instead of 'legs', should do this by race?
            size: 'medium'
            //TODO: Need to add equipment
        }
    },

    carryingCapacity: function() {
        var maxLoad,
            strength = this.get('strength') || 0,
            size = this.get('size') || 'medium',
            legs = this.get('legs') || 2,
            strengthMultiplier,
            tremendousStrength;

        if (strength <= 10) {
            maxLoad = strength * 10;
        } else if (strength < 30) {
            maxLoad = d20Character.CARRYING_CAPACITY[strength];
        } else if (strength >= 30) {
            strengthMultiplier = Math.floor((strength-20)/10);
            tremendousStrength = d20Character.CARRYING_CAPACITY[20 + (strength % 10)];
            maxLoad = (4 * strengthMultiplier) * tremendousStrength;
        }
        maxLoad *= d20Character.CARRYING_CAPACITY_MULTIPLIER[size][legs];

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

    CARRYING_CAPACITY_MULTIPLIER: {
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

    /*
    There is an algorithm that approximates this, but my need for accuracy
    demands that I do things this way!

         (str >= 11): 100 * Math.pow(1.15, strength-10);
     */
    CARRYING_CAPACITY: {
        11: 115,
        12: 130,
        13: 150,
        14: 175,
        15: 200,
        16: 230,
        17: 260,
        18: 300,
        19: 350,
        20: 400,
        21: 460,
        22: 520,
        23: 600,
        24: 700,
        25: 800,
        26: 920,
        27: 1040,
        28: 1200,
        29: 1400
    },

    getModifier: function(stat) {
        var modifier = (stat - 10) / 2;
        return Math.floor(modifier);
    }
});