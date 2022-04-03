function print_result(winner_rankorder) {

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

    var ahp_speed_ab = eval(document.querySelector('input[name="AHPspeedAB"]:checked').value);
    var ahp_speed_ac = eval(document.querySelector('input[name="AHPspeedAC"]:checked').value); 
    var ahp_speed_ad = eval(document.querySelector('input[name="AHPspeedAD"]:checked').value);
    var ahp_speed_bc = eval(document.querySelector('input[name="AHPspeedBC"]:checked').value);
    var ahp_speed_bd = eval(document.querySelector('input[name="AHPspeedBD"]:checked').value);
    var ahp_speed_cd = eval(document.querySelector('input[name="AHPspeedCD"]:checked').value); 
    
    var ahp_fuel_ab = eval(document.querySelector('input[name="AHPfuelAB"]:checked').value);
    var ahp_fuel_ac = eval(document.querySelector('input[name="AHPfuelAC"]:checked').value); 
    var ahp_fuel_ad = eval(document.querySelector('input[name="AHPfuelAD"]:checked').value);
    var ahp_fuel_bc = eval(document.querySelector('input[name="AHPfuelBC"]:checked').value);
    var ahp_fuel_bd = eval(document.querySelector('input[name="AHPfuelBD"]:checked').value);
    var ahp_fuel_cd = eval(document.querySelector('input[name="AHPfuelCD"]:checked').value);

    var ahp_luggage_ab = eval(document.querySelector('input[name="AHPluggageAB"]:checked').value);
    var ahp_luggage_ac = eval(document.querySelector('input[name="AHPluggageAC"]:checked').value); 
    var ahp_luggage_ad = eval(document.querySelector('input[name="AHPluggageAD"]:checked').value);
    var ahp_luggage_bc = eval(document.querySelector('input[name="AHPluggageBC"]:checked').value);
    var ahp_luggage_bd = eval(document.querySelector('input[name="AHPluggageBD"]:checked').value);
    var ahp_luggage_cd = eval(document.querySelector('input[name="AHPluggageCD"]:checked').value); 

    var ahp_passenger_ab = eval(document.querySelector('input[name="AHPpassengerAB"]:checked').value);
    var ahp_passenger_ac = eval(document.querySelector('input[name="AHPpassengerAC"]:checked').value); 
    var ahp_passenger_ad = eval(document.querySelector('input[name="AHPpassengerAD"]:checked').value);
    var ahp_passenger_bc = eval(document.querySelector('input[name="AHPpassengerBC"]:checked').value);
    var ahp_passenger_bd = eval(document.querySelector('input[name="AHPpassengerBD"]:checked').value);
    var ahp_passenger_cd = eval(document.querySelector('input[name="AHPpassengerCD"]:checked').value);

    var ahp_mileage_ab = eval(document.querySelector('input[name="AHPmileageAB"]:checked').value);
    var ahp_mileage_ac = eval(document.querySelector('input[name="AHPmileageAC"]:checked').value); 
    var ahp_mileage_ad = eval(document.querySelector('input[name="AHPmileageAD"]:checked').value);
    var ahp_mileage_bc = eval(document.querySelector('input[name="AHPmileageBC"]:checked').value);
    var ahp_mileage_bd = eval(document.querySelector('input[name="AHPmileageBD"]:checked').value);
    var ahp_mileage_cd = eval(document.querySelector('input[name="AHPmileageCD"]:checked').value);

    ahp_safe = [[1, 1/ahp_safe_ab, 1/ahp_safe_ac, 1/ahp_safe_ad],
                [ahp_safe_ab, 1, 1/ahp_safe_bc, 1/ahp_safe_bd],
                [ahp_safe_ac, ahp_safe_bc, 1, 1/ahp_safe_cd],
                [ahp_safe_ad, ahp_safe_bd, ahp_safe_cd, 1]];

    ahp_safe_normalized = normalize_ahp(ahp_safe);

    ahp_speed = [[1, 1/ahp_speed_ab, 1/ahp_speed_ac, 1/ahp_speed_ad],
                [ahp_speed_ab, 1, 1/ahp_speed_bc, 1/ahp_speed_bd],
                [ahp_speed_ac, ahp_speed_bc, 1, 1/ahp_speed_cd],
                [ahp_speed_ad, ahp_speed_bd, ahp_speed_cd, 1]];

    ahp_speed_normalized = normalize_ahp(ahp_safe);

    ahp_fuel = [[1, 1/ahp_fuel_ab, 1/ahp_fuel_ac, 1/ahp_fuel_ad],
                [ahp_fuel_ab, 1, 1/ahp_fuel_bc, 1/ahp_fuel_bd],
                [ahp_fuel_ac, ahp_fuel_bc, 1, 1/ahp_fuel_cd],
                [ahp_fuel_ad, ahp_fuel_bd, ahp_fuel_cd, 1]];

    ahp_fuel_normalized = normalize_ahp(ahp_safe);

    ahp_luggage = [[1, 1/ahp_luggage_ab, 1/ahp_luggage_ac, 1/ahp_luggage_ad],
                [ahp_luggage_ab, 1, 1/ahp_luggage_bc, 1/ahp_luggage_bd],
                [ahp_luggage_ac, ahp_luggage_bc, 1, 1/ahp_luggage_cd],
                [ahp_luggage_ad, ahp_luggage_bd, ahp_luggage_cd, 1]];


    ahp_luggage_normalized = normalize_ahp(ahp_safe);

    ahp_passenger = [[1, 1/ahp_passenger_ab, 1/ahp_passenger_ac, 1/ahp_passenger_ad],
                [ahp_passenger_ab, 1, 1/ahp_passenger_bc, 1/ahp_passenger_bd],
                [ahp_passenger_ac, ahp_passenger_bc, 1, 1/ahp_passenger_cd],
                [ahp_passenger_ad, ahp_passenger_bd, ahp_passenger_cd, 1]];


    ahp_passenger_normalized = normalize_ahp(ahp_safe);

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


    var firstalternative = eval(document.querySelector('input[name="alternative1"]:checked').value);

    if(firstalternative == 1) {
        firstalternative = 0;
        first_pick = "Car A";
    }
    if(firstalternative == 2) {
        firstalternative = 1;
        first_pick = "Car B";
    }
    if(firstalternative == 3) {
        firstalternative = 2;
        first_pick = "Car C";
    }
    if(firstalternative == 4) {
        firstalternative = 3;
        first_pick = "Car D";
    }

    //Values to be read in the database
    var AHP_a = 0;
    var AHP_b = 0;
    var AHP_c = 0;
    var AHP_d = 0;

    var SMART_a = 0;
    var SMART_b = 0;
    var SMART_c = 0;
    var SMART_d = 0;
    
    var rankorder_a = 0;
    var rankorder_b = 0;
    var rankorder_c = 0;
    var rankorder_d = 0;

    var AHP_correct = 0;
    var SMART_correct = 0;
    var rankorder_correct = 0;

    var first_alternative_a = 0;
    var first_alternative_b = 0;
    var first_alternative_c = 0;
    var first_alternative_d = 0;

    if(firstalternative == 0) {
        first_alternative_a = 1;
    }
    if(firstalternative == 1) {
        first_alternative_b = 1;
    }
    if(firstalternative == 2) {
        first_alternative_c = 1;
    }
    if(firstalternative == 3) {
        first_alternative_d = 1;
    }    

    winner_ahp_index = indexOfMax(alternatives_ahp);

    winner_smart_index = indexOfMax(alternatives_smart);


    function counting(technique, tech_index) {
        if(technique == "AHP") {
            if(tech_index == firstalternative) {
                AHP_correct = 1;
            }
            if(tech_index == 0) {
                AHP_a = 1;
            }
            if(tech_index == 1) {
                AHP_b = 1;
            }
            if(tech_index == 2) {
                AHP_c = 1;
            }
            if(tech_index == 3) {
                AHP_d = 1;
            }
        }
        if(technique == "SMART") {
            if(tech_index == firstalternative) {
                SMART_correct = 1;
            }
            if(tech_index == 0) {
                SMART_a = 1;
            }
            if(tech_index == 1) {
                SMART_b = 1;
            }
            if(tech_index == 2) {
                SMART_c = 1;
            }
            if(tech_index == 3) {
                SMART_d = 1;
            }
        }
        if(technique == "rankorder") {
            if(tech_index == firstalternative) {
                rankorder_correct = 1;
            }
            if(tech_index == 0) {
                rankorder_a = 1;
            }
            if(tech_index == 1) {
                rankorder_b = 1;
            }
            if(tech_index == 2) {
                rankorder_c = 1;
            }
            if(tech_index == 3) {
                rankorder_d = 1;
            }
        }
    }

    counting("AHP", winner_ahp_index);
    counting("SMART", winner_smart_index);
    counting("rankorder", winner_rankorder);

    //Visualized for the user
    alert("At the beginning of this questionnaire, you chose " + first_pick + " as the most appealing alternative for you. Now let's see what the different elicitation methods computed for you...");

    winner_smart = winner(winner_smart_index, "SMART");
    alert(winner_smart);


    winner_ahp = winner(winner_ahp_index, "AHP");
    alert(winner_ahp);

    winner_rank = winner(winner_rankorder, "Rank order")
    alert(winner_rank);

    function LinkToNextPage() {
        location.replace("https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_29vFvwNNEn1G138");
    }

    alert("You will now be directed to a questionnaire where you get to fill your experience regarding the elicitation methods. Thank you for your participation!");
    LinkToNextPage();

}



