window.onload=function(){
    window.onresize=function(){
        if (resizeTimer) {
            clearTimeout(resizeTimer)
        }
        var resizeTimer = setTimeout(function(){
            waterfall("main","box");
        }, 400);
    }     
    waterfall("main","box");
    var dataint={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"}]};
    window.onscroll=function(){
        if(checkScrollslide("main","box")){
             var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataint.data.length;i++){
                var obox=document.createElement('div'); //添加 元素节点
                obox.className='box';                   //添加 类名 name属性
                oParent.appendChild(obox);              //添加 子节点
                var opic=document.createElement('div');
                opic.className='pic';
                obox.appendChild(opic);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataint.data[i].src;
                opic.appendChild(oImg);
                var oboxs=getByclass(oParent,"box");
                console.log(oboxs.length);
            }
            waterfall('main','box'); 
        }
    }
}
function waterfall(parent,box){
    var oparent=document.getElementById(parent);
    var oboxs=getByclass(oparent,box);
    var oboxw=oboxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oboxw);
    oparent.style.cssText='width:'+oboxw*cols+'px;margin:0 auto;';
    var hArr=[];
    for(var i=0; i<oboxs.length;i++){
        if (i<cols) {
            hArr.push(oboxs[i].offsetHeight);
            oboxs[i].style.position="";
        }
        else{
            var minh=Math.min.apply(null,hArr);
            var index=getminhindex(hArr,minh);
            oboxs[i].style.position="absolute";
            oboxs[i].style.top=minh+"px";
            oboxs[i].style.left=oboxw*index+"px";
            hArr[index]+=oboxs[i].offsetHeight;
        }
    }
}


function getByclass(parent,cls){
    var boxArr=new Array(),
        oElements=parent.getElementsByTagName('*');
        for (var i = 0;i<oElements.length;i++) {
            if (oElements[i].className==cls) {
                boxArr.push(oElements[i]);
            }
            }
            return boxArr;
        }
function getminhindex(hArr,minh){
    for(var i in hArr){
        if (hArr[i]==minh) {
            return i;
        }
    }
}

//检测是否具备加载数据块的条件
function checkScrollslide(parent,box){
    var oparent=document.getElementById(parent);
    var oboxs=getByclass(oparent,box);
    var minboxh=oboxs[oboxs.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var height=document.documentElement.clientHeight || document.body.clientHeight;
    return (minboxh<scrollTop+height) ? true:false;
}