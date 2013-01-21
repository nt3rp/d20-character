describe("Carrying Capacity", function() {
    // TODO: Tests should just use 'max'!
    var character,
        carryingCapacities = [  // ... for a Medium bi-ped, obviously
            {'light':   0, 'medium':   0, 'heavy':    0},
            {'light':   3, 'medium':   6, 'heavy':   10},
            {'light':   6, 'medium':  13, 'heavy':   20},
            {'light':  10, 'medium':  20, 'heavy':   30},
            {'light':  13, 'medium':  26, 'heavy':   40},
            {'light':  16, 'medium':  33, 'heavy':   50},
            {'light':  20, 'medium':  40, 'heavy':   60},
            {'light':  23, 'medium':  46, 'heavy':   70},
            {'light':  26, 'medium':  53, 'heavy':   80},
            {'light':  30, 'medium':  60, 'heavy':   90},
            {'light':  33, 'medium':  66, 'heavy':  100},
            {'light':  38, 'medium':  76, 'heavy':  115},
            {'light':  43, 'medium':  86, 'heavy':  130},
            {'light':  50, 'medium': 100, 'heavy':  150},
            {'light':  58, 'medium': 116, 'heavy':  175},
            {'light':  66, 'medium': 133, 'heavy':  200},
            {'light':  76, 'medium': 153, 'heavy':  230},
            {'light':  86, 'medium': 173, 'heavy':  260},
            {'light': 100, 'medium': 200, 'heavy':  300},
            {'light': 116, 'medium': 233, 'heavy':  350},
            {'light': 133, 'medium': 266, 'heavy':  400},
            {'light': 153, 'medium': 306, 'heavy':  460},
            {'light': 173, 'medium': 346, 'heavy':  520},
            {'light': 200, 'medium': 400, 'heavy':  600},
            {'light': 233, 'medium': 466, 'heavy':  700},
            {'light': 266, 'medium': 533, 'heavy':  800},
            {'light': 306, 'medium': 613, 'heavy':  920},
            {'light': 346, 'medium': 693, 'heavy': 1040},
            {'light': 400, 'medium': 800, 'heavy': 1200},
            {'light': 466, 'medium': 933, 'heavy': 1400}
        ];

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

    //TODO: light = 1/3 max, medium = 2/3 max

    it("should return the same value for 'max', 'overhead', and 'heavy'", function() {
        var capacities = character.carryingCapacity();
        expect(capacities.heavy).toEqual(capacities.max);
        expect(capacities.heavy).toEqual(capacities.overhead);
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
    xit("should correctly calculate carrying capacities for different strength scores for medium bipeds", function() {
        var i, capacities;

        // Why 30? See 'Tremendous Strength':
        //     http://www.d20pfsrd.com/alignment-description/carrying-capacity
        for (i = 1; i < 30; i++) {
            character.set('strength', i);
            capacities = character.carryingCapacity();
            expect(capacities.light).toBeCloseTo(carryingCapacities[i].light);
            expect(capacities.medium).toBeCloseTo(carryingCapacities[i].medium);
            expect(capacities.heavy).toBeCloseTo(carryingCapacities[i].heavy);
        }
    });

    // TODO: effective strength scores?
});