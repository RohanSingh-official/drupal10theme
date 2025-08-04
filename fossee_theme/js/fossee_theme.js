(function ($, Drupal) {
  'use strict';
  
  Drupal.behaviors.fosseeTheme = {
    attach: function (context, settings) {
      // Activity cards click functionality
      $('.activity-card', context).once('activity-cards').click(function() {
        var cardText = $(this).text();
        console.log('Clicked on activity: ' + cardText);
        
        // Add visual feedback
        $(this).addClass('clicked');
        setTimeout(function() {
          $('.activity-card').removeClass('clicked');
        }, 200);
      });
      
      // Social media links functionality
      $('.social-icon', context).once('social-icons').click(function(e) {
        e.preventDefault();
        var platform = $(this).attr('class').split(' ')[1];
        console.log('Clicked on social media: ' + platform);
      });
    }
  };
  
})(jQuery, Drupal);
