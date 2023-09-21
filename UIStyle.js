let body = document.querySelector("body")


let selects = document.querySelectorAll("select")

let options = {
    'background' : '' ,
    'color' : '',
    'style' : ''
}


selects.forEach(select => {
    select.addEventListener("change", (event) => {
        let className = event.target.className
        let value = event.target.value

        if(className.includes('background-input'))options.background = value
        else if(className.includes('color-input'))options.color = value
        else if(className.includes('style-input'))options.style = value

        updateUIStyle()
    })
});

function updateUIStyle() {

    if (options.background.length) body.style.background = options.background
    else body.style.background = 'transparent'

    if (options.color.length) body.style.color = options.color
    else body.style.color = '#000'

    if (options.style.length) {
        // Initialisation
        body.style.fontStyle = 'normal'
        body.style.fontWeight = 'normal'
        body.style.textDecoration = 'normal'
        body.style.textTransform = 'normal'

        switch (options.style) {
            case 'normal':
               body.style.fontWeight = options.style
                break;
            case 'bold':
               body.style.fontWeight = options.style
                break;
            case 'italic':
               body.style.fontStyle = options.style
                break;
            case 'underline':
               body.style.textDecoration = options.style
                break;
            case 'line-through':
               body.style.textDecoration = options.style
                break;
            case 'uppercase':
               body.style.textTransform = options.style
                break;
        }
    }
}