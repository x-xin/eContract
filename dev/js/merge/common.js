// 判断是否为IOS
var isIOS       =    navigator.userAgent.match('iPad')|| navigator.userAgent.match('iPhone')|| navigator.userAgent.match('iPod') ,
    displayMess =    function(){

        if(!isIOS && document.getElementById('isios')){
            document.getElementById('isios').style.display = "block";
        }
        
    };