// This part is to randomize the site background on site load
const body = document.querySelector('body')
// body.style.backgroundImage = 'url(images/SC-APOD-bg4.webp)'

// This part is to setup the event listener for the bg-image change
const imgBgBtn1 = document.querySelector('.bg-img1')
const imgBgBtn2 = document.querySelector('.bg-img2')
const imgBgBtn3 = document.querySelector('.bg-img3')
const imgBgBtn4 = document.querySelector('.bg-img4')
const imgBgBtn5 = document.querySelector('.bg-img5')

imgBgBtn1.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg1.webp)'
})

imgBgBtn2.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg2.webp)'
})

imgBgBtn3.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg3.webp)'
})

imgBgBtn4.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg4.webp)'
})

imgBgBtn5.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg5.webp)'
})

// This gets the section which will contain the APOD information
const apodParent = document.querySelector('.apod-parent');

// This section is the setup for the click event with which to show the APOD
const getApodBtn = document.querySelectorAll('.get-img-btn');

// This code snippet verified what the date is for each new day
const today = new Date().toISOString().slice(0, 10)

const dateInput = document.querySelector('#date')
dateInput.setAttribute('max', `${today}`)
dateInput.setAttribute('min', `1995-06-16`)

// After selecting all getAPOD Buttons, this part loops through each button and sets up a click event to each button
getApodBtn.forEach( btn => {
    btn.addEventListener('click', () => {
            // Clearing the APOD section upon each click of the get APOD button
            const apodContainer = document.querySelectorAll('.after-click');
            if(apodContainer){
                apodContainer.forEach(e => e.remove());
            }

            const date = document.querySelector('input').value    
        
            const url = `https://api.nasa.gov/planetary/apod?api_key=i8BrM3rSBt87xfcDgMgtsmh0JdSxG00dRbuepZQ2&date=${date}` 
          
            fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)

                //To insert information and Media into the DOM
                // Creating all elements for the APOD information
                const apodBox = document.createElement('div');
                apodBox.classList.add('after-click');

                // H1 element - APOD title
                const h1 = document.createElement('h1');

                // DIV as Media Container
                const mediaContainer = document.createElement('div')
                mediaContainer.classList.add('media');
            
                // APOD Image Element
                const img = document.createElement('img');
                img.classList.add('apod');
                // APOD Video/Animation Element
                const vid = document.createElement('iframe');

                // DIV as Description Container
                const descriptionContainer = document.createElement('div');
                descriptionContainer.classList.add('desc-text-box');

                // H2 element - Explanation
                const h2 = document.createElement('h2');
                // P element - Description Text
                const p = document.createElement('p');
                p.classList.add('desc-text')


                // Appending media to the media container
                mediaContainer.appendChild(img);
                mediaContainer.appendChild(vid);

                // Appending description content to description container
                descriptionContainer.appendChild(h2);
                descriptionContainer.appendChild(p);

                // Appending the h1, media and description containers to the APOD information section
                apodBox.appendChild(h1);
                apodBox.appendChild(mediaContainer);
                apodBox.appendChild(descriptionContainer);

                // Assigning the necessary content to the specific elements
                h1.textContent = data.title;
                
                /* Conditonal for situations where there are different data types which could be images or videos*/
                if(data.media_type === 'image'){
                    vid.classList.add('hidden');  
                    img.classList.remove('hidden');
                    
                    img.src = data.url;
                    // body.style.backgroundImage = `url(${data.url})`
                }else {
                    img.classList.add('hidden');
                    vid.classList.remove('hidden');  
                    vid.src = data.url;
                }

                h2.textContent = 'Explanation';                
                p.textContent = data.explanation;

                // Appending the APOD container to the APOD Parent section
                apodParent.appendChild(apodBox);
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

            // document.querySelector('main.center').classList.remove('center');
            document.querySelector('.today').classList.add('hidden')
        }
    )
})