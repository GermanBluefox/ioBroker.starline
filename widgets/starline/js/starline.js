/*
    ioBroker.starline Widget-Set
    version: "0.1.0"
    Copyright 10.2015-2016 instalator <vvvalt@mail.ru>
*/
"use strict";
// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "myColor":          {"en": "myColor",       "de": "mainColor",  "ru": "Мой цвет"},
        "myColor_tooltip":  {
            "en": "Description of\x0AmyColor",
            "de": "Beschreibung von\x0AmyColor",
            "ru": "Описание\x0AmyColor"
        },
        "htmlText":         {"en": "htmlText",      "de": "htmlText",   "ru": "htmlText"},
        "group_extraMyset": {"en": "extraMyset",    "de": "extraMyset", "ru": "extraMyset"},
        "extraAttr":        {"en": "extraAttr",     "de": "extraAttr",  "ru": "extraAttr"}
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":  {"en": "Instance", "de": "Instanz", "ru": "Инстанция"}
});

// this code can be placed directly in template.html
vis.binds.starline = {
    version: "0.1.0",
    showVersion: function () {
        if (vis.binds.starline.version) {
            console.log('Version starline: ' + vis.binds.starline.version);
            vis.binds.starline.version = null;
        }
    },
	states: {
		//
		oid_alias: 					{val: undefined, selector: '.alias_value',			blink: false, objName: 'alias'},
		oid_ctemp: 					{val: undefined, selector: '',						blink: false, objName: 'ctemp'},
		oid_etemp: 					{val: undefined, selector: '',						blink: false, objName: 'etemp'},
		oid_balance:  				{val: undefined, selector: '',						blink: false, objName: 'balance'},
		oid_battery: 				{val: undefined, selector: '',						blink: false, objName: 'battery'},
		oid_gsm_lvl: 				{val: undefined, selector: '.gsm-status',			blink: false, objName: 'gsm_lvl'},
		oid_gps_lvl: 				{val: undefined, selector: '.gps-status',	    	blink: false, objName: 'gps_lvl'},
		oid_status: 				{val: undefined, selector: '.menu-status',			blink: false, objName: 'status'},
		//
		oid_car_state_arm:			{val: undefined, selector: '.car-arm > .s1, .car-arm > .s2, .car-arm > .s3, .car-arm > .s4, .car-arm > .s5', blink: false, objName: 'car_state.arm'},
		oid_car_state_door: 		{val: undefined, selector: '.car-doors',			blink: false, objName: 'car_state.door'},
		oid_car_state_hijack: 		{val: undefined, selector: '.hijack-border',		blink: false, objName: 'car_state.hijack'},
		oid_car_state_valet: 		{val: undefined, selector: '.valet-border',			blink: false, objName: 'car_state.valet'},
		oid_car_state_hood: 		{val: undefined, selector: '.car-hood',				blink: false, objName: 'car_state.hood'},
		oid_car_state_ign: 			{val: undefined, selector: '.car-ign > .s1, .car-arm > .s2, .car-arm > .s3', blink: false, objName: 'car_state.ign'},
		oid_car_state_trunk: 		{val: undefined, selector: '.car-trunk',			blink: false, objName: 'car_state.trunk'},
		oid_car_state_hbrake: 		{val: undefined, selector: '',						blink: false, objName: 'car_state.hbrake'},
		oid_car_state_pbrake: 		{val: undefined, selector: '',						blink: false, objName: 'car_state.pbrake'},
		oid_car_state_run: 			{val: undefined, selector: '.car-run',				blink: false, objName: 'car_state.run'},
		//
		oid_alr_state_door:			{val: undefined, selector: '.car-doors-red',		blink: false, objName: 'car_alr_state.door'},
		oid_alr_state_add_h:		{val: undefined, selector: '',						blink: false, objName: 'car_alr_state.add_h'},
		oid_alr_state_add_l:		{val: undefined, selector: '',						blink: false, objName: 'car_alr_state.add_l'},
		oid_alr_state_hbrake:		{val: undefined, selector: '',						blink: false, objName: 'car_alr_state.hbrake'},
		oid_alr_state_hood:			{val: undefined, selector: '.car-hood-red',			blink: false, objName: 'car_alr_state.hood'},
		oid_alr_state_ign:			{val: undefined, selector: '.car-key-red',			blink: false, objName: 'car_alr_state.ign'},
		oid_alr_state_pbrake:		{val: undefined, selector: '',						blink: false, objName: 'car_alr_state.pbrake'},
		oid_alr_state_shock_h:		{val: undefined, selector: '.car-hammer2-red',		blink: false, objName: 'car_alr_state.shock_h'},
		oid_alr_state_shock_l:		{val: undefined, selector: '.car-hammer1-red',		blink: false, objName: 'car_alr_state.shock_l'},
		oid_alr_state_tilt:			{val: undefined, selector: '.car-tiltsensor-red',	blink: false, objName: 'car_alr_state.tilt'},
		oid_alr_state_trunk:		{val: undefined, selector: '.car-trunk-red',		blink: false, objName: 'car_alr_state.trunk'},
		oid_alr_state_hijack:		{val: undefined, selector: '',						blink: false, objName: 'car_alr_state.hijack'},
		//
		oid_checkballance: 			{val: undefined, selector: '',						blink: false, objName: 'control.checkballance'},
		oid_checktemp: 				{val: undefined, selector: '',						blink: false, objName: 'control.checktemp'}
	},
	createWidgetStatus: function (widgetID, view, data, style) {
		var $div = $('#' + widgetID);
		// if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.starline.createWidgetStatus(widgetID, view, data, style);
            }, 100);
        }

		function setVisible(selector, isVisible, isBlink) {
			if (isVisible) {
				$(selector).show();

			} else {
				$(selector).hide();
			}
			if (isBlink) {
				$(selector).addClass('blink_me');
			} else {
				$(selector).removeClass('blink_me');
			}
		}

		function updateStates() {
			var states = JSON.parse(JSON.stringify(vis.binds.starline.states));
			var gsm = 0; 
			var gps = 0;

			// read all states
			for (var s in states) {
				if (data[s] && data[s] !== 'nothing_selected') states[s].val = vis.states[data[s] + '.val'];
			}

			// convert time
			if (states.oid_alias) {
				var date = new Date(1000 * vis.states[data.oid_alias + '.ts']).toGMTString();
				$div.find('.datedata').html('Данные на ' + date);
			}

			// convert gsm
			if (states.oid_gsm_lvl.val >= 1  && states.oid_gsm_lvl.val <= 7)  {
				gsm = 1;
			} else
			if (states.oid_gsm_lvl.val >= 7  && states.oid_gsm_lvl.val <  14) {
				gsm = 2;
			} else
			if (states.oid_gsm_lvl.val >= 14 && states.oid_gsm_lvl.val <  21) {
				gsm = 3;
			} else
			if (states.oid_gsm_lvl.val >= 21 && states.oid_gsm_lvl.val <  28) {
				gsm = 4;
			} else
			if (states.oid_gsm_lvl.val >= 28 && states.oid_gsm_lvl.val <= 30) {
				gsm = 5;
			}

			if (states.oid_gps_lvl.val >= 1  && states.oid_gps_lvl.val <= 7) {
				gps = 1;
			} else
			if (states.oid_gps_lvl.val >= 7  && states.oid_gps_lvl.val < 14) {
				gps = 2;
			} else
			if (states.oid_gps_lvl.val >= 14 && states.oid_gps_lvl.val < 21) {
				gps = 3;
			}
			if (states.oid_gsm_lvl){
				$('.gsm-status').attr('data-level', gsm);
			}
			if (states.oid_gsm_lvl){
				$('.gps-status').attr('data-level', gps);
			}

			if (states.oid_status.val == 1){
				$('.menu-status').removeClass('off').addClass('on');
			} else {
				$('.menu-status').removeClass('on').addClass('off');
			}
			
			if (states.oid_car_state_valet.val == 1){
				$('.valet-border, .valet-content').show();
			} else {
				$('.valet-border, .valet-content').hide();
			}
			if (states.oid_car_state_hijack.val == 1){
				$('.hijack-border').show();
			} else {
				$('.hijack-border').hide();
			}
			if (states.oid_car_state_arm == 1){
				$('.car-arm').addClass("on");
				if (oid_alr_state_shock_l == 1){$('.car-hammer1-red').attr('style', 'opacity: 1');$('.car-hammer1-red').addClass("blink_me");}
				if (oid_alr_state_shock_h == 1){$('.car-hammer2-red').attr('style', 'opacity: 1');$('.car-hammer2-red').addClass("blink_me");}
				if (oid_alr_state_tilt == 1){$('.car-tiltsensor-red').attr('style', 'opacity: 1');$('.car-tiltsensor-red').addClass("blink_me");}
				if (oid_alr_state_trunk == 1){$('.car-trunk-red').attr('style', 'opacity: 1');$('.car-trunk-red').addClass("blink_me");}
				if (oid_alr_state_door == 1){$('.car-doors-red').attr('style', 'opacity: 1');$('.car-doors-red').addClass("blink_me");}
				if (oid_alr_state_ign == 1){$('.car-key-red').attr('style', 'opacity: 1');$('.car-key-red').addClass("blink_me");}
				if (oid_alr_state_hood == 1){$('.car-hood-red').attr('style', 'opacity: 1');$('.car-hood-red').addClass("blink_me");}
				if (oid_alr_state_pbrake == 1 || oid_alr_state_hbrake == 1){$('.car-parking-red').attr('style', 'opacity: 1');$('.car-parking-red').addClass("blink_me");}
				/*if (key_r == 1){$('.car-key-red').attr('style', 'opacity: 1');$('.car-key-red').addClass("blink_me");}*/
			} else if (states.oid_car_state_arm != 1){
				$('.car-arm').removeClass("on");
				//if (oid_car_state_trunk == 1){$('.car-trunk').attr('style', 'opacity: 1');}
				if (oid_car_state_door == 1){$('.car-doors').attr('style', 'opacity: 1');}
				if (oid_car_state_run == 1){$('.car-run').attr('style', 'opacity: 1');$('.car-ign > .light').attr('style', 'opacity: 1');$('.car-ign > .light').addClass("blink_me");}
				if (oid_car_state_hood == 1){$('.car-hood').attr('style', 'opacity: 1');}
				if (oid_car_state_pbrake == 1 || oid_car_state_hbrake == 1){$('.car-parking').attr('style', 'opacity: 1');}
				if (oid_car_state_ign == 1){$('.car-key').attr('style', 'opacity: 1');}
			}

		/*	if (neutral == 1){$('.car-neutral').attr('style', 'opacity: 1');}
			if (hfree == 1){$('.car-hfree').attr('style', 'opacity: 1');}*/

			/*if (states.oid_car_state_arm.val) {
				states.oid_car_state_trunk.val 	= false;
				states.oid_car_state_door.val 	= false;
				states.oid_car_state_run.val 	= false;
				states.oid_car_state_hood.val 	= false;
				states.oid_car_state_pbrake.val = false;
			}*/

			for (var s in states) {
				if (states[s].selector) setVisible(states[s].selector, states[s].val, states[s].blink && states[s].val);
			}
			
			//setVisible('.car-doors',    oid_car_state_door);
			$('.ctemp_value').html(states.oid_ctemp.val);
			$('.etemp_value').html(states.oid_etemp.val);
			$('.balance_value').html(states.oid_balance.val);
			$('.battery_value').html(states.oid_battery.val);
		}
		
		if (data.oid_checkballance && data.oid_checkballance !== 'nothing_selected') {
			$("li.balance").click(function () {
				vis.setValue(data.oid_checkballance, 1);
			});
		}

		if (data.oid_checktemp && data.oid_checktemp !== 'nothing_selected') {
			$("li.ctemp, li.etemp").click(function () {
				vis.setValue(data.oid_checktemp, 1);
			});
		}

		debugger;
        // subscribe on updates of values
		for (var s in vis.binds.starline.states) {
			if (!data[s] || data[s] == 'nothing_selected') continue;
			vis.states.bind(data[s] + '.val', function () {
				updateStates();
			});
		}
		// initial update
		updateStates();
    }//,
	
