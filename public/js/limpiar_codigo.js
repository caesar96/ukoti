var nodos_a_eliminar = new Array();
function buscar(){
	var elementos = document.getElementsByTagName('*');
	for (var k=0;k<elementos.length;k++){
		for (var i=0;i<elementos[k].childNodes.length;i++){
			var hijo = elementos[k].childNodes[i];
			if ((hijo.nodeType == 3 && !/\S/.test(hijo.nodeValue))||(hijo.nodeType==8)){
				nodos_a_eliminar[nodos_a_eliminar.length] = hijo;
			}	
		}
	}	
	destruir();
}

function destruir(){
	for(var d=0;d<nodos_a_eliminar.length;d++){
		nodos_a_eliminar[d].parentNode.removeChild(nodos_a_eliminar[d]);
	}
}

function escuchar(){
	var botones = document.getElementsByTagName('button');
	for (var j=0;j<botones.length;j++){
		if(document.addEventListener){
			botones[j].addEventListener('click',resultados,false);
		} else {
			botones[j].attachEvent('onclick',resultados);
		}
	}
}

function resultados() {
	var boton = this.id || window.event.srcElement.id;
	boton = boton.split('_')[2];
	var hijos = document.getElementsByTagName(boton)[0].childNodes;
	alert("Hijos que han sobrevivido: "+hijos.length);
	for (var c=0;c<hijos.length;c++){
		alert("Hijo: "+hijos[c]+"\nTipo: "+hijos[c].nodeType);	
	} 
}

function iniciar(){
	escuchar();
	buscar();
}

window.onload = iniciar; 