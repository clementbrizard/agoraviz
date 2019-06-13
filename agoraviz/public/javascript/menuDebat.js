function showHideContrib() {
    var x = document.getElementById("lContrib");
    if (x.style.display == 'none')
    {
        x.style.display = 'block';
    }else
    {
        x.style.display = 'none';
    }
}

function showHideSynth() {
    var x = document.getElementById("lSynth");
    if (x.style.display == 'none')
    {
        x.style.display = 'block';
    }else
    {
        x.style.display = 'none';
    }
}

function showHideSour() {
    var tab;
    var x = document.getElementById("tabSour");    
    if(x.style.display == "none")
    {
        x.style.display = "block";        
        for (var i = 0; i < tab.length; i++)
        {
              
        }
    }else
    {
        x.style.display = "none";
    }
}