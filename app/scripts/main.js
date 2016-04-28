$(document).ready(function() {
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
