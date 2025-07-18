/**
 * @file
 * FOSSEE Theme JavaScript functionality.
 */

(function ($, Drupal) {
    'use strict';
  
    /**
     * Initialize FOSSEE theme behaviors.
     */
    Drupal.behaviors.fosseeTheme = {
      attach: function (context, settings) {
        
        // Initialize activity tabs
        initActivityTabs(context);
        
        // Initialize hero slider
        initHeroSlider(context);
        
        // Initialize responsive navigation
        initResponsiveNav(context);
        
        // Initialize scroll effects
        initScrollEffects(context);
        
        // Initialize color customization
        initColorCustomization(context);
      }
    };
  
    /**
     * Initialize activity section tabs.
     */
    function initActivityTabs(context) {
      $('.activity-tab-header', context).once('activity-tabs').click(function() {
        var $tab = $(this).closest('.activity-tab');
        var $allTabs = $tab.siblings('.activity-tab').addBack();
        
        // Remove active class from all tabs
        $allTabs.removeClass('active');
        
        // Add active class to clicked tab
        $tab.addClass('active');
        
        // Hide all tab contents
        $allTabs.find('.activity-tab-content').slideUp(300);
        
        // Show clicked tab content
        $tab.find('.activity-tab-content').slideDown(300);
      });
      
      // Activate first tab by default
      $('.activity-tab', context).first().addClass('active');
      $('.activity-tab.active .activity-tab-content', context).show();
    }
  
    /**
     * Initialize hero slider functionality.
     */
    function initHeroSlider(context) {
      var $slider = $('.hero-slider', context);
      
      if ($slider.length && $slider.children().length > 1) {
        $slider.once('hero-slider').each(function() {
          var $this = $(this);
          var slides = $this.children();
          var currentSlide = 0;
          var slideCount = slides.length;
          
          // Hide all slides except first
          slides.hide().first().show();
          
          // Create navigation dots
          var $dots = $('<div class="slider-dots"></div>');
          for (var i = 0; i < slideCount; i++) {
            $dots.append('<span class="dot" data-slide="' + i + '"></span>');
          }
          $this.append($dots);
          
          // Update active dot
          function updateDots() {
            $dots.find('.dot').removeClass('active').eq(currentSlide).addClass('active');
          }
          updateDots();
          
          // Dot click handler
          $dots.on('click', '.dot', function() {
            var targetSlide = $(this).data('slide');
            if (targetSlide !== currentSlide) {
              slides.eq(currentSlide).fadeOut(300);
              slides.eq(targetSlide).fadeIn(300);
              currentSlide = targetSlide;
              updateDots();
            }
          });
          
          // Auto-advance slides
          setInterval(function() {
            var nextSlide = (currentSlide + 1) % slideCount;
            slides.eq(currentSlide).fadeOut(300);
            slides.eq(nextSlide).fadeIn(300);
            currentSlide = nextSlide;
            updateDots();
          }, 5000);
        });
      }
    }
  
    /**
     * Initialize responsive navigation.
     */
    function initResponsiveNav(context) {
      var $nav = $('.navigation-section', context);
      
      // Create mobile menu toggle
      if (!$nav.find('.mobile-menu-toggle').length) {
        $nav.prepend('<button class="mobile-menu-toggle" aria-label="Toggle navigation"><span></span><span></span><span></span></button>');
      }
      
      $('.mobile-menu-toggle', context).once('mobile-nav').on('click', function() {
        $(this).toggleClass('active');
        $nav.find('.navbar-nav').slideToggle(300);
      });
      
      // Close mobile menu when window is resized
      $(window).resize(function() {
        if ($(window).width() > 768) {
          $nav.find('.navbar-nav').show();
          $('.mobile-menu-toggle').removeClass('active');
        } else {
          if (!$('.mobile-menu-toggle').hasClass('active')) {
            $nav.find('.navbar-nav').hide();
          }
        }
      });
    }
  
    /**
     * Initialize scroll effects.
     */
    function initScrollEffects(context) {
      $(window).once('scroll-effects').scroll(function() {
        var scrollTop = $(this).scrollTop();
        
        // Add sticky class to header
        if (scrollTop > 100) {
          $('.header-section').addClass('sticky');
        } else {
          $('.header-section').removeClass('sticky');
        }
        
        // Parallax effect for hero section
        $('.hero-section').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
        
        // Fade in animations for sections
        $('.activity-section, .features-section').each(function() {
          var $this = $(this);
          var elementTop = $this.offset().top;
          var windowBottom = $(window).scrollTop() + $(window).height();
          
          if (elementTop < windowBottom - 100) {
            $this.addClass('fade-in');
          }
        });
      });
    }
  
    /**
     * Initialize color customization.
     */
    function initColorCustomization(context) {
      // Apply custom primary color from theme settings
      if (drupalSettings.fosseeTheme && drupalSettings.fosseeTheme.primaryColor) {
        $(':root').css('--primary-color', drupalSettings.fosseeTheme.primaryColor);
      }
    }
  
    /**
     * Initialize smooth scrolling for anchor links.
     */
    function initSmoothScrolling(context) {
      $('a[href^="#"]', context).once('smooth-scroll').click(function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
          e.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 100
          }, 800);
        }
      });
    }
})
