//  右上角公共弹窗
$(function(){
    var alertDiv = "<div class='sub-alert-modal'>"+
                        "<div class='arrow-top'></div>"+
                        "<div class='sub-alert-con'>"+
                            "<a href='javascrpt'>下载PDF</a>"+
                            "<a href='javascrpt'>退出</a>"+
                        "</div>"+
                    "</div>";

    $(".sub-alert").click(function(){
        if($(this).hasClass("show")){
            $(this).removeClass("show");
            $('.sub-alert-modal').remove();
        }else{
            $('body').append(alertDiv);
            $(this).addClass("show");
        }        
    });
});