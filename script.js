//Error management for SMART criterium values
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function minmax(value, min, max) 
{
    if(parseInt(value) < min) 
        return min; 

    if(parseInt(value) > max) 
        return max; 
    else return value;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}



function print_result() {

    function winner(winner_index, technique) {
        if (winner_index == 0){
            winner_is = technique + " method computed that car A is the best alternative for you.";
        }
        if (winner_index == 1){
            winner_is = technique + " method computed that car B is the best alternative for you.";
        }
        if (winner_index == 2){
            winner_is = technique + " method computed that car C is the best alternative for you.";
        }
        if (winner_index == 3){
            winner_is = technique + " method computed that car D is the best alternative for you.";
        }
        return winner_is
    }
    //AHP 
    var ahp_crit_safe_speed = eval(document.querySelector('input[name="AHPcritsafespeed"]:checked').value);
    var ahp_crit_safe_fuel = eval(document.querySelector('input[name="AHPcritsafefuel"]:checked').value);
    var ahp_crit_safe_luggage = eval(document.querySelector('input[name="AHPcritsafeluggage"]:checked').value);
    var ahp_crit_safe_passenger= eval(document.querySelector('input[name="AHPcritsafepassenger"]:checked').value);
    var ahp_crit_safe_mileage = eval(document.querySelector('input[name="AHPcritsafemileage"]:checked').value);

    var ahp_crit_speed_fuel = eval(document.querySelector('input[name="AHPcritspeedfuel"]:checked').value);
    var ahp_crit_speed_luggage = eval(document.querySelector('input[name="AHPcritspeedluggage"]:checked').value);
    var ahp_crit_speed_passenger = eval(document.querySelector('input[name="AHPcritspeedpassenger"]:checked').value);
    var ahp_crit_speed_mileage= eval(document.querySelector('input[name="AHPcritspeedmileage"]:checked').value);

    var ahp_crit_fuel_luggage = eval(document.querySelector('input[name="AHPcritfuelluggage"]:checked').value);
    var ahp_crit_fuel_passenger = eval(document.querySelector('input[name="AHPcritfuelpassenger"]:checked').value);
    var ahp_crit_fuel_mileage = eval(document.querySelector('input[name="AHPcritfuelmileage"]:checked').value);

    var ahp_crit_luggage_passenger = eval(document.querySelector('input[name="AHPcritluggagepassenger"]:checked').value);
    var ahp_crit_luggage_mileage= eval(document.querySelector('input[name="AHPcritluggagemileage"]:checked').value);
    
    var ahp_crit_passenger_mileage = eval(document.querySelector('input[name="AHPcritpassengermileage"]:checked').value);
  
    ahp_criteria = [[1, 1/ahp_crit_safe_speed, 1/ahp_crit_safe_fuel, 1/ahp_crit_safe_luggage, 1/ahp_crit_safe_passenger, 1/ahp_crit_safe_mileage],
                    [ahp_crit_safe_speed, 1, 1/ahp_crit_speed_fuel, 1/ahp_crit_speed_luggage, 1/ahp_crit_speed_passenger, 1/ahp_crit_speed_mileage],
                    [ahp_crit_safe_fuel, ahp_crit_speed_fuel, 1, 1/ahp_crit_fuel_luggage, 1/ahp_crit_fuel_passenger, 1/ahp_crit_fuel_mileage],
                    [ahp_crit_safe_luggage, ahp_crit_speed_luggage, ahp_crit_fuel_luggage, 1, 1/ahp_crit_luggage_passenger, 1/ahp_crit_luggage_mileage],
                    [ahp_crit_safe_passenger, ahp_crit_speed_passenger, ahp_crit_fuel_passenger, ahp_crit_luggage_passenger, 1, 1/ahp_crit_passenger_mileage],
                    [ahp_crit_safe_mileage, ahp_crit_speed_mileage, ahp_crit_fuel_mileage, ahp_crit_luggage_mileage, ahp_crit_passenger_mileage, 1]];

    
    function normalize_ahp(ahp_arr) {

        var res = [];
        for(var i=0;i<ahp_arr.length;i++){
            for(var j=0;j<ahp_arr[i].length;j++){
                res[j] = (res[j] || 0) + ahp_arr[i][j];
            }  
        }
        
        for(var i = 0; i < ahp_arr.length; i++) {
            for (var j = 0; j < ahp_arr[i].length; j++) {
                ahp_arr[j][i] /= res[i];
            }
        }
        
        //normalize:
        ahp_arr_normalized = [];
        for (var i = 0; i < ahp_arr.length; i++) {
            ahp_arr_normalized.push(0);
        }
        
        for(var i = 0; i < ahp_arr.length; i++) {
            for(var j = 0; j < ahp_arr[i].length; j++) {
                ahp_arr_normalized[i] += ahp_arr[i][j]/ahp_arr.length; 
            }
        }
        return ahp_arr_normalized
    }
    ahp_criteria_normalized = normalize_ahp(ahp_criteria);

    var ahp_safe_ab = eval(document.querySelector('input[name="AHPsafeAB"]:checked').value);
    var ahp_safe_ac = eval(document.querySelector('input[name="AHPsafeAC"]:checked').value);
    var ahp_safe_ad = eval(document.querySelector('input[name="AHPsafeAD"]:checked').value);
    var ahp_safe_bc = eval(document.querySelector('input[name="AHPsafeBC"]:checked').value);
    var ahp_safe_bd = eval(document.querySelector('input[name="AHPsafeBD"]:checked').value);
    var ahp_safe_cd = eval(document.querySelector('input[name="AHPsafeCD"]:checked').value);

    ahp_safe = [[1, 1/ahp_safe_ab, 1/ahp_safe_ac, 1/ahp_safe_ad],
                [ahp_safe_ab, 1, 1/ahp_safe_bc, 1/ahp_safe_bd],
                [ahp_safe_ac, ahp_safe_bc, 1, 1/ahp_safe_cd],
                [ahp_safe_ad, ahp_safe_bd, ahp_safe_cd, 1]];

    ahp_safe_normalized = normalize_ahp(ahp_safe);
    
    var ahp_speed_ab = eval(document.querySelector('input[name="AHPspeedAB"]:checked').value);
    var ahp_speed_ac = eval(document.querySelector('input[name="AHPspeedAC"]:checked').value); 
    var ahp_speed_ad = eval(document.querySelector('input[name="AHPspeedAD"]:checked').value);
    var ahp_speed_bc = eval(document.querySelector('input[name="AHPspeedBC"]:checked').value);
    var ahp_speed_bd = eval(document.querySelector('input[name="AHPspeedBD"]:checked').value);
    var ahp_speed_cd = eval(document.querySelector('input[name="AHPspeedCD"]:checked').value);    


    ahp_speed = [[1, 1/ahp_speed_ab, 1/ahp_speed_ac, 1/ahp_speed_ad],
                [ahp_speed_ab, 1, 1/ahp_speed_bc, 1/ahp_speed_bd],
                [ahp_speed_ac, ahp_speed_bc, 1, 1/ahp_speed_cd],
                [ahp_speed_ad, ahp_speed_bd, ahp_speed_cd, 1]];

    ahp_speed_normalized = normalize_ahp(ahp_safe);

    var ahp_fuel_ab = eval(document.querySelector('input[name="AHPfuelAB"]:checked').value);
    var ahp_fuel_ac = eval(document.querySelector('input[name="AHPfuelAC"]:checked').value); 
    var ahp_fuel_ad = eval(document.querySelector('input[name="AHPfuelAD"]:checked').value);
    var ahp_fuel_bc = eval(document.querySelector('input[name="AHPfuelBC"]:checked').value);
    var ahp_fuel_bd = eval(document.querySelector('input[name="AHPfuelBD"]:checked').value);
    var ahp_fuel_cd = eval(document.querySelector('input[name="AHPfuelCD"]:checked').value);


    ahp_fuel = [[1, 1/ahp_fuel_ab, 1/ahp_fuel_ac, 1/ahp_fuel_ad],
                [ahp_fuel_ab, 1, 1/ahp_fuel_bc, 1/ahp_fuel_bd],
                [ahp_fuel_ac, ahp_fuel_bc, 1, 1/ahp_fuel_cd],
                [ahp_fuel_ad, ahp_fuel_bd, ahp_fuel_cd, 1]];

    ahp_fuel_normalized = normalize_ahp(ahp_safe);

    var ahp_luggage_ab = eval(document.querySelector('input[name="AHPluggageAB"]:checked').value);
    var ahp_luggage_ac = eval(document.querySelector('input[name="AHPluggageAC"]:checked').value); 
    var ahp_luggage_ad = eval(document.querySelector('input[name="AHPluggageAD"]:checked').value);
    var ahp_luggage_bc = eval(document.querySelector('input[name="AHPluggageBC"]:checked').value);
    var ahp_luggage_bd = eval(document.querySelector('input[name="AHPluggageBD"]:checked').value);
    var ahp_luggage_cd = eval(document.querySelector('input[name="AHPluggageCD"]:checked').value);    

    ahp_luggage = [[1, 1/ahp_luggage_ab, 1/ahp_luggage_ac, 1/ahp_luggage_ad],
                [ahp_luggage_ab, 1, 1/ahp_luggage_bc, 1/ahp_luggage_bd],
                [ahp_luggage_ac, ahp_luggage_bc, 1, 1/ahp_luggage_cd],
                [ahp_luggage_ad, ahp_luggage_bd, ahp_luggage_cd, 1]];


    ahp_luggage_normalized = normalize_ahp(ahp_safe);

    var ahp_passenger_ab = eval(document.querySelector('input[name="AHPpassengerAB"]:checked').value);
    var ahp_passenger_ac = eval(document.querySelector('input[name="AHPpassengerAC"]:checked').value); 
    var ahp_passenger_ad = eval(document.querySelector('input[name="AHPpassengerAD"]:checked').value);
    var ahp_passenger_bc = eval(document.querySelector('input[name="AHPpassengerBC"]:checked').value);
    var ahp_passenger_bd = eval(document.querySelector('input[name="AHPpassengerBD"]:checked').value);
    var ahp_passenger_cd = eval(document.querySelector('input[name="AHPpassengerCD"]:checked').value);


    ahp_passenger = [[1, 1/ahp_passenger_ab, 1/ahp_passenger_ac, 1/ahp_passenger_ad],
                [ahp_passenger_ab, 1, 1/ahp_passenger_bc, 1/ahp_passenger_bd],
                [ahp_passenger_ac, ahp_passenger_bc, 1, 1/ahp_passenger_cd],
                [ahp_passenger_ad, ahp_passenger_bd, ahp_passenger_cd, 1]];


    ahp_passenger_normalized = normalize_ahp(ahp_safe);

    var ahp_mileage_ab = eval(document.querySelector('input[name="AHPmileageAB"]:checked').value);
    var ahp_mileage_ac = eval(document.querySelector('input[name="AHPmileageAC"]:checked').value); 
    var ahp_mileage_ad = eval(document.querySelector('input[name="AHPmileageAD"]:checked').value);
    var ahp_mileage_bc = eval(document.querySelector('input[name="AHPmileageBC"]:checked').value);
    var ahp_mileage_bd = eval(document.querySelector('input[name="AHPmileageBD"]:checked').value);
    var ahp_mileage_cd = eval(document.querySelector('input[name="AHPmileageCD"]:checked').value);


    ahp_mileage = [[1, 1/ahp_mileage_ab, 1/ahp_mileage_ac, 1/ahp_mileage_ad],
                [ahp_mileage_ab, 1, 1/ahp_mileage_bc, 1/ahp_mileage_bd],
                [ahp_mileage_ac, ahp_mileage_bc, 1, 1/ahp_mileage_cd],
                [ahp_mileage_ad, ahp_mileage_bd, ahp_mileage_cd, 1]];


    ahp_mileage_normalized = normalize_ahp(ahp_safe);

    alternatives_ahp = [0, 0, 0, 0];

    for(var i = 0; i < alternatives_ahp.length; i++) {
        alternatives_ahp[i] += ahp_safe_normalized[i]*ahp_criteria_normalized[0];
        alternatives_ahp[i] += ahp_speed_normalized[i]*ahp_criteria_normalized[1];
        alternatives_ahp[i] += ahp_fuel_normalized[i]*ahp_criteria_normalized[2];
        alternatives_ahp[i] += ahp_luggage_normalized[i]*ahp_criteria_normalized[3];
        alternatives_ahp[i] += ahp_passenger_normalized[i]*ahp_criteria_normalized[4];
        alternatives_ahp[i] += ahp_mileage_normalized[i]*ahp_criteria_normalized[5];
    }

    winner_ahp_index = indexOfMax(alternatives_ahp);

    winner_ahp = winner(winner_ahp_index, "AHP");
    alert(winner_ahp);

    //Smart
    var smart_crit_safety = document.getElementById("smart crit safety").value;
    var smart_crit_speed = document.getElementById("smart crit speed").value;
    var smart_crit_fuel = document.getElementById("smart crit consumption").value;
    var smart_crit_luggage = document.getElementById("smart crit luggage").value;
    var smart_crit_passenger = document.getElementById("smart crit passenger").value;
    var smart_crit_mileage = document.getElementById("smart crit mileage").value;

    var smart_criteria = [smart_crit_safety, smart_crit_speed, smart_crit_fuel, smart_crit_luggage, smart_crit_passenger, smart_crit_mileage];


    var total = 0;
    for (var i = 0; i < smart_criteria.length; i++) {
        total = total + parseInt(smart_criteria[i]);
    }

    for (let i = 0; i < smart_criteria.length; i++) {
        smart_criteria[i] /= total;
    }

    var smart_x_a_safety = document.querySelector('input[name="editListA1"]:checked').value;
    var smart_x_b_safety = document.querySelector('input[name="editListB1"]:checked').value;
    var smart_x_c_safety = document.querySelector('input[name="editListC1"]:checked').value;
    var smart_x_d_safety = document.querySelector('input[name="editListD1"]:checked').value;

    var smart_x_a_speed = document.querySelector('input[name="editListA2"]:checked').value;
    var smart_x_b_speed = document.querySelector('input[name="editListB2"]:checked').value;
    var smart_x_c_speed = document.querySelector('input[name="editListC2"]:checked').value;
    var smart_x_d_speed = document.querySelector('input[name="editListD2"]:checked').value;

    var smart_x_a_fuel = document.querySelector('input[name="editListA3"]:checked').value;
    var smart_x_b_fuel = document.querySelector('input[name="editListB3"]:checked').value;
    var smart_x_c_fuel = document.querySelector('input[name="editListC3"]:checked').value;
    var smart_x_d_fuel = document.querySelector('input[name="editListD3"]:checked').value;

    var smart_x_a_luggage = document.querySelector('input[name="editListA4"]:checked').value;
    var smart_x_b_luggage = document.querySelector('input[name="editListB4"]:checked').value;
    var smart_x_c_luggage = document.querySelector('input[name="editListC4"]:checked').value;
    var smart_x_d_luggage = document.querySelector('input[name="editListD4"]:checked').value;
    
    var smart_x_a_passenger = document.querySelector('input[name="editListA5"]:checked').value;
    var smart_x_b_passenger = document.querySelector('input[name="editListB5"]:checked').value;
    var smart_x_c_passenger = document.querySelector('input[name="editListC5"]:checked').value;
    var smart_x_d_passenger = document.querySelector('input[name="editListD5"]:checked').value;
    
    var smart_x_a_mileage = document.querySelector('input[name="editListA6"]:checked').value;
    var smart_x_b_mileage = document.querySelector('input[name="editListB6"]:checked').value;
    var smart_x_c_mileage = document.querySelector('input[name="editListC6"]:checked').value;
    var smart_x_d_mileage = document.querySelector('input[name="editListD6"]:checked').value;

    var c_min = 1;
    var c_max = 4;
    var x = [[smart_x_a_safety, smart_x_a_speed, smart_x_a_fuel, smart_x_a_luggage, smart_x_a_passenger, smart_x_a_mileage],
            [smart_x_b_safety, smart_x_b_speed, smart_x_b_fuel, smart_x_b_luggage, smart_x_b_passenger, smart_x_b_mileage],
            [smart_x_c_safety, smart_x_c_speed, smart_x_c_fuel, smart_x_c_luggage, smart_x_c_passenger, smart_x_c_mileage],
            [smart_x_d_safety, smart_x_d_speed, smart_x_d_fuel, smart_x_d_luggage, smart_x_d_passenger, smart_x_d_mileage]
            ];
    
    for(var i = 0; i < x.length; i++) {
        for(var j = 0; j < x[i].length; j++) {
            x[i][j] = (parseInt(x[i][j]) - c_min) / (c_max - c_min);
        }
    }

    var w = smart_criteria;

    var alternatives_smart = [(w[0]*x[0][0]+w[1]*x[0][1]+w[2]*x[0][2]+w[3]*x[0][3]),
    (w[0]*x[1][0]+w[1]*x[1][1]+w[2]*x[1][2]+w[3]*x[1][3]),
    (w[0]*x[2][0]+w[1]*x[2][1]+w[2]*x[2][2]+w[3]*x[2][3]),
    (w[0]*x[3][0]+w[1]*x[3][1]+w[2]*x[3][2]+w[3]*x[3][3])];

    winner_smart_index = indexOfMax(alternatives_smart);

    winner_smart = winner(winner_smart_index, "SMART");
    alert(winner_smart);

}





