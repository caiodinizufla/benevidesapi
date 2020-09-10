const updateArraySchema = (antigas, novas, nameId) => {
	let toWho = [];
	let achou = false;
	novas.map(nova => {
		achou = false;
		antigas.map(antiga => {
			if(nova[nameId] == antiga[nameId]){
				toWho.push(antiga);
				achou = true;
			}
		});
		if (!achou) {
			toWho.push(nova)
		}
	});
	return toWho
}

const toFloat = (value) => {
    if(typeof value !== "string"){
        value = value.toString();
    }
    value = parseFloat(value.replace(",","."))
    return value;
}

const toReal = (value) => {
    value = toFloat(value);
    value = value * 100;
    if(value - Math.floor(value) > 0.3){
        value = (Math.ceil(value)) / 100;
    }else{
        value = (Math.floor(value)) / 100;
    }
    value = value.toString();
    if(value == ""){
        value = "0,00";
    }
    value = value.replace(".",",")
    if(value.indexOf(",") !== -1){
        switch(value.length - value.indexOf(",")){
            case 1:
                value = value + "00"
                break;
            case 2:
                value = value + "0"
                break;
            case 3:
                break;
        }
    }else{
        value = value + ",00"
    }
    return value;
}

module.exports = { updateArraySchema, toReal, toFloat };