Survey
    .StylesManager
    .applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";


var json = {
    "title": "Rank order weight elicitation method",
    "description": "In this approach, the decision-maker forms ordinal statements of criteria importance, and the aim is to convert this information into numerical weights which are in line with the ordinal information. In general, determining the weight with a ranking technique comprises two steps; the first step is rating the criteria by significance and the second step is weighting the criteria. Imagine that you are deciding on your next car purchase. When buying a car, you consider different characteristics of cars before making the purchase. Rank which criteria you consider to be most important based on your own preferences. By dragging and dropping, rank the following criterion in terms of their relative importance, from the most important to least important when deciding on buying a car.",
    "logoFit": "none",
    "logoPosition": "right",
    "completedHtmlOnCondition": [
     {},
     {},
     {}
    ],
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "ranking",
        "name": "question1",
        "title": "Order rank the criteria",
        "description": "Imagine that you are deciding on your next car purchase. When buying a car, you consider different characteristics of cars before making the purchase. Rank which criteria you consider to be most important based on your own preferences. By dragging and dropping, rank the following criterion in terms of their relative importance, from the most important to least important when deciding on buying a car.",
        "isRequired": true,
        "choices": [
         {
          "value": "Maximum Speed",
          "text": "Maximum Speed"
         },
         {
          "value": "Luggage Capacity",
          "text": "Luggage Capacity"
         },
         {
          "value": "Fuel Consumption",
          "text": "Fuel Consumption"
         },
         {
          "value": "Safety",
          "text": "Safety"
         },
         {
          "value": "Passenger Capacity",
          "text": "Passenger Capacity"
         },
         {
          "value": "Mileage",
          "text": "Mileage"
         }
        ]
       },
       {
        "type": "ranking",
        "name": "question2",
        "title": "Order the rank based on Safety",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Safety",
        "isRequired": true,
        "choices": [
         {
          "value": "Car A",
          "text": "Car A"
         },
         {
          "value": "Car B",
          "text": "Car B"
         },
         {
          "value": "Car C",
          "text": "Car C"
         },
         {
          "value": "Car D",
          "text": "Car D"
         }
        ]
       },
       {
        "type": "image",
        "name": "question8",
        "width": "500",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       },
       {
        "type": "ranking",
        "name": "question3",
        "title": "Order rank based on Maximum speed",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Maximum speed",
        "isRequired": true,
        "choices": [
         {
          "value": "Car A",
          "text": "Car A"
         },
         {
          "value": "Car B",
          "text": "Car B"
         },
         {
          "value": "Car C",
          "text": "Car C"
         },
         {
          "value": "Car D",
          "text": "Car D"
         }
        ]
       },
       {
        "type": "image",
        "name": "question9",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       },
       {
        "type": "ranking",
        "name": "question4",
        "title": "Order rank based on fuel consumption",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Fuel consumption",
        "isRequired": true,
        "choices": [
            {
                "value": "Car A",
                "text": "Car A"
               },
               {
                "value": "Car B",
                "text": "Car B"
               },
               {
                "value": "Car C",
                "text": "Car C"
               },
               {
                "value": "Car D",
                "text": "Car D"
               }
        ]
       },
       {
        "type": "image",
        "name": "question10",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       },
       {
        "type": "ranking",
        "name": "question5",
        "title": "Order rank based on luggage capacity",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Luggage capacity",
        "isRequired": true,
        "choices": [
            {
                "value": "Car A",
                "text": "Car A"
               },
               {
                "value": "Car B",
                "text": "Car B"
               },
               {
                "value": "Car C",
                "text": "Car C"
               },
               {
                "value": "Car D",
                "text": "Car D"
               }
        ]
       },
       {
        "type": "image",
        "name": "question11",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       },
       {
        "type": "ranking",
        "name": "question6",
        "title": "Order rank based on passenger capacity",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Passenger capacity",
        "isRequired": true,
        "choices": [
            {
                "value": "Car A",
                "text": "Car A"
               },
               {
                "value": "Car B",
                "text": "Car B"
               },
               {
                "value": "Car C",
                "text": "Car C"
               },
               {
                "value": "Car D",
                "text": "Car D"
               }
        ]
       },
       {
        "type": "image",
        "name": "question12",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       },
       {
        "type": "ranking",
        "name": "question7",
        "title": "Order rank based on mileage",
        "description": "To the right you will find a table with four alternatives named car A, car B, car C, and car D and their stats based on each of the criteriums. Order the alternatives based on what you believe is more appealing (bottom: not appealing), (top: very appealing) based on Mileage",
        "isRequired": true,
        "choices": [
            {
                "value": "Car A",
                "text": "Car A"
               },
               {
                "value": "Car B",
                "text": "Car B"
               },
               {
                "value": "Car C",
                "text": "Car C"
               },
               {
                "value": "Car D",
                "text": "Car D"
               }
        ]
       },
       {
        "type": "image",
        "name": "question13",
        "startWithNewLine": false,
        "imageLink": "data:image/png;base64,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",
        "imageHeight": 200,
        "imageWidth": 400
       }
      ]
     }
    ],
    "showPageTitles": false
   }


