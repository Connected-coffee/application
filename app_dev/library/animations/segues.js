$('#segues').on('click', '[data-segue]', function() 
{
    var segue = $(this).attr('data-segue');
    var $leave = $('[id=segues] .segue-active');
    var $come = $('[id=segues] [id='+ segue +']');

    if ($leave.hasClass('segue-left') && $come.hasClass('segue-left')) {
        $leave.removeClass('segue-left').addClass('segue-right');
    }

    if ($leave.hasClass('segue-right') && $come.hasClass('segue-right')) {
        $leave.removeClass('segue-right').addClass('segue-left');
    }

    $leave.removeClass('segue-active');
    $come.addClass('segue-active');
});

/** SWIPE BACK **/
// $('[id=segues] .segue-right.segue-active').hammer().
//     on('swiperight', function () 
// {
//     console.log('swipe');
    
//     var $come = $(this).children('.header-bar .ion-ios7-arrow-back').parent();
//     var $leave = $('[id=segues] .segue-active');

//     if ($leave.hasClass('segue-left') && $come.hasClass('segue-left')) {
//         $leave.removeClass('segue-left').addClass('segue-right');
//     }

//     if ($leave.hasClass('segue-right') && $come.hasClass('segue-right')) {
//         $leave.removeClass('segue-right').addClass('segue-left');
//     }

//     $leave.removeClass('segue-active');
//     $come.addClass('segue-active');
// });