const useServiceWorker = async () => {
    const { serviceWorker } = navigator
    if (!await serviceWorker.getRegistration()) {
        const button = document.createElement('button')
        button.textContent = 'register'
        button.addEventListener('click',async () => {
            await serviceWorker.register('/sw.js')
        })
        document.body.appendChild(button)
    }
}

if ('serviceWorker' in navigator) useServiceWorker()
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = 'https://podcasts.google.com/'
}
