;(function($) {

    $.fn.rescalendar = function( options ) {

        function alert_error( error_message ){

            return [
                '<div class="error_wrapper">',

                      '<div class="thumbnail_image vertical-center">',
                      
                        '<p>',
                            '<span class="error">',
                                error_message,
                            '</span>',
                        '</p>',
                      '</div>',

                    '</div>'
            ].join('');
        
        }

        /*
        function update_data_filename(targetObj, filename){
            targetObj.find('input[type=file]').attr('data-filename', filename);        
        }

        function show_clear_button( targetObj ){
            targetObj.find('a.clear_image').show();
        }

        function hide_clear_button( targetObj ){
            targetObj.find('a.clear_image').hide();
        }

        function clear_image( targetObj ){

            targetObj.find('div.thumbnail_image img').attr('src', '');
            
            update_data_filename( targetObj, '');
            hide_clear_button( targetObj);
            clear_message( targetObj );

        }
        */

        function set_template( targetObj, settings ){
            
            var template = '',
                id = targetObj.attr('id') || '';

            if( 
                settings.url_upload == '' || 
                id == '' 
            ){

                targetObj.html( alert_error( lang.init_error ) );
                return false;
            
            }

            if( settings.src.length > 4 && settings.src.indexOf('//') > -1 ){
                settings.src = settings.src;
            }

            template = settings.template_html( targetObj, settings );

            targetObj.html( template );

            return true;

        };

        function setDayCells( targetObj, settings ){

            var html = settings.refDate + 'eee';

            targetObj.find('#rescalendar_day_cells').html( html );

        }

        // INITIALIZATION
        var settings = $.extend({
            id           : 'rescalendar',
            refDate      : '',
            url_spinner  : 'img/spinner.gif',
            url_upload   : 'upload.php',
            src: '',
            field_name : 'upl',
            data: {},
            lang: {
                'click_to_upload'   : '<i class="fa fa-upload"></i> Click to upload a file',
                'init_error'        : 'Error when initializing plugin',
                'upload_file_error' : '<i class="fa fa-times-circle"></i> Error when uploading file: ',
                'network_error'     : '<i class="fa fa-times-circle"></i> Error when connecting to server',
                'upload_success'    : '<i class="fa fa-check-circle"></i> File uploaded successfully',
                'upload_processing' : 'Processing file...',
                'upload_error'      : '<i class="fa fa-times-circle"></i> Error when uploading'
            },
            border_width: 10,
            border_color: '#000000',
            button_color: '#ff0000',
            background_color: 'transparent',

            template_html: function( targetObj, settings ){

                var id      = targetObj.attr('id'),
                    refDate = settings.refDate || '06/03/2019';

                return [

                    '<div class="rescalendar ' , id , '_wrapper">',

                        '<div class="rescalendar_controls">',
                            '<button id="move_to_last_month"> << </button>',
                            '<button id="move_to_yesterday"> < </button>',

                            '<input id="refDate" type="text" value="' + refDate + '" />',
                            
                            '<button id="move_to_tomorrow"> > </button>',
                            '<button id="move_to_next_month"> >> </button>',
                        '</div>',

                        '<div id="rescalendar_day_cells">',
                            '<p>day cellsssss</p>',
                        '</div>',

                    '</div>',

                ].join('');

            }

        }, options);


        var lang = settings.lang;

        return this.each( function() {
            
            var targetObj = $(this);

            set_template( targetObj, settings);

            setDayCells( targetObj, settings );

            /*
            var objInputFile     = targetObj.find('input[type="file"]'),
                link_clear_image = targetObj.find('a.clear_image');

            objInputFile.on('change', function(e){ 

                e.preventDefault();

                var file = URL.createObjectURL( objInputFile.get(0).files[0] );

                run_file_upload( targetObj, file, settings );

            });

            link_clear_image.on('click', function(e){ 
                
                e.preventDefault();

                clear_image( targetObj );

            });
            */

            return this;

        });


        

    } // end plugin


}(jQuery));