/*	createWidgetControl: function (widgetID, view, data, style) {
		var $div = $('#' + widgetID);
		// if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.starline.createWidgetControl(widgetID, view, data, style);
            }, 100);
        }
		
		var valet = vis.states[data.oid + '.car_state.valet.val'];
		var arm = vis.states[data.oid + '.car_state.arm.val'];
		var ign = vis.states[data.oid + '.car_state.ign.val'];
		var hijack = vis.states[data.oid + '.car_state.hijack.val'];
		var webasto = vis.states[data.oid + '.car_state.webasto.val'];
		var shock_bpass = vis.states[data.oid + '.car_state.shock_bpass.val'];
		var tilt_bpass = vis.states[data.oid + '.car_state.tilt_bpass.val'];
		

        

        $('#' + widgetID).html(text);
		
		$( ".control-icon-hijack" ).bind( "click", function() {
			vis.setValue(data.oid + '.control.hijack', 1);
		});
		$( ".control-icon-arm" ).bind( "click", function() {
			if (arm == 0 || arm == 2){
				vis.setValue(data.oid + '.control.arm', 1);
			}
			else {
				vis.setValue(data.oid + '.control.arm', 0);
			}
		});
		$( ".control-icon-ign" ).bind( "click", function() {
			if (ign == 0 || ign == 2){
				vis.setValue(data.oid + '.control.ign', 1);
			}
			else {
				vis.setValue(data.oid + '.control.ign', 0);
			}
		});
		$( ".control-icon-poke" ).bind( "click", function() {
			vis.setValue(data.oid + '.control.poke', 1);
		});		
		$( ".control-icon-webasto" ).bind( "click", function() {
			if (webasto == 0 || webasto == 2){
				vis.setValue(data.oid + '.control.webasto', 1);
			}
			else {
				vis.setValue(data.oid + '.control.webasto', 0);
			}
		});
		$( ".control-icon-shock_bpass" ).bind( "click", function() {
			if (shock_bpass == 0 || shock_bpass == 2){
				vis.setValue(data.oid + '.control.shock_bpass', 1);
			}
			else {
				vis.setValue(data.oid + '.control.shock_bpass', 0);
			}
		});
		$( ".control-icon-tilt_bpass" ).bind( "click", function() {
			if (tilt_bpass == 0 || tilt_bpass == 2){
				vis.setValue(data.oid + '.control.tilt_bpass', 1);
			}
			else {
				vis.setValue(data.oid + '.control.tilt_bpass', 0);
			}
		});
		$( ".control-icon-valet" ).bind( "click", function() {
			if (tilt_bpass == 0 || tilt_bpass == 2){
				vis.setValue(data.oid + '.control.valet', 1);
			}
			else {
				vis.setValue(data.oid + '.control.valet', 0);
			}
		});
		$( ".control-icon-update_position" ).bind( "click", function() {
			vis.setValue(data.oid + '.control.update_position', 1);
		});
		$( ".control-icon-out" ).bind( "click", function() {
			vis.setValue(data.oid + '.control.out', 1);
		});
		$( ".control-button-toright" ).bind( "click", function() {
			$('.control-items').animate({ "marginLeft": "-=267px" }, "slow" );
			$('.control-button-toleft').removeClass("off");
			$('.control-button-toright').addClass("off");
		});
		$( ".control-button-toleft" ).bind( "click", function() {
			$('.control-items').animate({ "marginLeft": "+=267px" }, "slow" );
			$('.control-button-toright').removeClass("off");
			$('.control-button-toleft').addClass("off");
		});
		
		if (hijack == 1){$('.control-icon-hijack').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) no-repeat 0px -35px;');}
		if (arm == 1){$('.control-icon-arm').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) no-repeat -72px -35px;');}
		if (ign == 1){$('.control-icon-ign').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) no-repeat -36px -35px;');}
		if (webasto == 1){$('.control-icon-webasto').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) -108px -35px no-repeat;');}
		if (shock_bpass == 1){$('.control-icon-shock_bpass').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) -252px -35px no-repeat;');}
		if (tilt_bpass == 1){$('.control-icon-tilt_bpass').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) -324px -35px no-repeat;');}
		if (valet == 1){$('.control-icon-valet').attr('style', 'background:url(./widgets/starline/img/buttons-icon-set_white.png) -288px -35px no-repeat;');}
		
        // subscribe on updates of value
        if (vis.states[data.oid + '.alias.val']) {
            vis.states.bind(data.oid + '.alias.val', function (e, newVal, oldVal) {
                $div.find('.alias_value').html(newVal);
            });
        }
    }*/
};

if (vis.editMode) {
	vis.binds.starline.changeOid = function (widgetID, view, newId, attr, isCss) {
		newId = newId.substring(0, newId.length - attr.length + 'oid_'.length);
		var changed = [];
		for (var s in vis.binds.starline.states) {
			if (s === 'oid_alias' || !vis.binds.starline.states[s].objName) continue;
			if (vis.objects[newId + vis.binds.starline.states[s].objName]) {
				changed.push(s);
				vis.views[view].widgets[widgetID].data[s] 	= newId + vis.binds.starline.states[s].objName;
				vis.widgets[widgetID].data[s] 				= newId + vis.binds.starline.states[s].objName;
			}
		}

		return changed;
	};
}

vis.binds.starline.showVersion();
