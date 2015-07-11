(function() {

    angular.module("mega-menu", ["ui.bootstrap"]);

    angular.module('mega-menu').config(ExtendDropdownToggleDirective);

	ExtendDropdownToggleDirective.$inject = ['$provide'];

	function ExtendDropdownToggleDirective($provide) {

        $provide.decorator('dropdownToggleDirective', ["$delegate", "$document", function($delegate, $document) {

            var directive = $delegate[0];

            var link = directive.link;

		    directive.compile = function() {
		      return function(scope, element, attrs, dropdownCtrl) {
		  
				  if ( !dropdownCtrl ) {
			        return;
			      }

			      dropdownCtrl.toggleElement = element;

			      var toggleDropdown = function(evt) {
			        evt.preventDefault();
					
					if ( evt && element && element[0].parentElement.contains(evt.target) && dropdownCtrl.isOpen() && attrs.eventToggle == "mouseover" ) {
					   return;
					}

			        if ( !element.hasClass('disabled') && !attrs.disabled ) {
			          scope.$apply(function() {
			            dropdownCtrl.toggle();
			          });
			        }
			      };

				  if(attrs.eventToggle !== "mouseover"){
			      	element.bind('click', toggleDropdown);
			      } else {
			        element.bind('mouseover', toggleDropdown);
			      }

			      // WAI-ARIA
			      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
			      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
			        element.attr('aria-expanded', !!isOpen);
			      });

			      scope.$on('$destroy', function() {
			      	if(attrs.eventToggle !== "mouseover"){
			      		element.unbind('click', toggleDropdown);	
			      	} else {
			        	element.unbind('mouseover', toggleDropdown);
			      	}
			      });
			      
		      };
		    };

            return $delegate;
        }]);

		$provide.decorator('dropdownService', ['$delegate', '$document', '$rootScope', function ($delegate, $document, $rootScope) {
			//var openBackup = $delegate.open;
			//var closeBackup = $delegate.close;

            //override open method
		    $delegate.open = function () {
		      	open.apply($delegate, arguments);
		    };

		    //override close method
		    $delegate.close = function () {
		      	close.apply($delegate, arguments);
		    };


		    var openScope = null;

		    var open = function( dropdownScope ) {

		    	var toggleElement = dropdownScope.getToggleElement();
		    	var eventToggle = toggleElement.attr("event-toggle");

			    if ( !openScope ) {
			      if(eventToggle == 'mouseover'){
			      	$document.bind('mouseover', closeDropdown);
			      } else{	
			      	$document.bind('click', closeDropdown);
			      	$document.bind('keydown', keybindFilter);
			      }
			    }

			    if ( openScope && openScope !== dropdownScope ) {
			      openScope.isOpen = false;
			    }

			    openScope = dropdownScope;
			};

		  	var close = function( dropdownScope ) {
		  		var toggleElement = dropdownScope.getToggleElement();
		    	var eventToggle = toggleElement.attr("event-toggle");

			    if ( openScope === dropdownScope ) {
			      openScope = null;
			      if(eventToggle == 'mouseover'){
			      	$document.unbind('mouseover', closeDropdown);
			      } else{		
			      	$document.unbind('click', closeDropdown);
			      	$document.unbind('keydown', keybindFilter);
			      }
			    }
		  	};

		    var closeDropdown = function( evt ) {
			    // This method may still be called during the same mouse event that
			    // unbound this event handler. So check openScope before proceeding.
			    if (!openScope) { return; }

			    if( evt && openScope.getAutoClose() === 'disabled' )  { return ; }

			    var toggleElement = openScope.getToggleElement();
			    if ( evt && toggleElement && toggleElement[0].parentElement.contains(evt.target) ) {
			      return;
			    }

			    var $element = openScope.getElement();
			    if( evt && openScope.getAutoClose() === 'outsideClick' && $element && $element[0].contains(evt.target) ) {
			      return;
			    }

			    openScope.isOpen = false;

			    if (!$rootScope.$$phase) {
			      openScope.$apply();
			    }
		    };

		    var keybindFilter = function( evt ) {
			    if ( evt.which === 27 ) {
			      openScope.focusToggleElement();
			      closeDropdown();
			    }
			    else if ( openScope.isKeynavEnabled() && /(38|40)/.test(evt.which) && openScope.isOpen ) {
			      evt.preventDefault();
			      evt.stopPropagation();
			      openScope.focusDropdownEntry(evt.which);
			    }
			};

			return $delegate;
		}]);
	}

})();
