/*
    Objeto "app" relacionado directamente a Cordova, contiene metodos que se enlazan directamente  a los eventos propios del dispositivo facilitados por los Plugins de Cordova.
*/
var app = {
    // Constructor del objeto
    initialize: function() {
        this.bindEvents();
    },
    /* Bind Event Listeners (this.bindEvents)
        Enlaza cualquier evento que sea requerido al inicio.
        Eventos comunes son: 'load', 'deviceready', 'offline', and 'online'.
    */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    /*  Manejador del evento "deviceready"
        En este metodo enlazaremos todos aquellos eventos que deseemos manejar.
        A fin de que, una vez que la aplicacion tome control del dispositivo, se puedan programar acciones.
    */
    onDeviceReady: function() {
        var _count_ = 0;
        app.receivedEvent();
        navigator.notification.vibrate(2800);
        window.addEventListener("batterystatus", function(info){
            if(typeof info == "undefined"){
                alert("No hay nada que mostrar");
                return false;
            }
            document.getElementById("appsStart").addEventListener("click", function(){
                uKoti.alert({title: "Información",content: "Batería: " + + info.level + "% | Conectado: " + info.isPlugged,buttons: {wellok: true,}});
            });
            //uKoti.alert({title: "Información",content: "Batería: " + + info.level + "% | Conectado: " + info.isPlugged,buttons: {wellok: true,}});
        }, false);
        document.addEventListener("volumeupbutton", function(){
            uKoti.alert( { title: "Aviso", content: "Se ha presionado el botón de volumen 'arriba'  " +_count_+ " veces." } );
            _count_ +=1;
        }, false);
        document.addEventListener("volumedownbutton", function(){
            uKoti.alert( { title: "Aviso", content: "Se ha presionado el botón de volumen 'abajo' " } );
        }, false);
        document.addEventListener("menubutton", function(){
            uKoti.alert( { title: "Chinga a tu madre", content: "Que chingue a su madre el américa Otra vez" } );
        }, false);
        document.addEventListener("backbutton", function(){
            uKoti.alert( { title: "Ola k ase puto", content: "Onda vital" } );
        }, false);
        document.addEventListener("offline", function(){
            document.getElementById("stateIcon").className = "offline";
            uKoti.alert( { title: "Internet info", content: "No estás conectado a Internet, por favor realice su pago mensual hijo de puta." } );
        }, false);
        document.addEventListener("online", function(){
            document.getElementById("stateIcon").className = "online";
            checkConnection();
        }, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        uKoti.alert({
            title: "Aviso",
            content: "La aplicacion esta lista para ser usada",
            buttons: {
                wellok: true,
            }
        });
        uKoti.eventsClick();
    },
    hideIdElement: function(id) {
        var hidebyId = document.getElementById(id);
        hidebyId.style.display = "none";
    }
};

var uKoti = {
    eventsClick: function() {
        document.querySelector(".close").addEventListener("click", function(){
            msgBox.hideShowHTML("#masknotify", 0, msgBox._jquery_);
        });
        document.querySelector(".wellok").addEventListener("click", function(){
            msgBox.hideShowHTML("#masknotify", 0, msgBox._jquery_);
        });
        document.querySelector(".monitor").addEventListener("click", function(){
            uKoti.alert({
                title: "¡Peligro!",
                content: "Que chingue a su madre el América",
                buttons: {
                    wellok: true,
                    cancel: false
                }
            });
        });
        document.querySelector(".spotify").addEventListener("click", function(){
            navigator.notification.vibrate(1500);
        });
        /*document.querySelector(".popcorntime").addEventListener("click", function(){
            uKoti.loadingGraphic();
        });*/
    },
    alert: function (m) {
        //
        msgBox.show(true);

        if (typeof (m) != "object") {
            m = m.replace(/\n/g, "<br />");
            msgBox.content ( m );
            msgBox.buttons( {wellok:true} );
            return;
        }

        //
        if ( typeof (m.title) != "undefined" && typeof (m.title) == "string")
            msgBox.title ( m.title );
        //
        if ( typeof (m.content) != "undefined" && typeof (m.content) == "string")
            msgBox.content ( m.content );
        if ( typeof (m.buttons) != "undefined" && typeof (m.buttons) == "object" )
            msgBox.buttons( m.buttons );
        return false;
    },
    prompt: function(msg, optionsObj, defaultSystem){
        /* Variables to use */
        var txtAnswer, _accept_, _cancel_;
        var dataType = "string", persist = false, keep;
        /* Check if var "msg" is defined */
        if (typeof (msg) == "undefined" || typeof (msg) == "null" || !msg) return false;
        /* Extract Object properties */
        if ( typeof(optionsObj) != "undefined" && typeof (optionsObj) == "object") {
            persist     =   (typeof (optionsObj.persist) != "undefined" && typeof (optionsObj.persist) != "null" && optionsObj.persist);
            dataType    =   (typeof (optionsObj.type) != "undefined" && typeof (optionsObj.type) != "null" && optionsObj.type.length > 0 && typeof (optionsObj.type) == "string") ? optionsObj.type : "string";
        }
        else if (typeof (optionsObj) != "undefined" && typeof (optionsObj) == "boolean")
            persist = optionsObj;
        else if (typeof (optionsObj) != "undefined" && typeof (optionsObj) == "string" ){
            persist = (optionsObj.split(",")[0] == "p") ? true : false;
            dataType = (optionsObj.split(",")[1] == "n" ) ? "number" : "string";
        }
        keep = function(){ return ( persist && txtAnswer != null && (typeof (txtAnswer) == "undefined" || typeof (txtAnswer) != dataType || !txtAnswer) )};
        /* Default browser prompt */
        if ( typeof ( defaultSystem ) != "undefined" ){
            do {
                /* Get data from prompt */
                txtAnswer = prompt(msg);
                txtAnswer = (dataType == "number" && txtAnswer != null) ? parseFloat(txtAnswer) : txtAnswer;
                /* Conditional to use */
                //
            } while ( keep() );
            /******************/
            return txtAnswer;
        }

        /* HTML prompt */
        msgBox.show(true);
        msgBox.content (msg, true, false );
        msgBox.buttons( {wellok:true, cancel:true} );
        //if($("#textAnswer").val().length <=0) {break;}
        /*pausar(0);*/
        //delay(1000 * 10);
        //alert(txtAnswer);
        if (txtAnswer)
        return txtAnswer;
    },
    loadingGraphic: function () {
        msgBox.show(true);
        msgBox.content (false, false, true );
    },
    apps: function (app, show) {

    }

};

var msgBox = {
    _jquery_: true,
    modifyHTML: function (e, txt , jq) {
        if ( typeof ( jq ) != "undefined" && typeof ( jq ) == "boolean" && jq == true ) $(e).html(txt);
        else {
            e = document.querySelector(e);
            e.innerHTML = txt;
        }
    },
    hideShowHTML: function (e, act, jq) {
        if ( typeof ( jq ) != "undefined" && typeof ( jq ) == "boolean" && jq == true  ) {
            e = $(e);
            if (act == 1)
                e.show();
            else
                e.hide();
        }
        else {
            e = document.querySelector(e);
            if (act == 1)
                e.style.display = "block";
            else
                e.style.display = "none";
        }

    },
    show : function (mask){
        this.hideShowHTML("#masknotify", mask, this._jquery_);
        this.defaultStart();
    },
    defaultStart: function () {
        this.hideShowHTML("#title", 0, this._jquery_);
        this.hideShowHTML("#content", 0, this._jquery_);
        this.hideShowHTML("#content #loadContent", 0, this._jquery_);
        this.hideShowHTML("#content #textAnswer", 0, this._jquery_);
        this.hideShowHTML("#buttons", 0, this._jquery_);
        this.hideShowHTML("#buttons #allbtn .wellok", 0, this._jquery_);
        this.hideShowHTML("#buttons #allbtn .cancel", 0, this._jquery_);
        this.hideShowHTML("#buttons #allbtn .goTo", 0, this._jquery_);
        this.modifyHTML("#title .text", "", this._jquery_);
        this.modifyHTML("#content #textMessage", "", this._jquery_);
        this.modifyHTML("#buttons #allbtn .goTo", "", this._jquery_);
    },
    content: function (msg, __input__, loading) {
        // Show box "#content"
        this.hideShowHTML("#content", 1, this._jquery_);
        // Show loading graphic
        if (typeof (loading) != "undefined" && typeof (loading) == "boolean" && loading == true)
        {
            this.hideShowHTML("#content #loadContent", 1, this._jquery_);
            return false;
        }
        if (typeof (__input__) != "undefined" && typeof (__input__) == "boolean" && __input__ == true)
        {
            this.hideShowHTML("#content #textAnswer", 1, this._jquery_);
        }
        // Show message text
        this.modifyHTML("#content #textMessage", msg, this._jquery_);
    },
    title: function ( text ) {
        // Desing Text
        this.hideShowHTML("#title", 1, this._jquery_);
        this.modifyHTML("#title .text", text, this._jquery_);
    },
    buttons: function (e) {
        //
        if (typeof e != "object") return false;
        //Buttons
        wellok  =   typeof ( e.wellok ); //OK, Aceptar
        wellok  =   (wellok != "undefined" && wellok == "boolean" && e.wellok == true);
        //
        cancel  =   typeof ( e.cancel ); //Cancel, Cancelar
        cancel  =   (cancel != "undefined" && cancel == "boolean" && e.cancel == true);
        //
        goTo    =   typeof ( e.goTo );   //Go to, Ir a... url
        goTo    =   (goTo != "undefined" && goTo == "object" && typeof(e.goTo.href) == "string" && typeof (e.goTo.text) == "string" );
        //
        this.hideShowHTML("#buttons #allbtn .wellok", wellok, this._jquery_);
        this.hideShowHTML("#buttons #allbtn .cancel", cancel, this._jquery_);
        //
        if ( goTo ) {
            var goToText = "<a href=\"" + e.goTo.href + "\" target=_blank>" + e.goTo.text + "  </a>";
            //
            this.hideShowHTML("#buttons #allbtn .goTo",   goTo, this._jquery_)
            this.modifyHTML("#buttons #allbtn .goTo", goToText, this._jquery_);
        }
        //
        this.hideShowHTML("#buttons", (wellok || cancel || goTo), this._jquery_);
    }
};

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    uKoti.alert({
        title: "Tipo de conexión",
        content: (states[networkState]),
        buttons: {
            wellok: true,
            cancel: false
        }
    });
    navigator.notification.vibrate(2800);
}
app.initialize();
//uKoti.loadingGraphic();
uKoti.eventsClick();

