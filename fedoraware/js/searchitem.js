function search() {
	let input = document.getElementById('searchbar').value
	input=input.toLowerCase();
	let cfgw = document.getElementsByClassName('cfg__wrapper');
	
	for (let i = 0; i < cfgw.length; i++) {
		if (!cfgw[i].innerHTML.toLowerCase().includes(input)) {
			cfgw[i].style.display="none";
		}
		else {
			cfgw[i].style.display="block";				
		}
	}
}
