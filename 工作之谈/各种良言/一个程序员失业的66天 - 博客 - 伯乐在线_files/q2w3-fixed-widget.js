function q2w3_sidebar(options) {
	
	if ( !options.widgets) return false;
	
	if ( !options.sidebar) options.sidebar = 'q2w3-default-sidebar'; 
		
	var widgets = new Array();
	
	var window_height = jQuery(window).height();
	var document_height = jQuery(document).height();
		
	function widget(obj, position, offset_top, fixed_margin_top, fixed_margin_bottom, height, next_widgets_height) {
		this.obj = obj;
		this.position = position;
		this.fixed_margin_top = fixed_margin_top;
		this.fixed_margin_bottom = fixed_margin_bottom;
		this.offset_top = offset_top;
		this.height = height;
		this.next_widgets_height = next_widgets_height;
	}
	
	var fixed_margin_top = options.margin_top;
		
	for ( var i = 0; i < options.widgets.length; i++ ) {
		widget_obj = jQuery('#' + options.widgets[i]);
		if ( widget_obj.attr('id') ) { // element exists
			widgets[i] = new widget();
			widgets[i].obj = widget_obj;
			widgets[i].position = widget_obj.css('position');
			widgets[i].offset_top = widget_obj.offset().top;
			widgets[i].fixed_margin_top = fixed_margin_top;
			widgets[i].height = widget_obj.outerHeight(true);
			widgets[i].fixed_margin_bottom = fixed_margin_top + widgets[i].height;
			fixed_margin_top += widgets[i].height;
		} else {
			widgets[i] = false;			
		}
	}
	
	if ( widgets.length < 1 ) return false;
	
	for ( var i = 0; i < widgets.length ; i++ ) { 
		if (widgets[i]) widgets[i].obj.css('position', '');
	}
	
	for ( var i = 0; i < widgets.length ; i++ ) { 
		if (widgets[i]) widgets[i].offset_top = widgets[i].obj.offset().top;
	}
	
	var next_widgets_height = 0;
	
	for ( var i = widgets.length - 1; i >= 0; i-- ) {
		if (widgets[i]) {
			widgets[i].next_widgets_height = next_widgets_height;
			widgets[i].fixed_margin_bottom += next_widgets_height;
			next_widgets_height += widgets[i].height;
			if ( widgets[i].position != widgets[i].obj.css('position') ) widgets[i].obj.css('position', widgets[i].position);
		}
	}
	
	jQuery(window).off('load scroll.' + options.sidebar);
	
	for ( var i = 0; i < widgets.length; i++ ) {
		if (widgets[i]) fixed_widget(widgets[i]);
	}
	
	function fixed_widget(widget) {
		
		var scroll_position_trigger_top = widget.offset_top - widget.fixed_margin_top;
		var scroll_position_trigger_bottom = document_height - options.margin_bottom;
	
		var widget_width = widget.obj.css('width');
		var widget_margin = widget.obj.css('margin');
		var widget_padding = widget.obj.css('padding');
		
		var style_applied_top = false;
		var style_applied_bottom = false;
		var style_applied_normal = false;
		
		jQuery(window).on('scroll.' + options.sidebar, function (event) {
			var scroll = jQuery(this).scrollTop();
			if ( scroll + widget.fixed_margin_bottom >= scroll_position_trigger_bottom ) { // fixed bottom
				if ( !style_applied_bottom ) {
					widget.obj.css('position', 'fixed');
					widget.obj.css('top', '');
					widget.obj.css('width', widget_width);
					widget.obj.css('margin', widget_margin);
					widget.obj.css('padding', widget_padding);
					style_applied_bottom = true;
					style_applied_top = false;
					style_applied_normal = false;
				}
				widget.obj.css('bottom', scroll + window_height + widget.next_widgets_height - scroll_position_trigger_bottom);
			} else if ( scroll >= scroll_position_trigger_top ) { // fixed top
				if ( !style_applied_top ) {
					widget.obj.css('position', 'fixed');
					widget.obj.css('top', widget.fixed_margin_top);
					widget.obj.css('bottom', '');
					widget.obj.css('width', widget_width);
					widget.obj.css('margin', widget_margin);
					widget.obj.css('padding', widget_padding);
					style_applied_top = true;
					style_applied_bottom = false;
					style_applied_normal = false;
				}
			} else { // normal
				if ( !style_applied_normal ) {
					widget.obj.css('position', '');
					widget.obj.css('top', '');
					widget.obj.css('width', '');
					widget.obj.css('margin', '');
					widget.obj.css('padding', '');
					style_applied_normal = true;
					style_applied_top = false;
					style_applied_bottom = false;
				}
			}
		}).trigger('scroll.' + options.sidebar);
		
		jQuery(window).on('resize', function() {
			if ( jQuery(window).width() <= options.screen_max_width ) {
				jQuery(window).off('load scroll.' + options.sidebar);
				widget.obj.css('position', '');
				widget.obj.css('top', '');
				widget.obj.css('width', '');
				widget.obj.css('margin', '');
				widget.obj.css('padding', '');
				style_applied_normal = true;
				style_applied_top = false;
				style_applied_bottom = false;				
			}
		}).trigger('resize');
		
	}	
	
}