for ( var i = 0; i <  document.getElementsByClassName("box_item").length;++i) {
    document.getElementsByClassName("box_item")[i].addEventListener("click", function(){
        var element = $(this).children().attr("class");
        element = element.split(" ")[1];
        //alert(element);
        if (element == "spotify")
        {
            //countandsum();
            yearsOld();
        }
        else if (element == "porntime")
        {
            //ShowXValues();
            //var temporal = uKoti.prompt("Introduce tu edad actual", "p,n", true);

            // uKoti.alert({content: temporal});
            seekParImpar();
        }
        else if (element== "firefox")
        {
            var numero = prompt("Numero1");
            var numero2 = prompt("Numero2");
            numero = parseInt(numero);
            numero2 = parseInt(numero2);
            var nFinal = (numero % numero2);
            alert(nFinal);
        }
        else if (element == "popcorntime"){
            mayorMenor();
        }

        else if (element == "home") {
          multip(); // yearsMonthsWeeks();
        }

        else if (element == "settings") {
            numerosprimos();
        }
    }, false);
}

function ShowXValues() {
    var x = 1;
    do {
        if ( (x % 3) == 0)
        {
            if ( (x % 5) == 0 )
            {
                alert(x);
            }
        }
        x+=1;
    }
    while (x <= 50 );
}