var survey = new Survey.Model(json);



survey.onComplete.add(function() {

    var crit_values = [(1+(1/2)+(1/3)+(1/4)+(1/5)+(1/6)), ((1/2)+(1/3)+(1/4)+(1/5)+(1/6)), ((1/3)+(1/4)+(1/5)+(1/6)), 
                        ((1/4)+(1/5)+(1/6)), 
                        ((1/5)+(1/6)), (1/6)];

    for(var i = 0; i < crit_values.length; i++) {
        crit_values[i] /= 6;
    }
    
    var crit_index = survey.getValue("question1");
    
    var crit_dict = {};
    
    for(var i = 0; i < crit_index.length; i++) {

        crit_dict[crit_index[i]] = crit_values[i];
    }

    function array_val() {
        arr = [];
        arr[0] = (1 + (1/2) + (1/3) + (1/4))/4;
        arr[1] = ((1/2) + (1/3) + (1/4))/4;
        arr[2] = ((1/3) + (1/4))/4;
        arr[3] = ((1/4))/4;
        return arr;
    }
    safety_values = array_val();
    speed_values = array_val();
    fuel_values = array_val();
    luggage_values = array_val();
    passenger_values = array_val();
    mileage_values = array_val();

    var safety_val_index = survey.getValue("question2");
    var speed_val_index = survey.getValue("question3");
    var fuel_val_index = survey.getValue("question4");
    var luggage_val_index = survey.getValue("question5");
    var passenger_val_index = survey.getValue("question6");
    var mileage_val_index = survey.getValue("question7");

    var safety_dict = {};
    var speed_dict = {};
    var fuel_dict = {};
    var luggage_dict = {};
    var passenger_dict = {};
    var mileage_dict = {};

    for(var i = 0; i < safety_val_index.length; i++) {
        safety_dict[safety_val_index[i]] = safety_values[i];
        speed_dict[speed_val_index[i]] = speed_values[i];
        fuel_dict[fuel_val_index[i]] =  fuel_values[i];
        luggage_dict[luggage_val_index[i]] = luggage_values[i];
        passenger_dict[passenger_val_index[i]] = passenger_values[i];
        mileage_dict[mileage_val_index[i]] = mileage_values[i];
    }

    
    function compute_alternatives() {
        var alternatives = {"Car A": 0,
                            "Car B": 0,
                            "Car C": 0,
                            "Car D": 0};
        
        alternatives["Car A"] = crit_dict["Safety"]*safety_dict["Car A"] + crit_dict["Maximum Speed"]*speed_dict["Car A"] + crit_dict["Fuel Consumption"]*fuel_dict["Car A"] + crit_dict["Luggage Capacity"]*luggage_dict["Car A"] + crit_dict["Passenger Capacity"]*passenger_dict["Car A"] + crit_dict["Mileage"]*mileage_dict["Car A"];

        alternatives["Car B"] = crit_dict["Safety"]*safety_dict["Car B"] + crit_dict["Maximum Speed"]*speed_dict["Car B"] + crit_dict["Fuel Consumption"]*fuel_dict["Car B"] + crit_dict["Luggage Capacity"]*luggage_dict["Car B"] + crit_dict["Passenger Capacity"]*passenger_dict["Car B"] + crit_dict["Mileage"]*mileage_dict["Car B"];

        alternatives["Car C"] = crit_dict["Safety"]*safety_dict["Car C"] + crit_dict["Maximum Speed"]*speed_dict["Car C"] + crit_dict["Fuel Consumption"]*fuel_dict["Car C"] + crit_dict["Luggage Capacity"]*luggage_dict["Car C"] + crit_dict["Passenger Capacity"]*passenger_dict["Car C"] + crit_dict["Mileage"]*mileage_dict["Car C"];

        alternatives["Car D"] = crit_dict["Safety"]*safety_dict["Car D"] + crit_dict["Maximum Speed"]*speed_dict["Car D"] + crit_dict["Fuel Consumption"]*fuel_dict["Car D"] + crit_dict["Luggage Capacity"]*luggage_dict["Car D"] + crit_dict["Passenger Capacity"]*passenger_dict["Car D"] + crit_dict["Mileage"]*mileage_dict["Car D"];
        
        
        winner = Object.keys(alternatives).reduce(function(a, b){ return alternatives[a] > alternatives[b] ? a : b });

        return winner

    }

    winner_rankorder = compute_alternatives();

    if(winner_rankorder == "Car A") {
        winner_rankorder = 0;
    }
    if(winner_rankorder == "Car B") {
        winner_rankorder = 1;
    }
    if(winner_rankorder == "Car C") {
        winner_rankorder = 2;
    }
    if(winner_rankorder == "Car D") {
        winner_rankorder = 3;
    }

    print_result(winner_rankorder);
});

