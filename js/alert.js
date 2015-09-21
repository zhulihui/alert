var ALERT={};
ALERT = {
        loadResource : function(){
                    var cssUrl = '<link type="text/css" rel="stylesheet" href="css/alert.css" id="alert-css">';    //插入css
                    if ($(document).find("#alert-css").length == 0) {
                        $(document).find("head").append(cssUrl);
                    }
                    var htmlTpl = '<div id=common-alert-box ><div class=common-alert-box-header><button type=button class=common-alert-box-close>x</button></div><div class=common-alert-box-content><div class="ts-tips "></div><p class=common-alert-box-custom-words></p></div><button type=button value="确定" class=common-alert-box-sure-dialog>确 定</button></div>';
                    if ($(document).find("#common-alert-box").length == 0) {   //插入弹框的html
                        $(document).find("body").append(htmlTpl);
                    }
                    var maskHtml = '<div id="mask-layer"></div>';     //插入遮罩背景的灰层
                    if ($(document).find("#mask-layer").length == 0) {
                        $(document).find("body").append(maskHtml);
                    }         
        },
        hide:function(){
               $(document).find("#common-alert-box").hide();
               $(document).find("#mask-layer").hide();
        },
        show:function(word,status,callbackFun){
                if(status =="success"){
                    $("#common-alert-box").find(".ts-tips").addClass("success-tips");
                }else if(status ==2){
                    $("#common-alert-box").find(".ts-tips").addClass("error-tips");    
                }else if(status == 3){
                    $("#common-alert-box").find(".ts-tips").addClass("warn-tips");    
                }else{
                    $("#common-alert-box").find(".ts-tips").addClass("success-tips");
                }
                $(document).find("#common-alert-box").show().find(".common-alert-box-custom-words").html(word);
                $(document).find("#common-alert-box").css("margin-top",-$("#common-alert-box").height()/2)
                $(document).find("#mask-layer").show();  

                $(document).find("#common-alert-box .common-alert-box-sure-dialog").on("click",function(){
                        if(typeof(callbackFun) == "function"){
                            callbackFun();    
                        }   
                        ALERT.hide(); 
                });          
        },
        init:function(){
                ALERT.loadResource();  //载入相关的资源
                // 绑定取消按钮
                $(document).find("#common-alert-box .common-alert-box-close").on("click", function () {
                    ALERT.hide();
                });
                // 覆盖window.alert
                window.alert = ALERT.show;
        }    
}
ALERT.init();