function addN_numbers(){
    var n = prompt("Introduce un numero entero");
    var tmp = 1, suma = 0;
    //
    if (typeof (n) == "undefined" || typeof (n) == "null") return false;
    //
    n = parseInt(n);
    //
    while(tmp <= n){
        suma += tmp;
        alert(suma);
        tmp+=1;
    }
}

function mayorMenor (){
    var calf = {}, materia, msg;
    var Temp, lon;
    //
    materia = uKoti.prompt("Introduce el nombre de alguna materia", "p", true); if (materia == null) return false;
    lon = uKoti.prompt("Introduce el numero de unidades de "+materia+".", "p,n", true); if (lon == null) return false;
    //
    calf = setNotes(materia, lon); if ( !calf ) return false;

    //alert( ($("input#textAnswer").val().length) );
    //pausar( ($("input#textAnswer").val().length) );

    /*while( ($("input#textAnswer").val().length == 0) ) {

        setTimeout(function() {
            uKoti.prompt("Esta mierda no funciona xD");
        }, 1000);
    }*/
    //
    /*for ( var i = 1; i <= lon; ++i )
    {
        msg = (typeof (cardinalsN[i]) == "undefined" || typeof (cardinalsN[i]) == "null" || !cardinalsN[i]) ? "unidad " + i : cardinalsN[i]+" unidad ";
        calf[i] = uKoti.prompt("Introduce la calificación para la "+msg+" de " +materia+ ".", "p,n", true); if (calf[i] == null) return false;
    }*/
    for ( var k = 1; k <= lon; k++ )
    {
        for ( var j = 1; j <= lon-1; j++ )
        {
            if( calf[j] > calf[j+1] ) // cambia "<" a ">" para cambiar la manera de ordenar
            {
                Temp = calf[j];
                calf[j] = calf[j+1];
                calf[j + 1] = Temp;
            }
        }
    }
    /*for(var i = 1; i <= lon; i++)
            alert(calf[i]);*/
    if (calf[lon] > calf[1])
        msg = materia+" | Mayor calificación: "+calf[lon]+ ", Menor calificación: " + calf[1];
    else
        msg = materia+" | Mayor calificación: "+calf[1]+ ", Menor calificación: " + calf[lon];
    //
    uKoti.alert(msg);
    return;

}

