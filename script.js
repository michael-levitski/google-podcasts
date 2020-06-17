const SERVICE_WORKER_PATH = location.hostname === 'michael-levitski.github.io' ? '/google-podcasts/sw.js' : '/sw.js'
let button

const promptUser = async deferredPrompt => {
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
        window.location = 'https://podcasts.google.com/'
    } 
}

const loadRegistrationButton = deferredPrompt => {
    if (button) return
    const button = document.createElement('button')
    button.textContent = 'Open App'
    button.addEventListener('click', promptUser.bind(null, deferredPrompt))
    document.body.appendChild(button)
}

const registerServiceWorker = async () => {
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH)
}

addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    loadRegistrationButton(e)
})

if ('serviceWorker' in navigator) {
    registerServiceWorker()
}
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = 'https://podcasts.google.com/'
}
