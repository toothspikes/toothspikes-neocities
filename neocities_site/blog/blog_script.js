document.addEventListener('DOMContentLoaded', () => {
    try {
	    const buttons = document.getElementsByClassName('navButton');
    
Array.from(buttons).forEach(button => {
    button.addEventListener('click', function() {
	    console.log('Button clicked:', this);
		const target = this.dataset.target; //active class
        console.log('Target:', target);
    
        //remove active class for all buttons
        Array.from(buttons).forEach(button1 => {
    	    button1.classList.remove('active');
        });
    
        this.classList.add('active'); //make button clicked active
    
        const pages = ['studyBook', 'portfolio', 'diary', 'resources'];
        //for each page, change the display to none, then change the target display to block
        pages.forEach(page => {
    	    const pageElement = document.getElementById(page);
    	    if(pageElement){
    		    pageElement.style.display = 'none';
    	    }
             else {
	             console.warn(`Page element not found: ${page}`);
                }
            });
    
            const targetElement = document.getElementById(target);
            if(targetElement) {
    	         targetElement.style.display = 'block';
            }
            else {
    	        console.warn(`Target element not found: ${target}`);
            }
        });
   	});
    } catch (error) {
    	console.error('Error in script: ', error);
    }
});