function seekParImpar(){
    var n, i = 0, p = 0, divisores = '';
    n = uKoti.prompt("Teclea un número entero positivo", "p,n", true); if (n == null) return false;
    for (var x = 1;x <= n;x++ ){
        if ( (n % x) == 0 ) {
            p += 1;
            divisores += ( n + " / ( " + x + " )\n"  );
        }
        else
            i += 1;
    }
    uKoti.alert(divisores + "Cantidad de divisores pares: <strong>" + p + "</strong> \n Cantidad de divisores impares: <strong>" + i + "</strong> \n Número: \"<strong>" + n  + "</strong>\"");
    return;
}

function yearsMonthsWeeks(){
    var dias, a = 0, m = 0, s = 0;
    dias = uKoti.prompt("Indroduce un numero determinado de días:", "p,n", true); if (dias == null) return false;
    while (dias >= 365){
        dias  -= 365;
        a += 1;
    }
    while (dias >= 31){
        dias -= 31;
        m += 1;
    }
    while (dias >= 7){
        dias -= 7;
        s += 1;
    }
    uKoti.alert ("Años: " + a + "\n Meses: " + m + "\n Semanas: " + s + "\n Días: " + dias);
    return;
}

function yearsOld (){
    var d, m, a, edad, continuar = true;
    var c_d = 13, c_m = 12, c_a = 2015;
    d = uKoti.prompt("Introduce tu día de nacimiento:", "p,n", true); if (d == null) return false;
    m = uKoti.prompt("Introduce tu mes de nacimiento, indicado el numero del mes:", "p,n", true); if (m == null) return false;
    a = uKoti.prompt("Introduce tu año de nacimiento: ", "p,n", true);
    if ( a > c_a ) {
        uKoti.alert("¡Espera un momento! Aún no has nacido, imbécil.");
        return false;
    }
    edad = c_a - a;
    if (c_m <= m) {
        if ( c_d < a) edad -= 1;
    }
    uKoti.alert("Tu edad actual es: <strong>" + edad + "</strong> años de edad.");
    return;
}

function multip(){
    var n, multiplo;
    n = 0;
    multiplo = 1;
    while (n < 1 || n > 10) {
        n = prompt("Ingresa un numero en el rango del 1 al 10:"); if (n == null) return false;
        n = parseInt(n);
    }
    while ( n > 0 ) {
        alert(n + " x " + multiplo + " = " + ( n * multiplo) );
        multiplo += 1;
        if ( multiplo > 10 ) {
            multiplo = 1;
            n -= 1;
        }
    }
    return;
}

function numerosprimos() {
    var n = 1, x, y;
    while (n > 0 && n <= 100) {
        y = 0;
        x = 1;
        while (x <= n) {
            if ( (n % x)  == 0 )
                y += 1;
            x += 1;
        }
        if (y == 2) {
            alert (n);
        }
        n += 1;
    }
    console.log (x);
}

function countandsum(){
    var x, y, z;
    x = 1;
    y = 0;
    z = uKoti.prompt("Introduce o teclea un numero entero:", "p,n", true); if (z== null) return false;
    while (x <= z)
    {
        alert(x);
        y = y + x;
        x += 1;
    }
    uKoti.alert("Sumatoria total de <strong>" + z + "</strong>: <strong style='text-decoration:underline;' ><em>" + y + "</em></strong>");
}


function setNotes(materia, lon){
    var msg, calf = {}, cardinalsN = { 1: "primera", 2: "segunda", 3: "tercera", 4: "cuarta", 5: "quinta" };
    for ( var i = 1; i <= lon; ++i )
    {
        msg = (typeof (cardinalsN[i]) == "undefined" || typeof (cardinalsN[i]) == "null" || !cardinalsN[i]) ? "unidad " + i : cardinalsN[i]+" unidad ";
        calf[i] = uKoti.prompt("Introduce la calificación para la "+msg+" de " +materia+ ".", "p,n", true); if (calf[i] == null) return false;
    }
    return calf;
}