survey.onCompleting.add(function() {
    cars = ['A', 'B', 'C', 'D'];
    
    var errors = 0;
    if(document.querySelector('input[name="alternative1"]:checked')?.value == undefined) {
        //alert('ERROR! First alternative!');
        document.getElementById('erroralternativeone').innerHTML = "Please choose one of the alternatives.";
        document.getElementById('erroralternativeone').style = "color:#FF0000";
        errors +=1;
    }    

    smart_crits = ['safety', 'speed', 'consumption', 'luggage', 'passenger', 'mileage'];
    var smart_crit_bool = false;
    for(var i = 0; i < smart_crits.length; i++) {
        var smart_element = "smart crit " + smart_crits[i];
        if(document.getElementById(smart_element).value == "") {
            document.getElementById(smart_element).style = "border-color:#FF0000";
            errors +=1;
            smart_crit_bool = true;
        }
    }
    if(smart_crit_bool == true) {
        document.getElementById('errorSMARTcrit').innerHTML = "Please fill in the textboxes.";
        document.getElementById("errorSMARTcrit").style = "color:#FF0000";
    }

    var smart_safe_bool = false;
    var smart_speed_bool = false;
    var smart_fuel_bool = false;
    var smart_luggage_bool = false;
    var smart_passenger_bool = false;
    var smart_mileage_bool = false;

    for(var i = 1; i < 7; i++) {
        for(var j = 0; j < cars.length; j++) {
            if(document.querySelector('input[name="editList'+cars[j]+i+'"]:checked')?.value == undefined) {
                if(i == 1)
                    smart_safe_bool = true;
                if(i == 2)
                    smart_speed_bool = true;
                if(i == 3)
                    smart_fuel_bool = true;
                if(i == 4)
                    smart_luggage_bool = true;
                if(i == 5)
                    smart_passenger_bool = true;
                if(i == 6)
                    smart_mileage_bool = true;
                errors +=1;
            }
        }
    }
    if(smart_safe_bool == true) {
        document.getElementById('errorSMARTsafe').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTsafe").style = "color:#FF0000";
    }
    if(smart_speed_bool == true) {
        document.getElementById('errorSMARTspeed').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTspeed").style = "color:#FF0000";
    }
    if(smart_fuel_bool == true) {
        document.getElementById('errorSMARTfuel').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTfuel").style = "color:#FF0000";
    }
    if(smart_luggage_bool == true) {
        document.getElementById('errorSMARTluggage').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTluggage").style = "color:#FF0000";
    }    
    if(smart_passenger_bool == true) {
        document.getElementById('errorSMARTpassenger').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTpassenger").style = "color:#FF0000";
    }    
    if(smart_mileage_bool == true) {
        document.getElementById('errorSMARTmileage').innerHTML = "Please fill in the values.";
        document.getElementById("errorSMARTmileage").style = "color:#FF0000";
    }        
    crits = ['safe', 'speed', 'fuel', 'luggage', 'passenger', 'mileage'];

    ahp_crit_bool = false;
    for(var j = 0; j < crits.length-1; j++) {
        for(var i = j+1; i < crits.length; i++) {
            if(document.querySelector('input[name="AHPcrit'+crits[j]+crits[i]+'"]:checked')?.value == undefined) {
                ahp_crit_bool = true;
                errors +=1;
            }      
        }
    }

    if(ahp_crit_bool == true) {
        document.getElementById('ahpcriterror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpcriterror").style = "color:#FF0000";        
    }


    var ahp_safe_bool = false;
    var ahp_speed_bool = false;
    var ahp_fuel_bool = false;
    var ahp_luggage_bool = false;
    var ahp_passenger_bool = false;
    var ahp_mileage_bool = false;


    for(var k = 0; k < crits.length; k++) {
        for(var j = 0; j < cars.length; j++) {
            for(var i = j+1; i < cars.length; i++) {
                if(document.querySelector('input[name="AHP'+crits[k]+cars[j]+cars[i]+'"]:checked')?.value == undefined) {
                    if(k == 0)
                        ahp_safe_bool = true;
                    if(k == 1)
                        ahp_speed_bool = true;
                    if(k == 2)
                        ahp_fuel_bool = true;
                    if(k == 3)
                        ahp_luggage_bool = true;
                    if(k == 4)
                        ahp_passenger_bool = true;
                    if(k == 5)
                        ahp_mileage_bool = true;
                    errors +=1;
                }                  
            }
        }
    }
    if(ahp_safe_bool == true) {
        document.getElementById('ahpsafeerror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpsafeerror").style = "color:#FF0000";        
    }
    if(ahp_speed_bool == true) {
        document.getElementById('ahpspeederror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpspeederror").style = "color:#FF0000";        
    }
    if(ahp_fuel_bool == true) {
        document.getElementById('ahpfuelerror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpfuelerror").style = "color:#FF0000";        
    }
    if(ahp_luggage_bool == true) {
        document.getElementById('ahpluggageerror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpluggageerror").style = "color:#FF0000";        
    }
    if(ahp_passenger_bool == true) {
        document.getElementById('ahppassengererror').innerHTML = "Please fill in the values.";
        document.getElementById("ahppassengererror").style = "color:#FF0000";        
    }
    if(ahp_mileage_bool == true) {
        document.getElementById('ahpmileageerror').innerHTML = "Please fill in the values.";
        document.getElementById("ahpmileageerror").style = "color:#FF0000";        
    }

    if (errors > 0) {
        window.scrollBy(0, -10000);
        alert("You have not filled in all the values for this survey. Please fill in the highlighted missing values.")
        survey.render($("#surveyElement"));
    }

});

$("#surveyElement").Survey({model: survey});




