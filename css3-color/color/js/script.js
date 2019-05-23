var templates = {
	rgb:{
		channel:[
			{v:'#'},
			{v:'ff', r:'00', tmp:'#XX0000'},
			{v:'ff', r:'00', tmp:'#00XX00'},
			{v:'ff', r:'00', tmp:'#0000XX'},
					],
		tmp:'#O1O2O3',
		index:{r:1,g:2,b:3}
	},
	rgba:{
		channel:[
			{v:'rgb'},
			{v:255, r:0, tmp:'rgb(XX,0,0)'},
			{v:255, r:0, tmp:'rgb(0,XX,0)'},
			{v:255, r:0, tmp:'rgb(0,0,XX)'},
					],
		tmp:'rgb(O1,O2,O3)', tmp_a:'rgba(O1,O2,O3,O4)',
		index:{r:1,g:2,b:3}
	},
	hsla:{
		channel:[
			{v:'hsl'},
			{v:0, r:120,tmp:'hsl(XX,100%,50%)'},
			{v:100, r:0, tmp:'hsl(0,XX%,50%)'},
			{v:50, r:0,tmp:'hsl(0,100%,XX%)'},
					],
		tmp:'hsl(O1,O2%,O3%)', tmp_a:'hsla(O1,O2%,O3%,O4)',
		index:{h:1,s:2,l:3}
	}
};

function onReady(){

	$('#rgb .console input').on('input',onRGBChange);

	$('#hsla .console input:not([name=a]), #rgba .console input:not([name=a])').on('input',onColorChange);
	$('#hsla .console input[name=a], #rgba .console input[name=a]').on('input',onAlphaChange);
}

function onAlphaChange(e){
	var sectionID = $(e.target).closest('section').attr('id');
	var tml = templates[sectionID];

	var backgroundValue = tml.tmp_a.split("O1").join(tml.channel[1].v).split("O2").join(tml.channel[2].v).split("O3").join(tml.channel[3].v).split("O4").join(e.target.value);

	$('body').css('background',backgroundValue);

	var aRGB = $("#"+sectionID+" .console .output span span");
	$(aRGB[0]).text(sectionID);
	$(aRGB[4]).show();
	$(aRGB[5]).show();
	$(aRGB[5]).css('opacity',e.target.value);
	$(aRGB[5]).text(e.target.value);
}


function onColorChange(e){
	var sectionID = $(e.target).closest('section').attr('id');
	var tml = templates[sectionID];
	var oChannel = getChannel(e);
	var aRGB = $("#hsla .console .output span span");
	$(aRGB[0]).text(tml.channel[0].v);
	$(aRGB[4]).hide();
	$(aRGB[5]).hide();
	renderChange(e,oChannel);
}

function onRGBAChange(e){
	var oChannel = getChannel(e);
	var aRGB = $("#rgba .console .output span span");
	$(aRGB[0]).text('rgb');
	$(aRGB[4]).hide();
	$(aRGB[5]).hide();
	renderChange(e,oChannel);
}


function onRGBChange(e){
	var oChannel = getChannel(e);
		oChannel.n = oChannel.n.toString(16);
		oChannel.r = oChannel.r.toString(16);
	
	if(oChannel.n.length<2 ) oChannel.n = '0' + oChannel.n;
	if(oChannel.r.length<2 ) oChannel.r = '0' + oChannel.r;

	renderChange(e,oChannel);
}

function renderChange(e,oChannel){
	var sectionID = $(e.target).closest('section').attr('id');
	var tml = templates[sectionID];
	var nm=e.target.name;
	var index = tml.index[nm];
	var templateColor = tml.channel[index].tmp.split("XX").join(oChannel.n);
	var inFocus = $('#'+sectionID+' .box[data-clr='+nm+']'+  ' div');
		$(inFocus[0]).text(oChannel.n);
		$(inFocus[1]).text(oChannel.r);

	tml.channel[index].v = oChannel.n;
	tml.channel[index].r = oChannel.r;

	inFocus.css('background',templateColor);
	
	var aRGB = $("#"+sectionID+" .console .output span span");
	$(aRGB[tml.index[nm]]).css('color',templateColor);
	$(aRGB[tml.index[nm]]).text(oChannel.n);


	var backgroundValue = 
		tml.tmp.split("O1").join(tml.channel[1].v).split("O2").join(tml.channel[2].v).split("O3").join(tml.channel[3].v);
	var colorValue = tml.tmp.split("O1").join(tml.channel[1].r).split("O2").join(tml.channel[2].r).split("O3").join(tml.channel[3].r);
	console.log(backgroundValue,colorValue)

	$('body').css('background',backgroundValue);
	$('body').css('color',colorValue);

}

function getChannel(e){
	var val = parseFloat(e.target.value);
	var max = parseFloat(e.target.max);
	return {n:val,r:max-val};
}


$(document).ready(onReady);