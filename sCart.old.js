//////method to tgl scart: tglCart();
///// SHOPPING CART ///////// SHOPPING CART ////
///// SHOPPING CART ///////// SHOPPING CART ////
$('select[id="itemQty"]').on('change click mouseout',function(){
    var itemCntr = this.getAttribute('item_cntr');
    var totalPriceElm =  document.getElementById('sCartTotal');
    var totalPrice =  document.getElementById('sCartTotal').innerHTML;
    var thisPriceElm = $('#sCartTr'+itemCntr+' #itemPrice');
    var thisNewPrice = $(thisPriceElm).html() * this.value - $(thisPriceElm).html();
    var price = $(this).attr('price') * this.value;
    
    /////upd8 price
    $(this).attr('new-price',$(this).attr('price') * this.value);
    
    $(thisPriceElm).html(price);
    
    generateTotal();
})
$('.scartDelBtn').on('click',function(){
	var trRowCnt = this.value;
    var itemQty = $('#sCartTr'+trRowCnt+' #itemQty').val();
    var itemPrice = this.getAttribute('item-price');
    var itemNewPrice = $('#sCartTr'+trRowCnt+' #itemQty').attr('new-price');
    
 	delFrmCart(trRowCnt,itemPrice,itemNewPrice,itemQty);
    
 })
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
function delFrmCart(trRowCnt,itemPrice,itemNewPrice,itemQty){
    var totalPrice = document.getElementById('sCartTotal').innerHTML;
    var totalPriceElm =  document.getElementById('sCartTotal');
    var shippingPriceElm = $('#sCartShippingTr td:last-child p strong');
    var shippingPrice = $('#sCartShippingTr td:last-child p strong').html();
    
     ///upd8 modal-cntnt height
    $('#sCartTr'+trRowCnt+' #itemQty').removeAttr('id');
    $('#sCartTr'+trRowCnt).slideUp('fast',function(){
        $('#myModal2 .modal-content').css('min-height',$('.sCartSection').innerHeight())////END css  
    });
    
    //upd8 total price
     totalPriceElm.innerHTML = Number(totalPrice) - Number(itemNewPrice);
    
    console.log('cntr: '+trRowCnt+' price: '+itemPrice+' qty: '+itemQty);
    
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
    $('#scartPlaceOrderBtn').click(function(){
        $('#myModal2').fadeOut('fast',function(){
            popUpMsg('Order Successfully Placed');
        })
    })
}////END funk
//////////////////////////////////////
function generateTotal(){
    var total = 0; 
    
    $.each($("select[id='itemQty']"),function(){
        total = Number(this.getAttribute('new-price')) + total;
    })
    
    console.log('total added: '+total);
    
    document.getElementById('sCartTotal').innerHTML = total;
}////END fn
//////////////////////////////////////
var sCart = {
        elm : $('.sCartSection'),
        offset : $('.sCartSection').offset().top,
        total : document.getElementById('sCartTotal').innerHTML,
        shipping : document.getElementById('sCartShipping').innerHTML,
        itemCnt : $('.cartItem').length
   }; 
 