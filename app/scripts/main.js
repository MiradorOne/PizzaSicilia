$(document).ready(function () {

  $('.substruct').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 0 : count;
    $input.val(count);
    $input.change();
    return false;
  });

  $('.add').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});


//Counter
$(function () {

  var totalPrice = 0;
  var totalPriceWithDiscount = 0;
  var totalDiscount = 0;
  var globalDiscountPercent = 0;
  var globalQuantity = 0;
  var bucket = [
    {
      id: 0,
      content: 'Shaurma',
      discountPercent: 0,
      price: 48
    },
    {
      id: 1,
      content: 'Pizza Vegetarienne',
      discountPercent: 15,
      oldPrice: 90,
      price: 72
    },
    {
      id: 2,
      content: 'Salade Cezar',
      discountPercent: 0,
      price: 48
    }
  ];

  var temp = [];

  function findDishPriceById(dishId) {
    for (var i = 0; i < bucket.length; i++) {
      if (dishId === bucket[i].id) {
        return bucket[i].price;
      }
    }
  }

  function findDishDiscountById(dishId) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i].id === dishId) {
        return bucket[i].discountPercent;
      }
    }
  }

  function countTotalPrice(dishPrice) {
    totalPrice = totalPrice + dishPrice;
    totalPriceWithDiscount = totalPrice;
    return totalPrice;
  }

  function dishQuantity() {
    // globalQuantity += +temp.count;
    return +temp.count;
  }

  function countDiscount(dishId) {
    var currentValue;
    var discountPercent = findDishDiscountById(dishId);
    if (globalDiscountPercent > 0) {

      var discountPrice = (totalPrice * globalDiscountPercent / 100);
      $('.total-price-with-discount').text(getTotalPriceWithDiscount());
      return (discountPrice).toFixed(1);
    } else if (discountPercent > 0 && globalDiscountPercent === 0) {
      discountPrice = (findDishPriceById(dishId) * discountPercent / 100);
      totalDiscount = discountPrice * dishQuantity();
      return (discountPrice * dishQuantity()).toFixed(1);
    } else {
      currentValue = $('.discount-price').text();
      currentValue = currentValue.split(' ');
      return +currentValue[0];
    }
  }

  function countDishTotalPrice(dishId, dishQuantity) {
    return findDishPriceById(dishId) * dishQuantity;
  }

  function getTotalPriceWithDiscount() {
    console.log(totalDiscount + ' Total Discount from getTotalPriceWithDiscount');
    return totalPrice - totalDiscount;
  }

  function checkPromocode(code) {
    for (var key in promoCode) {
      if (key === code) {
        return true;
      }
    }
  }

  function getPromoCodeDiscount(code) {
    return promoCode[code];
  }

  function usePromoCode(discountPercent) {
    totalPriceWithDiscount = totalPrice;
    return (totalPriceWithDiscount = totalPriceWithDiscount - totalPriceWithDiscount * discountPercent / 100).toFixed(1);
  }

  //Promo codes
  var promoCode = {
    SHAURMA: 10,
    DIMON: 80,
    KIEBAB: 50
  };


  var count = +$('.counter').find('input').val();
  if (count === 0) {
    $('.substruct').css('display', 'none');
  }

  $('.add').on('click', function () {
    var count = +$(this).parent().find('input').val();
    if (count > 0) {
      $(this).parent().find('.substruct').css('display', 'inline-block');
    }

    // console.log(totalPrice);
    var dishId = +$(this).closest('.dishes').attr('data-id');
    var price = findDishPriceById(dishId);
    var multiplyPrice = $(this).parent().parent().find('.dish-multiply-price');
    multiplyPrice.text(countDishTotalPrice(dishId, count));
    //
    temp.id = dishId;
    temp.count = count;
    // console.log(temp);
    //
    //Total price
    dishQuantity();
    countTotalPrice(price);
    $('.total-price').text(totalPrice);
    //  Discount
    $('.discount-price').text(countDiscount(dishId));

    //  Total price with discount
    $('.total-price-with-discount').text(getTotalPriceWithDiscount());

  });
  $('.substruct').on('click', function () {
    var count = +$(this).parent().find('input').val();
    if (count < 1) {
      $(this).parent().find('.substruct').css('display', 'none');
    }


    var dishId = +$(this).closest('.dishes').attr('data-id');
    var price = findDishPriceById(dishId);
    var multiplyPrice = $(this).parent().parent().find('.dish-multiply-price');
    multiplyPrice.text(countDishTotalPrice(dishId, count));

    //
    temp.id = dishId;
    temp.count = count;
    console.log(temp);
    //
    //Total price
    dishQuantity();
    countTotalPrice(-price);
    $('.total-price').text(totalPrice);
    // //  Discount
    $('.discount-price').text(countDiscount(dishId));
    //  Total price with discount
    $('.total-price-with-discount').text(getTotalPriceWithDiscount());
  });

  //Makes promo code input visible
  $('.promo-code').on('click', function () {
    $(this).children('span').text('');
    $(this).children('input').css('display', 'inline-block');
    $('input[name=send-promo-code]').css('visibility', 'visible');
  });


  $('input[name=send-promo-code]').on('click', function () {
    var code = $('.promo-code').children('input').val();
    var valid = false;
    if (checkPromocode(code) === true) {
      totalPriceWithDiscount = usePromoCode(getPromoCodeDiscount(code));
      $('.total-price-with-discount').text(totalPriceWithDiscount);
      globalDiscountPercent = getPromoCodeDiscount(code);
      totalDiscount = (totalPrice - totalPriceWithDiscount).toFixed(1);
      $('.discount-price').text(totalDiscount);
      valid = true;
    }
    else if (!valid) {
      $('.promo-code').children('input').val('Your promo code is invalid');
    }
  });
});
