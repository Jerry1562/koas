
    var button1=document.getElementById('1');
    var titel=document.getElementById('2');
    button1.onclick=function(){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status >= 200&&xhr.status<300)||xhr.status==304){
                    titel.firstChild.nodeValue=xhr.responseText;
                }else{
                    console.log(`unsuccessful:${xhr.status}`);
                }
            }
        }
        xhr.open("get","http://127.0.0.1:8080/re",true);
        xhr.send(null);
    };