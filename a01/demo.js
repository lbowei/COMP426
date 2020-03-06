let Timer = function (parent_div_id) {
    this.parent = $("#"+parent_div_id);

    this.display = $("<div>0.00</div>");
    this.startstop = $("<button>Start</button>");
    this.reset = $("<button>Reset</button>");
    this.start_date = null;
    this.elapsed = 0;
    this.interval_timer = null;

    this.update_display = () => {
	let to_display
	let now = new Date();
	if (this.start_date != null) {
	    to_display = this.elapsed + 
		now.getTime() - 
		this.start_date.getTime();
	} else {
	    to_display = this.elapsed;
	}
	this.display.text(to_display.toString());
    }
    
    let controls = $("<div></div>").append(this.startstop).append(" ").append(this.reset);

    this.startstop.click(() => {
	let now = new Date();
	if (this.start_date == null) {
	    this.start_date = now;
	    this.startstop.text("Stop");
	    
	    this.interval_timer = setInterval(this.update_display, 200);
	    
	} else {
	    clearInterval(this.interval_timer);
	    this.elapsed += now.getTime() - this.start_date.getTime();
	    this.start_date = null;
	    this.startstop.text("Start");
	    this.update_display();
	}
    });

    this.reset.click(() => {
	if (this.start_date != null) {
	    this.start_date = new Date();
	}
	this.elapsed = 0;
	this.update_display();
    });

    this.parent.empty().append(this.display).append(controls);
}

    