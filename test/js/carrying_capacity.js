describe("Carrying Capacity", function() {
    var character;

    beforeEach(function() {
       character = new d20Character();
    });

    it("should not calculate carrying capacity for a creature with no strength", function() {
        var capacities,
            expectedCapacities = {
                'light'   : 0,
                'medium'  : 0,
                'heavy'   : 0,
                'max'     : 0,
                'overhead': 0,
                'lift'    : 0,
                'drag'    : 0
            }

        character.set('strength', 0);
        capacities = character.carryingCapacity();

        expect(capacities).not.toBeUndefined();
        expect(capacities).toEqual(expectedCapacities);
    });

    it("should return a light load as one-third the max load", function() {
        var capacities  = character.carryingCapacity(),
            oneThirdMax = Math.floor(capacities.max / 3);
        expect(capacities.light).toBeCloseTo(oneThirdMax);
    });

    it("should return a medium load as one-third the max load", function() {
        var capacities   = character.carryingCapacity(),
            twoThirdsMax = Math.floor(capacities.max * 2 / 3);
        expect(capacities.medium).toBeCloseTo(twoThirdsMax);
    });

    it("should return the same value for 'max', 'overhead', and 'heavy'", function() {
        var capacities = character.carryingCapacity();
        expect(capacities.heavy).toEqual(capacities.max);
        expect(capacities.overhead).toEqual(capacities.max);
    });

    it("should correctly calculate lifting capacity", function() {
        var capacities = character.carryingCapacity();
        expect(capacities.lift).toEqual(capacities.max * 2);
    });

    it("should correctly calculate dragging capacity", function() {
        var capacities = character.carryingCapacity();
        expect(capacities.drag).toEqual(capacities.max * 5);
    });

    it("should correctly calculate carrying capacities for different sized bipeds", function() {
        var capacities, index,
            expectedCapacities = {
                'fine'       : 12,
                'diminuitive': 25,
                'tiny'       : 50,
                'small'      : 75,
                'medium'     : 100,
                'large'      : 200,
                'huge'       : 400,
                'gargantuan' : 800,
                'collosal'   : 1600
            };

        for(index in expectedCapacities) {
            character.set('size', index);
            capacities = character.carryingCapacity();
            expect(capacities.max).toBeCloseTo(expectedCapacities[index]);
        }
    });

    it("should correctly calculate carrying capacities for different sized quadrupeds", function() {
        var capacities, index,
            expectedCapacities = {
                'fine'       : 25,
                'diminuitive': 50,
                'tiny'       : 75,
                'small'      : 100,
                'medium'     : 150,
                'large'      : 300,
                'huge'       : 600,
                'gargantuan' : 1200,
                'collosal'   : 2400
            };

        character.set('legs', 4);

        for(index in expectedCapacities) {
            character.set('size', index);
            capacities = character.carryingCapacity();
            expect(capacities.max).toBeCloseTo(expectedCapacities[index]);
        }
    });

    // Because of the fact that WotC and Paizo fudge the numbers, not
    // worrying if this test passes or not.
    it("should correctly calculate carrying capacities for different strength scores for medium bipeds", function() {
        var i, capacities,
            maxLoads = [  // ... for a Medium bi-ped, obviously
                {'max':    0},
                {'max':   10},
                {'max':   20},
                {'max':   30},
                {'max':   40},
                {'max':   50},
                {'max':   60},
                {'max':   70},
                {'max':   80},
                {'max':   90},
                {'max':  100},
                {'max':  115},
                {'max':  130},
                {'max':  150},
                {'max':  175},
                {'max':  200},
                {'max':  230},
                {'max':  260},
                {'max':  300},
                {'max':  350},
                {'max':  400},
                {'max':  460},
                {'max':  520},
                {'max':  600},
                {'max':  700},
                {'max':  800},
                {'max':  920},
                {'max': 1040},
                {'max': 1200},
                {'max': 1400},
                {'max': 1600}
            ];

        // Why 30? See 'Tremendous Strength':
        //     http://www.d20pfsrd.com/alignment-description/carrying-capacity
        for (i = 1; i <= 30; i++) {
            character.set('strength', i);
            capacities = character.carryingCapacity();
            expect(capacities.max).toBeCloseTo(maxLoads[i].max);
        }
    });

    // TODO: effective strength scores?
});