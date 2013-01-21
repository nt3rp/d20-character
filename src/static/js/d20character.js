var d20Character = Backbone.Model.extend({
    defaults: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        size: 'medium'
    },

    /* Someone has calculated this as a formula:
     * http://www.dandwiki.com/wiki/SRD_Talk:Carrying_Capacity#Carrying_Capacity_formula_for_Google_Doc_Spredsheet
     */
    /* It appears that WotC and Paizo do some number fudging */
    carryingCapacity: function() {
        var maxLoad,
            strength = this.get('strength') || 0;

        if (strength < 11) {
            maxLoad = strength * 10;
        } else {
            maxLoad = 100 * Math.pow(2, (strength - 10) * 0.2)
        }

        return {
            'light' : Math.floor(maxLoad / 3),
            'medium': Math.floor((maxLoad * 2) / 3),
            'heavy' : Math.floor(maxLoad),
            'lift'  : Math.floor(2 * maxLoad),
            'drag'  : Math.floor(5 * maxLoad)
        }
    }
}, {  // class / static methods
    sizes: {
        'fine'       : -4,
        'diminuitive': -3,
        'tiny'       : -2,
        'small'      : -1,
        'medium'     :  0,
        'large'      :  1,
        'huge'       :  2,
        'gargantuan' :  3,
        'collosal'   :  4
    },

    getModifier: function(stat) {
        var modifier = (stat - 10) / 2;
        return Math.floor(modifier);
    }
});

// Leave this here for now
window.d20Character = d20Character;