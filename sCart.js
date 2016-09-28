//////method to tgl scart: tglCart();
///$('.sCartSection').load('/fixitquick/incl/ajax_scart.php');
///// SHOPPING CART ///////// SHOPPING CART ////
$('button[name="checkout"]').click(function(){
    $('#myModal2 .modal-content').css({
        'max-height':'500px',
        'min-height':'250px',
        'min-width':'60%'
    })////END css	
    
    chkout();
	//$('#myModal2').fadeOut('fast');
})
//////////////////////////////////////
function delFrmCart(trRowCnt,itemPrice,item_id,scart_id){
    var totalPrice = document.getElementById('sCartTotal').innerHTML;
    var totalPriceElm =  document.getElementById('sCartTotal');
    var shippingPriceElm = $('#sCartShippingTr td:last-child p strong');
    var shippingPrice = $('#sCartShippingTr td:last-child p strong').html();
    
    console.info(trRowCnt+'-price:'+itemPrice+'-item_id:'+item_id);
    
     ///calculate new total - del_item and pull scart via ajax
    $.post('/fixitquick/incl/ajax_process.php',{
        delFromCart:true,
        item_id:item_id,
        id:scart_id
    },function(ok){
        if($.trim(ok) == 'ok'){
            $('.sCartSection').load('/fixitquick/incl/ajax_scart.php');
            refreshScartIconCntNumber();
        }///END if
    })
}////END funk
//////////////////////////////////////
function chkout(){
    var totalPrice = document.getElementById('sCartTotal').innerHTML;
    var totalPriceElm =  document.getElementById('sCartTotal');
    var shippingPriceElm = $('#sCartShippingTr td:last-child p strong');
    var shippingPrice = $('#sCartShippingTr td:last-child p strong').html();

    ////route to next payment process view
    
    console.log(' price: '+totalPrice);
    
    $('#sCartTbl tbody:nth-of-type(1)').fadeOut('fast',function(){
        $('#sCartTbl tbody:nth-of-type(2)').fadeIn('fast');
        $('#myModal2 .modal-content').css('min-height',$('#sCartTbl tbody:nth-of-type(2)').height());
    })
    
    $('.sCartBackBtn').click(function(){
        $('#sCartTbl tbody:nth-of-type(2)').fadeOut('fast',function(){
            $('#sCartTbl tbody:nth-of-type(1)').fadeIn('fast');
            $('#myModal2 .modal-content').css('min-height',$('.sCartSection').innerHeight());
        })
    })
}////END funk
//////////////////////////////////////
document.getElementById('new_card').onclick = (function(){
    $(this).addClass('active')
    $('#select_card').removeClass('active');
    $('.addNewCard').show(0);
    $('.selectStoredCard').hide(0);
})
document.getElementById('select_card').onclick = (function(){
    $(this).addClass('active')
    $('#new_card').removeClass('active');
    $('.selectStoredCard').show(0);
    $('.addNewCard').hide(0);
})

$(".cc_paymen_select_ul li > button").on('click',function(){
     cc_type = this.name;
     cc_type_full = $(this).children('i').attr('title').toUpperCase();
    
    $(".card_sel").html(cc_type_full);
    $(".card_sel").addClass('fade in');
    
    $.each($(".cc_paymen_select_ul li > button"),function(){
        if(this.name == cc_type){
            $(this).addClass('active');
        }else{
            $(this).removeClass('active');
        }//END ifelse
    })///END 4each
    
    $.each($(".addNewCard input"),function(){
        if($(this).attr('disabled')){
            $(this).removeAttr('disabled');
        }//END if
        $('#payment_cc_owner').focus();
    })///END 4each
    
    ///process new card info via ajax 
    $(".addNewCard form input").on('input',function(){
         var int_input_name = ['cc_num1','cc_num2','csv_code'];

         cc_owner = document.getElementById('payment_cc_owner').value;
         cc_num = document.getElementById('payment_cc_num1').value;
         cc_csv = document.getElementById('cc_security_code').value;
         cc_exp = document.getElementById('payment_exp_d8').value;
        
        ///permit only #'s in # input fields
        if(this.hasAttribute('name')){
            if($.inArray($.trim($(this).attr('name')),int_input_name) >= 0){
                ///[^0-9]+/g.test(this.value)
                if(this.value.match(/[^0-9]+/g)
                && !this.value.match(/-/g)){
                    this.value = '';
                }else{
                    if(this.value.length > 3 && this.value.length < 5 
                    || this.value.length > 8 && this.value.length < 10
                    || this.value.length > 13 && this.value.length < 15){
                        this.value += '-';
                    }///END if
                }///END if
            }///END fn
        }///END fn
        
        if($(".addNewCard form input").hasClass('error')){
            
            console.warn('Yo chk input field: ',this.name);
            $("#scartPlaceOrderBtn").attr('disabled','');
            
        }else{
            if($.trim(cc_owner) 
            && $.trim(cc_num) 
            && $.trim(cc_csv) 
            && $.trim(cc_exp)){
                $("#scartPlaceOrderBtn").removeAttr('disabled');
            }///END if
        }///END if                
    })    
})///END cc_type btn onclick fn

///ONCLICK OF CHECKOUT BTN PROCESS...
$("#scartPlaceOrderBtn").click(function(){
    
    $.post('/fixitquick/incl/ajax_process.php',{
        new_cc:true,
        cc_owner:cc_owner,
        cc_num:cc_num,
        cc_csv:cc_csv,
        cc_exp:cc_exp,
        cc_type:cc_type
    },function(confirm){
        if($.trim(confirm) == 'ok'){
            popUpMsg('Order Successfully Placed');
        }else if($.trim(confirm) == 'dup'){
            popUpMsg('Card already on file');
        }///END ifelse
    })
    $('#scart_modal').fadeOut('fast');
})

////SET CC TO DEFAULT CC
function setCC2Dflt(cc_id){
    cc_id = $.trim(cc_id);
    
    $.post('/fixitquick/incl/ajax_process.php',{
        default_cc:true,
        cc_id:cc_id
    },function(confirm){
        alert(confirm);
    })
}///END fn

///FORM VALIDATE
$(".addNewCard form").validate({
    rules:{
        cc_owner:{
            required:true
        },
        cc_num1:{
            required:true,
            minlength:19
        },
        cc_num2:{
            required:true,
            equalTo:"#payment_cc_num1",
            minlength:19
        },
        exp_d8:{
            required:true
        },
        csv_code:{
            required:true,
            number:true
        }
    },
    messages:{
        cc_num1:{
            minlength:'Must enter entire credit card number'
        },
        cc_num2:{
            equalTo:'Must enter same credit card number as above',
            minlength:'Must enter entire credit card number'
        }
    }
})
//////////////////////////////////////