$(document).ready(function() {	
    $('[data-csvBtn]').on("click", function(e) {
        if ($('[data-csvBtn]').hasClass('btn-secondary')) {
            $('[data-csvBtn]').attr('class', 'btn btn-primary')
            if ($('[data-manualBtn]').hasClass('btn-primary')) {
                $('[data-manualBtn]').attr('class', 'btn btn-secondary')
                $('[data-manualContent]').hide()
            }   
            $('[data-csvContent]').show()     
        } else {
            $('[data-csvContent]').hide()
            $('[data-csvBtn]').attr('class', 'btn btn-secondary');
        }
    });
    $('[data-manualBtn]').on("click", function(e) {
        if ($('[data-manualBtn]').hasClass('btn-secondary')) {
            $('[data-manualBtn]').attr('class', 'btn btn-primary');
            if ($('[data-csvBtn]').hasClass('btn-primary')) {
                $('[data-csvBtn]').attr('class', 'btn btn-secondary');
                $('[data-csvContent]').hide()
            }
            $('[data-manualContent]').show()
        } else {
            $('[data-manualContent]').hide()
            $('[data-manualBtn]').attr('class', 'btn btn-secondary')
        }
    });
    
});