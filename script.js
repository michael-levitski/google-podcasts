const SERVICE_WORKER_PATH = location.hostname === 'michael-levitski.github.io' ? '/google-podcasts/sw.js' : '/sw.js'
let deferredPrompt

addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
})

const registerServiceWorker = async () => {
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH)
    loadRegistrationButton(deferredPrompt)
}

const loadRegistrationButton = deferredPrompt => {
    const button = document.createElement('button')
    button.textContent = 'Open App'
    button.addEventListener('click', deferredPrompt.prompt)
    document.body.appendChild(button)
}

if ('serviceWorker' in navigator) {
    registerServiceWorker()
}
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = 'https://podcasts.google.com/'
}
